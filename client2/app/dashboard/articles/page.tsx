"use client";

import { useState } from "react";
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
  userId?: string;
}

export default function ArticlesPage() {
  const session = authClient.getSession();
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const [newArticle, setNewArticle] = useState<ArticleInterface>({
    id: "",
    title: "",
    description: "",
    tags: [],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const { data: articles, refetch } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const response = await axios.get(
        `${backendUrl}/public/articles/${(await session).data?.user.id}`,
        {
          withCredentials: true,
        }
      );
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
        `${backendUrl}/article`,
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
      refetch();
    },
    onError: () => {
      toast.error("Failed to publish the article.");
    },
  });

  const editMutation = useMutation({
    mutationFn: async (article: ArticleInterface) => {
      const { id, userId, ...articleData } = article;

      // Send only the article data without the id
      const response = await axios.patch(
        `${backendUrl}/article/${id}`,
        articleData,
        {
          withCredentials: true,
        }
      );

      return response.data;
    },
    onSuccess: () => {
      toast.success("Article updated successfully!");
      setNewArticle({ id: "", title: "", description: "", tags: [] });
      refetch();
    },
    onError: () => {
      toast.error("Failed to update the article.");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (articleId: string) => {
      const response = await axios.delete(
        `${backendUrl}/article/${articleId}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Article deleted successfully!");
      refetch();
    },
    onError: () => {
      toast.error("Failed to delete the article.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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

    if (newArticle.id) {
      editMutation.mutate(newArticle);
    } else {
      mutate(newArticle);
    }
  };

  const handleEdit = (article: ArticleInterface) => {
    setNewArticle(article);
  };

  const handleDelete = (articleId: string) => {
    deleteMutation.mutate(articleId);
  };

  return (
    <div className="space-y-6 w-full">
      <h1 className="text-3xl font-bold">Articles</h1>
      <div className="card">
        <h2>{newArticle.id ? "Edit Article" : "Create New Article"}</h2>
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
              theme="snow"
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
            {isPending
              ? newArticle.id
                ? "Updating..."
                : "Publishing..."
              : newArticle.id
              ? "Update Article"
              : "Publish Article"}
          </Button>
        </form>
      </div>

      <div className="mt-8 border-white p-3 rounded">
        <h2 className="text-2xl font-bold my-5">Published Articles</h2>
        {articles && articles.length === 0 ? (
          <p>No articles available.</p>
        ) : (
          <ul>
            {articles?.map((article: ArticleInterface) => (
              <li
                key={article.id}
                className="flex justify-between items-center mb-4 border-white/25 border-[1px] rounded-md p-5"
              >
                <div>
                  <h3 className="text-xl">{article.title}</h3>
                  <p
                    dangerouslySetInnerHTML={{ __html: article.description }}
                  />
                  <p className="text-sm text-gray-500">
                    {article.tags.join(", ")}
                  </p>
                  <div className="flex gap-2 my-2">
                    <Button
                      className="py-2 px-5"
                      onClick={() => handleEdit(article)}
                    >
                      Edit
                    </Button>
                    <Button
                      className="py-2 px-5"
                      onClick={() => handleDelete(article.id)}
                      variant="destructive"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
