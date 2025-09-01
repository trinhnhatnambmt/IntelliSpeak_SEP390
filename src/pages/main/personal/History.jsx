import React, { useEffect, useState } from "react";
import { getAllInterviewHistory } from "~/apis";
import InterviewCard from "~/components/InterviewCard";

const History = () => {
    const [interviews, setInterviews] = useState([]);

    useEffect(() => {
        getAllInterviewHistory().then((res) => {
            setInterviews(res);
        });
    }, []);

    return (
        <div>
            {/* Interview History */}
            <div className="pb-10">
                <h2 className="font-extrabold text-3xl mb-6 text-gray-800 dark:text-white">
                    Your Interview History
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 relative">
                    {interviews?.map((interview) => (
                        <InterviewCard
                            type="profile"
                            interviewTitle={interview?.interviewTitle}
                            startedAt={interview?.startedAt}
                            totalQuestion={interview?.totalQuestion}
                            interviewHistoryId={interview?.interviewHistoryId}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default History;
