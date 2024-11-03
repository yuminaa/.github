import { Elysia } from 'elysia'
import { staticPlugin } from '@elysiajs/static'
import { cors } from '@elysiajs/cors'
import { readdir, readFile } from 'fs/promises'
import { join } from 'path'
import MarkdownIt from 'markdown-it'

const md = new MarkdownIt()

const app = new Elysia()
    .use(staticPlugin())
    .use(cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    }))
    .get('/api/blogs', async () => {
        try {
            const blogDir = join(process.cwd(), 'blog')
            const files = await readdir(blogDir)
            return await Promise.all(
                files.map(async (file) => {
                    const content = await readFile(join(blogDir, file), 'utf-8')
                    const [, frontMatter, markdown] = content.split('---')
                    const metadata = Object.fromEntries(
                        frontMatter.trim().split('\n').map(line => line.split(': '))
                    )
                    return {
                        slug: file.replace('.md', ''),
                        ...metadata,
                        tags: metadata.tags ? metadata.tags.split(',').map((tag: string) => tag.trim()) : [],
                        content: md.render(markdown)
                    }
                })
            )
        } catch (error) {
            console.error('Error in /api/blogs:', error)
            throw error
        }
    })
    .get('/api/blogs/:slug', async ({ params }) => {
        try {
            const blogDir = join(process.cwd(), 'blog')
            const filePath = join(blogDir, `${params.slug}.md`)
            const content = await readFile(filePath, 'utf-8')
            const [, frontMatter, markdown] = content.split('---')
            const metadata = Object.fromEntries(
                frontMatter.trim().split('\n').map(line => line.split(': '))
            )
            return {
                slug: params.slug,
                ...metadata,
                tags: metadata.tags ? metadata.tags.split(',').map((tag: string) => tag.trim()) : [],
                content: md.render(markdown)
            }
        } catch (error) {
            console.error(`Error in /api/blogs/${params.slug}:`, error)
            throw error
        }
    })
    .get('/api/articles', async () => {
        try {
            const articlesDir = join(process.cwd(), 'articles')
            const files = await readdir(articlesDir)
            return await Promise.all(
                files.map(async (file) => {
                    const content = await readFile(join(articlesDir, file), 'utf-8')
                    const [, frontMatter, markdown] = content.split('---')
                    const metadata = Object.fromEntries(
                        frontMatter.trim().split('\n').map(line => line.split(': '))
                    )
                    return {
                        slug: file.replace('.md', ''),
                        ...metadata,
                        tags: metadata.tags ? metadata.tags.split(',').map((tag: string) => tag.trim()) : [],
                        content: md.render(markdown)
                    }
                })
            )
        } catch (error) {
            console.error('Error in /api/articles:', error)
            throw error
        }
    })
    .get('/api/articles/:slug', async ({ params }) => {
        try {
            const articlesDir = join(process.cwd(), 'articles')
            const filePath = join(articlesDir, `${params.slug}.md`)
            const content = await readFile(filePath, 'utf-8')
            const [, frontMatter, markdown] = content.split('---')
            const metadata = Object.fromEntries(
                frontMatter.trim().split('\n').map(line => line.split(': '))
            )
            return {
                slug: params.slug,
                ...metadata,
                tags: metadata.tags ? metadata.tags.split(',').map((tag: string) => tag.trim()) : [],
                content: md.render(markdown)
            }
        } catch (error) {
            console.error(`Error in /api/articles/${params.slug}:`, error)
            throw error
        }
    })
    .get('/', () => 'Welcome to the Programmer Blog API')
    .listen(5172)

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)