import { useSelector } from "react-redux";
import { selectCurrentInterviewSession } from "~/redux/interview/interviewSessionSlice";
import { selectCurrentUser } from "~/redux/user/userSlice";
import Agent from "~/components/agent/Agent";

const InterviewPage = () => {
    const currentInterviewSession = useSelector(selectCurrentInterviewSession);

    const currentUser = useSelector(selectCurrentUser);

    return (
        <div className="h-full w-full transition-colors duration-300">
            <div className="container mx-auto px-5 relative z-10">
                {/* Header Section */}
                <div className="flex items-center justify-between mt-30 mb-10">
                    <h1 className="font-extrabold text-4xl text-gray-900 dark:text-white">
                        {currentInterviewSession?.title}
                    </h1>
                    <div className="rounded-xl py-2 px-2 text-lg  bg-gradient-to-r from-sky-200 to-pink-100 dark:bg-[#24273A] dark:bg-none">
                        Technical
                    </div>
                </div>

                {/* Video Containers */}
                <Agent
                    userAvatar={currentUser?.avatar}
                    currentInterviewSession={currentInterviewSession}
                    currentUser={currentUser}
                />
            </div>
        </div>
    );
};

export default InterviewPage;
