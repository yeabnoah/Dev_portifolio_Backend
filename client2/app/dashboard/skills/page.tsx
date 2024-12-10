"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import authClient from "@/lib/auth-client";
import techOptions from "@/util/techStack";

interface SkillInterface {
  id: number;
  name: string;
  imageUrl: string;
}

export default function SkillsPage() {
  const backendurl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const session = authClient.useSession();
  const queryClient = useQueryClient();

  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [newSkill, setNewSkill] = useState<SkillInterface>({
    id: 0,
    name: "",
    imageUrl: "",
  });

  const {
    data: skills,
    isLoading: skillsLoading,
    isError: skillsError,
    refetch,
  } = useQuery({
    queryKey: ["skills", session.data?.user.id],
    queryFn: async () => {
      if (!session.data?.user.id) return [];
      const response = await axios.get(
        `${backendurl}/public/skills/${session.data.user.id}`,
        { withCredentials: true }
      );
      return response.data;
    },
    enabled: !!session.data?.user.id && false,
  });

  const addSkillMutation = useMutation({
    mutationFn: async (skill: SkillInterface) => {
      return await axios.post(`${backendurl}/skills`, skill, {
        withCredentials: true,
      });
    },
    onSuccess: () => {
      refetch();
      resetForm();
    },
    onError: (error) => {
      console.error("Error adding skill:", error);
    },
  });

  const deleteSkillMutation = useMutation({
    mutationFn: async (skillId: number) => {
      return await axios.delete(`${backendurl}/skills/${skillId}`, {
        withCredentials: true,
      });
    },
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.error("Error deleting skill:", error);
    },
  });

  const handleTechSelect = (techName: string) => {
    const selected = techOptions?.find((tech) => tech.name === techName);
    if (selected) {
      setNewSkill({
        id: Date.now(),
        name: selected.name,
        imageUrl: selected.imageUrl,
      });
    }
    setSelectedTech(techName);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewSkill((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.name || !newSkill.imageUrl) return;
    addSkillMutation.mutate({ ...newSkill, id: Date.now() });
  };

  const resetForm = () => {
    setNewSkill({ id: 0, name: "", imageUrl: "" });
    setSelectedTech(null);
  };

  if (skillsLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">About Me</h1>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Select or Add a Skill</h1>

      <Button onClick={() => refetch()} disabled={skillsLoading}>
        Fetch My Skills
      </Button>

      <div className="max-w-xs">
        <Select onValueChange={handleTechSelect} value={selectedTech || ""}>
          <SelectTrigger>
            <SelectValue placeholder="Select a technology" />
          </SelectTrigger>
          <SelectContent>
            {techOptions.map((tech) => (
              <SelectItem key={tech.name} value={tech.name}>
                {tech.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card className="md:max-w-[60vw] w-full">
        <CardHeader>
          <CardTitle>Add New Skill</CardTitle>
          <CardDescription>
            Select an existing tech or add a custom one below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Skill Name</Label>
              <Input
                id="name"
                name="name"
                value={newSkill.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                name="imageUrl"
                value={newSkill.imageUrl}
                onChange={handleInputChange}
                required
              />
            </div>
            <CardFooter className="gap-3">
              <Button type="submit" disabled={addSkillMutation.isPending}>
                {addSkillMutation.isPending ? "Submitting..." : "Add Skill"}
              </Button>
              <Button type="button" variant="secondary" onClick={resetForm}>
                Reset
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold">Skills List</h2>

      {skillsLoading && <p>Loading skills...</p>}
      {skillsError && (
        <p className="text-red-500">Failed to load skills. Please try again.</p>
      )}

      {skills && skills.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
          {skills.map(
            (skill: { imageUrl: string; name: string; id: number }) => (
              <Card key={skill.id}>
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <img
                    src={skill.imageUrl}
                    alt={skill.name}
                    className="w-16 h-16 object-contain mb-4"
                  />
                  <h3 className="text-lg font-semibold">{skill.name}</h3>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteSkillMutation.mutate(skill.id)}
                  >
                    {deleteSkillMutation.isPending ? "Deleting..." : "Delete"}
                  </Button>
                </CardContent>
              </Card>
            )
          )}
        </div>
      ) : (
        <p>No skills found. Add a skill to get started!</p>
      )}
    </div>
  );
}
