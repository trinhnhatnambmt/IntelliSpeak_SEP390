import React from "react";

const ATS = ({ score, suggestions }) => {
    const gradientClass =
        score > 69
            ? "from-green-100"
            : score > 49
            ? "from-yellow-100"
            : "from-red-100";

    const iconSrc =
        score > 69
            ? "/icons/ats-good.svg"
            : score > 49
            ? "/icons/ats-warning.svg"
            : "/icons/ats-bad.svg";

    const subtitle =
        score > 69
            ? "Great job!"
            : score > 49
            ? "Not a bad start"
            : "Needs improvement";

    return (
        <div
            className={`bg-gradient-to-b ${gradientClass} to-white rounded-2xl shadow-md w-full p-6`}
        >
            {/* Top section with icon and headline */}
            <div className="flex items-center gap-4 mb-6">
                <img src={iconSrc} alt="ATS Score Icon" className="w-8 h-8" />
                <div>
                    <h2 className="text-2xl font-bold text-black-50">
                        ATS Score - {score}/100
                    </h2>
                </div>
            </div>

            {/* Description section */}
            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2 text-black-50">
                    {subtitle}
                </h3>
                <p className="text-gray-600 mb-4">
                    This score reflects how effective your resume is when
                    evaluated by an Applicant Tracking System (ATS) used by
                    employers.
                </p>

                {/* Suggestions list */}
                <div className="space-y-3">
                    {suggestions.map((suggestion, index) => (
                        <div key={index} className="flex items-start gap-3">
                            <img
                                src={
                                    suggestion.type === "good"
                                        ? "/icons/check.svg"
                                        : "/icons/warning.svg"
                                }
                                alt={
                                    suggestion.type === "good"
                                        ? "Check"
                                        : "Warning"
                                }
                                className="w-5 h-5 mt-1"
                            />
                            <p
                                className={
                                    suggestion.type === "good"
                                        ? "text-green-700"
                                        : "text-amber-700"
                                }
                            >
                                {suggestion.tip}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Closing encouragement */}
            <p className="text-gray-700 italic">
                Keep improving your resume to increase your chances of passing
                ATS filters and reaching recruiters.
            </p>
        </div>
    );
};

export default ATS;
