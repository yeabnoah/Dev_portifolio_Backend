"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import authClient from "@/lib/auth-client";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function ProfilePage() {
  const session = authClient.useSession();
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL!;
  const cloudinaryUploadUrl = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL!;
  const cloudinaryUploadPreset =
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;

  const [profile, setProfile] = useState({
    image: "/placeholder.svg?height=100&width=100",
    name: "",
    email: "",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const {
    data: userInfo,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["userData"],
    queryFn: async () => {
      const response = await axios.get(`${backendUrl}/user`, {
        withCredentials: true,
      });
      return response.data;
    },
  });

  useEffect(() => {
    if (userInfo) {
      setProfile({
        image: userInfo.image || "/placeholder.svg?height=100&width=100",
        name: userInfo.name || "",
        email: userInfo.email || "",
      });
      setPreviewUrl(userInfo.image || "/placeholder.svg?height=100&width=100");
    }
  }, [userInfo]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const {
    mutate: updateUser,
    isPending,
    isError: updateError,
    error: updateErrorMessage,
    isSuccess,
  } = useMutation({
    mutationKey: ["updateUser"],
    mutationFn: async () => {
      let imageUrl = profile.image;

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

      const response = await axios.patch(
        `${backendUrl}/user`,
        { ...profile, image: imageUrl },
        { withCredentials: true }
      );

      return response.data;
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">User Profile</h1>

      {isLoading && <p>Loading...</p>}
      {isError && <p className="text-red-500">Error: {error.message}</p>}

      {userInfo && (
        <Card>
          <CardHeader>
            <CardTitle>Edit Profile {session.data?.user.name}</CardTitle>
            <CardDescription>Update your personal information</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage
                    src={previewUrl || profile.image}
                    alt={profile.name}
                  />
                  <AvatarFallback>
                    {profile.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <input type="file" onChange={handleFileChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={profile.email}
                  onChange={handleChange}
                />
              </div>
              {updateError && (
                <p className="text-red-500">
                  Error updating profile: {updateErrorMessage.message}
                </p>
              )}
              {isSuccess && (
                <p className="text-green-500">Profile updated successfully!</p>
              )}
            </form>
          </CardContent>
          <CardFooter>
            <Button type="submit" onClick={handleSubmit} disabled={isPending}>
              {isPending ? "Updating..." : "Update Profile"}
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
