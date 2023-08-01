"use client"

import { toDate, toHumanDate } from "@/lib/date"
import { PostData } from "@/lib/posts"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const BlogTab = ({ postsData }: { postsData: Array<PostData> }) => {
    return <div className="mt-5">
        {postsData.map((postData, idx) => {
            const date = toHumanDate(toDate(postData.data.date))
            return <div key={idx} className="border-b border-zinc-600 pb-5 mb-5">
                <Link href={`/blog/${postData.year}/${postData.month}/${postData.id}`}>
                    <div className="flex flex-row space-x-5 items-center">
                        <div className="relative w-16 h-16 lg:w-24 lg:h-24">
                            <Image
                                className="rounded-lg object-none"
                                src={postData.data.cover ? `/blog/${postData.year}/${postData.month}/${postData.id}/${postData.data.cover.src}` : ""}
                                alt={postData.data.title}
                                fill
                                objectFit="cover"
                            />
                        </div>
                        <div className="">
                            <div className="text-lg lg:text-2xl font-bold line-clamp-1 break-all mb-0">
                                {postData.data.title}
                            </div>
                            <div className="text-base-content text-xs lg:text-base lg:mt-1">
                                {postData.data.author}
                            </div>
                            <div className="text-zinc-500 text-xs lg:text-base">
                                {date}
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        })}
    </div>
}

const ProjectTab = () => {
    return <div className="h-full w-full flex flex-col items-center justify-center text-2xl font-bold py-10">
        Coming Soon!
    </div>
}

interface TabKey {
    "1": string
    "2": string
}

const HomeTab = ({ postsData }: { postsData: Array<PostData> }) => {
    const [tabKey, setTabKey] = useState("1")
    const tabs = {
        "1": <BlogTab postsData={postsData} />,
        "2": <ProjectTab />,
    }

    return (
        <>
            <div className="tabs mx-auto">
                <a className={"tab tab-lg tab-bordered" + (tabKey == "1" ? " tab-active" : "")} onClick={() => setTabKey("1")}>Blog</a>
                <a className={"tab tab-lg tab-bordered" + (tabKey == "2" ? " tab-active" : "")} onClick={() => setTabKey("2")}>Projects</a>
            </div>
            {tabs[tabKey as keyof TabKey]}
        </>
    )
}

export default HomeTab
