"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import authClient from "@/lib/auth-client";

interface LinkInterface {
  id?: string;
  linkedIn: string;
  x: string;
  github: string;
  telegram: string;
  website: string;
}

const LinksPage = () => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const session = authClient.useSession();

  const [links, setLinks] = useState<LinkInterface>({
    linkedIn: "",
    x: "",
    github: "",
    telegram: "",
    website: "",
  });

  const fetchLinks = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/public/links/${session.data?.user.id}`,
        { withCredentials: true }
      );
      return {
        id: data.id || "",
        linkedIn: data.linkedin || "",
        x: data.x || "",
        github: data.github || "",
        telegram: data.telegram || "",
        website: data.website || "",
      };
    } catch (error) {
      console.error("Error fetching links:", error);
      return {
        linkedIn: "",
        x: "",
        github: "",
        telegram: "",
        website: "",
      };
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["links"],
    queryFn: fetchLinks,
    enabled: !!session.data,
  });

  const createLinks = async (newLinks: LinkInterface) => {
    const { id, ...newLinkFinal } = newLinks;
    const res = await axios.post(`${backendUrl}/links`, newLinkFinal, {
      withCredentials: true,
    });
    return res.data;
  };

  const updateLinks = async (updatedLinks: LinkInterface) => {
    const { id, ...updatedLinksFinal } = updatedLinks;
    const res = await axios.patch(
      `${backendUrl}/links/${updatedLinks.id}`,
      updatedLinksFinal,
      { withCredentials: true }
    );
    return res.data;
  };

  const updateMutation = useMutation({
    mutationFn: (links: LinkInterface) =>
      links.id ? updateLinks(links) : createLinks(links),
    onSuccess: () => {
      alert("Links updated successfully!");
    },
    onError: (error) => {
      console.error("Error updating links:", error);
      alert("Failed to update links");
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLinks((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (session.data) {
      const userId = session.data.user.id;
      updateMutation.mutate({ ...links, id: links.id || userId });
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading links</div>;

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
            {Object.keys(links)
              .filter((key) => key !== "id")
              .map((key) => (
                <div key={key} className="space-y-2">
                  <Label htmlFor={key}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </Label>
                  <Input
                    id={key}
                    name={key}
                    value={links[key as keyof LinkInterface]}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              ))}
            <Button type="submit" disabled={updateMutation.isPending}>
              {updateMutation.isPending ? "Updating..." : "Update Links"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-xl font-semibold">Links</h2>
        <ul>
          {Object.entries(data || {})
            .filter(([key]) => key !== "id")
            .map(([key, value]) => (
              <li key={key}>
                {key.charAt(0).toUpperCase() + key.slice(1)}:{" "}
                {value || "Not available"}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default LinksPage;
