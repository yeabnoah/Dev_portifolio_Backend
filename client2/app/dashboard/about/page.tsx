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

interface AboutInterface {
  Description: string;
  about: string;
  ImageUrl: string;
}

export default function AboutPage() {
  const [aboutInfo, setAboutInfo] = useState<AboutInterface>({
    Description:
      "A passionate developer with a love for creating innovative solutions.",
    about: "I am a full-stack developer with 5 years of experience...",
    ImageUrl: "/placeholder.svg?height=200&width=200",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setAboutInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // // Here you would typically send this data to your backend
    // toast({
    //   title: "About Information Updated",
    //   description: "Your about information has been successfully updated.",
    // });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">About Me</h1>

      <Card>
        <CardHeader>
          <CardTitle>Edit About Information</CardTitle>
          <CardDescription>
            Update your personal information and bio
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="Description">Short Description</Label>
              <Input
                id="Description"
                name="Description"
                value={aboutInfo.Description}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="about">About Me</Label>
              <Textarea
                id="about"
                name="about"
                value={aboutInfo.about}
                onChange={handleInputChange}
                required
                rows={6}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ImageUrl">Profile Image URL</Label>
              <Input
                id="ImageUrl"
                name="ImageUrl"
                value={aboutInfo.ImageUrl}
                onChange={handleInputChange}
                required
              />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmit}>Update About Information</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row gap-6">
          <img
            src={aboutInfo.ImageUrl}
            alt="Profile"
            className="w-48 h-48 object-cover rounded-full"
          />
          <div>
            <p className="text-lg font-semibold mb-2">
              {aboutInfo.Description}
            </p>
            <p className="text-muted-foreground">{aboutInfo.about}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
