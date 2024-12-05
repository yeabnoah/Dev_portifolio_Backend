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
import { Linkedin, Twitter, Github, Send, Globe } from "lucide-react";

interface LinkInterface {
  linkedIn: string;
  x: string;
  github: string;
  telegram: string;
  website: string;
}

export default function LinksPage() {
  const [links, setLinks] = useState<LinkInterface>({
    linkedIn: "https://linkedin.com/in/johndoe",
    x: "https://twitter.com/johndoe",
    github: "https://github.com/johndoe",
    telegram: "https://t.me/johndoe",
    website: "https://johndoe.com",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLinks((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send this data to your backend
    // toast({
    //   title: "Links Updated",
    //   description: "Your social links have been successfully updated.",
    // });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Social Links</h1>

      <Card>
        <CardHeader>
          <CardTitle>Edit Social Links</CardTitle>
          <CardDescription>
            Update your social media and contact links
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="linkedIn">LinkedIn</Label>
              <Input
                id="linkedIn"
                name="linkedIn"
                value={links.linkedIn}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="x">X (Twitter)</Label>
              <Input
                id="x"
                name="x"
                value={links.x}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="github">GitHub</Label>
              <Input
                id="github"
                name="github"
                value={links.github}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="telegram">Telegram</Label>
              <Input
                id="telegram"
                name="telegram"
                value={links.telegram}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Personal Website</Label>
              <Input
                id="website"
                name="website"
                value={links.website}
                onChange={handleInputChange}
                required
              />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmit}>Update Links</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <a
              href={links.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-500 hover:underline"
            >
              <Linkedin size={20} />
              LinkedIn
            </a>
            <a
              href={links.x}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-500 hover:underline"
            >
              <Twitter size={20} />X (Twitter)
            </a>
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-500 hover:underline"
            >
              <Github size={20} />
              GitHub
            </a>
            <a
              href={links.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-500 hover:underline"
            >
              <Send size={20} />
              Telegram
            </a>
            <a
              href={links.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-500 hover:underline"
            >
              <Globe size={20} />
              Website
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
