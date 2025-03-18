import { useNavigate } from "react-router-dom";
import { Building2, Calendar } from "lucide-react";
import { Company } from "@/types/company";
import { format } from "date-fns";

interface CompanyCardProps {
  company: Company;
}

export function CompanyCard({ company }: CompanyCardProps) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/company/${company.id}`)}
      className="bg-white rounded-xl p-6 shadow-sm cursor-pointer transition-all hover:shadow-md hover:scale-[1.02] animate-fade-in"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-lg text-primary">{company.name}</h3>
          <p className="text-sm text-muted-foreground">{company.sector}</p>
        </div>
        <Building2 className="text-muted-foreground" />
      </div>
      
      <div className="flex items-center text-sm text-muted-foreground">
        <Calendar className="mr-2 h-4 w-4" />
        <span>Created {format(new Date(company.createdAt), 'MMM d, yyyy')}</span>
      </div>
    </div>
  );
}