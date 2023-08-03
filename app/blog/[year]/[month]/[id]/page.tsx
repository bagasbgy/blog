import { toDate, toHumanDate } from "@/lib/date"
import { ArrowLeftIcon } from "@heroicons/react/20/solid"
import { PostContent, PostData, getPostContent, getPostData, getSortedPostsData } from "@/lib/posts"
import Link from "next/link"
import { ReactMarkdown } from "react-markdown/lib/react-markdown"
import Image from "next/image"
import remarkUnwrapImages from "remark-unwrap-images"
import rehypeHighlight from "rehype-highlight/lib"
import { preprocessImageAlt } from "@/lib/image"
import ShareButtons from "@/lib/share"

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
        title: `BagasBgy | ${postContent.data.title}`,
        description: postContent.data.title,
    }
}

const Post = async ({ params }: Props) => {
    const postContent: PostContent = await getPostContent(params.year, params.month, params.id)
    const date = toHumanDate(toDate(postContent.data.date))

    return (
        <>
            <div className="border-b border-zinc-600 pb-5 mb-5">
                <div className="text-primary text-3xl lg:text-4xl font-bold break-all">
                    {postContent.data.title}
                </div>
                <div className="text-base-content text-sm lg:text-lg mt-1">
                    {postContent.data.author}
                </div>
                <div className="text-zinc-500 text-sm lg:text-lg">
                    {date}
                </div>
            </div>
            <div className="flex flex-row space-x-1 -mt-[6px]">
                <ShareButtons
                    path={`${params.year}/${params.month}/${params.id}`}
                    title={postContent.data.title}
                />
            </div>
            <article className="prose lg:prose-lg min-w-full max-w-full py-7">
                {
                    postContent.data.cover &&
                    <figure className="flex flex-col">
                        <Image
                            src={postContent.data.cover ? `/blog/${postContent.year}/${postContent.month}/${postContent.id}/${postContent.data.cover.src}` : ''}
                            alt={postContent.data.cover.alt}
                            width={postContent.data.cover.width || 768}
                            height={postContent.data.cover.height || 576}
                        />
                        <figcaption className="text-center">
                            {postContent.data.cover.alt}
                        </figcaption>
                    </figure>
                }
                <ReactMarkdown
                    components={{
                        a: ({ ...props }) => {
                            return (
                                <Link
                                    href={props.href || ''}
                                    target="_blank"
                                >
                                    {props.children}
                                </Link>
                            )
                        },
                        img: ({ ...props }) => {
                            const imgPropsPattern = / \{(\{.*\})\}/
                            const imgPropsMatch = props.alt ? props.alt.match(imgPropsPattern) : null
                            const imgProps = imgPropsMatch ? JSON.parse(imgPropsMatch[1]) : {}
                            const rawAlt = props.alt ? props.alt.replace(imgPropsPattern, '') : ''
                            const alt = preprocessImageAlt(rawAlt)
                            return <figure className="flex flex-col">
                                <Image
                                    src={`/blog/${postContent.year}/${postContent.month}/${postContent.id}/${props.src}`}
                                    alt={alt}
                                    width={768}
                                    height={576}
                                    {...imgProps}
                                />
                                {alt && <figcaption className="text-center">{alt}</figcaption>}
                            </figure>
                        }
                    }}
                    remarkPlugins={[remarkUnwrapImages]}
                    rehypePlugins={[rehypeHighlight]}
                >
                    {postContent.content}
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
