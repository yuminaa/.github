import { Link } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import {siteConfig} from "../config/site.ts";

export function Topbar() {
    return (
        <header className="border-b">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold">{siteConfig.title}</Link>
                <nav>
                    <ul className="flex items-center space-x-4">
                        <li><Link to="/" className="hover:text-primary">Home</Link></li>
                        <li><Link to="/blogs" className="hover:text-primary">Blogs</Link></li>
                        <li><Link to="/articles" className="hover:text-primary">Articles</Link></li>
                        <li><Link to="/profile" className="hover:text-primary">Profile</Link></li>
                        <li className="flex items-center">
                            <ThemeToggle />
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}