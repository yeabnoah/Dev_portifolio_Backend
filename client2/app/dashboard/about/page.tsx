"use client";
import { Suspense, useState, useEffect } from "react";
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
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import authClient from "@/lib/auth-client";
import Image from "next/image";

interface AboutInterface {
  mainRole?: string;
  moto?: string;
  word?: string;
  homeImageUrl?: string;
  aboutImageUrl?: string;
  aboutDescription?: string;
}

export default function AboutPage() {
  const session = authClient.useSession();
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL!;
  const cloudinaryUploadUrl = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL!;
  const cloudinaryUploadPreset =
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;

  // State for form data and image uploads
  const [aboutInfo, setAboutInfo] = useState<AboutInterface>({
    mainRole: "",
    moto: "",
    word: "Developer",
    homeImageUrl: "",
    aboutImageUrl: "",
    aboutDescription: "",
  });

  const [selectedHomeImage, setSelectedHomeImage] = useState<File | null>(null);
  const [selectedAboutImage, setSelectedAboutImage] = useState<File | null>(
    null
  );

  const userInfo = useQuery<AboutInterface, Error>({
    queryKey: ["userInfo"],
    queryFn: async () => {
      const response = await axios.get(
        `${backendUrl}/public/info/${session.data?.user.id}`
      );
      return response.data;
    },
    enabled: !!session.data?.user.id,
  });

  useEffect(() => {
    if (userInfo.data) {
      setAboutInfo(userInfo.data);
    }
  }, [userInfo.data]);

  const updateInfoMutation = useMutation({
    mutationFn: async (data: AboutInterface) => {
      const homeImageUrl = selectedHomeImage
        ? await uploadToCloudinary(selectedHomeImage)
        : data.homeImageUrl;

      const aboutImageUrl = selectedAboutImage
        ? await uploadToCloudinary(selectedAboutImage)
        : data.aboutImageUrl;

      const updatedData = { ...data, homeImageUrl, aboutImageUrl };

      const response = await axios.patch(`${backendUrl}/info`, updatedData, {
        withCredentials: true,
      });
      return response.data;
    },
    onSuccess: () => {
      userInfo.refetch();
      resetImages();
    },
    onError: (error) => {
      console.error("Update failed:", error);
    },
  });

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", cloudinaryUploadPreset);

    const response = await axios.post(cloudinaryUploadUrl, formData);
    return response.data.secure_url;
  };

  const resetImages = () => {
    setSelectedHomeImage(null);
    setSelectedAboutImage(null);
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setAboutInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "homeImage" | "aboutImage"
  ) => {
    const file = e.target.files?.[0] || null;
    if (type === "homeImage") setSelectedHomeImage(file);
    if (type === "aboutImage") setSelectedAboutImage(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateInfoMutation.mutate(aboutInfo);
  };

  if (userInfo.isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">About Me</h1>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">About Me</h1>

      <Button onClick={() => userInfo.refetch()} disabled={userInfo.isLoading}>
        Fetch My Content
      </Button>
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
              <Label htmlFor="mainRole">Main Role</Label>
              <Input
                id="mainRole"
                name="mainRole"
                value={aboutInfo.mainRole || ""}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="moto">Moto</Label>
              <Input
                id="moto"
                name="moto"
                value={aboutInfo.moto || ""}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="word">Word</Label>
              <select
                id="word"
                name="word"
                value={aboutInfo.word || "Developer"}
                onChange={handleInputChange}
                className="border rounded-md px-3 py-2"
              >
                <option value="Developer">Developer</option>
                <option value="Engineer">Engineer</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="aboutDescription">About Description</Label>
              <Textarea
                id="aboutDescription"
                name="aboutDescription"
                value={aboutInfo.aboutDescription || ""}
                onChange={handleInputChange}
                required
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="homeImageUrl">Home Image</Label>
              <Input
                type="file"
                onChange={(e) => handleFileChange(e, "homeImage")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="aboutImageUrl">About Image</Label>
              <Input
                type="file"
                onChange={(e) => handleFileChange(e, "aboutImage")}
              />
            </div>
            <CardFooter>
              <Button type="submit" disabled={updateInfoMutation.isPending}>
                {updateInfoMutation.isPending
                  ? "Updating..."
                  : "Update About Information"}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>

      {/* Preview Section */}
      <Suspense fallback={<div>Loading preview...</div>}>
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              <strong>Main Role:</strong> {aboutInfo.mainRole}
            </p>
            <p>
              <strong>Moto:</strong> {aboutInfo.moto}
            </p>
            <p>
              <strong>Word:</strong> {aboutInfo.word}
            </p>
            <p>
              <strong>About Description:</strong> {aboutInfo.aboutDescription}
            </p>
            {aboutInfo.homeImageUrl && (
              <div>
                <strong>Home Image:</strong>
                <Image
                  src={aboutInfo.homeImageUrl}
                  alt="Home Image"
                  width={300}
                  height={200}
                  className="rounded-md mt-2"
                />
              </div>
            )}
            {aboutInfo.aboutImageUrl && (
              <div>
                <strong>About Image:</strong>
                <Image
                  src={aboutInfo.aboutImageUrl}
                  alt="About Image"
                  width={300}
                  height={200}
                  className="rounded-md mt-2"
                />
              </div>
            )}
          </CardContent>
        </Card>
      </Suspense>
    </div>
  );
}
