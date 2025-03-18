import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AssessmentFilters } from "@/components/assessments/AssessmentFilters";
import { AssessmentList } from "@/components/assessments/AssessmentList";
import { useQuery } from "@tanstack/react-query";
import { fetchAssessments } from "@/services/assessmentService";
import { useNavigate } from "react-router-dom";

export default function MyAssessments() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [companyFilters, setCompanyFilters] = useState<string[]>(["all"]);
  const [categoryFilters, setCategoryFilters] = useState<string[]>(["all"]);
  const [statusFilters, setStatusFilters] = useState<string[]>(["all"]);

  const { data: assessments = [], isLoading, error } = useQuery({
    queryKey: ['assessments'],
    queryFn: fetchAssessments,
    staleTime: Infinity,
    gcTime: Infinity,
    retry: 2,
    meta: {
      onError: () => {
        toast.error("Failed to load assessments. Please try again.");
      }
    }
  });

  const handleFilterChange = (
    value: string,
    currentFilters: string[],
    setFilters: (filters: string[]) => void
  ) => {
    if (value === "all") {
      setFilters(["all"]);
    } else {
      const newFilters = currentFilters.filter(f => f !== "all");
      if (newFilters.includes(value)) {
        const updatedFilters = newFilters.filter(f => f !== value);
        setFilters(updatedFilters.length === 0 ? ["all"] : updatedFilters);
      } else {
        setFilters([...newFilters, value]);
      }
    }
  };

  const filteredAssessments = assessments.filter((assessment) => {
    const matchesSearch = assessment.title.toLowerCase().includes(search.toLowerCase());
    const matchesCompany = companyFilters.includes("all") || companyFilters.includes(assessment.company.toLowerCase());
    const matchesCategory = categoryFilters.includes("all") || categoryFilters.includes(assessment.category);
    const matchesStatus = statusFilters.includes("all") || statusFilters.includes(assessment.status);
    return matchesSearch && matchesCompany && matchesCategory && matchesStatus;
  });

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500">Failed to load assessments. Please try again.</div>
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
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <h1 className="text-2xl font-bold text-primary">My Assessments</h1>
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => toast("History feature coming soon!")}>
            History
          </Button>
          <Button onClick={() => navigate("/new-assessment")}>
            Explore Assessments
          </Button>
        </div>
      </div>

      <AssessmentFilters
        search={search}
        setSearch={setSearch}
        companyFilters={companyFilters}
        categoryFilters={categoryFilters}
        statusFilters={statusFilters}
        handleFilterChange={handleFilterChange}
        setCompanyFilters={setCompanyFilters}
        setCategoryFilters={setCategoryFilters}
        setStatusFilters={setStatusFilters}
      />

      <AssessmentList assessments={filteredAssessments} />
    </div>
  );
}