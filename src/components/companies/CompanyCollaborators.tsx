import { useState } from "react";
import { CompanyCollaborator, CompanyRole } from "@/types/company";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { inviteCollaborator } from "@/services/companyService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { format } from "date-fns";

interface CompanyCollaboratorsProps {
  companyId: string;
  collaborators: CompanyCollaborator[];
  isLoading: boolean;
}

export function CompanyCollaborators({
  companyId,
  collaborators,
  isLoading,
}: CompanyCollaboratorsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<CompanyRole>("member");
  
  const queryClient = useQueryClient();
  
  const { mutate: invite, isPending } = useMutation({
    mutationFn: () => inviteCollaborator(companyId, email, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['company-collaborators', companyId] });
      toast.success("Collaborator invited successfully");
      setIsOpen(false);
      setEmail("");
      setRole("member");
    },
    onError: () => {
      toast.error("Failed to invite collaborator");
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>Invite Collaborator</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite Collaborator</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="email"
                  placeholder="collaborator@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Role</label>
                <Select value={role} onValueChange={(value) => setRole(value as CompanyRole)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="member">Member</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                className="w-full"
                onClick={() => invite()}
                disabled={!email || isPending}
              >
                {isPending ? "Inviting..." : "Send Invitation"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {collaborators.map((collaborator) => (
            <TableRow key={collaborator.id}>
              <TableCell className="font-medium">{collaborator.name}</TableCell>
              <TableCell>{collaborator.email}</TableCell>
              <TableCell className="capitalize">{collaborator.role}</TableCell>
              <TableCell>{format(new Date(collaborator.joinedAt), 'MMM d, yyyy')}</TableCell>
              <TableCell className="text-right">
                <Button variant="outline" size="sm">
                  Edit Role
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}