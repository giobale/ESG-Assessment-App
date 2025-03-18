import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Archive, BookmarkPlus, Check, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock news articles with images
const mockArticles = [
  {
    id: 1,
    title: "New Healthcare Regulations Impact Medical Device Companies",
    summary: "Recent changes in healthcare regulations affect medical device manufacturing and distribution...",
    tags: ["Healthcare", "Policy"],
    date: "2024-02-20",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
  },
  {
    id: 2,
    title: "Tech Giants Face New Data Privacy Laws",
    summary: "Major technology companies are adapting to stricter data privacy regulations...",
    tags: ["Technology", "Policy"],
    date: "2024-02-19",
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
  };
  return colors[tag] || "bg-gray-100 text-gray-800";
};

export default function News() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [savedArticles, setSavedArticles] = useState<number[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>("all");

  const handleSaveToArchive = (articleId: number) => {
    if (savedArticles.includes(articleId)) {
      setSavedArticles(savedArticles.filter(id => id !== articleId));
      toast({
        title: "Article removed",
        description: "The article has been removed from your archive",
      });
    } else {
      setSavedArticles([...savedArticles, articleId]);
      toast({
        title: "Article saved",
        description: "The article has been added to your archive",
      });
    }
  };

  const filteredArticles = mockArticles.filter((article) => {
    return selectedTag === "all" || article.tags.includes(selectedTag);
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">News Feed</h1>
        <div className="flex gap-2">
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
          <Button
            variant="outline"
            onClick={() => navigate("/news/archive")}
          >
            <Archive className="mr-2 h-4 w-4" />
            Archive
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        {filteredArticles.map((article) => (
          <Card key={article.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
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
                      <CardTitle>{article.title}</CardTitle>
                      <div className="flex gap-2 mt-2">
                        {article.tags.map((tag) => (
                          <Badge key={tag} className={getTagColor(tag)}>
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleSaveToArchive(article.id)}
                >
                  {savedArticles.includes(article.id) ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <BookmarkPlus className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{article.summary}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}