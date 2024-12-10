"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import linkSchema from "@/validation/links";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import authClient from "@/lib/auth-client";
import { FaLinkedin, FaTelegram, FaGithub, FaTwitter } from "react-icons/fa";
import { useEffect } from "react";

const LinksPage = () => {
  type LinkType = z.infer<typeof linkSchema>;
  const backendurl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const session = authClient.useSession();
  const queryClient = useQueryClient();

  const {
    data: fetchedLinks,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["links", session.data?.user.id],
    queryFn: async () => {
      if (!session.data?.user.id) return;
      const response = await axios.get(
        `${backendurl}/public/links/${session.data.user.id}`,
        { withCredentials: true }
      );
      return response.data;
    },
    enabled: !!session.data?.user.id,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LinkType>({
    resolver: zodResolver(linkSchema),
    defaultValues: {
      linkedIn: "",
      telegram: "",
      github: "",
      x: "",
    },
  });

  useEffect(() => {
    if (fetchedLinks?.links) {
      reset(fetchedLinks.links);
    }
  }, [fetchedLinks, reset]);

  const mutation = useMutation({
    mutationFn: async (data: LinkType) => {
      const url = `${backendurl}/links`;
      if (fetchedLinks) {
        await axios.patch(url, data, { withCredentials: true });
      } else {
        await axios.post(url, data, { withCredentials: true });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["links", session.data?.user.id],
      });
    },
  });

  const onSubmit: SubmitHandler<LinkType> = async (data) => {
    try {
      await mutation.mutateAsync(data);
    } catch (err) {
      console.error("Submission error:", err);
    }
  };

  const SocialLinkInput = ({
    label,
    name,
    placeholder,
  }: {
    label: string;
    name: keyof LinkType;
    placeholder: string;
  }) => (
    <Label>
      {label}
      <Input
        className={`my-2 ${errors[name] && "border-red-500"}`}
        type="text"
        placeholder={placeholder}
        {...register(name)}
      />
      {errors[name] && (
        <span className="text-red-500">{errors[name]?.message}</span>
      )}
    </Label>
  );

  const renderLinkPreview = (
    label: string,
    url: string,
    Icon: React.ComponentType
  ) => {
    if (!url) return null;
    return (
      <div className="flex items-center space-x-2">
        <Icon />
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600"
        >
          {label}
        </a>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Social Links</h1>

      <Button onClick={() => refetch()} disabled={isLoading}>
        Fetch My Content
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>
            {fetchedLinks ? "Edit Social Links" : "Add Social Links"}
          </CardTitle>
          <CardDescription>
            {fetchedLinks
              ? "Update your social media and contact links."
              : "Add your social media and contact links."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading && <p>Loading...</p>}
          {isError && <p className="text-red-500">Error: {error.message}</p>}
          <form
            className="my-5 flex flex-col gap-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <SocialLinkInput
              label="LinkedIn"
              name="linkedIn"
              placeholder="LinkedIn"
            />
            <SocialLinkInput
              label="Telegram"
              name="telegram"
              placeholder="Telegram"
            />
            <SocialLinkInput
              label="GitHub"
              name="github"
              placeholder="GitHub"
            />
            <SocialLinkInput label="X" name="x" placeholder="X" />

            <Button
              className="mt-5"
              type="submit"
              disabled={mutation.isPending}
            >
              {mutation.isPending
                ? "Saving..."
                : fetchedLinks
                ? "Update Links"
                : "Create Links"}
            </Button>
          </form>

          <div className="mt-6 space-y-4">
            <h2 className="text-lg font-semibold">Preview Links</h2>
            <div className="flex flex-row gap-5 items-start">
              {renderLinkPreview(
                "LinkedIn",
                fetchedLinks?.links?.linkedIn,
                FaLinkedin
              )}
              {renderLinkPreview(
                "Telegram",
                fetchedLinks?.links?.telegram,
                FaTelegram
              )}
              {renderLinkPreview(
                "GitHub",
                fetchedLinks?.links?.github,
                FaGithub
              )}
              {renderLinkPreview("X", fetchedLinks?.links?.x, FaTwitter)}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LinksPage;
