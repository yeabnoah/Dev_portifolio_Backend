import { InfiniteMovingCardsDemo } from "@/components/app/horizontalScroll"
import AboutInfo from "@/components/app/userInfo"
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials"



export default function About() {
    const testimonials = [
        {
            quote:
                "attention to detail",
            name: "Sarah Chen" as string,
            designation: "Product Manager at TechFlow",
            src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            quote:
                "Peter Tiel From Y combin",
            name: "Michael Rodriguez" as string,
            designation: "CTO at InnovateSphere",
            src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            quote:
                " John Doe Technical Manager at Meta",
            name: "Emily Watson" as string,
            designation: "Operations Director at CloudScale",
            src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            quote:
                " Sara Jacob CTO of Nui",
            designation: "Engineering Lead at DataPro",
            name: "Sara Jacob",
            src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            quote:
                " Mike Dane CEO of Teair AI",
            name: "Lisa Thompson" as string,
            designation: "VP of Technology at FutureNet",
            src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
    ];



    return (
        <div className="py-6 md:py-12">
            <div className="max-w-5xl mx-auto py-5 md:py-14 px-4 md:px-8">
                <h2 className="text-3xl md:text-5xl mb-4 text-black dark:text-white max-w-4xl justify-start">
                    Little about my self
                </h2>
                <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base max-w-sm">
                    I&apos;ve been working with computers eversince my childhood. Here&apos;s
                    a timeline of my journey.
                </p>
            </div>

            <div className="mx-auto max-w-5xl px-4 md:px-8">
                <AboutInfo />
            </div>

            <hr className="mx-4 md:mx-auto md:my-6 border-dashed border-foreground/40 dark:border-foreground/20 max-w-5xl" />

            <div className=" md:mt-12 px-0 md:px-0">
                <InfiniteMovingCardsDemo />
            </div>

            <hr className="mx-4 md:mx-auto md:my-6 border-dashed border-foreground/40 dark:border-foreground/20 max-w-5xl" />

            <div className="px-4 md:px-8">
                <AnimatedTestimonials
                    testimonials={testimonials}
                />
            </div>
        </div>
    )
}
