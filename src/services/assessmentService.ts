import { Assessment, ReviewData } from "@/types/assessment";

// Mock data storage (in a real app, this would be a database)
let mockAssessments: Assessment[] = [
  {
    id: 1,
    title: "Contribution to the Development of Local Communities",
    company: "Mediaset",
    status: "completed",
    rating: 100,
    category: "Social",
    completedDate: "03/08/2024"
  },
  {
    id: 2,
    title: "Governance",
    company: "Mondadori",
    status: "open",
    rating: 66,
    category: "Corporate Governance",
    lastAccess: "12/11/2024"
  }
];

export const fetchAssessments = async (): Promise<Assessment[]> => {
  return Promise.resolve(mockAssessments);
};

// Simulate network delay for realistic behavior
export const fetchReviewData = async (assessmentId: string): Promise<ReviewData> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return Promise.resolve({
    questions: [
      {
        question: "Does your organisation have a written policy to protect human and workers' rights?",
        options: ["Yes", "No", "In Progress"],
        answer: "Yes",
        collaborator: "Romano Prodi",
        timestamp: "2024-12-08 10:30 AM"
      },
      {
        question: "How often is the policy reviewed?",
        options: ["Annually", "Every 2-3 years", "Every 4+ years", "Never"],
        answer: "Annually",
        collaborator: "Me",
        timestamp: "2024-12-08 10:32 AM"
      },
      {
        question: "Does your organisation provide training on workers' rights?",
        options: ["Yes, for all employees", "Yes, for management only", "No", "In Progress"],
        answer: "Yes, for all employees",
        collaborator: "Mario Draghi",
        timestamp: "2024-12-08 10:35 AM"
      },
      {
        question: "How does your organisation ensure compliance with labour laws?",
        options: ["Regular audits", "Employee feedback mechanisms", "Third-party assessments", "We don't have a system in place"],
        answer: "Regular audits",
        collaborator: "Giorgio Napolitano",
        timestamp: "2024-12-08 10:38 AM"
      },
      {
        question: "Do you have a system to report and address violations of workers' rights?",
        options: ["Yes, with anonymity guaranteed", "Yes, but not anonymous", "No"],
        answer: "Yes, with anonymity guaranteed",
        collaborator: "Romano Prodi",
        timestamp: "2024-12-08 10:40 AM"
      },
      {
        question: "Rank the following factors in terms of priority for your organisation (1 = Highest, 5 = Lowest):",
        options: [
          "Fair wages",
          "Safe working conditions",
          "Anti-discrimination measures",
          "Freedom of association",
          "Access to grievance mechanisms"
        ],
        answer: [
          "Safe working conditions",
          "Fair wages",
          "Anti-discrimination measures",
          "Freedom of association",
          "Access to grievance mechanisms"
        ],
        collaborator: "Me",
        timestamp: "2024-12-08 10:45 AM"
      },
      {
        question: "Rank the effectiveness of these methods in monitoring workers' rights in your organisation:",
        options: [
          "Internal audits",
          "External audits",
          "Worker surveys",
          "Feedback from unions",
          "Legal compliance reviews"
        ],
        answer: [
          "External audits",
          "Worker surveys",
          "Feedback from unions",
          "Internal audits",
          "Legal compliance reviews"
        ],
        collaborator: "Mario Draghi",
        timestamp: "2024-12-08 10:50 AM"
      },
      {
        question: "Rank the challenges your organisation faces in protecting workers' rights:",
        options: [
          "Limited resources",
          "Lack of expertise",
          "Resistance to change",
          "Cultural differences",
          "Regulatory complexity"
        ],
        answer: [
          "Regulatory complexity",
          "Limited resources",
          "Cultural differences",
          "Lack of expertise",
          "Resistance to change"
        ],
        collaborator: "Giorgio Napolitano",
        timestamp: "2024-12-08 10:55 AM"
      },
      {
        question: "What measures does your organisation take to ensure fair treatment of workers?",
        answer: "We provide training on anti-discrimination, conduct regular audits, and have a zero-tolerance policy for harassment.",
        collaborator: "Romano Prodi",
        timestamp: "2024-12-08 11:00 AM"
      },
      {
        question: "Describe a specific instance where your organisation successfully resolved a workers' rights issue.",
        answer: "Last year, we addressed an employee grievance regarding overtime pay through mediation and policy updates.",
        collaborator: "Me",
        timestamp: "2024-12-08 11:05 AM"
      },
      {
        question: "What steps are being taken to improve workers’ rights in your supply chain?",
        answer: "We are partnering with third-party auditors to assess suppliers and implement corrective action plans.",
        collaborator: "Mario Draghi",
        timestamp: "2024-12-08 11:10 AM"
      },
      {
        question: "What barriers have you encountered in enforcing workers' rights policies?",
        answer: "Cultural differences among international teams and regulatory complexities in different countries.",
        collaborator: "Giorgio Napolitano",
        timestamp: "2024-12-08 11:15 AM"
      },
      {
        question: "How do you ensure that workers' voices are heard in organisational decisions?",
        answer: "We conduct quarterly surveys, have employee representatives on the board, and hold monthly feedback sessions.",
        collaborator: "Romano Prodi",
        timestamp: "2024-12-08 11:20 AM"
      },
      {
        question: "What role does management play in upholding workers' rights?",
        answer: "Management is responsible for training, policy enforcement, and addressing grievances promptly.",
        collaborator: "Me",
        timestamp: "2024-12-08 11:25 AM"
      },
      {
        question: "What additional resources or support would help your organisation better protect human and workers' rights?",
        answer: "More funding for external audits and training programs, and stronger partnerships with human rights organisations.",
        collaborator: "Mario Draghi",
        timestamp: "2024-12-08 11:30 AM"
      },
      {
        question: "How does your organisation ensure accountability within its governance structure?",
        collaborator: undefined,
        timestamp: undefined
      },
      {
        question: "What mechanisms are in place to gather stakeholder feedback?",
        collaborator: undefined,
        timestamp: undefined
      },
      {
        question: "What role does diversity play in your governance policies?",
        collaborator: undefined,
        timestamp: undefined
      },
      {
        question: "Describe the process for addressing governance-related issues when they arise.",
        collaborator: undefined,
        timestamp: undefined
      },
      {
        question: "What additional measures could improve the effectiveness of your governance?",
        collaborator: undefined,
        timestamp: undefined
      }
    ]
  });
};
