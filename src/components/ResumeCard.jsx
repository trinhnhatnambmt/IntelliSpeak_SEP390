import React from "react";
import { Link } from "react-router-dom";
import ScoreCircle from "./ScoreCircle";

const ResumeCard = ({
    resume: { id, overallScore, imageUrls, cvTitle, createAt },
}) => {
    return (
        <Link
            to={`/resume/${id}`}
            className="group resume-card relative z-10 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-gray-200 dark:border-gray-500 bg-white dark:bg-[#0e0c15]"
        >
            {/* Header */}
            <div className="flex justify-between items-start p-5">
                <div className="flex flex-col gap-1 max-w-[70%]">
                    {cvTitle ? (
                        <h2 className="text-2xl font-bold text-black dark:text-white break-words">
                            {cvTitle}
                        </h2>
                    ) : null}

                    <h3 className="text-lg text-gray-500 dark:text-gray-300 break-words">
                        Ngày tạo: {createAt}
                    </h3>
                </div>
                <div className="shrink-0">
                    <ScoreCircle score={overallScore} />
                </div>
            </div>

            {/* Image */}
            <div className="w-full h-[450px] max-sm:h-[250px] overflow-hidden">
                <img
                    src={imageUrls.split(";")[0]}
                    alt="resume"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                />
            </div>
        </Link>
    );
};

export default ResumeCard;
