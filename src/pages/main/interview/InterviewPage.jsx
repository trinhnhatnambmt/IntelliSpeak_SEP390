import { Mic, MicOff, PhoneOff, Repeat } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { robot_assistant } from "~/assets";
import { selectCurrentInterviewSession } from "~/redux/interview/interviewSessionSlice";
import Vapi from "@vapi-ai/web";
import { selectCurrentUser } from "~/redux/user/userSlice";
import { toast } from "react-toastify";
import { interviewFeedbackAPI } from "~/redux/interview/feedbackSlice";
import Agent from "~/components/agent/Agent";

const InterviewPage = () => {
    const [activeUser, setActiveUser] = useState(false);
    const [endingCall, setEndingCall] = useState(false);
    const [conversation, setConversation] = useState([]);
    const [feedbackSent, setFeedbackSent] = useState(false);
    const vapi = new Vapi(import.meta.env.VITE_VAPI_PUBLIC_KEY);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const currentInterviewSession = useSelector(selectCurrentInterviewSession);

    const currentUser = useSelector(selectCurrentUser);

    useEffect(() => {
        currentInterviewSession && startCall();
    }, [currentInterviewSession]);

    useEffect(() => {
        if (endingCall && conversation.length > 0 && !feedbackSent) {
            generateFeedback();
            setFeedbackSent(true);
        }
    }, [endingCall, conversation, feedbackSent]);

    const startCall = () => {
        let questionList = currentInterviewSession?.questions
            .map((q) => q.content)
            .join(", ");
        const assistantOptions = {
            name: "AI Recruiter",
            firstMessage: `Chào ${currentUser?.userName}, bạn đã sẵn sàng cho buổi ${currentInterviewSession?.title} chưa?`,

            transcriber: {
                provider: "11labs",
                model: "scribe_v1",
                language: "vi",
            },
            voice: {
                provider: "11labs",
                voiceId: "iSFxP4Z6YNcx9OXl62Ic",
                model: "eleven_flash_v2_5",
                language: "vi",
            },
            model: {
                provider: "openai",
                model: "gpt-5",
                messages: [
                    {
                        role: "system",
                        content: `
                        Bạn là một trợ lý AI giọng nói thực hiện các buổi phỏng vấn bằng tiếng Việt. 
                        Nhiệm vụ của bạn là hỏi các câu hỏi phỏng vấn đã được cung cấp, đánh giá câu trả lời của ứng viên, 
                        và dẫn dắt cuộc trò chuyện với phần giới thiệu thân thiện, tạo không khí thoải mái nhưng vẫn chuyên nghiệp. 
                        Ví dụ: 'Chào bạn! Chào mừng đến với buổi phỏng vấn ${currentInterviewSession?.title}. Cùng bắt đầu nào!' 
                        Hỏi từng câu một và chờ phản hồi từ ứng viên trước khi tiếp tục. 
                        Đặt câu hỏi rõ ràng, ngắn gọn. Danh sách câu hỏi: ${questionList}. 
                        Nếu ứng viên lúng túng, hãy đưa ra gợi ý hoặc diễn đạt lại câu hỏi mà không tiết lộ đáp án. 
                        Ví dụ: 'Cần gợi ý không? Hãy nghĩ về cách React quản lý việc cập nhật component!' 
                        Đưa ra phản hồi ngắn gọn, khích lệ sau mỗi câu trả lời. 
                        Ví dụ: 'Hay lắm! Câu trả lời rất tốt.' 
                        Giữ cuộc trò chuyện tự nhiên, gần gũi—sử dụng các cụm từ như 'Nào, câu tiếp theo nhé...' hoặc 'Câu này hơi thử thách đây!' 
                        Sau 5-7 câu hỏi, kết thúc buổi phỏng vấn một cách tự nhiên bằng cách tóm tắt hiệu suất của ứng viên. 
                        Ví dụ: 'Tuyệt vời! Bạn đã trả lời rất tốt, đặc biệt là với những câu khó. Hãy tiếp tục rèn luyện nhé!' 
                        Kết thúc bằng một câu tích cực: 'Cảm ơn bạn đã tham gia! Chúc bạn sớm bứt phá trong các dự án!' 
                        Hướng dẫn chính: 
                        ✓ Thân thiện, gần gũi, và dí dỏm 
                        ✓ Giữ câu trả lời ngắn gọn, tự nhiên như cuộc trò chuyện thật 
                        ✓ Điều chỉnh dựa trên mức độ tự tin của ứng viên 
                        ✓ Đảm bảo buổi phỏng vấn tập trung vào những nội dung thuộc câu hỏi đã nêu ra
                    `.trim(),
                    },
                ],
            },
        };

        vapi.start(assistantOptions);
    };

    const stopInterView = () => {
        if (endingCall) return; // tránh double click

        setEndingCall(true);

        if (vapi.localStream) {
            vapi.localStream.getAudioTracks().forEach((track) => {
                track.stop();
            });
            console.log("Mic muted immediately");
        }

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
        setEndingCall(true); // reset lại trạng thái
    });

    vapi.on("message", (message) => {
        if (Array.isArray(message?.conversation)) {
            console.log(message.conversation);

            setConversation(message.conversation.slice(1));
        }
    });

    const generateFeedback = () => {
        console.log("Sending feedback with conversation:", conversation);
        toast
            .promise(
                dispatch(
                    interviewFeedbackAPI({
                        interviewSession: currentInterviewSession,
                        chatHistory: conversation,
                    })
                ),
                {
                    pending: "Đang chờ để gửi feedback...",
                }
            )
            .then((res) => {
                if (!res.error) {
                    toast.success(
                        "Tạo xong feedback rồi nhé mời bạn đọc và cải thiện nha."
                    );
                }
                navigate(
                    `/main/feedback/${currentInterviewSession?.interviewSessionId}`
                );
            });
    };
    return (
        <div className="h-full w-full transition-colors duration-300">
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
                <Agent userAvatar={currentUser?.avatar} />

                {/* <div className="flex items-center justify-center gap-5 mb-5">
                    <div className="w-[40vw] h-[40vh] rounded-2xl flex items-center justify-center border-2 border-purple-300 dark:border-purple-400 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-sky-200 to-pink-100 dark:hidden" />

                        <div
                            className="absolute inset-0 hidden dark:block"
                            style={{
                                background:
                                    "linear-gradient(0deg, rgba(19, 17, 42, 1) 17%, rgba(24, 21, 55, 1) 63%)",
                            }}
                        />

                        {!activeUser && (
                            <>
                                <div className="absolute w-[100px] h-[100px] rounded-full bg-purple-400 opacity-30 animate-pulseWave z-0"></div>
                                <div className="absolute w-[100px] h-[100px] rounded-full bg-purple-400 opacity-30 animate-pulseWave z-0"></div>
                                <div className="absolute w-[100px] h-[100px] rounded-full bg-purple-400 opacity-30 animate-pulseWave z-0"></div>
                            </>
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
                            src={currentUser?.avatar}
                            className="w-[120px] h-[120px] rounded-full z-10"
                        />
                    </div>
                </div> */}

                {/* <div className="flex items-center justify-center gap-5">
                    <button
                        className={`px-6 py-3 text-white font-semibold rounded-full transition duration-300 flex items-center cursor-pointer 
                            bg-green-500 hover:bg-green-60`}
                    >
                        <>
                            <Mic className="mr h-4 w-4" />
                        </>
                    </button>

                    <button
                        disabled={endingCall}
                        onClick={stopInterView}
                        className={`px-6 py-3 ${
                            endingCall
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-red-500 hover:bg-red-600"
                        } text-white font-semibold rounded-full transition duration-300 flex items-center`}
                    >
                        <PhoneOff className="mr-2 h-4 w-4" />
                        {endingCall ? "Đang kết thúc..." : "Rời khỏi phỏng vấn"}
                    </button>
                </div> */}
            </div>
        </div>
    );
};

export default InterviewPage;
