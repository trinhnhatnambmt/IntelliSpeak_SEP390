import clsx from "clsx";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { squarelogo, intellispeakdark, intellispeak } from "~/assets";
import Button from "~/components/Button/Button";
import GitHubButton from "~/components/Button/RegisterButton";
import GooeyNav from "~/components/GooeyNav";
import WalletProfile from "~/components/ProfileDropdown";

const Header = ({ authenticated = false }) => {
    const [hasScrolled, setHasScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setHasScrolled(window.scrollY > 32);
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    });

    const items = [
        { label: "Interview Practice", href: "/main" },
        { label: "Topics", href: "/main/topic" },
        { label: "Analysis", href: "/main/analyze/CV" },
        { label: "Companies", href: "/main/companies" },
        { label: "Community", href: "/main/forum" },
    ];

    return (
        <header
            className={clsx(
                "fixed top-0 left-0 z-50 w-full px-5 py-5 transition-all duration-500 max-lg:py-4 bg-white dark:bg-[#0e0c15] border-b border-neutral-200 dark:border-neutral-800",
                hasScrolled &&
                    "py-2 bg-white/80 dark:bg-[#0e0c15]/80 backdrop-blur-[8px] border-b border-neutral-200 dark:border-neutral-800"
            )}
        >
            <div className="relative container mx-auto flex items-center justify-between">
                {/* Logo: show intellispeak (light) in light mode, intellispeakdark in dark mode */}
                {!authenticated && (
                    <a href="/" className="flex items-center gap-2">
                        <img
                            src={squarelogo}
                            alt="logo"
                            className="h-10 w-auto"
                        />
                        <img
                            src={intellispeak}
                            alt="logo"
                            className="h-10 w-auto block dark:hidden"
                        />
                        <img
                            src={intellispeakdark}
                            alt="logo"
                            className="h-10 w-auto hidden dark:block"
                        />
                    </a>
                )}
                {authenticated && (
                    <a href="/main" className="flex items-center gap-2 mr-15">
                        <img
                            src={squarelogo}
                            alt="logo"
                            className="h-10 w-auto"
                        />
                        <img
                            src={intellispeak}
                            alt="logo"
                            className="h-10 w-auto block dark:hidden"
                        />
                        <img
                            src={intellispeakdark}
                            alt="logo"
                            className="h-10 w-auto hidden dark:block"
                        />
                    </a>
                )}

                {!authenticated && (
                    <nav>
                        <ul className="flex gap-10">
                            <li>
                                <a href="#hero" className="font-extrabold">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="#benefit" className="font-extrabold">
                                    Features
                                </a>
                            </li>
                            <li>
                                <a href="#guide" className="font-extrabold">
                                    Roadmap
                                </a>
                            </li>
                            <li>
                                <a href="#highlight" className="font-extrabold">
                                    Connect
                                </a>
                            </li>
                        </ul>
                    </nav>
                )}
                {authenticated && (
                    <div className="mr-auto">
                        <GooeyNav
                            items={items}
                            particleCount={15}
                            particleDistances={[90, 10]}
                            particleR={100}
                            initialActiveIndex={0}
                            animationTime={600}
                            timeVariance={300}
                            colors={[1, 2, 3, 1, 2, 3, 1, 4]}
                        />
                    </div>
                )}

                <div className="">
                    {!authenticated && (
                        <ul className="flex gap-4 items-center">
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                            <li>
                                <GitHubButton>
                                    <Link to="/register">Sign Up</Link>
                                </GitHubButton>
                            </li>
                        </ul>
                    )}
                    {authenticated && <WalletProfile />}
                </div>
            </div>
        </header>
    );
};

export default Header;
