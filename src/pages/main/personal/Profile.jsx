import { Avatar, Button } from "antd";
import { Glasses, Mail, MapIcon, Phone, TicketCheck } from "lucide-react";
import { motion } from "framer-motion";
import InterviewCard from "~/components/InterviewCard";
import Footer from "~/sections/Footer";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllInterviewHistory, getUserProfileAPI } from "~/apis";
import LineChart from "~/components/chart/LineChart";

const Profile = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [interviews, setInterviews] = useState([]);
    const [dailyScores, setDailyScores] = useState([]);

    const personalInfo = [
        {
            icon: <Mail className="w-5 h-5 text-gray-500 dark:text-gray-400" />,
            label: userProfile ? userProfile?.email : "Email not updated",
        },
        {
            icon: (
                <Phone className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            ),
            label: userProfile?.phone
                ? userProfile?.phone
                : "Phone number not updated",
        },
        {
            icon: (
                <MapIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            ),
            label: "Vietnam",
        },
        {
            icon: (
                <TicketCheck className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            ),
            label: userProfile?.role ? userProfile?.role : "Not updated",
        },
    ];

    const navigate = useNavigate();

    useEffect(() => {
        getAllInterviewHistory().then((res) => {
            setInterviews(res);
        });
    }, []);

    useEffect(() => {
        getUserProfileAPI().then((data) => {
            // console.log(data);
            setUserProfile(data);
            setDailyScores(data?.statistic[0]?.dailyScores);
        });
    }, []);
    // console.log(dailyScores);

    return (
        <div className="bg-white dark:bg-[#0e0c15] text-gray-900 dark:text-white transition-colors duration-300 min-h-screen pt-3">
            <div className="container mx-auto px-5 mt-10 flex gap-6 flex-col lg:flex-row relative z-10">
                {/* Left Info Panel */}
                <div className="w-full lg:w-1/3 space-y-6">
                    {/* User card */}
                    <div className="bg-white dark:bg-[#1e1e2f] rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                        <Avatar size={72} src={userProfile?.avatar} />
                        <h2 className="font-bold text-2xl mt-4 text-gray-800 dark:text-white">
                            @{userProfile?.userName}
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">
                            {userProfile?.firstName && userProfile?.lastName
                                ? `${userProfile.firstName} ${userProfile.lastName}`
                                : "Full name not updated"}
                        </p>
                    </div>

                    {/* Info card */}
                    <div className="bg-white dark:bg-[#1e1e2f] rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                        <h2 className="font-bold text-xl mb-4 text-gray-800 dark:text-white">
                            Personal Information
                        </h2>
                        <div className="space-y-3">
                            {personalInfo.map((item) => (
                                <div
                                    className="flex items-center text-gray-700 dark:text-gray-300"
                                    key={item.label}
                                >
                                    <span className="mr-3">{item.icon}</span>
                                    <span>{item.label}</span>
                                </div>
                            ))}
                        </div>
                        <Button
                            className="flex items-center justify-center gap-2 mt-4"
                            type="primary"
                            onClick={() => navigate("/main/updateHR")}
                            icon={<Glasses className="w-4 h-4" />}
                        >
                            Become an Evaluator
                        </Button>
                    </div>
                </div>

                {/* Right Content */}
                <div className="w-full lg:w-2/3 space-y-10">
                    {/* Stats */}
                    <div className="bg-white dark:bg-[#1e1e2f] rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
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
                                    <p className="text-green-500 dark:text-green-400 text-sm mt-1">
                                        {
                                            userProfile?.statistic[0]
                                                ?.comparedToLastWeek
                                        }
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
                                    <p className="text-green-500 dark:text-green-400 text-sm mt-1">
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
                                    <p className="text-xl font-semibold mt-1 text-gray-800 dark:text-white">
                                        {
                                            userProfile?.statistic[0]
                                                ?.averageInterviewScore
                                        }
                                    </p>
                                    <p className="text-yellow-500 dark:text-yellow-400 text-sm mt-1">
                                        {
                                            userProfile?.statistic[0]
                                                ?.scoreEvaluate
                                        }
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Chart */}
                    <div className="p-6 bg-[#f9f9f9] dark:bg-[#1e1e2f] rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                        <LineChart dailyScores={dailyScores} />
                    </div>

                    {/* Interview History */}
                    <div className="pb-10">
                        <h2 className="font-extrabold text-3xl mb-6 text-gray-800 dark:text-white">
                            Your Interview History
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {interviews?.map((interview) => (
                                <InterviewCard
                                    type="profile"
                                    interviewTitle={interview?.interviewTitle}
                                    startedAt={interview?.startedAt}
                                    totalQuestion={interview?.totalQuestion}
                                    interviewHistoryId={
                                        interview?.interviewHistoryId
                                    }
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Profile;
