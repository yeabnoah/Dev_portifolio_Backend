'use client'

import Image from "next/image"
import { useEffect, useId, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { X } from 'lucide-react'

type BlogPost = {
    excerpt: string
    title: string
    coverImage: string
    readMoreText: string
    slug: string
    content: () => React.ReactNode
    publishDate: string
    author: {
        name: string
        avatar?: string
    }
    tags?: string[]
}

const blogPosts: BlogPost[] = [
    {
        excerpt: "Exploring the latest developments in web development and their impact on modern applications.",
        title: "The Future of Web DEV",
        coverImage: "/telegram.jpg",
        readMoreText: "Read More",
        slug: "/blog/future-of-web-development",
        publishDate: "2024-03-20",
        author: {
            name: "John Doe",
            avatar: "/telegram.jpg"
        },
        tags: ["Web Development", "Technology"],
        content: () => (
            <article className="prose dark:prose-invert">
                <p>
                    Detailed exploration of emerging web technologies and their implications...
                </p>
                {/* Add more structured content here */}
            </article>
        ),
    },
    {
        excerpt: "Exploring the latest developments in web development and their impact on modern applications.",
        title: "The Future of Web",
        coverImage: "/telegram.jpg",
        readMoreText: "Read More",
        slug: "/blog/future-of-web-tech`",
        publishDate: "2024-03-20",
        author: {
            name: "John Doe",
            avatar: "/telegram.jpg"
        },
        tags: ["Web Development", "Technology"],
        content: () => (
            <article className="prose dark:prose-invert">
                <p>
                    Detailed exploration of emerging web technologies and their implications...
                </p>
                {/* Add more structured content here */}
            </article>
        ),
    }, {
        excerpt: "Exploring the latest developments in web development and their impact on modern applications.",
        title: "The Future of Web Tech",
        coverImage: "/telegram.jpg",
        readMoreText: "Read More",
        slug: "/blog/future-of-web-tech",
        publishDate: "2024-03-20",
        author: {
            name: "John Doe",
            avatar: "/telegram.jpg"
        },
        tags: ["Web Development", "Technology"],
        content: () => (
            <article className="prose dark:prose-invert">
                <p>
                    Detailed exploration of emerging web technologies and their implications...
                </p>
                {/* Add more structured content here */}
            </article>
        ),
    },
    // ... other blog posts ...
]

export default function BlogList() {
    const [activePost, setActivePost] = useState<BlogPost | null>(null)
    const ref = useRef<HTMLDivElement>(null)
    const id = useId()

    useEffect(() => {
        function onKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setActivePost(null)
            }
        }

        if (activePost) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }

        window.addEventListener("keydown", onKeyDown)
        return () => window.removeEventListener("keydown", onKeyDown)
    }, [activePost])

    return (
        <>
            <AnimatePresence>
                {activePost && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setActivePost(null)}
                        className="fixed inset-0 bg-black/20 h-full w-full z-10"
                    />
                )}
            </AnimatePresence>
            <AnimatePresence>
                {activePost ? (
                    <div
                        className="fixed inset-0 grid place-items-center z-[100]"
                        onClick={() => setActivePost(null)}
                    >
                        <motion.button
                            key={`button-${activePost.title}-${id}`}
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, transition: { duration: 0.05 } }}
                            className="flex absolute top-2 right-2 items-center justify-center bg-white rounded-full h-6 w-6"
                            onClick={(e) => {
                                e.stopPropagation()
                                setActivePost(null)
                            }}
                        >
                            <X className="h-4 w-4" />
                        </motion.button>
                        <motion.div
                            layoutId={`card-${activePost.title}-${id}`}
                            ref={ref}
                            className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <motion.div layoutId={`image-${activePost.title}-${id}`}>
                                <Image
                                    priority
                                    width={500}
                                    height={300}
                                    src={activePost.coverImage}
                                    alt={activePost.title}
                                    className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                                />
                            </motion.div>

                            <div>
                                <div className="flex justify-between items-start p-4">
                                    <div>
                                        <motion.h3
                                            layoutId={`title-${activePost.title}-${id}`}
                                            className="font-bold text-neutral-700 dark:text-neutral-200"
                                        >
                                            {activePost.title}
                                        </motion.h3>
                                        <motion.p
                                            layoutId={`description-${activePost.excerpt}-${id}`}
                                            className="text-neutral-600 dark:text-neutral-400"
                                        >
                                            {activePost.excerpt}
                                        </motion.p>
                                    </div>

                                    <motion.a
                                        layoutId={`button-${activePost.title}-${id}`}
                                        href={activePost.slug}
                                        target="_blank"
                                        className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white"
                                    >
                                        {activePost.readMoreText}
                                    </motion.a>
                                </div>
                                <div className="pt-4 relative px-4">
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                                    >
                                        {activePost.content()}
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                ) : null}
            </AnimatePresence>
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogPosts.map((post) => (
                        <motion.article
                            layoutId={`post-${post.title}-${id}`}
                            key={`post-${post.title}-${id}`}
                            onClick={() => setActivePost(post)}
                            className="flex flex-col border-[.5px] rounded-xl cursor-pointer border-neutral-200 dark:border-neutral-700 overflow-hidden hover:shadow-lg transition-shadow"
                        >
                            <motion.div layoutId={`image-${post.title}-${id}`} className="w-full h-48">
                                <Image
                                    width={400}
                                    height={300}
                                    src={post.coverImage}
                                    alt={post.title}
                                    className="w-full h-full object-cover"
                                />
                            </motion.div>
                            <div className="p-4 flex flex-col flex-grow">
                                <div className="flex flex-wrap gap-2 mb-3">
                                    <time className="text-sm text-neutral-600 dark:text-neutral-400">
                                        {new Date(post.publishDate).toLocaleDateString()}
                                    </time>
                                    {post.tags?.map(tag => (
                                        <span key={tag} className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full text-xs">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <motion.h2
                                    layoutId={`title-${post.title}-${id}`}
                                    className="text-xl font-semibold text-neutral-800 dark:text-neutral-200"
                                >
                                    {post.title}
                                </motion.h2>
                                <motion.p
                                    layoutId={`excerpt-${post.excerpt}-${id}`}
                                    className="mt-2 text-neutral-600 dark:text-neutral-400 line-clamp-2"
                                >
                                    {post.excerpt}
                                </motion.p>
                                <div className="mt-auto pt-4 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        {post.author.avatar && (
                                            <Image
                                                src={post.author.avatar}
                                                alt={post.author.name}
                                                width={24}
                                                height={24}
                                                className="rounded-full"
                                            />
                                        )}
                                        <span className="text-sm text-neutral-600 dark:text-neutral-400">
                                            {post.author.name}
                                        </span>
                                    </div>
                                    <motion.button
                                        layoutId={`button-${post.title}-${id}`}
                                        className="px-4 py-2 text-sm rounded-full font-medium bg-background hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700"
                                    >
                                        {post.readMoreText}
                                    </motion.button>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </>
    )
}