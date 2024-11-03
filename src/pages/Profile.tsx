import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { siteConfig } from '../config/site';
import { Github, Mail } from 'lucide-react';

export function Profile() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [, setHoveredSkill] = useState<string | null>(null);

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
        <div ref={containerRef} className="min-h-screen relative overflow-hidden px-4 sm:px-6 lg:px-8 py-8 font-sans">
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
                className="max-w-4xl mx-auto"
            >
                <Card className="w-full">
                    <CardHeader className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <Avatar className="w-24 h-24 sm:w-32 sm:h-32">
                            <AvatarImage src={siteConfig.author.avatar} alt="Profile picture" />
                            <AvatarFallback>{siteConfig.author.name}</AvatarFallback>
                        </Avatar>
                        <div className="text-center sm:text-left">
                            <CardTitle className="text-3xl sm:text-4xl mb-2 font-extrabold">
                                <span>
                                    {siteConfig.author.name}
                                </span>
                            </CardTitle>
                            <p className="text-lg text-muted-foreground font-medium">{siteConfig.author.bio}</p>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        <section>
                            <h3 className="text-2xl font-bold mb-3 text-primary">About Me</h3>
                            <p className="text-muted-foreground text-lg leading-relaxed">{siteConfig.description}</p>
                        </section>
                        <section>
                            <h3 className="text-2xl font-bold mb-3 text-primary">Skills</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
                                {siteConfig.author.skills.map((skill, index) => (
                                    <Card
                                        key={index}
                                        className="p-4 bg-secondary/10 hover:bg-secondary/20 transition-all duration-300 cursor-pointer group h-full flex flex-col"
                                        onMouseEnter={() => setHoveredSkill(skill.name)}
                                        onMouseLeave={() => setHoveredSkill(null)}
                                    >
                                        <div className="flex items-center space-x-3 mb-4 h-6">
                                            {skill.icon && <skill.icon className="w-5 h-5 text-primary flex-shrink-0" />}
                                            <span className="font-semibold text-lg leading-none">{skill.name}</span>
                                        </div>
                                        <p className="text-sm text-muted-foreground mb-2 flex-grow">{skill.description}</p>
                                        <div className="flex flex-wrap gap-2 mt-2 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                                            {skill.tools && skill.tools.map((tool, toolIndex) => (
                                                <Badge key={toolIndex} variant="secondary" className="text-xs">
                                                    {tool}
                                                </Badge>
                                            ))}
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </section>
                        <section>
                            <h3 className="text-2xl font-bold mb-3 text-primary">Projects</h3>
                            <div className="space-y-4">
                                {siteConfig.author.projects.map((project, index) => (
                                    <Card key={index} className="p-4 hover:shadow-lg transition-shadow duration-300">
                                        <h4 className="text-xl font-bold mb-2">{project.name}</h4>
                                        <Badge className="mb-2">{project.status}</Badge>
                                        <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {project.technologies.map((tech, techIndex) => (
                                                <Badge key={techIndex} variant="outline">{tech}</Badge>
                                            ))}
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </section>
                        <section>
                            <h3 className="text-2xl font-bold mb-3 text-primary">Contact</h3>
                            <div className="flex flex-wrap gap-4">
                                <Button variant="outline" asChild>
                                    <a href={`mailto:${siteConfig.author.email}`} className="flex items-center">
                                        <Mail className="mr-2 h-4 w-4" />
                                        Email
                                    </a>
                                </Button>
                                <Button variant="outline" asChild>
                                    <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className="flex items-center">
                                        <Github className="mr-2 h-4 w-4" />
                                        GitHub
                                    </a>
                                </Button>
                            </div>
                        </section>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}