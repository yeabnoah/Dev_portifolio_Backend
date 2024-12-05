"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import Link from "next/link";

export function ThreeDCardDemo() {
    return (
        <CardContainer className="inter-var">
            <CardBody className="bg-background border-foreground/20 shadow-sm shadow-foreground/20 dark:shadow-foreground/5 relative rounded-md group/card dark:hover:shadow-2xl dark:hover:shadow-white/5 dark:bg-black dark:border-white/[0.2] w-auto sm:w-[19rem] h-auto p-4 border">

                <CardItem
                    translateZ="50"
                    className="text-xl font-bold rounded-md text-foreground dark:text-white"
                >
                    Project Name
                </CardItem>

                <CardItem translateZ="100" className="w-full mt-4 rounded-md">
                    <Image
                        src="/telegram.jpg"
                        height="1000"
                        width="1000"
                        className="h-36 w-full object-cover rounded-md group-hover/card:shadow-xl"
                        alt="thumbnail"
                    />
                </CardItem>

                <CardItem
                    as="p"
                    translateZ="60"
                    className="text-foreground text-xs max-w-xs mt-3 dark:text-foreground"
                >
                    A brief description of the project and its main features. This is where you can highlight the key aspects of your work.
                </CardItem>

                <CardItem
                    translateZ="40"
                    className="flex gap-1.5 mt-3"
                >
                    {['React', 'TypeScript', 'Tailwind CSS'].map((tech) => (
                        <span key={tech} className="px-1.5 py-0.5 text-xs font-medium bg-foreground/90 text-white dark:text-white dark:bg-background rounded-md">
                            {tech}
                        </span>
                    ))}
                </CardItem>

                <div className="flex justify-between items-center flex-row my-2">
                    <CardItem
                        translateZ={20}
                        as={Link}
                        href="https://github.com/yourusername/project"
                        target="__blank"
                        className="px-3 py-1.5 rounded-md text-xs font-normal dark:text-white"
                    >
                        View Code →
                    </CardItem>
                    <CardItem
                        translateZ={20}
                        as={Link}
                        href="https://your-live-preview-url.com"
                        target="__blank"
                        className="px-3 py-1.5 mt-2 rounded-md bg-foreground/90 text-white hover:bg-foreground/20 dark:bg-background dark:text-white text-xs font-bold"
                    >
                        Live Preview
                    </CardItem>
                </div>
            </CardBody>
        </CardContainer>
    );
}
