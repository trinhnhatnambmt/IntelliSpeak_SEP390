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
                "fixed top-0 left-0 z-50  w-full px-5 py-5 transition-all duration-500 max-lg:py-4",
                hasScrolled && "py-2 bg-[#0e0c15] backdrop-blur-[8px]"
            )}
        >
            <div className="container mx-auto flex items-center justify-between">
                <Link>
                    <img src={logo} alt="logo" width={200} />
                </Link>
                <nav>
                    <ul className="flex gap-6">
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        <li>
                            <Link to="/services">Services</Link>
                        </li>
                        <li>
                            <Link to="/contact">Contact</Link>
                        </li>
                    </ul>
                </nav>
                <div>
                    <ul className="flex gap-4 items-center">
                        <li>
                            <Link to="/login">Đăng Nhập</Link>
                        </li>
                        <li>
                            <GitHubButton>Đăng Ký</GitHubButton>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default Header;
