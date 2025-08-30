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
            <div className="flex items-center justify-center mt-20">
                <img
                    src="/images/resume-scan-2.gif"
                    className="w-full max-w-[600px] mx-auto"
                    alt="Loading"
                />
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
        <main className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 dark:from-gray-900 dark:to-indigo-900 p-4 sm:p-6">
            {/* Navigation */}
            <nav className="mb-6">
                <Link
                    to="/main/analyze/JD"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-600 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                    <img src="/icons/back.svg" alt="Back" className="w-4 h-4" />
                    <span className="text-sm font-semibold">Back to Home</span>
                </Link>
            </nav>

            <div className="relative max-w-5xl mx-auto rounded-3xl border border-gray-200 dark:border-indigo-800 bg-white dark:bg-gray-800 shadow-xl p-6 sm:p-8 lg:p-10 space-y-8 transition-all duration-500">
                {/* Background Grid */}
                <div className="absolute inset-0 z-0 opacity-10">
                    <img
                        className="w-full h-full object-cover"
                        src={grid}
                        width={550}
                        height={550}
                        alt="Grid Background"
                    />
                </div>

                {/* Header */}
                <div className="relative z-10">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3 animate-fade-in">
                        {jobTitle}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
                        {summary}
                    </p>
                    <p className="text-sm text-gray-400 dark:text-gray-500 mt-3">
                        Created on: {new Date(createAt).toLocaleDateString()}
                    </p>
                </div>

                {/* Skills & Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <InfoCard
                        title="🎯 Required Skills"
                        content={mustHaveSkills}
                        className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-indigo-900 dark:to-blue-900"
                    />
                    <InfoCard
                        title="✨ Nice-to-Have Skills"
                        content={niceToHaveSkills}
                        className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900 dark:to-pink-900"
                    />
                    <InfoCard
                        title="📈 Suitable Level"
                        content={suitableLevel}
                        className="bg-gradient-to-br from-green-50 to-teal-100 dark:from-teal-900 dark:to-green-900"
                    />
                    <InfoCard
                        title="📚 Learning Recommendations"
                        content={recommendedLearning}
                        className="bg-gradient-to-br from-yellow-50 to-orange-100 dark:from-orange-900 dark:to-yellow-900"
                    />
                </div>

                {/* JD Questions */}
                <div className="relative z-10">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3 animate-fade-in">
                        <MessageCircleQuestion className="w-6 h-6 text-indigo-500 dark:text-indigo-300" />
                        Suggested Interview Questions
                    </h2>
                    <div className="space-y-6">
                        {jdEvaluates?.length > 0 ? (
                            jdEvaluates.map((q) => (
                                <div
                                    key={q.jdQuestionId}
                                    className="rounded-2xl border border-gray-200 dark:border-gray-700 p-6 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                                >
                                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3">
                                        {q.question}
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                                        🛠 Skill:{" "}
                                        <span className="font-medium">
                                            {q.skillNeeded}
                                        </span>{" "}
                                        | 💡 Difficulty:{" "}
                                        <span className="font-medium">
                                            {q.difficultyLevel}
                                        </span>
                                    </p>
                                    <div className="text-sm sm:text-base text-gray-700 dark:text-gray-300 space-y-2">
                                        <p>
                                            <strong className="text-indigo-600 dark:text-indigo-400">
                                                💡 Suggested Answer 1:
                                            </strong>{" "}
                                            {q.suitableAnswer1}
                                        </p>
                                        <p>
                                            <strong className="text-indigo-600 dark:text-indigo-400">
                                                💡 Suggested Answer 2:
                                            </strong>{" "}
                                            {q.suitableAnswer2}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-600 dark:text-gray-400 text-center">
                                No interview questions available.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

const InfoCard = ({ title, content, className }) => (
    <div
        className={`p-5 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${className}`}
    >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {title}
        </h3>
        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            {content}
        </p>
    </div>
);

export default JobDescription;
