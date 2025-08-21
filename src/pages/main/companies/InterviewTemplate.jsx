import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { interViewSessionQuestionForAiAPI } from "~/redux/interview/interviewSessionSlice";

const InterviewTemplate = ({
    interviewSessionId,
    title,
    description,
    totalQuestion,
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitInterviewSession = () => {
        toast
            .promise(
                dispatch(interViewSessionQuestionForAiAPI(interviewSessionId)),
                {
                    pending: "Waiting to move on to interview...",
                }
            )
            .then((res) => {
                if (!res.error) {
                    navigate(`/main/interviewPage/${interviewSessionId}`);
                }
            });
    };

    return (
        <div
            key={interviewSessionId}
            className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 shadow-sm hover:shadow-md transition"
        >
            <h3 className="font-semibold">{title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
                {description}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
                Questions: {totalQuestion}
            </p>
            <button
                className="cursor-pointer mt-5 px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 transition duration-300"
                onClick={() => submitInterviewSession()}
            >
                Start Interview
            </button>
        </div>
    );
};

export default InterviewTemplate;
