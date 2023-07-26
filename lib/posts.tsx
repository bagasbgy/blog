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
    frontMatter: FrontMatter
}

export interface PostContent extends PostData {
    contentHtml: string
}

const postsDirectory = path.join(process.cwd(), 'blog')

export const getSortedPostsData = () => {
    const postsData: Array<PostData> = Array()
    const years = fs.readdirSync(postsDirectory)
    years.map((year) => {
        const months = fs.readdirSync(path.join(postsDirectory, year))
        months.map((month) => {
            const templateRegExp = new RegExp("\.template\.md$", "g")
            const notebookRegExp = new RegExp("\.ipynb$", "g")

            let filenames = fs.readdirSync(path.join(postsDirectory, year, month))
            let templates = filenames.filter((filename) => filename.match(templateRegExp))
            const notebooks = filenames.filter((filename) => filename.match(notebookRegExp))

            filenames = filenames.filter((filename) => !(templates.includes(filename) || notebooks.includes(filename)))
            templates = templates.filter((filename) => !filenames.includes(filename.replace(/\.template\.md$/, ".md")))

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

            templates.map((filename) => {
                const mdFilename = filename.replace(/\.template\.md$/, ".md")
                const notebook = filename.replace(/\.template\.md$/, ".ipynb")
                const fullPath = path.join(postsDirectory, year, month, mdFilename)

                fs.copyFileSync(path.join(postsDirectory, year, month, filename), fullPath)
                execSync(`conda run -n blog jupyter nbconvert --to markdown ${path.join(postsDirectory, year, month, notebook)} --stdout >> ${fullPath}`)

                const id = filename.replace(/\.template\.md$/, '')
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

export const getPostData = async (year: string, month: string, id: string) => {
    const fullPath = path.join(postsDirectory, year, month, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const {data} = matter(fileContents)

    return {
        year,
        month,
        id,
        frontMatter: data,
    }
}

export const getPostContent = async (year: string, month: string, id: string) => {
    const fullPath = path.join(postsDirectory, year, month, `${id}.md`)
    if (process.env.NODE_ENV === "development") {
        const templatePath = path.join(postsDirectory, year, month, `${id}.template.md`)
        if (fs.existsSync(templatePath)) {
            fs.copyFileSync(templatePath, fullPath)
            execSync(`conda run -n blog jupyter nbconvert --to markdown ${path.join(postsDirectory, year, month, `${id}.ipynb`)} --stdout >> ${fullPath}`)
        }
    }
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    const {data, content} = matter(fileContents)

    return {
        year,
        month,
        id,
        frontMatter: data,
        contentHtml: content,
    }
}
