"use client";
import React, { useState } from "react";
import { Liquid } from "./liquid-gradient";
import { Github, Star } from "lucide-react";
const COLORS = {
    color1: "#FFFFFF",
    color2: "#1E10C5",
    color3: "#9089E2",
    color4: "#FCFCFE",
    color5: "#40ffaa",
    color6: "#40ffaa",
    color7: "#40ffaa",
    color8: "#40ffaa",
    color9: "#40ffaa",
    color10: "#40ffaa",
    color11: "#40ffaa",
    color12: "#40ffaa",
    color13: "#40ffaa",
    color14: "#40ffaa",
    color15: "#4079ff",
    color16: "#40ffaa",
    color17: "#3F4CC0",
};
const GitHubButton = ({ children }) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div className="flex justify-center">
            <div className="relative inline-block sm:w-36 w-14 h-[2.7em] mx-auto group dark:bg-black bg-white border border-gray-300 dark:border-gray-500 border-2 rounded-lg transition-colors duration-300">
                <div className="absolute w-[112.81%] h-[128.57%] top-[8.57%] left-1/2 -translate-x-1/2 filter blur-[19px] opacity-70">
                    <span className="absolute inset-0 rounded-lg bg-[#d9d9d9] filter blur-[6.5px]"></span>
                    <div className="relative w-full h-full overflow-hidden rounded-lg">
                        <Liquid isHovered={isHovered} colors={COLORS} />
                    </div>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] w-[92.23%] h-[112.85%] rounded-lg bg-[#010128] filter blur-[7.3px]"></div>
                <div className="relative w-full h-full overflow-hidden rounded-lg">
                    <span className="absolute inset-0 rounded-lg bg-[#d9d9d9]"></span>
                    <span className="absolute inset-0 rounded-lg bg-black dark:block hidden"></span>
                    <Liquid isHovered={isHovered} colors={COLORS} />
                    {[1, 2, 3, 4, 5].map((i) => (
                        <span
                            key={i}
                            className={`absolute inset-0 rounded-lg border-solid border-[3px] border-gradient-to-b from-transparent to-white mix-blend-overlay filter ${i <= 2
                                ? "blur-[3px]"
                                : i === 3
                                    ? "blur-[5px]"
                                    : "blur-[4px]"
                                }`}
                        ></span>
                    ))}
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] w-[70.8%] h-[42.85%] rounded-lg filter blur-[15px] bg-[#006]"></span>
                </div>
                <button
                    className="absolute inset-0 rounded-lg bg-transparent cursor-pointer"
                    aria-label="Get Started"
                    type="button"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <span className=" flex  items-center justify-center px-4 gap-2   rounded-lg group-hover:text-yellow-400 text-white text-xl font-semibold tracking-wide whitespace-nowrap">
                        <Github className="sm:hidden inline-block group-hover:fill-yellow-400 fill-white w-6 h-6 flex-shrink-0" />
                        <span className="sm:inline-block hidden">
                            {children}
                        </span>
                    </span>
                </button>
            </div>
        </div>
    );
};
export default GitHubButton;
