import React from "react";

interface QuestionDisplayProps {
  questionNumber: number;
  question: {
    question: string;
    options?: string[];
    answer?: string | string[];
    collaborator?: string;
    timestamp?: string;
  };
}

const getCollaboratorColor = (collaborator: string) => {
  switch (collaborator) {
    case "Romano Prodi":
      return "text-blue-500";
    case "Me":
      return "text-orange-500";
    case "Mario Draghi":
      return "text-purple-500";
    case "Giorgio Napolitano":
      return "text-green-500";
    default:
      return "text-muted-foreground";
  }
};

export function QuestionDisplay({ questionNumber, question }: QuestionDisplayProps) {
  const isIncomplete = !question.answer;

  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-4">
      <h3 className="font-medium text-lg">Q{questionNumber}: {question.question}</h3>
      <div className="space-y-2">
        {isIncomplete ? (
          <p className="text-muted-foreground italic">To be completed</p>
        ) : Array.isArray(question.answer) ? (
          <ol className="list-decimal list-inside space-y-1">
            {question.answer.map((item, i) => (
              <li key={i} className="text-muted-foreground">
                {item}
              </li>
            ))}
          </ol>
        ) : (
          <p className="text-muted-foreground">{question.answer}</p>
        )}
      </div>
      {!isIncomplete && question.collaborator && question.timestamp && (
        <div className="text-sm">
          <p>
            Answered by:{" "}
            <span className={getCollaboratorColor(question.collaborator)}>
              {question.collaborator}
            </span>
          </p>
          <p className="text-muted-foreground">{question.timestamp}</p>
        </div>
      )}
    </div>
  );
}