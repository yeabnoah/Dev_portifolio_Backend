import Image from 'next/image';
import Link from 'next/link';

interface TechStack {
    name: string;
    icon?: string;
}

interface TimelineEntryContentProps {
    image: string;
    description: string;
    techStack: TechStack[];
    detailsLink: string;
}

export const TimelineEntryContent = ({
    image,
    description,
    techStack,
    detailsLink
}: TimelineEntryContentProps) => {
    return (
        <div className="space-y-6 w-full md:w-[500px]">
            <Image
                src={image}
                alt="Project preview"
                width={600}
                height={400}
                className="rounded-lg object-cover w-full h-[200px] shadow-[0_0_24px_rgba(34,_42,_53,_0.06)]"
            />

            <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal">
                {description}
            </p>

            <div className="flex flex-col md:flex-row gap-4 md:gap-0 md:justify-between items-start md:items-center">
                <div className="flex flex-wrap gap-2">
                    {techStack.map((tech, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 text-xs rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                        >
                            {tech.name}
                        </span>
                    ))}
                </div>

                <Link
                    href={detailsLink}
                    className="w-full md:w-auto text-center inline-block px-4 py-2 text-sm rounded-lg bg-neutral-900 dark:bg-neutral-100 text-white dark:text-black hover:opacity-90 transition-opacity"
                >
                    View Details
                </Link>
            </div>


        </div>
    );
};