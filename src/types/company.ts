export type CompanyRole = 'owner' | 'admin' | 'member' | 'viewer';

export interface Company {
  id: string;
  name: string;
  sector: string;
  createdAt: string;
  createdBy: string;
}

export interface CompanyCollaborator {
  id: string;
  userId: string;
  companyId: string;
  role: CompanyRole;
  email: string;
  name: string;
  joinedAt: string;
}

export interface CompanyRating {
  id: string;
  companyId: string;
  assessmentId: string;
  assessmentTitle: string;
  score: number;
  completedAt: string;
  category: string;
}