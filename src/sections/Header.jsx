import clsx from "clsx";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { logo } from "~/assets";
import Button from "~/components/Button/Button";
import GitHubButton from "~/components/Button/RegisterButton";

const Header = () => {
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
    return (
        <header
            className={clsx(
                "fixed top-0 left-0 z-50 w-full px-5 py-5 transition-all duration-500 max-lg:py-4",
                hasScrolled && "py-2 bg-[#0e0c15] backdrop-blur-[8px]"
            )}
        >
            <div className="container mx-auto flex items-center justify-between">
                <a href="#hero">
                    <img src={logo} alt="logo" width={200} />
                </a>
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
                <div>
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
                </div>
            </div>
        </header>
    );
};

export default Header;
