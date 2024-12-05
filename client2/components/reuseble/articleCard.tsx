import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CardItem } from "../ui/3d-card"
import { CardBody } from "../ui/3d-card"
import { CardContainer } from "../ui/3d-card"
import Link from "next/link";
export default function ProjectCard() {
    return (
        <CardContainer className="inter-var">
            <CardBody className="bg-background border-foreground/20 shadow-sm shadow-foreground/20 dark:shadow-foreground/5 relative rounded-md group/card dark:hover:shadow-2xl dark:hover:shadow-white/5 dark:bg-black dark:border-white/[0.2] w-auto sm:w-[19rem] h-auto p-4 border">

                <CardItem
                    translateZ="50"
                    className="text-xl font-bold rounded-md text-foreground dark:text-white"
                >
                    Project Name
                </CardItem>

                <CardItem
                    as="p"
                    translateZ="60"
                    className="text-foreground text-xs max-w-xs mt-3 dark:text-foreground/80"
                >
                    A brief description of the project and its main features. This is where you can highlight the key aspects of your work. A brief description of the project and its main features. This is where you can highlight the key aspects of your work. A brief description of the project and its main features. This is where you can highlight the key aspects of your work. A brief description of the project and its main features. This is where you can highlight the key aspects of your work.
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

                <div className="flex justify-between items-center my-4">
                    <CardItem
                        translateZ={20}
                        as={Link}
                        href="https://your-live-preview-url.com"
                        target="__blank"
                        className="px-3 py-1.5 rounded-md bg-foreground/90 text-white hover:bg-foreground/20 dark:bg-background dark:text-white text-xs font-bold"
                    >
                        Read More
                    </CardItem>
                </div>
            </CardBody>
        </CardContainer>
    )
}