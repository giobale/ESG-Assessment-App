import { Input } from "@/components/ui/input";
import { FilterSelect } from "@/components/assessment-review/FilterSelect";

interface AssessmentFiltersProps {
  search: string;
  setSearch: (value: string) => void;
  companyFilters: string[];
  categoryFilters: string[];
  statusFilters: string[];
  handleFilterChange: (
    value: string,
    currentFilters: string[],
    setFilters: (filters: string[]) => void
  ) => void;
  setCompanyFilters: (filters: string[]) => void;
  setCategoryFilters: (filters: string[]) => void;
  setStatusFilters: (filters: string[]) => void;
}

export function AssessmentFilters({
  search,
  setSearch,
  companyFilters,
  categoryFilters,
  statusFilters,
  handleFilterChange,
  setCompanyFilters,
  setCategoryFilters,
  setStatusFilters,
}: AssessmentFiltersProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Input
        placeholder="Search assessments..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <FilterSelect
        placeholder="All companies"
        value={companyFilters.join(",")}
        onValueChange={(value) =>
          handleFilterChange(value, companyFilters, setCompanyFilters)
        }
        options={[
          { value: "mediaset", label: "Mediaset" },
          { value: "mondadori", label: "Mondadori" },
        ]}
        defaultOption="all"
      />
      <FilterSelect
        placeholder="All categories"
        value={categoryFilters.join(",")}
        onValueChange={(value) =>
          handleFilterChange(value, categoryFilters, setCategoryFilters)
        }
        options={[
          { value: "Social", label: "Social" },
          { value: "Corporate Governance", label: "Corporate Governance" },
        ]}
        defaultOption="all"
      />
      <FilterSelect
        placeholder="All status"
        value={statusFilters.join(",")}
        onValueChange={(value) =>
          handleFilterChange(value, statusFilters, setStatusFilters)
        }
        options={[
          { value: "completed", label: "Completed" },
          { value: "open", label: "Open" },
        ]}
        defaultOption="all"
      />
    </div>
  );
}