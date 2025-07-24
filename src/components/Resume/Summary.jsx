import React from "react";
import ScoreBadge from "~/components/Resume/ScoreBadge";
import ScoreGauge from "~/components/Resume/ScoreGauge";

const Category = ({ title, score }) => {
    const textColor =
        score > 70
            ? "text-green-600"
            : score > 49
            ? "text-yellow-600"
            : "text-red-600";

    return (
        <div className="resume-summary">
            <div className="category">
                <div className="flex flex-row gap-2 items-center justify-center">
                    <p className="text-2xl text-black-50">{title}</p>
                    <ScoreBadge score={score} />
                </div>
                <p className="text-2xl text-black">
                    <span className={textColor}>{score}</span>/100
                </p>
            </div>
        </div>
    );
};

const Summary = ({ feedback }) => {
    const toneAndStyleScore = feedback?.categories?.find(
        (cat) => cat.categoryName === "toneAndStyle"
    )?.score;
    const contentScore = feedback?.categories?.find(
        (cat) => cat.categoryName === "content"
    )?.score;
    const structureScore = feedback?.categories?.find(
        (cat) => cat.categoryName === "structure"
    )?.score;
    const skillsScore = feedback?.categories?.find(
        (cat) => cat.categoryName === "skills"
    )?.score;

    return (
        <div className="bg-white rounded-2xl shadow-md w-full">
            <div className="flex flex-row items-center p-4 gap-8">
                <ScoreGauge score={feedback?.overallScore} />
                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-bold text-gray-500">
                        Tổng điểm CV của bạn
                    </h2>
                    <p className="text-sm text-gray-500">
                        Điểm này được tính dựa trên các tiêu chí bên dưới
                    </p>
                </div>
            </div>
            <Category title="Tone & Style" score={toneAndStyleScore} />
            <Category title="Content" score={contentScore} />
            <Category title="Structure" score={structureScore} />
            <Category title="Skills" score={skillsScore} />
        </div>
    );
};

export default Summary;
