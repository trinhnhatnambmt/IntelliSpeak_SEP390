import { Mic, MicOff, PhoneOff, Repeat } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { robot_assistant, service1 } from "~/assets";

const InterviewPage = () => {
    const [isSpeaking, setIsSpeaking] = useState(false);

    const navigate = useNavigate();

    const handleToggleSpeaking = () => {
        setIsSpeaking((prev) => !prev);
        // TODO: Gọi hàm bắt đầu / dừng ghi âm ở đây nếu cần
    };
    return (
        <div className="h-full w-full bg-[#0e0c15]">
            <div className="container mx-auto px-5 relative z-10">
                <div className="flex items-center justify-between mt-30 mb-10">
                    <h1 className="font-extrabold text-4xl">
                        Tiêu đề của phỏng vấn
                    </h1>
                    <div className=" rounded-xl py-2 px-2 text-lg bg-[#24273A]">
                        Technical
                    </div>
                </div>
                <div className="flex items-center justify-center gap-5 mb-5">
                    <div
                        className="w-[40vw] h-[40vh]  rounded-2xl flex items-center justify-center border-2 border-purple-400 "
                        style={{
                            background:
                                "linear-gradient(0deg,rgba(19, 17, 42, 1) 17%, rgba(24, 21, 55, 1) 63%)",
                        }}
                    >
                        <div className="absolute w-[100px] h-[100px] rounded-full bg-purple-400 opacity-30 animate-pulseWave z-0"></div>
                        <div className="absolute w-[100px] h-[100px] rounded-full bg-purple-400 opacity-30 animate-pulseWave z-0"></div>
                        <div className="absolute w-[100px] h-[100px] rounded-full bg-purple-400 opacity-30 animate-pulseWave z-0"></div>

                        <div
                            className="w-[120px] h-[120px] rounded-full flex items-center justify-center z-10"
                            style={{
                                background:
                                    "radial-gradient(circle,rgba(238, 174, 202, 1) 0%, rgba(148, 187, 233, 1) 87%)",
                            }}
                        >
                            <img
                                src={robot_assistant}
                                alt="robot"
                                className="w-[66px] h-[66px] object-cover"
                            />
                        </div>
                    </div>
                    <div
                        className="w-[40vw] h-[40vh]  rounded-2xl  flex items-center justify-center border-2 border-[#4B4D4F66]"
                        style={{
                            background:
                                "linear-gradient(0deg,rgba(8, 9, 13, 1) 6%, rgba(26, 28, 32, 1) 74%)",
                        }}
                    >
                        <img
                            src={service1}
                            className="w-[120px] h-[120px] rounded-full"
                        />
                    </div>
                </div>

                <div
                    className="h-[60px] w-[80%]  mx-auto rounded-2xl border-1 border-[#4B4D4F66] flex items-center justify-center mb-5"
                    style={{
                        background:
                            "linear-gradient(0deg,rgba(8, 9, 13, 1) 6%, rgba(26, 28, 32, 1) 74%)",
                    }}
                >
                    <p className="text-white text-xl">
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Sit, tenetur?
                    </p>
                </div>
                <div className="flex items-center justify-center gap-5">
                    <button className="px-6 py-3 bg-[#24273A] text-white font-semibold rounded-full hover:bg-[#22253a] transition duration-300 flex items-center cursor-pointer">
                        <Repeat className="mr-2 h-4 w-4" />
                        Lặp lại
                    </button>

                    {/* Nút nhấn để nói */}
                    <button
                        onClick={handleToggleSpeaking}
                        className={`px-6 py-3 text-white font-semibold rounded-full transition duration-300 flex items-center cursor-pointer
          ${
              isSpeaking
                  ? "bg-yellow-500 hover:bg-yellow-600"
                  : "bg-green-500 hover:bg-green-600"
          }
        `}
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
