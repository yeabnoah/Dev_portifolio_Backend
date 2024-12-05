"use client";

import { useState } from "react";
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
// import { toast } from "@/components/ui/use-toast";

interface SkillInterface {
  id: number;
  name: string;
  imageUrl: string;
}

export default function SkillsPage() {
  const [skills, setSkills] = useState<SkillInterface[]>([
    {
      id: 1,
      name: "React",
      imageUrl: "/placeholder.svg?height=100&width=100",
    },
  ]);

  const [newSkill, setNewSkill] = useState<SkillInterface>({
    id: 0,
    name: "",
    imageUrl: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewSkill((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const skill: SkillInterface = {
      ...newSkill,
      id: Date.now(),
    };
    setSkills((prev) => [...prev, skill]);
    setNewSkill({ id: 0, name: "", imageUrl: "" });
    // toast({
    //   title: "Skill Added",
    //   description: "The new skill has been successfully added.",
    // });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Skills</h1>

      <Card>
        <CardHeader>
          <CardTitle>Add New Skill</CardTitle>
          <CardDescription>Add a new skill to your portfolio</CardDescription>
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
          </form>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmit}>Add Skill</Button>
        </CardFooter>
      </Card>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {skills.map((skill) => (
          <Card key={skill.id}>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <img
                src={skill.imageUrl}
                alt={skill.name}
                className="w-16 h-16 object-contain mb-4"
              />
              <h3 className="text-lg font-semibold">{skill.name}</h3>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
