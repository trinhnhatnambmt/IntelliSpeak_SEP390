import { Mic, MicOff, PhoneOff, Repeat } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { robot_assistant, service1 } from "~/assets";
import { selectCurrentInterviewSession } from "~/redux/interview/interviewSessionSlice";
import Vapi from "@vapi-ai/web";
import { selectCurrentUser } from "~/redux/user/userSlice";
import { toast } from "react-toastify";

const InterviewPage = () => {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [activeUser, setActiveUser] = useState(false);
    const [endingCall, setEndingCall] = useState(false);
    const vapi = new Vapi(import.meta.env.VITE_VAPI_PUBLIC_KEY);

    const navigate = useNavigate();

    const handleToggleSpeaking = () => {
        setIsSpeaking((prev) => !prev);
    };

    const currentInterviewSession = useSelector(selectCurrentInterviewSession);
    // console.log(
    //     "🚀 ~ InterviewPage ~ currentInterviewSession:",
    //     currentInterviewSession
    // );
    const currentUser = useSelector(selectCurrentUser);
    // console.log("🚀 ~ InterviewPage ~ currentUser:", currentUser);

    useEffect(() => {
        currentInterviewSession && startCall();
    }, [currentInterviewSession]);

    const startCall = () => {
        let questionList = currentInterviewSession?.questions
            .map((q) => q.content)
            .join(", ");
        const assistantOptions = {
            name: "AI Recruiter",
            firstMessage: `Hi ${currentUser?.userName}, how are you? Ready for your interview on ${currentInterviewSession?.title}?`,
            transcriber: {
                provider: "deepgram",
                model: "nova-2",
                language: "en-US",
            },
            voice: {
                provider: "playht",
                voiceId: "jennifer",
            },
            model: {
                provider: "openai",
                model: "gpt-4",
                messages: [
                    {
                        role: "system",
                        content:
                            `You are an AI voice assistant conducting interviews. 
                        Your job is to ask candidates provided interview questions, assess their responses, 
                        and provide the conversation with a friendly introduction, setting a relaxed yet professional tone. 
                        Example: 'Hey there! Welcome to your ${currentInterviewSession?.title} interview. Let’s get started with a few questions!' 
                        Ask one question at a time and wait for the candidate’s response before proceeding. 
                        Keep the questions clear and concise. Below Are Questions: ${questionList}. 
                        If the candidate struggles, offer hints or rephrase the question without giving away the answer. 
                        Example: 'Need a hint? Think about how React tracks component updates!' 
                        Provide brief, encouraging feedback after each answer. 
                        Example: 'Nice! That’s a solid answer.' 
                        Keep the conversation natural and engaging—use casual phrases like 'Alright, next up...' or 'Let’s tackle a tricky one!' 
                        After 5-7 questions, wrap up the interview smoothly by summarizing their performance. 
                        Example: 'That was great! You handled some tough questions well. Keep sharpening your skills!'
                         End on a positive note: 'Thanks for chatting! Hope to see you crushing projects soon!' 
                         Key Guidelines: 
                         ✓ Be friendly, engaging, and witty 
                         ✓ Keep responses short and natural, like a real conversation 
                         ✓ Adapt based on the candidate’s confidence level 
                         ✓ Ensure the interview remains focused on React`.trim(),
                    },
                ],
            },
        };

        vapi.start(assistantOptions);
    };

    const stopInterView = () => {
        if (endingCall) return; // tránh double click

        setEndingCall(true);
        vapi.stop();
        toast.info("Đang kết thúc cuộc gọi...");
    };

    vapi.on("call-start", () => {
        console.log("Call has started");
        toast.success("Call connected...");
    });

    vapi.on("speech-start", () => {
        console.log("Assistant speech has started");
        setActiveUser(false);
    });

    vapi.on("speech-end", () => {
        console.log("Assistant speech has end");
        setActiveUser(true);
    });

    vapi.on("call-end", () => {
        console.log("Call has end");
        toast.success("Interview ended...");
        setEndingCall(false); // reset lại trạng thái
        navigate("/main");
    });

    return (
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
                    {!activeUser && (
                        <>
                            <div className="absolute w-[100px] h-[100px] rounded-full bg-purple-400 opacity-30 animate-pulseWave z-0"></div>
                            <div className="absolute w-[100px] h-[100px] rounded-full bg-purple-400 opacity-30 animate-pulseWave z-0"></div>
                            <div className="absolute w-[100px] h-[100px] rounded-full bg-purple-400 opacity-30 animate-pulseWave z-0"></div>
                        </>
                    )}

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
            {/* <div className="h-[60px] w-[80%] mx-auto rounded-2xl border border-gray-300 dark:border-[#4B4D4F66] flex items-center justify-center mb-5 relative overflow-hidden">
                    <div
                        className="absolute inset-0 bg-gradient-to-r from-sky-200 to-pink-100 dark:hidden"
                    />

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
                */}

            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-5">
                {/* <button className="px-6 py-3 bg-gray-200 dark:bg-[#24273A] text-gray-800 dark:text-white font-semibold rounded-full hover:bg-gray-300 dark:hover:bg-[#22253a] transition duration-300 flex items-center cursor-pointer">
                        <Repeat className="mr-2 h-4 w-4" />
                        Lặp lại
                    </button> */}

                <button
                    onClick={handleToggleSpeaking}
                    className={`px-6 py-3 text-white font-semibold rounded-full transition duration-300 flex items-center cursor-pointer
                            ${isSpeaking
                            ? "bg-yellow-500 hover:bg-yellow-600"
                            : "bg-green-500 hover:bg-green-600"
                        }`}
                >
                    <>
                        <Mic className="mr h-4 w-4" />
                    </>
                </button>

                <button
                    disabled={endingCall}
                    onClick={stopInterView}
                    className={`px-6 py-3 ${endingCall
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-red-500 hover:bg-red-600"
                        } text-white font-semibold rounded-full transition duration-300 flex items-center`}
                >
                    <PhoneOff className="mr-2 h-4 w-4" />
                    {endingCall ? "Đang kết thúc..." : "Rời khỏi phỏng vấn"}
                </button>
            </div>
        </div>
    );
};

export default InterviewPage;