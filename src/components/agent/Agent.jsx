import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { robot_assistant } from "~/assets";
import {
    interviewer,
    interviewer2,
    interviewerVN1,
    interviewerVN2,
} from "~/constants";
import { cn, detectLanguage } from "~/lib/utils";
import { vapi } from "~/lib/vapi.sdk";
import { selectCurrentCompany } from "~/redux/company/companySlice";
import {
    interviewFeedbackAPI,
    interviewFeedbackVietnameseAPI,
} from "~/redux/interview/feedbackSlice";

const CallStatus = {
    INACTIVE: "INACTIVE",
    ACTIVE: "ACTIVE",
    CONNECTING: "CONNECTING",
    FINISHED: "FINISHED",
};

const Agent = ({ userAvatar, currentInterviewSession, currentUser }) => {
    const navigate = useNavigate();
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isUserSpeaking, setIsUserSpeaking] = useState(false);
    const [callStatus, setCallStatus] = useState(CallStatus.INACTIVE);

    const [messages, setMessages] = useState([]);
    const [lastMessage, setLastMessage] = useState("");
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);

    const companyDetail = useSelector(selectCurrentCompany);
    const companyLogo = companyDetail?.logoUrl;
    const companyName = companyDetail?.name;

    const dispatch = useDispatch();

    const questionList =
        currentInterviewSession?.questions?.map(
            (question) => question.content
        ) || [];

    const detectLanguageFromSession = (currentInterviewSession) => {
        if (!currentInterviewSession || !currentInterviewSession?.title)
            return "unknown";

        const textToAnalyze = currentInterviewSession?.title;

        const language = detectLanguage(textToAnalyze);

        return language;
    };

    useEffect(() => {
        const onCallStart = () => {
            setCallStatus(CallStatus.ACTIVE);
        };

        const onCallEnd = () => {
            setCallStatus(CallStatus.FINISHED);
            setCurrentQuestionIndex(-1);
        };

        const onMessage = (message) => {
            if (
                message.type === "transcript" &&
                message.transcriptType === "final"
            ) {
                const newMessage = {
                    role: message.role,
                    content: message.transcript,
                };
                setMessages((prev) => [...prev, newMessage]);
                if (message.role === "user") {
                    setIsUserSpeaking(true);
                    setTimeout(() => setIsUserSpeaking(false), 1000);
                } else if (message.role === "assistant") {
                    const questionIndex = questionList.findIndex((question) =>
                        message.transcript
                            .toLowerCase()
                            .includes(question.toLowerCase())
                    );
                    if (questionIndex !== -1) {
                        setCurrentQuestionIndex(questionIndex);
                    }
                }
            }
        };

        const onSpeechStart = () => {
            console.log("speech start");
            setIsSpeaking(true);
        };

        const onSpeechEnd = () => {
            console.log("speech end");
            setIsSpeaking(false);
        };

        const onError = (error) => {
            console.log("Error:", error);
        };

        vapi.on("call-start", onCallStart);
        vapi.on("call-end", onCallEnd);
        vapi.on("message", onMessage);
        vapi.on("speech-start", onSpeechStart);
        vapi.on("speech-end", onSpeechEnd);
        vapi.on("error", onError);

        return () => {
            vapi.off("call-start", onCallStart);
            vapi.off("call-end", onCallEnd);
            vapi.off("message", onMessage);
            vapi.off("speech-start", onSpeechStart);
            vapi.off("speech-end", onSpeechEnd);
            vapi.off("error", onError);
        };
    }, []);

    useEffect(() => {
        if (messages.length > 0) {
            setLastMessage(messages[messages.length - 1].content);
        }

        const handleGenerateFeedback = () => {
            if (!currentInterviewSession || !messages.length) {
                toast.error("No session or chat history available!");
                return;
            }

            const feedbackApi =
                detectLanguageFromSession(currentInterviewSession) ===
                "vietnamese"
                    ? interviewFeedbackVietnameseAPI
                    : interviewFeedbackAPI;

            toast
                .promise(
                    dispatch(
                        feedbackApi({
                            interviewSession: currentInterviewSession,
                            chatHistory: messages,
                        })
                    ),
                    {
                        pending: "Waiting to send feedback...",
                    }
                )
                .then((res) => {
                    if (!res.error) {
                        toast.success(
                            "Created feedback, please read and improve."
                        );
                        navigate(
                            `/main/feedback/${currentInterviewSession?.interviewSessionId}`
                        );
                    }
                })
                .catch((error) => {
                    toast.error(
                        "An error occurred while creating feedback, please try again later!!"
                    );
                    navigate(`/main/topic`);
                });
        };

        if (callStatus === CallStatus.FINISHED) {
            handleGenerateFeedback();
        }
    }, [messages, callStatus]);

    const handleCall = async () => {
        setCallStatus(CallStatus.CONNECTING);
        let questionList = currentInterviewSession?.questions
            .map((q) => q.content)
            .join(", ");

        let assistantOptions;

        if (
            currentInterviewSession?.companyId &&
            detectLanguageFromSession(currentInterviewSession) === "vietnamese"
        ) {
            assistantOptions = interviewerVN2(
                currentUser,
                currentInterviewSession,
                questionList,
                companyDetail
            );
        } else if (
            detectLanguageFromSession(currentInterviewSession) === "vietnamese"
        ) {
            assistantOptions = interviewerVN1(
                currentUser,
                currentInterviewSession,
                questionList
            );
        } else if (currentInterviewSession?.companyId) {
            assistantOptions = interviewer2(
                currentUser,
                currentInterviewSession,
                questionList,
                companyDetail
            );
        } else {
            assistantOptions = interviewer(
                currentUser,
                currentInterviewSession,
                questionList
            );
        }

        await vapi.start(assistantOptions);
    };

    const handleDisconnect = () => {
        setCallStatus(CallStatus.FINISHED);
        vapi.stop();
    };

    const isCallInactiveOrFinished =
        callStatus === CallStatus.INACTIVE ||
        callStatus === CallStatus.FINISHED;

    return (
        <div className="flex gap-5">
            <div className="w-[25vw] h-[60vh] rounded-2xl border-2 border-gray-300 dark:border-[#4B4D4F66] p-4 overflow-y-auto relative">
                <div className="absolute inset-0 bg-gradient-to-br from-sky-200 to-pink-100 dark:hidden" />
                <div
                    className="absolute inset-0 hidden dark:block"
                    style={{
                        background:
                            "linear-gradient(0deg, rgba(8, 9, 13, 1) 6%, rgba(26, 28, 32, 1) 74%)",
                    }}
                />
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 relative z-10">
                    Question list
                </h2>
                {questionList.length > 0 ? (
                    <ul className="space-y-3 relative z-10">
                        {questionList.map((question, index) => (
                            <li
                                key={index}
                                className={cn(
                                    "text-gray-700 dark:text-gray-300 text-sm bg-white dark:bg-gray-800 bg-opacity-80 dark:bg-opacity-80 p-3 rounded-lg shadow-sm",
                                    index === currentQuestionIndex &&
                                        "bg-purple-200 dark:bg-purple-600 text-gray-900 dark:text-gray-100 border border-purple-400 dark:border-purple-400"
                                )}
                            >
                                {index + 1}. {question}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500 dark:text-gray-400 text-sm relative z-10">
                        No question
                    </p>
                )}
            </div>

            <div className="flex-1 w-[60%]">
                <div className="flex items-center justify-center gap-5 mb-5">
                    <div
                        className={cn(
                            `w-[40vw] h-[40vh] rounded-2xl flex items-center justify-center border border-purple-200 dark:border-purple-200 relative overflow-hidden`,
                            isSpeaking &&
                                "border-2 border-purple-400 dark:border-purple-400"
                        )}
                    >
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
                                src={
                                    currentInterviewSession?.companyId
                                        ? companyLogo || robot_assistant
                                        : robot_assistant
                                }
                                alt="robot"
                                className="w-[66px] h-[66px] object-cover rounded-full"
                            />
                        </div>
                        <h1 className="absolute bottom-[70px] text-lg font-semibold text-gray-800 dark:text-gray-200">
                            {currentInterviewSession?.companyId
                                ? companyName
                                : "AI Assistant"}
                        </h1>
                    </div>

                    <div
                        className={cn(
                            "w-[40vw] h-[40vh] rounded-2xl flex items-center justify-center border-2 border-gray-300 dark:border-[#4B4D4F66] relative overflow-hidden",
                            isUserSpeaking &&
                                "border-2 border-purple-400 dark:border-purple-400"
                        )}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-sky-200 to-pink-100 dark:hidden" />

                        {isUserSpeaking && (
                            <div className="absolute w-[100px] h-[100px] rounded-full bg-purple-400 opacity-30 animate-pulseWave z-10"></div>
                        )}

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
                        <p
                            className={cn(
                                "text-lg text-center text-white opacity-0 animate-smoothFadeIn"
                            )}
                        >
                            {lastMessage}
                        </p>
                    </div>
                )}

                <div className="flex items-center justify-center gap-5">
                    {callStatus !== CallStatus.ACTIVE ? (
                        <button
                            className={` px-10 py-3 text-white font-semibold rounded-full transition duration-300 flex items-center cursor-pointer 
                                bg-green-500 hover:bg-green-600`}
                            onClick={handleCall}
                        >
                            <span
                                className={cn(
                                    "absolute animate-ping rounded-full opacity-75",
                                    callStatus !== "CONNECTING" && "hidden"
                                )}
                            />
                            <span>
                                {isCallInactiveOrFinished
                                    ? "Start"
                                    : "Connecting..."}
                            </span>
                        </button>
                    ) : (
                        <button
                            className={`px-10 py-3 text-white font-semibold rounded-full transition duration-300 flex items-center cursor-pointer 
                                bg-red-500 hover:bg-red-600`}
                            onClick={() => handleDisconnect()}
                        >
                            <span className="flex items-center gap-2">End</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Agent;
