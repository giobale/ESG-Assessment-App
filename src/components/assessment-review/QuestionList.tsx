import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { QuestionDisplay } from "@/components/assessment/QuestionDisplay";
import { Question } from "@/types/assessment";

interface QuestionListProps {
  questions: Question[];
  itemsPerPage?: number;
}

export function QuestionList({ questions, itemsPerPage = 10 }: QuestionListProps) {
  const [displayedQuestions, setDisplayedQuestions] = useState<Question[]>([]);
  const [page, setPage] = useState(1);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  useEffect(() => {
    setPage(1);
    setDisplayedQuestions(questions.slice(0, itemsPerPage));
  }, [questions, itemsPerPage]);

  useEffect(() => {
    if (inView && displayedQuestions.length < questions.length) {
      const nextPage = page + 1;
      const endIndex = nextPage * itemsPerPage;
      setDisplayedQuestions(questions.slice(0, endIndex));
      setPage(nextPage);
    }
  }, [inView, displayedQuestions.length, questions, page, itemsPerPage]);

  if (questions.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        No questions found matching your filters.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {displayedQuestions.map((question, index) => (
        <QuestionDisplay
          key={index}
          questionNumber={questions.indexOf(question) + 1}
          question={question}
        />
      ))}
      {displayedQuestions.length < questions.length && (
        <div ref={ref} className="h-20 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}
    </div>
  );
}