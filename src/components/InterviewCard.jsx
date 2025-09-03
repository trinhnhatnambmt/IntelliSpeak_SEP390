import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { interviewSession } from "~/assets";

const InterviewCard = ({
    type = "main",
    interviewTitle,
    totalQuestion,
    interviewHistoryId,
    interviewSessionId,
    startedAt,
}) => {
    const [title, createdAt] = interviewTitle.split(" - ");

    const navigate = useNavigate();
    const submitInterviewSession = () => {
        navigate(`/main/language/${interviewSessionId}`);
    };

    return (
        <div className="w-[90%] h-[480px] group mx-auto bg-white dark:bg-[#252525] border border-neutral-200 dark:border-neutral-700 rounded-md text-black dark:text-white shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <figure className="w-full h-80 group-hover:h-72 transition-all duration-300 bg-neutral-100 dark:bg-[#0a121a] p-2 rounded-md relative overflow-hidden">
                <div
                    style={{
                        background:
                            "linear-gradient(123.9deg, #4727a5 1.52%, rgba(0, 0, 0, 0) 68.91%)",
                    }}
                    className="absolute top-0 left-0 w-full h-full group-hover:opacity-100 opacity-0 transition-all duration-300"
                ></div>
                <img
                    src={interviewSession}
                    alt="interview"
                    width={600}
                    height={600}
                    className="absolute -bottom-1 group-hover:-bottom-5 right-0 h-64 w-[80%] group-hover:border-4 border-4 group-hover:border-[#76aaf82d] rounded-lg object-contain transition-all duration-300"
                />
            </figure>
            <article className="p-4 space-y-2">
                <div className="h-8 px-5     bg-[#4393fc] text-white rounded-md flex items-center justify-center mb-2 text-sm font-medium">
                    Number of questions: {totalQuestion}
                </div>
                <h1 className="text-xl font-semibold capitalize">{title}</h1>

                {type === "main" && (
                    <div>
                        <p className="text-base leading-[120%] text-neutral-600 dark:text-neutral-300">
                            {createdAt}
                        </p>

                        <button
                            onClick={submitInterviewSession}
                            className="cursor-pointer text-base font-medium text-blue-600 dark:text-blue-300 group-hover:opacity-100 opacity-0 translate-y-2 group-hover:translate-y-0 pt-2 flex gap-1 transition-all duration-300"
                        >
                            Start Interview
                        </button>
                    </div>
                )}

                {type === "profile" && (
                    <div>
                        <p className="text-base leading-[120%] text-neutral-600 dark:text-neutral-300">
                            {startedAt}
                        </p>
                        <div className="flex items-center sm:flex-row gap-4 pt-2">
                            <button
                                onClick={() =>
                                    navigate(
                                        `/main/language/${interviewHistoryId}`
                                    )
                                }
                                className="hover:underline cursor-pointer text-base font-medium text-blue-600 dark:text-blue-300 group-hover:opacity-100 opacity-0 translate-y-2 group-hover:translate-y-0 pt-2 flex gap-1 transition-all duration-300"
                            >
                                Repeat Interview
                            </button>
                            <Link
                                to={`/main/feedback/${interviewHistoryId}`}
                                className="mt-2 hover:underline text-base font-medium text-blue-600 dark:text-blue-300 group-hover:opacity-100 opacity-0 translate-y-2 group-hover:translate-y-0 flex gap-1 transition-all duration-300"
                            >
                                View Feedback
                            </Link>
                        </div>
                    </div>
                )}
            </article>
        </div>
    );
};

export default InterviewCard;
