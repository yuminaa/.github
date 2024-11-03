import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft } from 'lucide-react';

interface BlogPostData {
    slug: string;
    title: string;
    date: string;
    author: string;
    content: string;
    tags: string[];
}

export function BlogPost() {
    const { slug } = useParams<{ slug: string }>();
    const [post, setPost] = useState<BlogPostData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get<BlogPostData>(`http://localhost:5172/api/blogs/${slug}`);
                setPost(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching blog post:', error);
                setError('Failed to fetch blog post. Please try again later.');
                setLoading(false);
            }
        };

        if (slug) {
            fetchPost();
        }
    }, [slug]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = container.getBoundingClientRect();
            const x = (clientX - left) / width;
            const y = (clientY - top) / height;

            container.style.setProperty('--mouse-x', `${x}`);
            container.style.setProperty('--mouse-y', `${y}`);
        };

        container.addEventListener('mousemove', handleMouseMove);

        return () => {
            container.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    if (loading) {
        return <div className="text-center py-8">Loading blog post...</div>;
    }

    if (error) {
        return <div className="text-center py-8 text-red-500">Error: {error}</div>;
    }

    if (!post) {
        return <div className="text-center py-8">Blog post not found.</div>;
    }

    return (
        <div ref={containerRef} className="min-h-screen relative overflow-hidden px-4 sm:px-6 lg:px-8 py-8">
            <div
                className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/5 dark:to-secondary/5 opacity-50 pointer-events-none"
                style={{
                    transform: 'translate(calc(var(--mouse-x, 0.5) * 20px - 10px), calc(var(--mouse-y, 0.5) * 20px - 10px))',
                    transition: 'transform 0.2s ease-out'
                }}
            />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Link to="/blog" className="inline-flex items-center text-primary hover:underline mb-6">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Blog
                </Link>
                <Card className="max-w-3xl mx-auto">
                    <CardHeader>
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <CardTitle className="text-3xl sm:text-4xl font-bold mb-2">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                                    {post.title}
                                </span>
                            </CardTitle>
                            <p className="text-sm text-muted-foreground">
                                By {post.author} on {new Date(post.date).toLocaleDateString()}
                            </p>
                        </motion.div>
                        <motion.div
                            className="flex flex-wrap gap-2 mt-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            {post.tags.map(tag => (
                                <Button key={tag} variant="outline" size="sm">
                                    {tag}
                                </Button>
                            ))}
                        </motion.div>
                    </CardHeader>
                    <CardContent>
                        <motion.div
                            className="prose prose-sm sm:prose lg:prose-lg dark:prose-invert max-w-none"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                        />
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}