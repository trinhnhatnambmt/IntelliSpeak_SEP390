import { Mic, PhoneOff } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { robot_assistant } from "~/assets";
import { cn } from "~/lib/utils";
import { vapi } from "~/lib/vapi.sdk";
import { interviewFeedbackAPI } from "~/redux/interview/feedbackSlice";

const CallStatus = {
    INACTIVE: "INACTIVE",
    ACTIVE: "ACTIVE",
    CONNECTING: "CONNECTING",
    FINISHED: "FINISHED",
};

const Agent = ({ userAvatar, currentInterviewSession, currentUser }) => {
    const navigate = useNavigate();
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [callStatus, setCallStatus] = useState(CallStatus.INACTIVE);

    const [messages, setMessages] = useState([]);
    const [lastMessage, setLastMessage] = useState("");

    const dispatch = useDispatch();

    useEffect(() => {
        const onCallStart = () => {
            setCallStatus(CallStatus.ACTIVE);
        };

        const onCallEnd = () => {
            setCallStatus(CallStatus.FINISHED);
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
            toast
                .promise(
                    dispatch(
                        interviewFeedbackAPI({
                            interviewSession: currentInterviewSession,
                            chatHistory: messages,
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

        if (callStatus === CallStatus.FINISHED) {
            handleGenerateFeedback();
        }
    }, [messages, callStatus]);

    const handleCall = async () => {
        setCallStatus(CallStatus.CONNECTING);
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

        await vapi.start(assistantOptions);
    };

    const handleDisconnect = () => {
        setCallStatus(CallStatus.FINISHED);
        vapi.stop();
    };

    // const latestMessage = messages[messages.length - 1]?.content;
    console.log("messages", messages);
    const isCallInactiveOrFinished =
        callStatus === CallStatus.INACTIVE ||
        callStatus === CallStatus.FINISHED;

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
                    <p
                        className={cn(
                            "text-lg text-center text-white transition-opacity duration-500 opacity-0",
                            "animate-fadeIn opacity-100"
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
    );
};

export default Agent;
