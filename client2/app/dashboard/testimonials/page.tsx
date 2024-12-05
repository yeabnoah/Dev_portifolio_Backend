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

interface TestimonyInterface {
  id: number;
  name: string;
  testimony: string;
  orgName: string;
  role: string;
  imageUrl: string;
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<TestimonyInterface[]>([
    {
      id: 1,
      name: "John Doe",
      testimony: "Great work! Very professional and efficient.",
      orgName: "Tech Corp",
      role: "Software Engineer",
      imageUrl: "/placeholder.svg?height=100&width=100",
    },
  ]);

  const [newTestimonial, setNewTestimonial] = useState<TestimonyInterface>({
    id: 0,
    name: "",
    testimony: "",
    orgName: "",
    role: "",
    imageUrl: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewTestimonial((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const testimonial: TestimonyInterface = {
      ...newTestimonial,
      id: Date.now(),
    };
    setTestimonials((prev) => [...prev, testimonial]);
    setNewTestimonial({
      id: 0,
      name: "",
      testimony: "",
      orgName: "",
      role: "",
      imageUrl: "",
    });
    // toast({
    //   title: "Testimonial Added",
    //   description: "The new testimonial has been successfully added.",
    // });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Testimonials</h1>

      <Card>
        <CardHeader>
          <CardTitle>Add New Testimonial</CardTitle>
          <CardDescription>Add a new client testimonial</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={newTestimonial.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="testimony">Testimony</Label>
              <Textarea
                id="testimony"
                name="testimony"
                value={newTestimonial.testimony}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="orgName">Organization</Label>
              <Input
                id="orgName"
                name="orgName"
                value={newTestimonial.orgName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                name="role"
                value={newTestimonial.role}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                name="imageUrl"
                value={newTestimonial.imageUrl}
                onChange={handleInputChange}
                required
              />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmit}>Add Testimonial</Button>
        </CardFooter>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id}>
            <CardHeader>
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.imageUrl}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                  <CardDescription>
                    {testimonial.role} at {testimonial.orgName}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {testimonial.testimony}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
