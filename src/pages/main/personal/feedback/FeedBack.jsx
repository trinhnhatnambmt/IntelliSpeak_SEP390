// Phần import giữ nguyên
import dayjs from "dayjs";
import { CalendarIcon, House, Star } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getInterviewHistoryById } from "~/apis";
import { selectInterviewFeedback } from "~/redux/interview/feedbackSlice";

const FeedBack = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const interviewFeedbackRedux = useSelector(selectInterviewFeedback);
    const [interviewFeedback, setInterviewFeedback] = useState(
        interviewFeedbackRedux
    );

    useEffect(() => {
        if (!interviewFeedbackRedux && id) {
            getInterviewHistoryById(id).then((data) => {
                setInterviewFeedback(data);
            });
        }
    }, [id, interviewFeedbackRedux]);

    const formattedDate = dayjs(interviewFeedback?.startedAt).format(
        "MMM DD, YYYY – h:mm A"
    );

    // const currentInterviewSession = useSelector(selectCurrentInterviewSession);
    // console.log("🚀 ~ FeedBack ~ currentInterviewSession:", currentInterviewSession)

    return (
        <div className="max-w-5xl mx-auto px-6 py-20">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
                Feedback — After Interview Practice
            </h1>

            <div className="flex flex-wrap justify-center gap-6 mb-10 text-lg font-medium">
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
                    <Star className="text-yellow-500" />
                    Overall result:
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">
                        {interviewFeedback?.averageScore}/10
                    </span>
                </div>
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
                    <CalendarIcon className="text-green-500" />
                    {formattedDate}
                </div>
            </div>

            <div className="border-t border-gray-300 dark:border-gray-600 mb-8"></div>

            <p className="text-lg leading-relaxed text-center text-gray-800 dark:text-gray-300 mb-12">
                {/* {interviewFeedback?.aiOverallEvaluate} */}
            </p>

            <div>
                <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
                    Feedback by question:
                </h2>
                {interviewFeedback?.results?.map((result, index) => (
                    <div
                        key={result.questionId}
                        className="bg-white dark:bg-[#1e1e2f] border border-gray-200 dark:border-gray-700 rounded-xl p-6 mb-8 shadow-sm"
                    >
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                            {index + 1}. {result.question}
                        </h3>

                        <div className="space-y-3 text-gray-700 dark:text-gray-300">
                            <p>
                                <strong>Suggested answer 1:</strong>{" "}
                                {result.suitableAnswer1 || "No answer"}
                            </p>
                            <p>
                                <strong>Suggested answer 2:</strong>{" "}
                                {result.suitableAnswer2 || "No answer"}
                            </p>
                            <p>
                                <strong>Your answer:</strong>{" "}
                                {result.userAnswer || "No answer"}
                            </p>
                            <p>
                                <strong>Correctness:</strong>{" "}
                                {result.feedback.knowledge.correctness}
                            </p>
                            <p>
                                <strong>Clarity:</strong>{" "}
                                {result.feedback.communication.clarity}
                            </p>
                            <p>
                                <strong>Conciseness:</strong>{" "}
                                {result.feedback.communication.conciseness}
                            </p>
                            <p>
                                <strong>Use of terminology:</strong>{" "}
                                {result.feedback.communication.terminology}
                            </p>
                            <p>
                                <strong>Strengths:</strong>{" "}
                                {result.feedback.knowledge.strengths || "None"}
                            </p>
                            <p>
                                <strong>Needs improvement:</strong>{" "}
                                {result.feedback.knowledge.improvement}
                            </p>
                        </div>

                        <div className="mt-6">
                            <h4 className="text-lg font-semibold mb-2 text-green-500">
                                Conclusion:
                            </h4>

                            <p className="text-gray-600 dark:text-gray-400 mt-1">
                                {result.feedback.conclusion}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center gap-4 mt-12">
                <button
                    onClick={() => navigate("/main")}
                    className="px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-full shadow transition-all"
                >
                    <div className="flex items-center gap-2">
                        <House className="h-5 w-5" />
                        Back to Home
                    </div>
                </button>
            </div>
        </div>
    );
};

export default FeedBack;
