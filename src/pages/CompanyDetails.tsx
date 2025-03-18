import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CompanyRatings } from "@/components/companies/CompanyRatings";
import { CompanyCollaborators } from "@/components/companies/CompanyCollaborators";
import { fetchCompanyRatings, fetchCompanyCollaborators } from "@/services/companyService";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function CompanyDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("ratings");

  const { data: ratings = [], isLoading: isLoadingRatings } = useQuery({
    queryKey: ['company-ratings', id],
    queryFn: () => fetchCompanyRatings(id!),
    enabled: !!id,
    staleTime: Infinity,
    gcTime: Infinity,
    meta: {
      onError: () => {
        toast.error("Failed to load company ratings");
      }
    }
  });

  const { data: collaborators = [], isLoading: isLoadingCollaborators } = useQuery({
    queryKey: ['company-collaborators', id],
    queryFn: () => fetchCompanyCollaborators(id!),
    enabled: !!id,
    staleTime: Infinity,
    gcTime: Infinity,
    meta: {
      onError: () => {
        toast.error("Failed to load company collaborators");
      }
    }
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <Button
        variant="outline"
        className="mb-6"
        onClick={() => navigate("/my-companies")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Companies
      </Button>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-[400px] grid-cols-2">
          <TabsTrigger value="ratings">Ratings</TabsTrigger>
          <TabsTrigger value="collaborators">Collaborators</TabsTrigger>
        </TabsList>
        <TabsContent value="ratings">
          <CompanyRatings ratings={ratings} isLoading={isLoadingRatings} />
        </TabsContent>
        <TabsContent value="collaborators">
          <CompanyCollaborators
            companyId={id!}
            collaborators={collaborators}
            isLoading={isLoadingCollaborators}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}