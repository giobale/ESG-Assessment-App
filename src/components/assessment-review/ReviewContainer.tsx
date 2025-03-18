import { useState } from "react";
import { ReviewHeader } from "./ReviewHeader";
import { Filters } from "./Filters";
import { QuestionList } from "./QuestionList";
import { Question } from "@/types/assessment";
import { useQuery } from "@tanstack/react-query";
import { fetchReviewData } from "@/services/assessmentService";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

export function ReviewContainer() {
  const { id } = useParams<{ id: string }>();
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>(["All questions"]);
  const [selectedCollaborators, setSelectedCollaborators] = useState<string[]>(["Everyone"]);

  const { data: reviewData, isLoading, error } = useQuery({
    queryKey: ['reviewData', id],
    queryFn: () => fetchReviewData(id!),
    staleTime: Infinity,
    gcTime: Infinity,
    enabled: !!id,
    retry: 2,
    meta: {
      onError: () => {
        toast.error("Failed to load review data. Please try again.");
      }
    }
  });

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500">Failed to load review data. Please try again.</div>
      </div>
    );
  }

  if (isLoading || !reviewData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const uniqueCollaborators = Array.from(
    new Set(
      reviewData.questions
        .filter((q) => q.collaborator)
        .map((q) => q.collaborator as string)
    )
  );

  const filteredQuestions = reviewData.questions.filter((question, index) => {
    const questionNumber = (index + 1).toString();
    
    const matchesQuestion = 
      selectedQuestions.includes("All questions") ||
      selectedQuestions.includes(questionNumber);

    const matchesCollaborator = 
      selectedCollaborators.includes("Everyone") ||
      (question.collaborator && selectedCollaborators.includes(question.collaborator));

    return matchesQuestion && matchesCollaborator;
  });

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <ReviewHeader />
      <Filters
        questions={reviewData.questions}
        selectedQuestions={selectedQuestions}
        setSelectedQuestions={setSelectedQuestions}
        selectedCollaborators={selectedCollaborators}
        setSelectedCollaborators={setSelectedCollaborators}
        uniqueCollaborators={uniqueCollaborators}
      />
      <QuestionList questions={filteredQuestions} itemsPerPage={10} />
    </div>
  );
}