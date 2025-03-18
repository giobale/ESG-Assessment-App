import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { AddExternalSourceModal } from "@/components/news/AddExternalSourceModal";
import { useToast } from "@/hooks/use-toast";

// Updated mock archived articles with images
const archivedArticles = [
  {
    id: 1,
    title: "New Healthcare Regulations Impact Medical Device Companies",
    summary: "Recent changes in healthcare regulations affect medical device manufacturing and distribution...",
    tags: ["Healthcare", "Policy"],
    archivedDate: "2024-02-20",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
  },
  {
    id: 2,
    title: "Tech Giants Face New Data Privacy Laws",
    summary: "Major technology companies are adapting to stricter data privacy regulations...",
    tags: ["Technology", "Policy"],
    archivedDate: "2024-02-19",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
  },
];

const availableTags = ["Healthcare", "Technology", "Policy", "Economy", "Environment"];

const getTagColor = (tag: string) => {
  const colors: { [key: string]: string } = {
    Healthcare: "bg-emerald-100 text-emerald-800",
    Technology: "bg-blue-100 text-blue-800",
    Policy: "bg-purple-100 text-purple-800",
    Economy: "bg-amber-100 text-amber-800",
    Environment: "bg-green-100 text-green-800",
    External: "bg-gray-100 text-gray-800",
  };
  return colors[tag] || "bg-gray-100 text-gray-800";
};

export default function NewsArchive() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [articles, setArticles] = useState(archivedArticles);

  const handleAddExternalSource = ({ url, tag, title, description }: { url: string; tag: string; title: string; description: string }) => {
    const newArticle = {
      id: articles.length + 1,
      title,
      summary: description,
      tags: [tag],
      archivedDate: new Date().toISOString().split("T")[0],
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    };

    setArticles([newArticle, ...articles]);
    toast({
      title: "Article added",
      description: "The external article has been added to your archive",
    });
  };

  const handleRemoveArticle = (articleId: number) => {
    setArticles(articles.filter(article => article.id !== articleId));
    toast({
      title: "Article removed",
      description: "The article has been removed from your archive",
    });
  };

  const filteredArticles = articles.filter((article) => {
    const matchesTag = selectedTag === "all" || article.tags.includes(selectedTag);
    const matchesDate = !dateFilter || article.archivedDate === dateFilter;
    return matchesTag && matchesDate;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate("/news")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to News
          </Button>
          <h1 className="text-3xl font-bold">Archived Articles</h1>
        </div>
      </div>

      <div className="flex gap-4">
        <Select value={selectedTag} onValueChange={setSelectedTag}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by tag" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tags</SelectItem>
            {availableTags.map((tag) => (
              <SelectItem key={tag} value={tag}>
                {tag}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="w-[200px]"
        />

        {(selectedTag !== "all" || dateFilter) && (
          <Button
            variant="ghost"
            onClick={() => {
              setSelectedTag("all");
              setDateFilter("");
            }}
          >
            Clear Filters
          </Button>
        )}
      </div>

      <div className="grid gap-6">
        {filteredArticles.map((article) => (
          <Card key={article.id}>
            <CardHeader>
              <div className="space-y-2">
                <div className="flex gap-4">
                  <div className="w-48 h-32 rounded-lg overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <CardTitle>{article.title}</CardTitle>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveArticle(article.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                    <div className="flex gap-2 mt-2">
                      {article.tags.map((tag) => (
                        <Badge key={tag} className={getTagColor(tag)}>
                          {tag}
                        </Badge>
                      ))}
                      <Badge variant="outline">
                        Archived: {article.archivedDate}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{article.summary}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button
        className="fixed bottom-6 right-6"
        onClick={() => setIsModalOpen(true)}
      >
        <Plus className="mr-2 h-4 w-4" />
        Add External Source
      </Button>

      <AddExternalSourceModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSave={handleAddExternalSource}
      />
    </div>
  );
}