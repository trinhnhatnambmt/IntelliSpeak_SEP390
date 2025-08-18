import { Mic, PhoneOff } from "lucide-react";
import React, { useState } from "react";
import { robot_assistant } from "~/assets";
import { cn } from "~/lib/utils";

const CallStatus = {
    INACTIVE: "INACTIVE",
    ACTIVE: "ACTIVE",
    CONNECTING: "CONNECTING",
    FINISHED: "FINISHED",
};

const Agent = ({ userAvatar }) => {
    const isSpeaking = true;
    const callStatus = CallStatus.INACTIVE;
    const messages = [
        "Hello, how can I assist you today?",
        "I am here to help you with your queries.",
    ];
    const lastMessage = messages[messages.length - 1];

    return (
        <div>
            <div className="flex items-center justify-center gap-5 mb-5">
                <div className="w-[40vw] h-[40vh] rounded-2xl flex items-center justify-center border-2 border-purple-300 dark:border-purple-300 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-sky-200 to-pink-100 dark:hidden" />

                    <div
                        className="absolute inset-0 hidden dark:block"
                        style={{
                            background:
                                "linear-gradient(0deg, rgba(19, 17, 42, 1) 17%, rgba(24, 21, 55, 1) 63%)",
                        }}
                    />

                    {isSpeaking && (
                        <div className="absolute w-[100px] h-[100px] rounded-full bg-purple-400 opacity-30 animate-pulseWave z-0"></div>
                    )}

                    <div
                        className="w-[120px] h-[120px] rounded-full flex items-center justify-center z-10"
                        style={{
                            background:
                                "radial-gradient(circle, rgba(238, 174, 202, 1) 0%, rgba(148, 187, 233, 1) 87%)",
                        }}
                    >
                        <img
                            src={robot_assistant}
                            alt="robot"
                            className="w-[66px] h-[66px] object-cover"
                        />
                    </div>
                    <h1 className="absolute bottom-[70px] text-lg font-semibold text-gray-800 dark:text-gray-200">
                        AI Assistant
                    </h1>
                </div>

                <div className="w-[40vw] h-[40vh] rounded-2xl flex items-center justify-center border-2 border-gray-300 dark:border-[#4B4D4F66] relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-sky-200 to-pink-100 dark:hidden" />

                    <div
                        className="absolute inset-0 hidden dark:block"
                        style={{
                            background:
                                "linear-gradient(0deg, rgba(8, 9, 13, 1) 6%, rgba(26, 28, 32, 1) 74%)",
                        }}
                    />

                    <img
                        src={userAvatar}
                        className="w-[120px] h-[120px] rounded-full z-10"
                    />
                    <h1 className="absolute bottom-[70px] text-lg font-semibold text-gray-800 dark:text-gray-200">
                        You
                    </h1>
                </div>
            </div>

            {messages.length > 0 && (
                <div
                    className="rounded-2xl min-h-12 px-5 py-4 flex items-center justify-center mb-8 border-gray-300 dark:border-[#4B4D4F66]  border-2"
                    style={{
                        background:
                            "linear-gradient(0deg, rgba(8, 9, 13, 1) 6%, rgba(26, 28, 32, 1) 74%)",
                    }}
                >
                    <p className="text-lg text-center text-white">
                        {lastMessage}
                    </p>
                </div>
            )}

            <div className="flex items-center justify-center gap-5">
                {callStatus !== CallStatus.ACTIVE ? (
                    <button
                        className={` px-10 py-3 text-white font-semibold rounded-full transition duration-300 flex items-center cursor-pointer 
                            bg-green-500 hover:bg-green-600`}
                    >
                        <span
                            className={cn(
                                "absolute animate-ping rounded-full opacity-75",
                                callStatus !== "CONNECTING" && "hidden"
                            )}
                        />
                        <span>
                            {callStatus === CallStatus.INACTIVE ||
                            callStatus === CallStatus.FINISHED
                                ? "Start"
                                : "Connecting..."}
                        </span>
                    </button>
                ) : (
                    <button
                        className={`px-10 py-3 text-white font-semibold rounded-full transition duration-300 flex items-center cursor-pointer 
                            bg-red-500 hover:bg-red-600`}
                    >
                        <span className="flex items-center gap-2">
                            {/* <PhoneOff className="mr-2 h-4 w-4" /> */}
                            End
                        </span>
                    </button>
                )}
            </div>
        </div>
    );
};

export default Agent;
