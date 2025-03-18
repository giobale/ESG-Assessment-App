import React from "react";
import { FilterSelect } from "./FilterSelect";
import { Question } from "@/types/assessment";

interface FiltersProps {
  questions: Question[];
  selectedQuestions: string[];
  setSelectedQuestions: (questions: string[]) => void;
  selectedCollaborators: string[];
  setSelectedCollaborators: (collaborators: string[]) => void;
  uniqueCollaborators: string[];
}

export function Filters({
  questions,
  selectedQuestions,
  setSelectedQuestions,
  selectedCollaborators,
  setSelectedCollaborators,
  uniqueCollaborators,
}: FiltersProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-white rounded-lg shadow">
      <FilterSelect
        label="Filter by Questions"
        placeholder="All questions"
        value={selectedQuestions.join(",")}
        onValueChange={(value) => setSelectedQuestions(value ? value.split(",") : [])}
        options={questions.map((_, index) => ({
          value: (index + 1).toString(),
          label: `Q${index + 1}`,
        }))}
        defaultOption="All questions"
      />

      <FilterSelect
        label="Filter by Collaborators"
        placeholder="Everyone"
        value={selectedCollaborators.join(",")}
        onValueChange={(value) => setSelectedCollaborators(value ? value.split(",") : [])}
        options={uniqueCollaborators.map((collaborator) => ({
          value: collaborator,
          label: collaborator,
        }))}
        defaultOption="Everyone"
      />
    </div>
  );
}