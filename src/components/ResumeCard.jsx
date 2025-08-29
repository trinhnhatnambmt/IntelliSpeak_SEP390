import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ScoreCircle from "./ScoreCircle";
import { Switch } from "antd";

const ResumeCard = ({
    resume: { id, overallScore, imageUrls, cvTitle, createAt },
}) => {
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState(false);

    const toggle = () => {
        setIsActive(!isActive);
    };

    return (
        <div className="mt-2 group resume-card relative z-10 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-gray-200 dark:border-gray-500 bg-white dark:bg-[#0e0c15]">
            {/* Header */}
            <div className="flex justify-between items-start p-5">
                <div className="flex flex-col gap-1 max-w-[65%]">
                    {cvTitle ? (
                        <h2
                            className="text-2xl font-bold text-black dark:text-white break-words cursor-pointer"
                            onClick={() => navigate(`/resume/${id}`)}
                        >
                            {cvTitle}
                        </h2>
                    ) : null}

                    <h3 className="text-lg text-gray-500 dark:text-gray-300 break-words">
                        Created at: {createAt}
                    </h3>

                    {/* Switch Active/Inactive */}
                    <div className="flex items-center gap-2 mt-2">
                        <Switch checked={isActive} onClick={toggle} />
                        <span
                            className={`text-sm font-medium ${
                                isActive
                                    ? "text-green-600 dark:text-green-400"
                                    : "text-gray-400 dark:text-gray-500"
                            }`}
                        >
                            {isActive ? "Active" : "Inactive"}
                        </span>
                    </div>
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
        </div>
    );
};

export default ResumeCard;
