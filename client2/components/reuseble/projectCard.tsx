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
import { Github, ExternalLink } from "lucide-react"

export default function ProjectCard() {
    return (
        <Card className="w-full bg-black/20">
            <img
                src="/bg.webp?height=200&width=400"
                alt="Project screenshot"
                className="w-full h-48 object-cover"
            />
            <CardHeader className="p-4 md:p-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                    <CardTitle className="text-xl md:text-2xl font-bold">Project Name</CardTitle>
                    <Badge variant="secondary">Status</Badge>
                </div>
                <CardDescription className="mt-2">A brief description of the project and its main features.</CardDescription>
            </CardHeader>
            <CardContent className="bg-transparent p-4 md:p-6 pt-0">
                <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">React</Badge>
                    <Badge variant="outline">TypeScript</Badge>
                    <Badge variant="outline">Tailwind CSS</Badge>
                </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-3 p-4 md:p-6">
                <Button variant="outline" size="sm" className="w-full sm:w-auto">
                    <Github className="mr-2 h-4 w-4" />
                    View Code
                </Button>
                <Button size="sm" className="w-full sm:w-auto bg-teal-500">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live Demo
                </Button>
            </CardFooter>
        </Card>
    )
}