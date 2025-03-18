import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CompanyCard } from "@/components/companies/CompanyCard";
import { fetchCompanies } from "@/services/companyService";
import { toast } from "sonner";

export default function MyCompanies() {
  const navigate = useNavigate();
  
  const { data: companies = [], isLoading, error } = useQuery({
    queryKey: ['companies'],
    queryFn: fetchCompanies,
    staleTime: Infinity,
    gcTime: Infinity,
    retry: 2,
    meta: {
      onError: () => {
        toast.error("Failed to load companies. Please try again.");
      }
    }
  });

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500">Failed to load companies. Please try again.</div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary">My Companies</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map((company) => (
          <CompanyCard key={company.id} company={company} />
        ))}
      </div>

      <Button
        className="fixed bottom-6 right-6 shadow-lg"
        onClick={() => navigate("/create-company")}
      >
        <Plus className="mr-2 h-4 w-4" /> Create Company
      </Button>
    </div>
  );
}