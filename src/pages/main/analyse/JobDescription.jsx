import { MessageCircleQuestion } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getJobDescriptionDetailAPI } from "~/apis";
import { grid } from "~/assets";

const JobDescription = () => {
    const { id } = useParams();
    const [jdData, setJdData] = useState(null);

    useEffect(() => {
        getJobDescriptionDetailAPI(id).then((res) => {
            setJdData(res);
        });
    }, [id]);

    if (!jdData) {
        return (
            <div className="flex items-center justify-center mt-10 text-gray-600 dark:text-gray-300">
                <img src="/images/resume-scan-2.gif" className="w-[800px]" />
            </div>
        );
    }

    const {
        jobTitle,
        summary,
        mustHaveSkills,
        niceToHaveSkills,
        suitableLevel,
        recommendedLearning,
        jdEvaluates,
        createAt,
    } = jdData;

    return (
        <main className="min-h-screen">
            {/* Navigation */}
            <nav className="resume-nav">
                <Link to="/main/analyze/JD" className="back-button bg-white">
                    <img
                        src="/icons/back.svg"
                        alt="logo"
                        className="w-2.5 h-2.5"
                    />
                    <span className="text-gray-800 text-sm font-semibold">
                        Trở về trang chủ
                    </span>
                </Link>
            </nav>

            <div className="relative max-w-4xl mx-auto rounded-[2.5rem] border-1 border-[#252134] bg-white dark:bg-[#161321]  shadow-lg p-6 sm:p-10 space-y-6 mt-10">
                <div className="absolute inset-0 max-w-full z-0">
                    <img
                        className="w-full"
                        src={grid}
                        width={550}
                        height={550}
                        alt="Grid"
                    />
                </div>
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
                        {jobTitle}
                    </h1>
                    <p className="text-gray-700 dark:text-gray-300">
                        {summary}
                    </p>
                    <p className="text-sm text-gray-400 mt-2">
                        Ngày tạo: {new Date(createAt).toLocaleDateString()}
                    </p>
                </div>

                {/* Skills & Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <InfoCard
                        title="🎯 Kỹ năng bắt buộc"
                        content={mustHaveSkills}
                    />
                    <InfoCard
                        title="✨ Kỹ năng nên có"
                        content={niceToHaveSkills}
                    />
                    <InfoCard
                        title="📈 Trình độ phù hợp"
                        content={suitableLevel}
                    />
                    <InfoCard
                        title="📚 Gợi ý học tập"
                        content={recommendedLearning}
                    />
                </div>

                {/* JD Questions */}
                <div>
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                        <MessageCircleQuestion /> Câu hỏi phỏng vấn gợi ý
                    </h2>
                    <div className="space-y-4">
                        {jdEvaluates?.length > 0 ? (
                            jdEvaluates.map((q) => (
                                <div
                                    key={q.jdQuestionId}
                                    className="rounded-xl border border-gray-200 dark:border-slate-700 p-5 bg-gray-50 dark:bg-slate-900 shadow-sm hover:shadow-md transition"
                                >
                                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                                        {q.question}
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                                        🛠 Kỹ năng:{" "}
                                        <span className="font-medium">
                                            {q.skillNeeded}
                                        </span>{" "}
                                        | 💡 Độ khó:{" "}
                                        <span className="font-medium">
                                            {q.difficultyLevel}
                                        </span>
                                    </p>
                                    <div className="text-md text-gray-700 dark:text-gray-300 space-y-1">
                                        <p>
                                            <strong>💡 Gợi ý trả lời 1:</strong>{" "}
                                            {q.suitableAnswer1}
                                        </p>
                                        <p>
                                            <strong>💡 Gợi ý trả lời 2:</strong>{" "}
                                            {q.suitableAnswer2}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-600 dark:text-gray-400">
                                Không có câu hỏi phỏng vấn.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

const InfoCard = ({ title, content }) => (
    <div className="bg-blue-50 dark:bg-slate-700/50 p-4 rounded-xl  border-1 border-[#252134]">
        <h3 className="text-blue-700 dark:text-white font-semibold mb-1">
            {title}
        </h3>
        <p className="text-gray-800 dark:text-gray-200 text-sm">{content}</p>
    </div>
);

export default JobDescription;
