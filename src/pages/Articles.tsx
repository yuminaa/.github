import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ContentPreview } from '../components/ComponentPreview';
import { motion } from "framer-motion";

interface Article {
    slug: string;
    title: string;
    date: string;
    author: string;
    content: string;
    tags: string[];
}

export function Articles() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState('title');
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get<Article[]>('http://localhost:5172/api/articles');
                setArticles(response.data);
                setFilteredArticles(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching articles:', error);
                setError('Failed to fetch articles. Please try again later.');
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    useEffect(() => {
        const filtered = articles.filter(article => {
            if (searchType === 'title') {
                return article.title.toLowerCase().includes(searchTerm.toLowerCase());
            } else {
                return article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
            }
        });
        setFilteredArticles(filtered);
    }, [searchTerm, searchType, articles]);

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
        return <div className="text-center py-8">Loading articles...</div>;
    }

    if (error) {
        return <div className="text-center py-8 text-red-500">Error: {error}</div>;
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
            <motion.h1
                className="text-4xl sm:text-5xl font-bold mb-6 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                    Articles
                </span>
            </motion.h1>
            <motion.div
                className="mb-8 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                    <Select value={searchType} onValueChange={setSearchType}>
                        <SelectTrigger className="w-full sm:w-[180px]">
                            <SelectValue placeholder="Search by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="title">Title</SelectItem>
                            <SelectItem value="tag">Tag</SelectItem>
                        </SelectContent>
                    </Select>
                    <Input
                        type="text"
                        placeholder={`Search by ${searchType}`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-grow"
                    />
                </div>
            </motion.div>
            {filteredArticles.length === 0 ? (
                <p className="text-center text-muted-foreground">No articles found.</p>
            ) : (
                <motion.div
                    className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    {filteredArticles.map((article, index) => (
                        <motion.div
                            key={article.slug}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 * index }}
                        >
                            <Card className="h-full flex flex-col">
                                <CardHeader>
                                    <CardTitle className="text-xl font-bold">{article.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <p className="text-sm text-muted-foreground mb-2">
                                        By {article.author} on {new Date(article.date).toLocaleDateString()}
                                    </p>
                                    <div className="mb-4 flex flex-wrap gap-2">
                                        {article.tags.map(tag => (
                                            <Button
                                                key={tag}
                                                variant="outline"
                                                size="sm"
                                                onClick={() => {
                                                    setSearchType('tag');
                                                    setSearchTerm(tag);
                                                }}
                                            >
                                                {tag}
                                            </Button>
                                        ))}
                                    </div>
                                    <ContentPreview content={article.content} maxWords={30} />
                                    <Link
                                        to={`/articles/${article.slug}`}
                                        className="text-primary hover:underline mt-4 inline-block transition-colors duration-200"
                                    >
                                        Read more
                                    </Link>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </div>
    );
}