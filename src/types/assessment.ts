export interface Question {
  question: string;
  options?: string[];
  answer?: string | string[];
  collaborator?: string;
  timestamp?: string;
}

export interface ReviewData {
  questions: Question[];
}

export interface Assessment {
  id: number;
  title: string;
  company: string;
  status: string;
  rating: number;
  category: string;
  completedDate?: string;
  lastAccess?: string;
}