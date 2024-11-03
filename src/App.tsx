import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'next-themes';
import { Topbar } from './components/Topbar';
import { Home } from './pages/Home';
import { Profile } from './pages/Profile';
import { Articles } from './pages/Articles';
import { ArticleDetail } from './pages/ArticleDetails';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import { PageTransition } from './components/PageTransition';
import {siteConfig} from "./config/site.ts";

function App() {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Router>
                <div className="min-h-screen flex flex-col bg-background text-foreground">
                    <Topbar />
                    <main className="flex-grow container mx-auto px-4 py-8">
                        <Routes>
                            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
                            <Route path="/profile" element={<PageTransition><Profile /></PageTransition>} />
                            <Route path="/articles" element={<PageTransition><Articles /></PageTransition>} />
                            <Route path="/articles/:slug" element={<PageTransition><ArticleDetail /></PageTransition>} />
                            <Route path="/blogs" element={<PageTransition><Blog /></PageTransition>} />
                            <Route path="/blogs/:slug" element={<PageTransition><BlogPost /></PageTransition>} />
                        </Routes>
                    </main>
                    <footer className="border-t">
                        <div className="container mx-auto px-4 py-6 text-center">
                            <p className="text-sm">© {new Date().getFullYear()} {siteConfig.title}. All rights reserved.</p>
                            <p className="text-sm mt-2">Made with
                                <a href="https://elysiajs.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline"> ElysiaJS</a> and
                                <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline"> React</a>
                            </p>
                        </div>
                    </footer>
                </div>
            </Router>
        </ThemeProvider>
    );
}

export default App;