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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { toast } from "@/components/ui/use-toast";

interface ProjectInterface {
  id: number;
  imageUrl: string;
  description: string;
  name: string;
  githubUrl: string;
  liveLink: string;
  tags: string[];
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<ProjectInterface[]>([
    {
      id: 1,
      imageUrl: "/placeholder.svg?height=100&width=100",
      description: "A sample project",
      name: "Sample Project",
      githubUrl: "https://github.com/sample/project",
      liveLink: "https://sample-project.com",
      tags: ["react", "typescript"],
    },
  ]);

  const [newProject, setNewProject] = useState<ProjectInterface>({
    id: 0,
    imageUrl: "",
    description: "",
    name: "",
    githubUrl: "",
    liveLink: "",
    tags: [],
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const project: ProjectInterface = {
      ...newProject,
      id: Date.now(),
    };
    setProjects((prev) => [...prev, project]);
    setNewProject({
      id: 0,
      imageUrl: "",
      description: "",
      name: "",
      githubUrl: "",
      liveLink: "",
      tags: [],
    });
    // toast({
    //   title: "Project Created",
    //   description: "Your project has been successfully created.",
    // });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Projects</h1>

      <Card>
        <CardHeader>
          <CardTitle>Add New Project</CardTitle>
          <CardDescription>Create a new project entry</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Project Name</Label>
              <Input
                id="name"
                name="name"
                value={newProject.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={newProject.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                name="imageUrl"
                value={newProject.imageUrl}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="githubUrl">GitHub URL</Label>
              <Input
                id="githubUrl"
                name="githubUrl"
                value={newProject.githubUrl}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="liveLink">Live Link</Label>
              <Input
                id="liveLink"
                name="liveLink"
                value={newProject.liveLink}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input
                id="tags"
                name="tags"
                value={newProject.tags.join(", ")}
                onChange={handleTagsChange}
              />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmit}>Add Project</Button>
        </CardFooter>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id}>
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
                {project.description}
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
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-500 hover:underline"
                >
                  GitHub
                </a>
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-500 hover:underline"
                >
                  Live Demo
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
