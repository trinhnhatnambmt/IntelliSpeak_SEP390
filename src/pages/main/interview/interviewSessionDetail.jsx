import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deleteQuestionFromSessionAPI, getDetailSessionAPI } from "~/apis";
import { Clock, BarChart, Tag, Layers, MoreVertical } from "lucide-react";
import { toast } from "react-toastify";

const InterviewSessionDetail = () => {
    const { id } = useParams();
    const [session, setSession] = useState(null);
    const [showDelete, setShowDelete] = useState({});

    const interviewSessionId = session?.interviewSessionId;

    useEffect(() => {
        getDetailSessionAPI(id).then((res) => setSession(res));
    }, [id]);

    const toggleDeleteButton = (questionId) => {
        setShowDelete((prev) => ({
            ...prev,
            [questionId]: !prev[questionId],
        }));
    };

    const handleDelete = (questionId) => {
        deleteQuestionFromSessionAPI(interviewSessionId, questionId).then(
            (res) => {
                toast.success(res?.message);
                getDetailSessionAPI(id).then((res) => setSession(res));
            }
        );
    };

    if (!session)
        return (
            <div className="text-center p-10 text-gray-400 animate-pulse">
                Loading...
            </div>
        );

    return (
        <div className="max-w-5xl mx-auto p-6 space-y-6 bg-gray-900 min-h-screen relative z-10 rounded-2xl">
            {/* Header Section */}
            <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden transform transition-all hover:shadow-2xl">
                <img
                    src={session.interviewSessionThumbnail}
                    alt={session.title}
                    className="w-full h-64 object-cover filter brightness-90"
                />
                <div className="p-6">
                    <h1 className="text-3xl font-bold text-white mb-3">
                        {session.title}
                    </h1>
                    <p className="text-gray-300 mb-4">{session.description}</p>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                        <span className="flex items-center gap-2">
                            <BarChart size={16} className="text-blue-400" />
                            Difficulty: {session.difficulty}
                        </span>
                        <span className="flex items-center gap-2">
                            <Clock size={16} className="text-blue-400" />
                            Duration:{" "}
                            {session.durationEstimate
                                .replace("PT", "")
                                .toLowerCase()}
                        </span>
                        <span className="flex items-center gap-2">
                            <Layers size={16} className="text-blue-400" />
                            Total Questions: {session.totalQuestion}
                        </span>
                        <span className="flex items-center gap-2">
                            <Tag size={16} className="text-blue-400" />
                            Source: {session.source}
                        </span>
                    </div>
                </div>
            </div>

            {/* Topic Section */}
            <div className="bg-gray-800 rounded-2xl shadow-xl p-6 transform transition-all hover:shadow-2xl">
                <h2 className="text-xl font-semibold text-white mb-2">
                    Topic: {session.topic.title}
                </h2>
                <p className="text-gray-300 mb-2">
                    {session.topic.description}
                </p>
                <p className="text-gray-400 text-sm">
                    {session.topic.longDescription}
                </p>
            </div>

            {/* Tags */}
            <div className="bg-gray-800 rounded-2xl shadow-xl p-6 transform transition-all hover:shadow-2xl">
                <h2 className="text-xl font-semibold text-white mb-4">Tags</h2>
                <div className="flex gap-2 flex-wrap">
                    {session.tags.map((tag) => (
                        <span
                            key={tag.tagId}
                            className="bg-blue-900 text-blue-200 px-3 py-1 rounded-full text-sm hover:bg-blue-800 transition"
                        >
                            #{tag.title}
                        </span>
                    ))}
                </div>
            </div>

            {/* Questions Section */}
            <div className="bg-gray-800 rounded-2xl shadow-xl p-6">
                <h2 className="text-xl font-semibold text-white mb-4">
                    Questions
                </h2>
                <div className="space-y-6">
                    {session.questions.map((q) => (
                        <div
                            key={q.questionId}
                            className="border border-gray-700 rounded-xl p-4 hover:shadow-lg transition-all bg-gray-700/50 relative"
                        >
                            <div className="flex justify-between items-start">
                                <h3 className="text-lg font-bold text-white mb-2">
                                    {q.title}
                                </h3>
                                <button
                                    onClick={() =>
                                        toggleDeleteButton(q.questionId)
                                    }
                                    className="text-gray-400 hover:text-white transition"
                                    aria-label="More options"
                                >
                                    <MoreVertical size={20} />
                                </button>
                            </div>
                            <p className="text-gray-300 mb-3">{q.content}</p>
                            <div className="text-sm text-gray-400">
                                <p>
                                    <strong>Answer 1:</strong>{" "}
                                    {q.suitableAnswer1}
                                </p>
                                <p>
                                    <strong>Answer 2:</strong>{" "}
                                    {q.suitableAnswer2}
                                </p>
                            </div>
                            <div className="mt-3 text-xs text-gray-500">
                                Difficulty: {q.difficulty} | Source: {q.source}
                            </div>
                            {showDelete[q.questionId] && (
                                <button
                                    onClick={() => handleDelete(q.questionId)}
                                    className="mt-3 bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700 transition"
                                >
                                    Delete Question
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default InterviewSessionDetail;
