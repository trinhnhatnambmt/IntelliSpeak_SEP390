import { Mic, MicOff, PhoneOff, Repeat } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { robot_assistant, service1 } from "~/assets";

const InterviewPage = () => {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const navigate = useNavigate();

    const handleToggleSpeaking = () => {
        setIsSpeaking((prev) => !prev);
    };

    return (
        <div className="h-full w-full bg-gray-50 dark:bg-[#18182a] transition-colors duration-300">
            <div className="container mx-auto px-5 relative z-10">
                {/* Header Section */}
                <div className="flex items-center justify-between mt-30 mb-10">
                    <h1 className="font-extrabold text-4xl text-gray-900 dark:text-white">
                        Tiêu đề của phỏng vấn
                    </h1>
                    <div className="rounded-xl py-2 px-2 text-lg  bg-gradient-to-r from-sky-200 to-pink-100 dark:bg-[#24273A] dark:bg-none">
                        Technical
                    </div>
                </div>

                {/* Video Containers */}
                <div className="flex items-center justify-center gap-5 mb-5">
                    {/* Left Box (Robot) */}
                    <div className="w-[40vw] h-[40vh] rounded-2xl flex items-center justify-center border-2 border-purple-300 dark:border-purple-400 relative overflow-hidden">
                        {/* Light Mode Gradient */}
                        <div
                            className="absolute inset-0 bg-gradient-to-br from-sky-200 to-pink-100 dark:hidden"
                        />

                        {/* Dark Mode Gradient */}
                        <div
                            className="absolute inset-0 hidden dark:block"
                            style={{
                                background: "linear-gradient(0deg, rgba(19, 17, 42, 1) 17%, rgba(24, 21, 55, 1) 63%)"
                            }}
                        />

                        {/* Pulsing Circles */}
                        <div className="absolute w-[100px] h-[100px] rounded-full bg-purple-200 dark:bg-purple-400 opacity-30 animate-pulseWave z-0"></div>
                        <div className="absolute w-[100px] h-[100px] rounded-full bg-purple-200 dark:bg-purple-400 opacity-30 animate-pulseWave z-0"></div>
                        <div className="absolute w-[100px] h-[100px] rounded-full bg-purple-200 dark:bg-purple-400 opacity-30 animate-pulseWave z-0"></div>

                        {/* Robot Avatar */}
                        <div
                            className="w-[120px] h-[120px] rounded-full flex items-center justify-center z-10"
                            style={{
                                background: "radial-gradient(circle, rgba(238, 174, 202, 1) 0%, rgba(148, 187, 233, 1) 87%)"
                            }}
                        >
                            <img
                                src={robot_assistant}
                                alt="robot"
                                className="w-[66px] h-[66px] object-cover"
                            />
                        </div>
                    </div>

                    {/* Right Box (User) */}
                    <div className="w-[40vw] h-[40vh] rounded-2xl flex items-center justify-center border-2 border-gray-300 dark:border-[#4B4D4F66] relative overflow-hidden">
                        {/* Light Mode Gradient */}
                        <div
                            className="absolute inset-0 bg-gradient-to-br from-sky-200 to-pink-100 dark:hidden"
                        />

                        {/* Dark Mode Gradient */}
                        <div
                            className="absolute inset-0 hidden dark:block"
                            style={{
                                background: "linear-gradient(0deg, rgba(8, 9, 13, 1) 6%, rgba(26, 28, 32, 1) 74%)"
                            }}
                        />

                        <img
                            src={service1}
                            className="w-[120px] h-[120px] rounded-full z-10"
                        />
                    </div>
                </div>

                {/* Question Box */}
                <div className="h-[60px] w-[80%] mx-auto rounded-2xl border border-gray-300 dark:border-[#4B4D4F66] flex items-center justify-center mb-5 relative overflow-hidden">
                    {/* Light Mode Gradient */}
                    <div
                        className="absolute inset-0 bg-gradient-to-r from-sky-200 to-pink-100 dark:hidden"
                    />

                    {/* Dark Mode Gradient */}
                    <div
                        className="absolute inset-0 hidden dark:block"
                        style={{
                            background: "linear-gradient(0deg, rgba(8, 9, 13, 1) 6%, rgba(26, 28, 32, 1) 74%)"
                        }}
                    />

                    <p className="text-gray-800 dark:text-white text-xl relative z-10">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit, tenetur?
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-center gap-5">
                    <button className="px-6 py-3 bg-gray-200 dark:bg-[#24273A] text-gray-800 dark:text-white font-semibold rounded-full hover:bg-gray-300 dark:hover:bg-[#22253a] transition duration-300 flex items-center cursor-pointer">
                        <Repeat className="mr-2 h-4 w-4" />
                        Lặp lại
                    </button>

                    <button
                        onClick={handleToggleSpeaking}
                        className={`px-6 py-3 text-white font-semibold rounded-full transition duration-300 flex items-center cursor-pointer
                            ${isSpeaking
                                ? "bg-yellow-500 hover:bg-yellow-600"
                                : "bg-green-500 hover:bg-green-600"
                            }`}
                    >
                        {isSpeaking ? (
                            <>
                                <MicOff className="mr-2 h-4 w-4" />
                                Đang nói...
                            </>
                        ) : (
                            <>
                                <Mic className="mr-2 h-4 w-4" />
                                Nhấn để nói
                            </>
                        )}
                    </button>

                    <button
                        onClick={() => navigate("/main")}
                        className="px-6 py-3 bg-red-500 text-white font-semibold rounded-full hover:bg-red-600 transition duration-300 flex items-center cursor-pointer"
                    >
                        <PhoneOff className="mr-2 h-4 w-4" />
                        Rời khỏi phỏng vấn
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InterviewPage;