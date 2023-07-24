import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

export interface FrontMatter {
    [key: string]: any
}

export interface PostData {
    year: string
    month: string
    id: string
    frontMatter: FrontMatter
}

export interface PostContent extends PostData {
    contentHtml: string
}

const postsDirectory = path.join(process.cwd(), 'posts')

export const getSortedPostsData = () => {
    const years = fs.readdirSync(postsDirectory)
    const postsData: Array<PostData> = Array()

    years.map((year) => {
        const months = fs.readdirSync(path.join(postsDirectory, year))
        months.map((month) => {
            const filenames = fs.readdirSync(path.join(postsDirectory, year, month))
            filenames.map((filename) => {
                const id = filename.replace(/\.md$/, '')
                const fullPath = path.join(postsDirectory, year, month, filename)
                const fileContents = fs.readFileSync(fullPath, 'utf8')
                const matterResult = matter(fileContents)
                const frontMatter = matterResult.data

                postsData.push({
                    year,
                    month,
                    id,
                    frontMatter,
                })
            })
        })
    })

    return postsData.sort((a, b) => {
        if (a.frontMatter.date < b.frontMatter.date) {
            return 1
        } else {
            return -1
        }
    })
}

export const getPostContent = async (year: string, month: string, id: string) => {
    const fullPath = path.join(postsDirectory, year, month, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    const matterResult = matter(fileContents)
    const frontMatter = matterResult.data

    const processedContent = await remark()
        .use(html)
        .process(matterResult.content)
    const contentHtml = processedContent.toString()

    return {
        year,
        month,
        id,
        contentHtml,
        frontMatter,
    }
}
