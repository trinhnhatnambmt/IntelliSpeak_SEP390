import clsx from "clsx";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { squarelogo, intellispeakdark } from "~/assets";
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
        { label: "Luyện tập phỏng vấn", href: "/main" },
        { label: "Chủ đề", href: "/main/topic" },
        { label: "Phân tích", href: "/main/analyze/CV" },
        { label: "Kết nối", href: "/main/forum" },
    ];
    return (
        <header
            className={clsx(
                "fixed top-0 left-0 z-50 w-full px-5 py-5 transition-all duration-500 max-lg:py-4",
                hasScrolled && "py-2 bg-[#0e0c15] backdrop-blur-[8px]"
            )}
        >
            <div className="relative container mx-auto flex items-center justify-between">
                {!authenticated && (
                    <a href="/" className="flex items-center gap-2">
                        <img src={squarelogo} alt="logo" className="h-10 w-auto" />
                        <img src={intellispeakdark} alt="logo" className="h-10 w-auto" />
                    </a>
                )}
                {authenticated && (
                    <a href="/main" className="flex items-center gap-2 mr-15">
                        <img src={squarelogo} alt="logo" className="h-10 w-auto" />
                        <img src={intellispeakdark} alt="logo" className="h-10 w-auto" />
                    </a>
                )}

                {!authenticated && (
                    <nav>
                        <ul className="flex gap-10">
                            <li>
                                <a href="#hero" className="font-extrabold">
                                    Trang Chủ
                                </a>
                            </li>
                            <li>
                                <a href="#benefit" className="font-extrabold">
                                    Tính năng
                                </a>
                            </li>
                            <li>
                                <a href="#guide" className="font-extrabold">
                                    Lộ trình
                                </a>
                            </li>
                            <li>
                                <a href="#highlight" className="font-extrabold">
                                    Kết Nối
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
                                <Link to="/login">Đăng Nhập</Link>
                            </li>
                            <li>
                                <GitHubButton>
                                    <Link to="/register">Đăng Ký</Link>
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