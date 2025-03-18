import { Company, CompanyCollaborator, CompanyRating, CompanyRole } from "@/types/company";

// Mock data
const mockCompanies: Company[] = [
  {
    id: "1",
    name: "Mediaset",
    sector: "Media",
    createdAt: "2024-01-15",
    createdBy: "user123",
  },
  {
    id: "2",
    name: "Mondadori",
    sector: "Publishing",
    createdAt: "2024-02-01",
    createdBy: "user123",
  },
];

const mockCollaborators: CompanyCollaborator[] = [
  {
    id: "1",
    userId: "user123",
    companyId: "1",
    role: "owner",
    email: "owner@mediaset.com",
    name: "Romano Prodi",
    joinedAt: "2024-01-15",
  },
  {
    id: "2",
    userId: "user456",
    companyId: "1",
    role: "admin",
    email: "admin@mediaset.com",
    name: "Mario Draghi",
    joinedAt: "2024-01-16",
  },
];

const mockRatings: CompanyRating[] = [
  {
    id: "1",
    companyId: "1",
    assessmentId: "1",
    assessmentTitle: "Environmental Impact Assessment",
    score: 85,
    completedAt: "2024-02-15",
    category: "Environmental",
  },
  {
    id: "2",
    companyId: "1",
    assessmentId: "2",
    assessmentTitle: "Social Responsibility Assessment",
    score: 92,
    completedAt: "2024-02-20",
    category: "Social",
  },
];

export const fetchCompanies = async (): Promise<Company[]> => {
  return Promise.resolve(mockCompanies);
};

export const fetchCompanyCollaborators = async (companyId: string): Promise<CompanyCollaborator[]> => {
  return Promise.resolve(mockCollaborators.filter(c => c.companyId === companyId));
};

export const fetchCompanyRatings = async (companyId: string): Promise<CompanyRating[]> => {
  return Promise.resolve(mockRatings.filter(r => r.companyId === companyId));
};

export const createCompany = async (data: Partial<Company>): Promise<Company> => {
  const newCompany: Company = {
    id: Math.random().toString(36).substr(2, 9),
    name: data.name!,
    sector: data.sector!,
    createdAt: new Date().toISOString(),
    createdBy: "user123", // In a real app, this would come from auth context
  };
  mockCompanies.push(newCompany);
  return Promise.resolve(newCompany);
};

export const inviteCollaborator = async (
  companyId: string,
  email: string,
  role: CompanyRole
): Promise<CompanyCollaborator> => {
  const newCollaborator: CompanyCollaborator = {
    id: Math.random().toString(36).substr(2, 9),
    userId: Math.random().toString(36).substr(2, 9),
    companyId,
    role,
    email,
    name: email.split('@')[0],
    joinedAt: new Date().toISOString(),
  };
  mockCollaborators.push(newCollaborator);
  return Promise.resolve(newCollaborator);
};