
"use client";
import React from "react";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import { BentoGridDemo } from "@/components/app/bentoGrid";
// import { ThreeDCardDemo } from "@/components/app/cardAnimated";
import HomeComponent from "@/components/app/homeComponent";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { TracingBeam } from "@/components/ui/tracing-beam";

export default function Home() {
  return (
    <div className=" min-h-screen flex items-center justify-center">
      <HomeComponent />
    </div>
  );
}
