"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ArticleSchema from "../../../../validation/articleSchema";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RichTextEditor } from "@/components/editor/rich-text-editor";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface ArticleInterface {
  title: string;
  description: string;
  tags: string[];
  content: string;
}

export default function ArticlesPage() {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [newArticle, setNewArticle] = useState<ArticleInterface>({
    title: "",
    description: "",
    tags: [],
    content: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewArticle((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value.split(",").map((tag) => tag.trim());
    setNewArticle((prev) => ({ ...prev, tags }));
    if (errors["tags"]) {
      setErrors((prev) => ({ ...prev, tags: "" }));
    }
  };

  const handleContentChange = (content: string) => {
    setNewArticle((prev) => ({ ...prev, content }));
    if (errors["content"]) {
      setErrors((prev) => ({ ...prev, content: "" }));
    }
  };

  const { isSuccess, isPending, mutate } = useMutation({
    mutationFn: async (article: ArticleInterface) => {
      const response = await axios.post(
        backendUrl!,
        { data: article },
        { withCredentials: true } // Enable cookies
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Article published successfully!");
      setNewArticle({ title: "", description: "", tags: [], content: "" });
    },
    onError: () => {
      toast.error("Failed to publish the article.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const check = ArticleSchema.safeParse(newArticle);

    if (!check.success) {
      const newErrors: Record<string, string> = {};
      check.error.errors.forEach((err) => {
        if (err.path[0]) {
          newErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(newErrors);
      return;
    }

    mutate(newArticle);
  };

  return (
    <div className="space-y-6 w-full">
      <h1 className="text-3xl font-bold">Articles</h1>
      <Card>
        <CardHeader>
          <CardTitle>Create New Article</CardTitle>
          <CardDescription>Write and publish a new article</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={newArticle.title}
                onChange={handleInputChange}
                className={errors.title ? "border-red-500" : ""}
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={newArticle.description}
                onChange={handleInputChange}
                className={errors.description ? "border-red-500" : ""}
              />
              {errors.description && (
                <p className="text-red-500 text-sm">{errors.description}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input
                id="tags"
                name="tags"
                value={newArticle.tags.join(", ")}
                onChange={handleTagsChange}
                className={errors.tags ? "border-red-500" : ""}
              />
              {errors.tags && (
                <p className="text-red-500 text-sm">{errors.tags}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <RichTextEditor
                content={newArticle.content}
                onChange={handleContentChange}
              />
              {errors.content && (
                <p className="text-red-500 text-sm">{errors.content}</p>
              )}
            </div>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Publishing..." : "Publish Article"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
