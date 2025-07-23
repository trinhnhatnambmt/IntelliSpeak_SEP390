import React from "react";
import { Link } from "react-router-dom";
import ScoreCircle from "./ScoreCircle";

const ResumeCard = ({
    resume: { id, companyName, jobTitle, feedback, imagePath },
}) => {
    return (
        <Link
            to={`/resume/${id}`}
            className="group resume-card relative z-10 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
        >
            {/* Header */}
            <div className="flex justify-between items-start p-5">
                <div className="flex flex-col gap-1 max-w-[70%]">
                    {companyName ? (
                        <h2 className="text-2xl font-bold text-black dark:text-white break-words">
                            {companyName}
                        </h2>
                    ) : null}
                    {jobTitle ? (
                        <h3 className="text-lg text-gray-500 dark:text-gray-300 break-words">
                            {jobTitle}
                        </h3>
                    ) : null}
                    {!companyName && !jobTitle && (
                        <h2 className="text-2xl font-bold text-black dark:text-white">
                            Resume
                        </h2>
                    )}
                </div>
                <div className="shrink-0">
                    <ScoreCircle score={feedback?.overallScore} />
                </div>
            </div>

            {/* Image */}
            <div className="w-full h-[450px] max-sm:h-[250px] overflow-hidden">
                <img
                    src={imagePath}
                    alt="resume"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                />
            </div>
        </Link>
    );
};

export default ResumeCard;
