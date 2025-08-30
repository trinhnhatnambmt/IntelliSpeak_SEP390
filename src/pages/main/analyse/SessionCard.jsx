import React from "react";
import { Link } from "react-router-dom";

const SessionCard = ({ session }) => {
    const { title, description, difficulty, interviewSessionId } = session;

    const getDifficultyStyles = (difficulty) => {
        switch (difficulty?.toLowerCase()) {
            case "easy":
                return "bg-green-100 text-green-800";
            case "medium":
                return "bg-yellow-100 text-yellow-800";
            case "hard":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 m-4 max-w-3xl w-full transform transition duration-300 hover:scale-105 hover:shadow-xl border border-gray-200">
            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-gray-800">{title}</h3>
                    <span
                        className={`text-sm font-semibold px-3 py-1 rounded-full ${getDifficultyStyles(
                            difficulty
                        )}`}
                    >
                        {difficulty}
                    </span>
                </div>
                <p className="text-gray-600 text-sm">{description}</p>
                <Link
                    to={`/main/language/${interviewSessionId}`}
                    className="mt-4 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg text-center hover:bg-blue-700 transition duration-200"
                >
                    Start Interview
                </Link>
            </div>
        </div>
    );
};

export default SessionCard;
