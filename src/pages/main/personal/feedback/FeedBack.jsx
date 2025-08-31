import dayjs from "dayjs";
import {
    Activity,
    AlertCircle,
    CalendarIcon,
    Check,
    CheckCircle,
    Ear,
    House,
    Info,
    Lightbulb,
    ListCheck,
    MessageSquare,
    MessageSquareCode,
    Star,
    XCircle,
} from "lucide-react";
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
                console.log(data);
                setInterviewFeedback(data);
            });
        }
    }, [id, interviewFeedbackRedux]);

    const formattedDate = dayjs(interviewFeedback?.startedAt).format(
        "MMM DD, YYYY – h:mm A"
    );

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

            <div className="space-y-12">
                <div className="bg-white dark:bg-[#1e1e2f] border border-gray-200 dark:border-gray-700 rounded-xl p-8 shadow-sm relative">
                    <h2 className="text-3xl font-semibold mb-4 text-gray-900 dark:text-white relative">
                        Overall Evaluation
                    </h2>
                    <p className="text-xl text-gray-700 dark:text-white leading-relaxed bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-lg">
                        {interviewFeedback?.aiOverallEvaluate ||
                            "No overall evaluation provided."}
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white flex items-center gap-2 relative">
                        <MessageSquare className="text-indigo-500" />
                        Feedback by Question
                    </h2>

                    {interviewFeedback?.results?.map((result, index) => (
                        <div
                            key={result.questionId}
                            className="relative bg-white dark:bg-[#1e1e2f] border border-gray-200 dark:border-gray-700 rounded-xl p-8 mb-6 shadow-sm transition-all hover:shadow-md"
                        >
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                {index + 1}. {result.question}
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 dark:text-gray-300">
                                <div className="space-y-4">
                                    <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg ">
                                        <strong className="text-blue-700 dark:text-blue-300 flex items-center gap-1">
                                            <Info className="text-blue-500 w-[20px]" />
                                            Suggested Answer 1
                                        </strong>
                                        <p className="mt-2">
                                            {result.suitableAnswer1 ||
                                                "No answer provided"}
                                        </p>
                                    </div>
                                    <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                                        <strong className="text-blue-700 dark:text-blue-300 flex items-center gap-1">
                                            <Info className="text-blue-500 w-[20px]" />
                                            Suggested Answer 2
                                        </strong>
                                        <p className="mt-2">
                                            {result.suitableAnswer2 ||
                                                "No answer provided"}
                                        </p>
                                    </div>
                                    <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg">
                                        <strong className="text-purple-700 dark:text-purple-300 flex items-center gap-1">
                                            <MessageSquareCode className="text-purple-500 w-[20px]" />
                                            Your Answer
                                        </strong>
                                        <p className="mt-2">
                                            {result.userAnswer ||
                                                "No answer provided"}
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="bg-teal-50 dark:bg-teal-900/30 p-4 rounded-lg">
                                        <strong className="text-teal-700 dark:text-teal-300 flex items-center gap-1">
                                            <Check className="text-teal-500 w-[20px]" />
                                            Correctness
                                        </strong>
                                        <p className="mt-2">
                                            {
                                                result.feedback.knowledge
                                                    .correctness
                                            }
                                        </p>
                                    </div>
                                    <div className="bg-cyan-50 dark:bg-cyan-900/30 p-4 rounded-lg">
                                        <strong className="text-cyan-700 dark:text-cyan-300 flex items-center gap-1">
                                            <Activity className="text-cyan-500 w-[20px]" />
                                            Clarity
                                        </strong>
                                        <p className="mt-2">
                                            {
                                                result.feedback.communication
                                                    .clarity
                                            }
                                        </p>
                                    </div>
                                    <div className="bg-sky-50 dark:bg-sky-900/30 p-4 rounded-lg">
                                        <strong className="text-sky-700 dark:text-sky-300 flex items-center gap-1">
                                            <Ear className="text-sky-500 w-[20px]" />
                                            Conciseness:
                                        </strong>
                                        <p className="mt-1">
                                            {
                                                result.feedback.communication
                                                    .conciseness
                                            }
                                        </p>
                                    </div>
                                    <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-lg">
                                        <strong className="text-indigo-700 dark:text-indigo-300 flex items-center gap-1">
                                            <ListCheck className="text-indigo-300 w-[20px] " />
                                            Use of Terminology:
                                        </strong>
                                        <p className="mt-1">
                                            {
                                                result.feedback.communication
                                                    .terminology
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 border-t border-gray-200 dark:border-gray-600 pt-6">
                                <div className="space-y-4">
                                    <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
                                        <strong className="text-green-700 dark:text-green-300 flex items-center gap-1">
                                            <Lightbulb className="text-green-500 w-[20px]" />
                                            Strengths:
                                        </strong>
                                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                                            {result.feedback.knowledge
                                                .strengths || "None"}
                                        </p>
                                    </div>
                                    <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg ">
                                        <strong className="text-red-700 dark:text-red-300 flex items-center gap-1">
                                            <XCircle className="text-red-500 w-[20px]" />
                                            Needs Improvement:
                                        </strong>
                                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                                            {
                                                result.feedback.knowledge
                                                    .improvement
                                            }
                                        </p>
                                    </div>
                                    <div className="bg-emerald-50 dark:bg-emerald-900/30 p-4 rounded-lg">
                                        <strong className="text-emerald-700 dark:text-emerald-300 text-xl  flex items-center gap-1">
                                            <CheckCircle className="text-emerald-500 w-[20px]" />
                                            Conclusion:
                                        </strong>
                                        <p className="mt-1 text-xl text-gray-600 dark:text-white">
                                            {result.feedback.conclusion}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
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
