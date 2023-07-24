import { toDate, toHumanDate } from "@/lib/date"
import { ArrowLeftIcon } from "@heroicons/react/20/solid"
import { PostContent, getPostContent, getSortedPostsData } from "@/lib/posts"
import Link from "next/link"

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
    const postData: PostContent = await getPostContent(params.year, params.month, params.id)

    return {
        title: postData.frontMatter.title
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
            <article className="prose min-w-full max-w-full:">
                <div className="mt-3" dangerouslySetInnerHTML={{ __html: postContent.contentHtml }} />
            </article>
            <Link className="inline-flex flex-row items-center" href="/">
                <ArrowLeftIcon className="h-4 w-4" />
                &nbsp;Back to Home
            </Link>
        </>
    )
}

export default Post
