import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "./components/Layout";
import NewAssessment from "./pages/NewAssessment";
import MyAssessments from "./pages/MyAssessments";
import AssessmentReview from "./pages/AssessmentReview";
import MyCompanies from "./pages/MyCompanies";
import CompanyDetails from "./pages/CompanyDetails";
import CreateCompany from "./pages/CreateCompany";
import News from "./pages/News";
import NewsArchive from "./pages/NewsArchive";
import { Profile } from "./pages/Profile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<MyAssessments />} />
            <Route path="/new-assessment" element={<NewAssessment />} />
            <Route path="/assessment-review/:id" element={<AssessmentReview />} />
            <Route path="/my-companies" element={<MyCompanies />} />
            <Route path="/company/:id" element={<CompanyDetails />} />
            <Route path="/create-company" element={<CreateCompany />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/archive" element={<NewsArchive />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Layout>
      </BrowserRouter>
      <Toaster />
      <Sonner />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;