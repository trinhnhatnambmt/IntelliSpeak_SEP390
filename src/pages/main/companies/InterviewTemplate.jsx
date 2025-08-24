import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Dialog from "~/components/dialog/Dialog";

const InterviewTemplate = ({
    packageId,
    interviewSessionId,
    title,
    description,
    totalQuestion,
}) => {
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);

    const submitInterviewSession = () => {
        if (!packageId || packageId === 1) {
            setModalOpen(true);
        } else {
            navigate(`/main/language/${interviewSessionId}`);
        }
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
            <Dialog modalOpen={modalOpen} setModalOpen={setModalOpen} />
        </div>
    );
};

export default InterviewTemplate;
