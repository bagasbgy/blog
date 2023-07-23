import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

export interface FrontMatter {
    [key: string]: any
}

export interface PostData {
    id: string
    frontMatter: FrontMatter
}

const postsDirectory = path.join(process.cwd(), 'posts')

export const getSortedPostsData = () => {
    const fileNames = fs.readdirSync(postsDirectory)

    const postsData: Array<PostData> = fileNames.map((filename) => {
        const id = filename.replace(/\.md$/, '')
        const fullPath = path.join(postsDirectory, filename)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const matterResult = matter(fileContents)
        const frontMatter = matterResult.data

        return {
            id,
            frontMatter,
        }
    })

    return postsData.sort((a, b) => {
        if (a.frontMatter.date < b.frontMatter.date) {
            return 1
        } else {
            return -1
        }
    })
}

export const getPostData = async (id: string) => {
    const fullPath = path.join(postsDirectory, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    const matterResult = matter(fileContents)
    const frontMatter = matterResult.data

    const processedContent = await remark()
        .use(html)
        .process(matterResult.content)
    const contentHtml = processedContent.toString()

    return {
        id,
        contentHtml,
        frontMatter,
    }
}
