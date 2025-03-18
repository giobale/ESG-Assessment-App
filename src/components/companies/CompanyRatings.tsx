import { CompanyRating } from "@/types/company";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { format } from "date-fns";

interface CompanyRatingsProps {
  ratings: CompanyRating[];
  isLoading: boolean;
}

export function CompanyRatings({ ratings, isLoading }: CompanyRatingsProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (ratings.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No ratings available</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Assessment</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Score</TableHead>
          <TableHead>Completed</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {ratings.map((rating) => (
          <TableRow key={rating.id}>
            <TableCell className="font-medium">{rating.assessmentTitle}</TableCell>
            <TableCell>{rating.category}</TableCell>
            <TableCell>{rating.score}%</TableCell>
            <TableCell>{format(new Date(rating.completedAt), 'MMM d, yyyy')}</TableCell>
            <TableCell className="text-right">
              <Button variant="outline" size="sm">
                <FileText className="mr-2 h-4 w-4" />
                View Report
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}