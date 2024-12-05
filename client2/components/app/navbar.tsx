'use client'

import { BookAIcon, FileIcon, Home, Info, InfoIcon, LayoutList, Monitor, ProjectorIcon, Send } from "lucide-react"
import Link from "next/link"
import ThemeToggle from "./theme-toggle"
import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
    IconBrandGithub,
    IconBrandX,
    IconExchange,
    IconHome,
    IconNewSection,
    IconTerminal2,
} from "@tabler/icons-react";
import Image from "next/image";
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { usePathname } from 'next/navigation'
import { ReactNode } from "react";

export default function NavComponent({ variant = 'desktop' }: { variant?: 'mobile' | 'desktop' }) {

    const [mounted, setMounted] = useState(false);
    const pathname = usePathname()

    useEffect(() => {
        setMounted(true);
    }, []);

    const links = [
        {
            title: "Home",
            icon: (
                <IconHome className="h-full w-full" />
            ),
            href: "/",
        },

        {
            title: "About",
            icon: (
                <InfoIcon className="h-full w-full" />
            ),
            href: "/about",
        },
        {
            title: "Projects",
            icon: (
                <ProjectorIcon className="h-full w-full" />
            ),
            href: "/projects",
        },
        {
            title: "Blog",
            icon: (
                <BookAIcon className="h-full w-full" />
            ),
            href: "/blog",
        },
        {
            title: "Resume",
            icon: (
                <FileIcon className="h-full w-full" />
            ),
            href: "/resume",
        },
        {
            title: "Theme",
            icon: mounted ? <ThemeToggle /> : null,
            href: "#",
        }
    ];

    if (variant === 'mobile') {
        return (
            <nav className="w-full bg-white/80 dark:bg-black/80 backdrop-blur-sm border-t border-foreground/10">
                <div className="flex justify-around items-center py-2 px-4">
                    {links.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.title}
                                href={item.href}
                                className="flex flex-col items-center gap-0.5"
                            >
                                <div className={`h-5 w-5 sm:h-6 sm:w-6 flex items-center justify-center ${isActive ? 'text-teal-500 dark:text-teal-400' : 'text-foreground dark:text-foreground/80'}`}>
                                    {item.icon && React.cloneElement(item.icon, { className: isActive ? 'text-teal-500 dark:text-teal-400' : 'text-foreground dark:text-foreground/80' })}
                                </div>
                                <span className={`text-[10px] sm:text-xs ${isActive ? 'text-teal-500 dark:text-teal-400' : 'text-foreground/80'}`}>
                                    {item.title}
                                </span>
                            </Link>
                        )
                    })}
                </div>
            </nav>
        );
    }

    return (
        <nav className="flex flex-col items-center gap-8 py-4 px-2 rounded-full backdrop-blur-sm">
            {links.map((item) => {
                const isActive = pathname === item.href
                return (
                    <Link
                        key={item.title}
                        href={item.href}
                        className={`flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-teal-500 dark:text-teal-400' : 'text-foreground/60 hover:text-foreground'}`}
                    >
                        <div className={`h-5 w-5 md:h-6 md:w-6 flex items-center justify-center ${isActive ? 'text-teal-500 dark:text-teal-400' : 'text-foreground dark:text-foreground/80'}`}>
                            {item.icon && React.cloneElement(item.icon, { className: isActive ? 'text-teal-500 dark:text-teal-400' : 'text-foreground dark:text-foreground/80' })}
                        </div>
                        <span className="text-[10px]">
                            {item.title}
                        </span>
                    </Link>
                )
            })}
        </nav>
    )
}
