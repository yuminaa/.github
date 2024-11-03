import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "../components/ui/button";
import { motion } from "framer-motion";
import { siteConfig } from "../config/site";
import { useTheme } from 'next-themes';

export function Home() {
    const containerRef = useRef<HTMLDivElement>(null);
    useTheme();

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

    return (
        <div ref={containerRef} className="flex flex-col items-center justify-center min-h-[calc(100vh-140px)] relative overflow-hidden px-4 sm:px-6 lg:px-8">
            <div
                className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 dark:from-primary/10 dark:to-secondary/10 opacity-50 pointer-events-none"
                style={{
                    transform: 'translate(calc(var(--mouse-x, 0.5) * 20px - 10px), calc(var(--mouse-y, 0.5) * 20px - 10px))',
                    transition: 'transform 0.2s ease-out'
                }}
            />
            <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Welcome to{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                    {siteConfig.title}
                </span>
            </motion.h1>
            <motion.p
                className="text-lg sm:text-xl mb-8 text-center max-w-2xl text-muted-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                Explore articles, tutorials, and insights about programming and technology.
            </motion.p>
            <motion.div
                className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                <Button asChild size="lg">
                    <Link to="/blogs">Read Blog</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                    <Link to="/articles">View Articles</Link>
                </Button>
            </motion.div>
        </div>
    );
}