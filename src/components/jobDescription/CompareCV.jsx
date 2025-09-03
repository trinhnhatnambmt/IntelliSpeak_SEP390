import { ArrowLeft, CheckCircle, FileCheck, XCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { compareJdAndCV } from "~/apis";

const CompareCV = () => {
    const { id } = useParams();
    const [compareData, setCompareData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        setError(null);
        compareJdAndCV(id)
            .then((res) => {
                setCompareData(res);
                setIsLoading(false);
            })
            .catch((err) => {
                setError(
                    "Failed to load CV comparison data. Please try again."
                );
                setIsLoading(false);
                console.error("Error fetching comparison data:", err);
            });
    }, [id]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 dark:from-gray-900 dark:to-indigo-900">
                <div className="flex flex-col items-center gap-4">
                    <svg
                        className="animate-spin h-10 w-10 text-indigo-500"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                    </svg>
                    <p className="text-gray-600 dark:text-gray-300 text-lg">
                        Comparing CV...
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 dark:from-gray-900 dark:to-indigo-900">
                <div className="p-6 rounded-2xl bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-700 shadow-md">
                    <p className="text-red-600 dark:text-red-300 text-lg">
                        {error}
                    </p>
                </div>
            </div>
        );
    }

    if (!compareData) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 dark:from-gray-900 dark:to-indigo-900">
                <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-indigo-800 shadow-md">
                    <p className="text-gray-600 dark:text-gray-300 text-lg">
                        No comparison data available.
                    </p>
                </div>
            </div>
        );
    }

    const {
        score,
        verdict,
        levelFit,
        domainFit,
        matchedMust,
        missingMust,
        matchedNice,
        extraCvSkills,
        reasons,
        recommendations,
    } = compareData;

    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 dark:from-gray-900 dark:to-indigo-900 p-4 sm:p-6">
            {/* Navigation */}
            <nav className="mb-6">
                <Link
                    to={`/main/analyze/JD`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-600 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-sm font-semibold">
                        Back to Job Description
                    </span>
                </Link>
            </nav>

            <div className="relative max-w-5xl mx-auto rounded-3xl border border-gray-200 dark:border-indigo-800 bg-white dark:bg-gray-800 shadow-xl p-6 sm:p-8 lg:p-10 space-y-8 transition-all duration-500">
                {/* Header */}
                <div className="relative z-10">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-3 animate-fade-in">
                        <FileCheck className="w-8 h-8 text-indigo-500 dark:text-indigo-300" />
                        CV Comparison Results
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
                        Analysis of how your CV matches the job description.
                    </p>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="p-5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-indigo-900 dark:to-blue-900 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            Match Score
                        </h3>
                        <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                            {score}%
                        </p>
                    </div>
                    <div className="p-5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900 dark:to-pink-900 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            Verdict
                        </h3>
                        <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                            {verdict.replace("_", " ")}
                        </p>
                    </div>
                    <div className="p-5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-green-50 to-teal-100 dark:from-teal-900 dark:to-green-900 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            Level Fit
                        </h3>
                        <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                            {(levelFit * 100).toFixed(0)}%
                        </p>
                    </div>
                    <div className="p-5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-yellow-50 to-orange-100 dark:from-orange-900 dark:to-yellow-900 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            Major Fit
                        </h3>
                        <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                            {(domainFit * 100).toFixed(0)}%
                        </p>
                    </div>
                </div>

                {/* Skills */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="p-5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                            Matched Must-Have Skills
                        </h3>
                        <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 text-sm space-y-2">
                            {matchedMust.length > 0 ? (
                                matchedMust.map((skill, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center gap-2 text-lg"
                                    >
                                        <CheckCircle className="w-4 h-4 text-green-500 " />
                                        {skill}
                                    </li>
                                ))
                            ) : (
                                <li className="text-gray-500 dark:text-gray-400">
                                    No matched must-have skills.
                                </li>
                            )}
                        </ul>
                    </div>
                    <div className="p-5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                            Missing Must-Have Skills
                        </h3>
                        <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 text-sm space-y-2">
                            {missingMust.length > 0 ? (
                                missingMust.map((skill, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center gap-2 text-lg"
                                    >
                                        <XCircle className="w-4 h-4 text-red-500" />
                                        {skill}
                                    </li>
                                ))
                            ) : (
                                <li className="text-gray-500 dark:text-gray-400">
                                    No missing must-have skills.
                                </li>
                            )}
                        </ul>
                    </div>
                    <div className="p-5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                            Matched Nice-to-Have Skills
                        </h3>
                        <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 text-sm space-y-2">
                            {matchedNice.length > 0 ? (
                                matchedNice.map((skill, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center gap-2 text-lg"
                                    >
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                        {skill}
                                    </li>
                                ))
                            ) : (
                                <li className="text-gray-500 dark:text-gray-400">
                                    No matched nice-to-have skills.
                                </li>
                            )}
                        </ul>
                    </div>
                    <div className="p-5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                            Extra CV Skills
                        </h3>
                        <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 text-sm space-y-2">
                            {extraCvSkills.length > 0 ? (
                                extraCvSkills.map((skill, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center gap-2 text-lg"
                                    >
                                        <svg
                                            className="w-4 h-4 text-blue-500"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        {skill}
                                    </li>
                                ))
                            ) : (
                                <li className="text-gray-500 dark:text-gray-400">
                                    No extra CV skills.
                                </li>
                            )}
                        </ul>
                    </div>
                </div>

                {/* Reasons and Recommendations */}
                <div className="grid grid-cols-1 gap-6">
                    <div className="p-5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                            Analyzing
                        </h3>
                        <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 text-sm space-y-2">
                            {reasons.map((reason, index) => (
                                <li key={index} className="text-lg">
                                    {reason}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="p-5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                            Recommendations
                        </h3>
                        <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 text-sm space-y-2">
                            {recommendations.map((rec, index) => (
                                <li key={index} className="text-lg">
                                    {rec}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default CompareCV;
