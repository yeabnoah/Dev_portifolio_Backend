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
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import authClient from "@/lib/auth-client";

interface Testimonial {
  id: number;
  name: string;
  testimony: string;
  orgName: string;
  role: string;
  imageUrl: string;
  userId: string;
}

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL!;

export default function TestimonialsPage() {
  const queryClient = useQueryClient();
  const session = authClient.useSession();
  const [editingTestimonialId, setEditingTestimonialId] = useState<
    number | null
  >(null);
  const [newTestimonial, setNewTestimonial] = useState<Testimonial>({
    id: 0,
    name: "",
    testimony: "",
    orgName: "",
    role: "",
    imageUrl: "",
    userId: session.data?.user.id ?? "",
  });

  const {
    data: testimonials,
    isLoading,
    isError,
    refetch,
  } = useQuery<Testimonial[]>({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const response = await axios.get(
        `${backendUrl}/public/testimony/${session.data?.user.id}`,
        { withCredentials: true }
      );
      return response.data;
    },
    enabled: false,
  });

  const saveTestimonialMutation = useMutation({
    mutationFn: async (testimonial: Testimonial) => {
      const { id, ...restTestimonial } = testimonial;

      if (id) {
        return axios.patch(`${backendUrl}/testimony/${id}`, restTestimonial, {
          withCredentials: true,
        });
      } else {
        return axios.post(`${backendUrl}/testimony`, restTestimonial, {
          withCredentials: true,
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      resetForm();
    },
  });

  const deleteTestimonialMutation = useMutation({
    mutationFn: async (id: number) => {
      return axios.delete(`${backendUrl}/testimony/${id}`, {
        withCredentials: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewTestimonial((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewTestimonial((prev) => ({
        ...prev,
        imageUrl: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveTestimonialMutation.mutate(newTestimonial);
  };

  const handleEdit = (testimonial: Testimonial) => {
    setNewTestimonial(testimonial);
    setEditingTestimonialId(testimonial.id);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this testimonial?")) {
      deleteTestimonialMutation.mutate(id);
    }
  };

  const resetForm = () => {
    setNewTestimonial({
      id: 0,
      name: "",
      testimony: "",
      orgName: "",
      role: "",
      imageUrl: "",
      userId: session.data?.user.id ?? "",
    });
    setEditingTestimonialId(null);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Testimonials</h1>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Manage Testimonials</h1>

      <Button onClick={() => refetch()} disabled={isLoading}>
        Fetch My Content
      </Button>

      <Card className="md:max-w-[60vw] w-full">
        <CardHeader>
          <CardTitle>
            {editingTestimonialId ? "Edit Testimonial" : "Add Testimonial"}
          </CardTitle>
          <CardDescription>
            {editingTestimonialId
              ? "Update the testimonial details"
              : "Add a new testimonial"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={newTestimonial.name}
                onChange={handleInputChange}
                required
                className="py-1 px-2"
              />
            </div>

            <div>
              <Label htmlFor="testimony">Testimony</Label>
              <Textarea
                id="testimony"
                name="testimony"
                value={newTestimonial.testimony}
                onChange={handleInputChange}
                required
                className="py-1 px-2"
              />
            </div>

            <div>
              <Label htmlFor="orgName">Organization</Label>
              <Input
                id="orgName"
                name="orgName"
                value={newTestimonial.orgName}
                onChange={handleInputChange}
                required
                className="py-1 px-2"
              />
            </div>

            <div>
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                name="role"
                value={newTestimonial.role}
                onChange={handleInputChange}
                required
                className="py-1 px-2"
              />
            </div>

            <div>
              <Label htmlFor="imageUrl">Image Upload</Label>
              <Input
                type="file"
                onChange={handleFileChange}
                className="py-1 px-2"
              />
            </div>

            {newTestimonial.imageUrl && (
              <div className="mt-2">
                <img
                  src={newTestimonial.imageUrl}
                  alt="Image Preview"
                  className="w-32 h-32 object-cover rounded-full"
                />
              </div>
            )}

            <CardFooter className="gap-3">
              <Button
                type="submit"
                disabled={saveTestimonialMutation.isPending}
              >
                {editingTestimonialId ? "Update" : "Add"}
              </Button>
              {editingTestimonialId && (
                <Button type="button" variant="secondary" onClick={resetForm}>
                  Cancel Edit
                </Button>
              )}
            </CardFooter>
          </form>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {testimonials?.map((testimonial) => (
          <Card key={testimonial.id}>
            <CardHeader>
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.imageUrl}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <CardTitle>{testimonial.name}</CardTitle>
                  <CardDescription>
                    {testimonial.role} at {testimonial.orgName}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p>{testimonial.testimony}</p>
            </CardContent>
            <CardFooter className="gap-3">
              <Button onClick={() => handleEdit(testimonial)}>Edit</Button>
              <Button
                variant="destructive"
                onClick={() => handleDelete(testimonial.id)}
              >
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
