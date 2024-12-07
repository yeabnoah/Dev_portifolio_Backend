"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import authClient from "@/lib/auth-client";

interface ProjectInterface {
  id: number;
  imageUrl: string;
  description: string;
  name: string;
  githubUrl: string;
  liveLink: string;
  tags: string[];
}
import strShorten from "str_shorten";

export default function ProjectsPage() {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL!;
  const cloudinaryUploadUrl = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL!;
  const cloudinaryUploadPreset =
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;
  const session = authClient.useSession();
  const queryClient = useQueryClient();

  const [newProject, setNewProject] = useState<ProjectInterface>({
    id: 0,
    imageUrl: "",
    description: "",
    name: "",
    githubUrl: "",
    liveLink: "",
    tags: [],
  });

  const [editingProjectId, setEditingProjectId] = useState<number | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const {
    data: projects,
    isLoading,
    isError,
  } = useQuery({
    queryFn: async () => {
      const response = await axios.get(
        `${backendUrl}/public/projects/${session.data?.user.id}`
      );
      return response.data;
    },
    queryKey: ["projects"],
    enabled: !!session.data?.user.id, // Fetch immediately if user ID is available
  });

  const saveProjectMutation = useMutation({
    mutationFn: async (project: ProjectInterface) => {
      let imageUrl = project.imageUrl;

      // Upload the image to Cloudinary if a new file was selected
      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("upload_preset", cloudinaryUploadPreset);

        try {
          const response = await axios.post(cloudinaryUploadUrl, formData);
          imageUrl = response.data.secure_url;
        } catch (error) {
          console.error("Image upload failed:", error);
          throw new Error("Image upload failed");
        }
      }

      if (editingProjectId) {
        return await axios.patch(
          `${backendUrl}/projects/${editingProjectId}`,
          { ...project, imageUrl },
          { withCredentials: true }
        );
      } else {
        return await axios.post(
          `${backendUrl}/projects`,
          { ...project, imageUrl },
          { withCredentials: true }
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      resetForm();
    },
    onError: (error) => {
      console.error("Error saving project:", error);
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value.split(",").map((tag) => tag.trim());
    setNewProject((prev) => ({ ...prev, tags }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);

      // Generate a local preview
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveProjectMutation.mutate({ ...newProject });
  };

  const handleEdit = (project: ProjectInterface) => {
    setNewProject(project);
    setEditingProjectId(project.id);
    setPreviewUrl(project.imageUrl);
    setSelectedFile(null);
  };

  const resetForm = () => {
    setNewProject({
      id: 0,
      imageUrl: "",
      description: "",
      name: "",
      githubUrl: "",
      liveLink: "",
      tags: [],
    });
    setEditingProjectId(null);
    setPreviewUrl(null);
    setSelectedFile(null);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      await axios.delete(`${backendUrl}/projects/${id}`, {
        withCredentials: true,
      });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Projects</h1>

      <Card className=" md:max-w-[60vw] w-full">
        <CardHeader>
          <CardTitle className="text-lg">
            {editingProjectId ? "Edit Project" : "Add New Project"}
          </CardTitle>
          <CardDescription className="text-sm">
            {editingProjectId
              ? "Update your project details"
              : "Create a new project entry"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="imageUrl">Project Image</Label>
              <Input type="file" onChange={handleFileChange} />
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Image Preview"
                  className="w-full h-40 object-cover rounded-md mt-2"
                />
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="name">Project Name</Label>
              <Input
                id="name"
                name="name"
                value={newProject.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={newProject.description}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input
                id="tags"
                name="tags"
                value={newProject.tags.join(", ")}
                onChange={handleTagsChange}
                className="h-8 py-5"
              />
            </div>

            <div className="flex gap-2 justify-end">
              <Button type="submit" disabled={saveProjectMutation.isPending}>
                {editingProjectId ? "Update Project" : "Add Project"}
              </Button>
              {editingProjectId && (
                <Button type="button" variant="secondary" onClick={resetForm}>
                  Cancel Edit
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {isLoading && <p>Loading projects...</p>}
      {isError && <p>Error loading projects.</p>}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects?.map((project: ProjectInterface) => (
          <Card key={project.id} className=" p-0">
            <CardHeader>
              <CardTitle>{project.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <img
                src={project.imageUrl}
                alt={project.name}
                className="w-full h-40 object-cover mb-4 rounded-md"
              />
              <p className="text-sm text-muted-foreground mb-2">
                {strShorten(project.description, 400)}
              </p>
              <div className="flex flex-wrap gap-2 mb-2">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" onClick={() => handleEdit(project)}>
                  Edit
                </Button>
                <Button
                  className=" bg-red-500 text-white hover:bg-red-600 "
                  onClick={() => handleDelete(project.id)}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
