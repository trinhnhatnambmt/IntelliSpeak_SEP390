import React from "react";

const ATS = ({ score, suggestions }) => {
    // Determine background gradient based on score
    const gradientClass =
        score > 69
            ? "from-green-100"
            : score > 49
            ? "from-yellow-100"
            : "from-red-100";

    // Determine icon based on score
    const iconSrc =
        score > 69
            ? "/icons/ats-good.svg"
            : score > 49
            ? "/icons/ats-warning.svg"
            : "/icons/ats-bad.svg";

    // Determine subtitle based on score
    const subtitle =
        score > 69
            ? "Bạn đã làm rất tốt"
            : score > 49
            ? "Khởi đầu không tệ"
            : "Cần cải thiện thêm";

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
                    Điểm số này thể hiện mức độ hiệu quả của CV của bạn khi được
                    hệ thống lọc hồ sơ (ATS) của nhà tuyển dụng đánh giá.
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
                Hãy tiếp tục hoàn thiện CV của bạn để tăng cơ hội vượt qua hệ
                thống lọc ATS và tiếp cận nhà tuyển dụng.
            </p>
        </div>
    );
};

export default ATS;
