"use client"

import { toDate, toHumanDate } from "@/lib/date"
import { PostData } from "@/lib/posts"
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
                            const date = toHumanDate(toDate(postData.frontMatter.date))
                            return <div key={idx}>
                                <div className="border-b border-zinc-700 pb-4 mb-4">
                                    <Link href={`/blog/${postData.year}/${postData.month}/${postData.id}`}>
                                        <div className="text-2xl font-bold mb-0">{postData.frontMatter.title}</div>
                                    </Link>
                                    <div className="text-base-content text-sm lg:text-base mt-1">
                                        {postData.frontMatter.author}
                                    </div>
                                    <div className="text-zinc-500 text-sm lg:text-base">
                                        {date}
                                    </div>
                                </div>
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
