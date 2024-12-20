import ProjectInterface from "@/interface/project";
import Link from "next/link";

export function ThreeDCardDemo({ data }: { data: ProjectInterface }) {
  return (
    <div
      className="relative bg-white/70 dark:bg-white/5  border border-gray-200 dark:border-white/5 shadow-lg rounded-xl overflow-hidden group transition-all duration-500 hover:scale-[1.03] hover:shadow-xl dark:hover:shadow-none hover:shadow-[#dcdcdc]
     max-w-xl mx-auto"
    >
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3 text-shadow-md">
          {data.name}
        </h2>

        <div className="w-full h-40 overflow-hidden rounded-lg mb-4">
          <img
            src={data.imageUrl}
            height={200}
            width={400}
            className="w-full h-full grayscale group-hover:grayscale-0 object-cover rounded-lg transition-transform duration-500 ease-out group-hover:scale-105"
            alt="thumbnail"
          />
        </div>

        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
          {data.description.length > 200
            ? `${data.description.slice(0, 200)}...`
            : data.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {data.tags.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-xs font-medium bg-[#f8f8f8] dark:bg-white/5 text-gray-800 dark:text-gray-100 rounded-full shadow-inner"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <Link
            href={data.githubUrl}
            target="_blank"
            className="px-3 py-1 text-sm font-medium text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-none rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
          >
            View Code →
          </Link>
          <Link
            href={data.liveLink}
            target="_blank"
            className="px-3 py-1 text-sm font-medium text-white dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-black/85 bg-black/85 border-none dark:hover:bg-gray-800 transition-all duration-300"
          >
            Live Preview
          </Link>
        </div>
      </div>
    </div>
  );
}
