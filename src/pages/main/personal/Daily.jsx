import React, { useEffect, useState } from "react";
import { getUserProfileAPI } from "~/apis";
import LineChart from "~/components/chart/LineChart";
import { motion } from "framer-motion";

const Daily = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [dailyScores, setDailyScores] = useState([]);

    useEffect(() => {
        getUserProfileAPI().then((data) => {
            setUserProfile(data);
            setDailyScores(data?.statistic[0]?.dailyScores);
        });
    }, []);
    return (
        <div className="relative z-10">
            {/* Stats */}
            <div className="bg-white dark:bg-[#1e1e2f] rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 mb-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
                        Interview Practice Statistics
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {/* Practice Sessions */}
                        <div className="bg-gray-50 dark:bg-[#23233a] rounded-xl p-4 transition-all shadow hover:shadow-lg border border-gray-200 dark:border-gray-700">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Practice Sessions
                            </p>
                            <p className="text-xl font-semibold mt-1 text-gray-800 dark:text-white">
                                {
                                    userProfile?.statistic[0]
                                        ?.interviewWeeklyCount
                                }
                            </p>
                            <p
                                className={`text-sm mt-1 ${
                                    userProfile?.statistic[0]
                                        ?.comparedToLastWeek > 0
                                        ? "text-green-500 dark:text-green-400"
                                        : userProfile?.statistic[0]
                                              ?.comparedToLastWeek < 0
                                        ? "text-red-500 dark:text-red-400"
                                        : "text-yellow-500 dark:text-yellow-400"
                                }`}
                            >
                                {userProfile?.statistic[0]?.comparedToLastWeek}
                            </p>
                        </div>

                        {/* Questions Answered */}
                        <div className="bg-gray-50 dark:bg-[#23233a] rounded-xl p-4 transition-all shadow hover:shadow-lg border border-gray-200 dark:border-gray-700">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Questions Answered
                            </p>
                            <p className="text-xl font-semibold mt-1 text-gray-800 dark:text-white">
                                {
                                    userProfile?.statistic[0]
                                        ?.answeredQuestionCount
                                }
                            </p>
                            <p
                                className={`text-sm mt-1 ${
                                    (userProfile?.statistic[0]
                                        ?.answeredQuestionComparedToLastWeek ??
                                        0) > 0
                                        ? "text-green-500 dark:text-green-400"
                                        : (userProfile?.statistic[0]
                                              ?.answeredQuestionComparedToLastWeek ??
                                              0) < 0
                                        ? "text-red-500 dark:text-red-400"
                                        : "text-gray-500 dark:text-gray-400"
                                }`}
                            >
                                {
                                    userProfile?.statistic[0]
                                        ?.answeredQuestionComparedToLastWeek
                                }
                            </p>
                        </div>

                        {/* Average Score */}
                        <div className="bg-gray-50 dark:bg-[#23233a] rounded-xl p-4 transition-all shadow hover:shadow-lg border border-gray-200 dark:border-gray-700">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Average Score
                            </p>
                            {(() => {
                                const avgScoreStr =
                                    userProfile?.statistic[0]
                                        ?.averageInterviewScore || "0/10";
                                const avgScore =
                                    parseFloat(avgScoreStr.split("/")[0]) || 0;

                                let colorClass =
                                    "text-green-500 dark:text-green-400"; // mặc định tốt
                                if (avgScore < 4) {
                                    colorClass =
                                        "text-red-500 dark:text-red-400";
                                } else if (avgScore < 7) {
                                    colorClass =
                                        "text-yellow-500 dark:text-yellow-400";
                                }

                                return (
                                    <>
                                        <p
                                            className={`text-xl font-semibold mt-1 ${colorClass}`}
                                        >
                                            {avgScoreStr}
                                        </p>
                                        <p
                                            className={`${colorClass} text-sm mt-1`}
                                        >
                                            {
                                                userProfile?.statistic[0]
                                                    ?.scoreEvaluate
                                            }
                                        </p>
                                    </>
                                );
                            })()}
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Chart */}
            <div className="p-6 bg-[#f9f9f9] dark:bg-[#1e1e2f] rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                <LineChart dailyScores={dailyScores} />
            </div>
        </div>
    );
};

export default Daily;
