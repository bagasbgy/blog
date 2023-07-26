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
            <div className="text-primary text-2xl lg:text-3xl font-bold mb-0">{postContent.frontMatter.title}</div>
            <div className="text-base-content text-sm lg:text-base mt-1">
                {postContent.frontMatter.author}
            </div>
            <div className="text-zinc-500 text-sm lg:text-base -mt-1">
                {date}
            </div>
            <article className="prose min-w-full max-w-full py-7">
                <ReactMarkdown
                    components={{
                        img: ({ ...props }) => {
                            // TODO: add better argument parsing
                            const substrings = props.alt ? props.alt.split('{{') : null
                            // @ts-ignore
                            const alt = substrings[0].trim()
                            // @ts-ignore
                            const width = substrings[1] ? substrings[1].match(/(?<=w:\s?)\d+/g)[0] : 768
                            // @ts-ignore
                            const height = substrings[1] ? substrings[1].match(/(?<=h:\s?)\d+/g)[0] : 576
                            return <figure className="flex flex-col">
                                {/* @ts-ignore */}
                                <Image src={props.src} alt={alt} width={width} height={height} />
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
            <Link className="inline-flex flex-row items-center" href="/">
                <ArrowLeftIcon className="h-4 w-4" />
                &nbsp;Back to Home
            </Link>
        </>
    )
}

export default Post
