/** @type {import('next-sitemap').IConfig} */
matter = require('gray-matter')
fs = require('fs')

const config = {
    siteUrl: 'https://bagasbgy.dev',
    transform: (config, url) => {
        if (url.startsWith('/blog/')) {
            const fileContents = fs.readFileSync(`.${url}/post.md`, 'utf8')
            const { data } = matter(fileContents)
            return {
                loc: url,
                changefreq: config.changefreq,
                priority: config.priority,
                lastmod: data.lastmod || data.date,
                alternateRefs: config.alternateRefs ?? [],
            }
        }
        return {
            loc: url,
            changefreq: config.changefreq,
            priority: config.priority,
            lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
            alternateRefs: config.alternateRefs ?? [],
        }
    },
    changefreq: 'daily',
    generateRobotsTxt: true,
    generateIndexSitemap: false,
}

module.exports = config
