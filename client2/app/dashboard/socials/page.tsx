"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { toast } from "@/components/ui/use-toast"

export default function SocialsPage() {
  const [socials, setSocials] = useState({
    twitter: "https://twitter.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
    github: "https://github.com/johndoe",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSocials({
      ...socials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send this data to your backend
    // toast({
    //   title: "Social Links Updated",
    //   description: "Your social media links have been successfully updated.",
    // });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Social Links</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.entries(socials).map(([key, value]) => (
          <div key={key} className="space-y-2">
            <Label htmlFor={key} className="capitalize">
              {key}
            </Label>
            <Input id={key} name={key} value={value} onChange={handleChange} />
          </div>
        ))}
        <Button type="submit">Update Social Links</Button>
      </form>
    </div>
  );
}
