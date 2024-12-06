"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import authClient from "@/lib/auth-client";

interface ArticleInterface {
  id: string;
  title: string;
  description: string;
  tags: string[];
}

export default function ArticlesPage() {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [newArticle, setNewArticle] = useState<ArticleInterface>({
    id: "",
    title: "",
    description: "",
    tags: [],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const session = authClient.useSession();

  const { data: articles, refetch } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const response = await axios.get(`${backendUrl}/articles`, {
        withCredentials: true,
      });
      return response.data;
    },
    refetchOnWindowFocus: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleDescriptionChange = (content: string) => {
    setNewArticle((prev) => ({ ...prev, description: content }));
    if (errors["description"]) {
      setErrors((prev) => ({ ...prev, description: "" }));
    }
  };

  const { isPending, mutate } = useMutation({
    mutationFn: async (article: ArticleInterface) => {
      const response = await axios.post(
        `${backendUrl}/public/articles/${session.data?.user.id}`,
        { data: article },
        {
          withCredentials: true,
        }
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Article published successfully!");
      setNewArticle({ id: "", title: "", description: "", tags: [] });
      refetch(); // Re-fetch articles after a successful
    },
    onError: () => {
      toast.error("Failed to publish the article.");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (articleId: string) => {
      const response = await axios.delete(
        `${backendUrl}/article/${articleId}`,
        {
          withCredentials: true, // Ensures cookies are sent with the request
        }
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Article deleted successfully!");
      refetch(); // Re-fetch articles after a successful delete
    },
    onError: () => {
      toast.error("Failed to delete the article.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add validation here if needed
    if (
      !newArticle.title ||
      !newArticle.description ||
      newArticle.tags.length === 0
    ) {
      setErrors({
        title: newArticle.title ? "" : "Title is required",
        description: newArticle.description ? "" : "Description is required",
        tags: newArticle.tags.length > 0 ? "" : "At least one tag is required",
      });
      return;
    }
    mutate(newArticle);
  };

  const handleEdit = (article: ArticleInterface) => {
    setNewArticle(article); // Populate the form with article data
  };

  const handleDelete = (articleId: string) => {
    deleteMutation.mutate(articleId); // Delete the article
  };

  return (
    <div className="space-y-6 w-full">
      <h1 className="text-3xl font-bold">Articles</h1>
      <div className="card">
        <h2>Create New Article</h2>
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
            <ReactQuill
              value={newArticle.description}
              onChange={handleDescriptionChange}
              modules={{
                toolbar: [
                  [{ header: "1" }, { header: "2" }, { font: [] }],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["bold", "italic", "underline", "strike"],
                  [{ align: [] }],
                  ["link", "image"],
                  ["blockquote"],
                  ["code-block"],
                ],
              }}
              theme="snow" // Theme for ReactQuill
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
          <Button type="submit" disabled={isPending}>
            {isPending ? "Publishing..." : "Publish Article"}
          </Button>
        </form>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold">Published Articles</h2>
        {articles && articles.length === 0 ? (
          <p>No articles available.</p>
        ) : (
          <ul>
            {articles?.map((article: ArticleInterface) => (
              <li
                key={article.id}
                className="flex justify-between items-center mb-4"
              >
                <div>
                  <h3 className="text-xl">{article.title}</h3>
                  <p>{article.description}</p>
                  <p className="text-sm text-gray-500">
                    {article.tags.join(", ")}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => handleEdit(article)}>Edit</Button>
                  <Button
                    onClick={() => handleDelete(article.id)}
                    variant="destructive"
                  >
                    Delete
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
