import ExpandableCardDemo from '@/components/app/blogMain'
import React from 'react'
import ArticleCard from "@/components/reuseble/articleCard";

const Blog = () => {
    return (
        <div className='px-4 sm:px-8 md:px-14'>
            <div className="max-w-6xl mx-auto pt-10 sm:pt-16 md:pt-20">
                <h2 className="text-3xl sm:text-3xl md:text-4xl mb-3 md:mb-4 text-black dark:text-white justify-start">
                    Some of my thoughts and learnings
                </h2>
                <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base max-w-sm">
                    I write about my learnings and thoughts about the tech world.
                </p>
            </div>
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-5 md:mt-8">
                <ArticleCard />
                <ArticleCard />
                <ArticleCard />
            </div>
        </div>
    )
}

export default Blog
