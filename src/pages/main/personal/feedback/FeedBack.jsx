import dayjs from "dayjs";
import { CalendarIcon, House, PhoneOff, Repeat, Star } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectInterviewFeedback } from "~/redux/interview/feedbackSlice";

const FeedBack = () => {
    const navigate = useNavigate();
    const interviewFeedback = useSelector(selectInterviewFeedback);
    console.log("🚀 ~ FeedBack ~ interviewFeedback:", interviewFeedback);
    const formattedDate = dayjs(interviewFeedback?.startedAt).format(
        "MMM DD, YYYY – h:mm A"
    );

    return (
        <div className="container mx-auto px-5">
            <h1 className="font-extrabold text-4xl text-center mt-40 mb-5">
                Feedback on the Interview — Frontend Developer Interview
            </h1>
            <div className="flex items-center justify-center gap-10 mb-10">
                <div className="flex items-center gap-2">
                    <p className="flex items-center gap-1 text-lg font-semibold">
                        <Star /> Kết quả tổng quan:
                    </p>
                    <p>{interviewFeedback?.averageScore}/10</p>
                </div>
                <div className="flex items-center gap-1 text-lg font-semibold">
                    <CalendarIcon /> <p>{formattedDate}</p>
                </div>
            </div>
            <div className="w-[90%] h-[1px] bg-gray-400 mx-auto"></div>
            <p className="w-[70%] text-lg mx-auto mt-10 text-gray-800 dark:text-[#D2DEF1]">
                {interviewFeedback?.aiOverallEvaluate}
            </p>
            <div className="w-[90%] mx-auto mt-10 mb-10">
                <h2 className="font-extrabold text-3xl mt-10 mb-5">
                    Đánh giá dựa vô từng câu hỏi:
                </h2>
                {interviewFeedback?.results?.map((result, index) => (
                    <div key={result.questionId} className="mt-5">
                        <h3 className="font-extrabold text-lg text-gray-800 dark:text-[#D2DEF1]">
                            {index + 1}. {result.question}
                        </h3>
                        <div className="mt-2">
                            <p className="text-gray-600 dark:text-[#B0C4DE] mb-3">
                                <span className="font-semibold">
                                    Câu trả lời gợi ý 1:
                                </span>{" "}
                                {result.suitableAnswer1 ||
                                    "Không có câu trả lời"}
                            </p>
                            <p className="text-gray-600 dark:text-[#B0C4DE] mb-3">
                                <span className="font-semibold">
                                    Câu trả lời gợi ý 2:
                                </span>{" "}
                                {result.suitableAnswer2 ||
                                    "Không có câu trả lời"}
                            </p>
                            <p className="text-gray-600 dark:text-[#B0C4DE]">
                                <span className="font-semibold">
                                    Câu trả lời của bạn:
                                </span>{" "}
                                {result.userAnswer || "Không có câu trả lời"}
                            </p>
                            <p className="mt-2 text-gray-600 dark:text-[#B0C4DE]">
                                <span className="font-semibold">Độ chính xác của câu trả lời:</span>{" "}
                                {result.feedback.knowledge.correctness}
                            </p>
                            <p className="mt-2 text-gray-600 dark:text-[#B0C4DE]">
                                <span className="font-semibold">
                                    Điểm mạnh:
                                </span>{" "}
                                {result.feedback.knowledge.strengths ||
                                    "Không có"}
                            </p>
                            
                            <p className="mt-2 text-gray-600 dark:text-[#B0C4DE]">
                                <span className="font-semibold">
                                    Cần cải thiện:
                                </span>{" "}
                                {result.feedback.knowledge.improvement}
                            </p>
                            <div className="mt-5 relative z-10">
                                <div className="flex items-center gap-2">
                                    <h2 className="font-extrabold text-3xl">
                                        Kết luận:
                                    </h2>
                                    <div className="w-[262px] h-[40px] rounded-2xl bg-gray-200 dark:bg-[#27282F] flex items-center justify-center">
                                        <p className="text-2xl font-extrabold text-red-400">
                                            Not Recommended
                                        </p>
                                    </div>
                                </div>
                                <p className="mt-2 text-gray-600 dark:text-[#B0C4DE]">
                                    {result.feedback.conclusion}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}

                <div className="flex items-center justify-center gap-5 mt-10 relative z-10">
                    <button
                        onClick={() => navigate("/main")}
                        className="px-6 py-3 bg-violet-500 text-white font-semibold rounded-full hover:bg-violet-600 transition duration-300 flex items-center cursor-pointer"
                    >
                        <House className="mr-2 h-4 w-4" />
                        Trở lại trang chủ
                    </button>
                    {/* <button
                        onClick={() => navigate("#")}
                        className="px-6 py-3 bg-gray-700 text-white font-semibold rounded-full hover:bg-gray-800 transition duration-300 flex items-center cursor-pointer"
                    >
                        <Repeat className="mr-2 h-4 w-4" />
                        Làm lại phỏng vấn
                    </button> */}
                </div>
            </div>
        </div>
    );
};

export default FeedBack;
