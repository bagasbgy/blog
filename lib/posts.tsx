import fs from 'fs'
import { execSync } from 'child_process'
import path from 'path'
import matter from 'gray-matter'

export interface FrontMatter {
    [key: string]: any
}

export interface PostData {
    year: string
    month: string
    id: string
    data: FrontMatter
}

export interface PostContent extends PostData {
    content: string
}

const postsDirectory = path.join(process.cwd(), 'blog')

export const getSortedPostsData = () => {
    const postsData: Array<PostData> = Array()
    const years = fs.readdirSync(postsDirectory)
    years.map((year) => {
        const months = fs.readdirSync(path.join(postsDirectory, year))
        months.map((month) => {
            const dirnames = fs.readdirSync(path.join(postsDirectory, year, month))
            dirnames.map((dirname) => {
                const id = dirname
                const fullPath = path.join(postsDirectory, year, month, dirname, `${dirname}.md`)
                const templatePath = path.join(postsDirectory, year, month, dirname, `${dirname}.template.md`)

                if (fs.existsSync(templatePath)) {
                    const notebookPath = path.join(postsDirectory, year, month, dirname, `${dirname}.ipynb`)
                    const templateContent = fs.readFileSync(templatePath, 'utf8')
                    const { data } = matter(templateContent)

                    if (process.env.NODE_ENV === "development") {
                        const tempPath = fullPath + '.temp'
                        execSync(`conda run -n blog jupyter nbconvert --to markdown ${notebookPath}`)
                        fs.copyFileSync(fullPath, tempPath)
                        fs.copyFileSync(templatePath, fullPath)
                        fs.appendFileSync(fullPath, fs.readFileSync(tempPath))
                        fs.rmSync(tempPath)
                    }

                    postsData.push({
                        year,
                        month,
                        id,
                        data,
                    })
                } else {
                    const fileContents = fs.readFileSync(fullPath, 'utf8')
                    const { data } = matter(fileContents)

                    postsData.push({
                        year,
                        month,
                        id,
                        data,
                    })
                }

                const filesDirectory = path.join(postsDirectory, year, month, dirname, `${dirname}_files`)
                if (fs.existsSync(filesDirectory)) {
                    const publicDirectory = path.join('public', 'blog', year, month, dirname, `${dirname}_files`)
                    if (fs.existsSync(publicDirectory)) {
                        fs.rmSync(publicDirectory, { recursive: true , force: true })
                    }
                    fs.cpSync(filesDirectory, publicDirectory, { recursive: true })
                }
            })
        })
    })

    return postsData.sort((a, b) => {
        if (a.data.date < b.data.date) {
            return 1
        } else {
            return -1
        }
    })
}

export const getPostData = async (year: string, month: string, id: string) => {
    const fullPath = path.join(postsDirectory, year, month, id, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const {data} = matter(fileContents)

    return {
        year,
        month,
        id,
        data,
    }
}

export const getPostContent = async (year: string, month: string, id: string) => {
    const fullPath = path.join(postsDirectory, year, month, id, `${id}.md`)
    if (process.env.NODE_ENV === "development") {
        const templatePath = path.join(postsDirectory, year, month, id, `${id}.template.md`)
        if (fs.existsSync(templatePath)) {
            const notebookPath = path.join(postsDirectory, year, month, id, `${id}.ipynb`)
            const tempPath = fullPath + '.temp'
            execSync(`conda run -n blog jupyter nbconvert --to markdown ${notebookPath}`)
            fs.copyFileSync(fullPath, tempPath)
            fs.copyFileSync(templatePath, fullPath)
            fs.appendFileSync(fullPath, fs.readFileSync(tempPath))
            fs.rmSync(tempPath)

            const filesDirectory = path.join(postsDirectory, year, month, id, `${id}_files`)
            if (fs.existsSync(filesDirectory)) {
                const publicDirectory = path.join('public', 'blog', year, month, id, `${id}_files`)
                if (fs.existsSync(publicDirectory)) {
                    fs.rmSync(publicDirectory, { recursive: true , force: true })
                }
                fs.cpSync(filesDirectory, publicDirectory, { recursive: true })
            }
        }
    }
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
        year,
        month,
        id,
        data,
        content,
    }
}
