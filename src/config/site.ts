import { Code, Database, Server, Cpu, Braces, Wrench } from 'lucide-react';

export const siteConfig = {
    title: "Yumina",
    description: "A personal space for projects and programming thoughts",
    author: {
        name: "Al",
        avatar: "",
        bio: "Performance-oriented guy",
        email: "typeal2010@gmail.com",
        skills: [
            {
                name: "Systems Programming",
                icon: Cpu,
                description: "Working with low-level systems",
                tools: ["x86 ASM", "C", "C++", "Rust", "OS Development"]
            },
            {
                name: "Language Design",
                icon: Braces,
                description: "Building programming languages",
                tools: ["C++", "Parser Design", "Type Systems"]
            },
            {
                name: "Backend Development",
                icon: Server,
                description: "Server-side programming",
                tools: ["Java", "Spring", "Go", "C#"]
            },
            {
                name: "Frontend Development",
                icon: Code,
                description: "Web interfaces",
                tools: ["React", "TypeScript", "Next.js", "Tailwind"]
            },
            {
                name: "Data & ML",
                icon: Database,
                description: "Working with data",
                tools: ["Python", "MySQL", "PyTorch"]
            },
            {
                name: "Tooling",
                icon: Wrench,
                description: "Programming workflow",
                tools: ["Git", "Docker", "VS Code", "JetBrains IDEs"]
            }
        ],
        projects: [
            {
                name: "Yu",
                status: "In Progress",
                description: "A programming language focusing on data transformation.",
                technologies: ["C++", "LLVM"]
            },
            {
                name: "Vectoria",
                status: "Completed",
                description: "Math library for linear algebra computations.",
                technologies: ["Rust", "Linear Algebra"]
            },
            {
                name: "x86 Boot",
                status: "Completed",
                description: "Simple bootloader implementation.",
                technologies: ["Assembly"]
            }
        ]
    },
    links: {
        github: "https://github.com/yuminaa",
    },
};