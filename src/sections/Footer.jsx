import React from "react";
import { Link } from "react-router-dom";
import { logo } from "~/assets";

const Footer = () => {
    return (
        <footer className="w-full mx-auto bg-[#0e0c15] text-white py-12 px-5 relative z-10">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
                {/* Logo và Mô tả */}
                <div className="flex flex-col items-start gap-4 md:w-1/3">
                    <Link to="/">
                        <img
                            src={logo}
                            alt="logo"
                            width={150}
                            className="filter brightness-0 invert"
                        />
                    </Link>
                    <p className="text-gray-300 text-sm leading-relaxed">
                        ItelliSpeak - Nền tảng luyện tập phỏng vấn và kết nối
                        với các nhà tuyển dụng uy tín trên toàn cầu.
                    </p>
                </div>

                {/* Điều hướng */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-lg font-semibold text-white">
                        Điều hướng
                    </h3>
                    <ul className="flex flex-col gap-2">
                        <li>
                            <Link
                                to="/"
                                className="text-gray-300 hover:text-white transition duration-300"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/about"
                                className="text-gray-300 hover:text-white transition duration-300"
                            >
                                About
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/services"
                                className="text-gray-300 hover:text-white transition duration-300"
                            >
                                Services
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/contact"
                                className="text-gray-300 hover:text-white transition duration-300"
                            >
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Liên hệ */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-lg font-semibold text-white">
                        Liên hệ
                    </h3>
                    <ul className="flex flex-col gap-2">
                        <li>
                            <a
                                href="mailto:support@itellispeak.com"
                                className="text-gray-300 hover:text-white transition duration-300"
                            >
                                Email: support@itellispeak.com
                            </a>
                        </li>
                        <li>
                            <a
                                href="tel:+123456789"
                                className="text-gray-300 hover:text-white transition duration-300"
                            >
                                Phone: +123 456 789
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="text-gray-300 hover:text-white transition duration-300"
                            >
                                Address: 123 Street, City, Country
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Mạng xã hội */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-lg font-semibold text-white">
                        Theo dõi chúng tôi
                    </h3>
                    <div className="flex gap-4">
                        <a
                            href="#"
                            className="text-gray-300 hover:text-white transition duration-300"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 2.04c-5.5 0-9.96 4.46-9.96 9.96 0 4.95 3.62 9.06 8.36 9.84v-6.95h-2.51v-2.89h2.51v-2.2c0-2.47 1.51-3.82 3.71-3.82 1.05 0 1.96.08 2.22.11v2.58h-1.52c-1.19 0-1.42.57-1.42 1.4v1.83h2.84l-.37 2.89h-2.47v6.95c4.74-.78 8.36-4.89 8.36-9.84 0-5.5-4.46-9.96-9.96-9.96z" />
                            </svg>
                        </a>
                        <a
                            href="#"
                            className="text-gray-300 hover:text-white transition duration-300"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M23.95 4.84c-.88.39-1.83.65-2.82.77 1.01-.61 1.79-1.57 2.16-2.71-.95.56-2 .97-3.12 1.19-.9-.96-2.18-1.56-3.6-1.56-2.72 0-4.93 2.21-4.93 4.93 0 .39.04.77.13 1.13-4.1-.21-7.74-2.17-10.18-5.15-.43.74-.67 1.59-.67 2.51 0 1.72.88 3.24 2.22 4.13-.82-.03-1.59-.25-2.27-.62v.06c0 2.4 1.71 4.4 3.98 4.86-.42.11-.86.17-1.31.17-.32 0-.63-.03-.94-.09.63 1.97 2.47 3.4 4.65 3.44-1.7 1.33-3.84 2.12-6.17 2.12-.4 0-.79-.02-1.18-.07 2.18 1.4 4.77 2.22 7.56 2.22 9.06 0 14.01-7.51 14.01-14.01 0-.21 0-.42-.01-.63.96-.69 1.79-1.56 2.45-2.55l-.01-.01z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            {/* Dòng bản quyền */}
            <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
                &copy; {new Date().getFullYear()} ItelliSpeak. All rights
                reserved.
            </div>
        </footer>
    );
};

export default Footer;
