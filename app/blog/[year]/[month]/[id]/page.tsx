import { toDate, toHumanDate } from "@/lib/date"
import { ArrowLeftIcon } from "@heroicons/react/20/solid"
import { PostContent, PostData, getPostContent, getPostData, getSortedPostsData } from "@/lib/posts"
import Link from "next/link"
import { ReactMarkdown } from "react-markdown/lib/react-markdown"
import Image from "next/image"
import remarkUnwrapImages from "remark-unwrap-images"
import rehypeHighlight from "rehype-highlight/lib"

interface Params {
    year: string
    month: string
    id: string
}

interface Props {
    params: Params
}

export const generateStaticParams = async () => {
    const postsData = await getSortedPostsData()
    return postsData.map((postData) => {
        return {
            year: postData.year,
            month: postData.month,
            id: postData.id,
        }
    })
}

export const generateMetadata = async ({ params }: Props) => {
    const postContent: PostData = await getPostData(params.year, params.month, params.id)

    return {
        title: postContent.frontMatter.title
    }
}

const Post = async ({ params }: Props) => {
    const postContent: PostContent = await getPostContent(params.year, params.month, params.id)
    const date = toHumanDate(toDate(postContent.frontMatter.date))

    return (
        <>
            <div className="text-primary text-3xl font-bold mb-0">{postContent.frontMatter.title}</div>
            <div className="text-base-content text-sm lg:text-base">
                {postContent.frontMatter.author}
            </div>
            <div className="text-zinc-500 text-sm lg:text-base -mt-1">
                {date}
            </div>
            <article className="prose min-w-full max-w-full py-7">
                <ReactMarkdown
                    components={{
                        img: ({ ...props }) => {
                            const imgPropsPattern = / \{(\{.*\})\}/
                            const imgPropsMatch = props.alt ? props.alt.match(imgPropsPattern) : null
                            const imgProps = imgPropsMatch ? JSON.parse(imgPropsMatch[1]) : {}
                            const alt = props.alt ? props.alt.replace(imgPropsPattern, '') : null
                            return <figure className="flex flex-col">
                                <Image
                                    src={props.src || ''}
                                    alt={alt}
                                    width={768}
                                    height={576}
                                    {...imgProps}
                                />
                                <figcaption className="text-center">{alt}</figcaption>
                            </figure>
                        }
                    }}
                    remarkPlugins={[remarkUnwrapImages]}
                    rehypePlugins={[rehypeHighlight]}
                >
                    {postContent.contentHtml}
                </ReactMarkdown>
            </article>
            <Link className="inline-flex flex-row items-center text-lg font-bold" href="/">
                <ArrowLeftIcon className="h-5 w-5" />
                &nbsp;Back to Home
            </Link>
        </>
    )
}

export default Post
