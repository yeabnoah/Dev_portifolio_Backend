"use client";
import React from "react";
import Image from "next/image";
import { TracingBeam } from "@/components/ui/tracing-beam";

export default function AboutInfo() {
    return (
        <div className="py-12 px-4 sm:px-6">
            <div className="max-w-6xl  mx-auto">
                <div className="bg-background/50 backdrop-blur-xl rounded-2xl p-2 sm:p-4 shadow-lg">
                    <div className="flex flex-col md:flex-row gap-5 items-center md:items-start">
                        <div className="flex-shrink-0">
                            <Image
                                src={'/telegram.jpg?height=40;width=40'}
                                alt="Profile picture"
                                height={280}
                                width={280}
                                className="rounded-2xl object-cover shadow-md hover:shadow-xl transition-shadow duration-300 border border-foreground/10"
                                priority
                            />
                        </div>

                        <div className="flex-1 space-y-2">
                            <p className="text-sm md:text-sm leading-relaxed text-muted-foreground">
                                Sit duis est minim proident non nisi velit non consectetur. Esse
                                adipisicing laboris consectetur enim ipsum reprehenderit eu deserunt
                                Lorem ut aliqua anim do. Duis cupidatat qui irure cupidatat incididunt
                                incididunt enim magna id est qui sunt fugiat. Laboris do duis pariatur
                                fugiat Lorem aute sit ullamco. Qui deserunt non reprehenderit dolore
                                nisi velit exercitation Lorem qui do enim culpa. Aliqua eiusmod in
                                occaecat reprehenderit laborum nostrud fugiat voluptate do Lorem culpa
                                officia sint labore. Tempor consectetur excepteur ut fugiat veniam
                                commodo et labore dolore commodo pariatur.nisi velit exercitation Lorem qui do enim culpa. Aliqua eiusmod in
                                occaecat reprehenderit laborum nostrud fugiat voluptate do Lorem culpa
                                officia sint labore. Tempor consectetur excepteur ut fugiat veniam
                                commodo et labore dolore commodo pariatur.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const dummyContent = [
    {
        title: "Lorem Ipsum Dolor Sit Amet",
        description: (
            <>
                <p className=" text-base">
                    Sit duis est minim proident non nisi velit non consectetur. Esse
                    adipisicing laboris consectetur enim ipsum reprehenderit eu deserunt
                    Lorem ut aliqua anim do. Duis cupidatat qui irure cupidatat incididunt
                    incididunt enim magna id est qui sunt fugiat. Laboris do duis pariatur
                    fugiat Lorem aute sit ullamco. Qui deserunt non reprehenderit dolore
                    nisi velit exercitation Lorem qui do enim culpa. Aliqua eiusmod in
                    occaecat reprehenderit laborum nostrud fugiat voluptate do Lorem culpa
                    officia sint labore. Tempor consectetur excepteur ut fugiat veniam
                    commodo et labore dolore commodo pariatur.
                </p>
                <p className=" text-base">
                    Dolor minim irure ut Lorem proident. Ipsum do pariatur est ad ad
                    veniam in commodo id reprehenderit adipisicing. Proident duis
                    exercitation ad quis ex cupidatat cupidatat occaecat adipisicing.
                </p>
                <p className=" text-base">
                    Tempor quis dolor veniam quis dolor. Sit reprehenderit eiusmod
                    reprehenderit deserunt amet laborum consequat adipisicing officia qui
                    irure id sint adipisicing. Adipisicing fugiat aliqua nulla nostrud.
                    Amet culpa officia aliquip deserunt veniam deserunt officia
                    adipisicing aliquip proident officia sunt.
                </p>
            </>
        ),
        badge: "React",
        image:
            "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=3540&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    }
];
