"use client"

import { toDate, toHumanDate } from "@/lib/date"
import { PostData } from "@/lib/posts"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const HomeTab = ({ postsData }: { postsData: Array<PostData> }) => {
    const [tabKey, setTabKey] = useState("1")

    return (
        <>
            <div className="tabs mx-auto mb-5">
                <a className={"tab tab-lg tab-bordered" + (tabKey == "1" ? " tab-active" : "")} onClick={() => setTabKey("1")}>Blog</a>
                <a className={"tab tab-lg tab-bordered" + (tabKey == "2" ? " tab-active" : "")} onClick={() => setTabKey("2")}>Projects</a>
            </div>
            {
                tabKey == "1" ?
                    <div>
                        {postsData.map((postData, idx) => {
                            const date = toHumanDate(toDate(postData.data.date))
                            return <div key={idx}>
                                <Link href={`/blog/${postData.year}/${postData.month}/${postData.id}`}>
                                    <div className="flex flex-row space-x-5 border-b border-zinc-700 pb-4 mb-4">
                                        <div className="relative basis-1/4">
                                            <Image
                                                className="rounded-lg object-none"
                                                src={postData.data.thumbnail ? `/blog/${postData.year}/${postData.month}/${postData.id}/${postData.id}_files/${postData.data.thumbnail}` : ""}
                                                alt={postData.data.title}
                                                fill
                                            />
                                        </div>
                                        <div className="basis-3/4">
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
                    : null
            }
            {
                tabKey == "2" ?
                    <div>
                        Coming Soon!
                    </div>
                    : null
            }
        </>
    )
}

export default HomeTab
