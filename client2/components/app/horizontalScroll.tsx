"use client";

import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";
import { FaPython, FaReact, FaNode, FaJs } from "react-icons/fa";
import { SiTypescript, SiNextdotjs, SiTailwindcss, SiMongodb } from "react-icons/si";

export function InfiniteMovingCardsDemo() {
    return (
        <div className=" rounded-md flex flex-col antialiased  bg-transparent dark:bg-transparent dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
            <InfiniteMovingCards
                items={testimonials}
                direction="right"
                speed="slow"
                className="w-full"
                pauseOnHover={true}
            />
        </div>
    );
}

const testimonials = [
    {
        quote: FaPython,
        name: "Python",
        title: "Programming Language",
    },
    {
        quote: FaReact,
        name: "React",
        title: "Frontend Library",
    },
    {
        quote: FaNode,
        name: "Node.js",
        title: "Runtime Environment",
    },
    {
        quote: SiTypescript,
        name: "TypeScript",
        title: "Programming Language",
    },
    {
        quote: SiNextdotjs,
        name: "Next.js",
        title: "Full-stack Framework",
    },
    {
        quote: FaJs,
        name: "JavaScript",
        title: "Programming Language",
    },
    {
        quote: SiTailwindcss,
        name: "Tailwind CSS",
        title: "CSS Framework",
    },
    {
        quote: SiMongodb,
        name: "MongoDB",
        title: "Database",
    },
];
