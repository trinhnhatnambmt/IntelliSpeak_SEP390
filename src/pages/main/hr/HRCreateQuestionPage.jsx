import React, { useState, useEffect } from "react";
import {
    getAllTopic,
    getAllTag,
    postQuestion,
    connectTopicAndTag,
    getTagsOfTopic,
    getMyQuestionsAPI,
    getMyInterviewSessionsAPI,
    createInterviewSessionAPI // thêm import
} from "~/apis/index";
import { toast } from "react-toastify";
import HRCreateSessionModal from "./HRCreateSessionModal";
import HREditSessionModal from "./HREditSessionModal";
import HRDeleteSessionConfirm from "./HRDeleteSessionConfirm";

const difficulties = [
    { value: "EASY", label: "Easy" },
    { value: "MEDIUM", label: "Medium" },
    { value: "HARD", label: "Hard" },
];

const initialForm = {
    topic: "",
    tag: "",
    title: "",
    content: "",
    difficulty: "",
    demoAnswer: "",
};

export default function HRCreateQuestionPage() {
    const [form, setForm] = useState(initialForm);
    const [topics, setTopics] = useState([]);
    const [tags, setTags] = useState([]);
    const [success, setSuccess] = useState(false);
    const [myQuestions, setMyQuestions] = useState([]);
    const [mySessions, setMySessions] = useState([]);
    const [activeTab, setActiveTab] = useState('session');
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [sessionSearchTerm, setSessionSearchTerm] = useState(""); // thêm state cho search session
    const [showTemplateModal, setShowTemplateModal] = useState(false);
    const [templateForm, setTemplateForm] = useState({
        title: "",
        description: "",
        interviewSessionThumbnail: "",
        totalQuestion: "",
        difficulty: "",
        topicId: "",
        tagIds: [],
        questionIds: [],
    });
    const [templateLoading, setTemplateLoading] = useState(false);
    const [openSessionMenuId, setOpenSessionMenuId] = useState(null); // state cho menu mở
    const [editSessionModal, setEditSessionModal] = useState({ open: false, session: null });
    const [deleteSessionModal, setDeleteSessionModal] = useState({ open: false, session: null });

    const fetchMyQuestions = async () => {
        setIsLoading(true);
        try {
            const res = await getMyQuestionsAPI();
            if (res.data) {
                setMyQuestions(res.data);
            }
        } catch (error) {
            console.error("Error fetching my questions:", error);
            toast.error("Failed to fetch questions list");
        } finally {
            setIsLoading(false);
        }
    };

    const fetchMySessions = async () => {
        setIsLoading(true);
        try {
            const res = await getMyInterviewSessionsAPI();
            // Đảm bảo luôn là mảng
            const sessions = Array.isArray(res) ? res : res?.data || [];
            setMySessions(sessions);
        } catch (error) {
            console.error("Error fetching interview sessions:", error);
            toast.error("Failed to fetch interview sessions");
            setMySessions([]); // fallback về mảng rỗng nếu lỗi
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const [topicsRes, tagsRes] = await Promise.all([
                    getAllTopic(),
                    getAllTag(),
                ]);
                setTopics(Array.isArray(topicsRes) ? topicsRes : topicsRes?.data || []);
                setTags(Array.isArray(tagsRes) ? tagsRes : tagsRes?.data || []);
                await fetchMyQuestions();
                await fetchMySessions();
            } catch (error) {
                console.error("Error fetching initial data:", error);
                toast.error("Failed to load initial data");
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleTemplateChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name === "tagIds") {
            const tagId = value;
            setTemplateForm((prev) => ({
                ...prev,
                tagIds: checked
                    ? [...prev.tagIds, tagId]
                    : prev.tagIds.filter((id) => id !== tagId),
            }));
        } else if (name === "questionIds") {
            const qId = value;
            setTemplateForm((prev) => ({
                ...prev,
                questionIds: checked
                    ? [...prev.questionIds, qId]
                    : prev.questionIds.filter((id) => id !== qId),
            }));
        } else {
            setTemplateForm((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const topicId = Number(form.topic);
        const tagId = Number(form.tag);

        try {
            let isConnected = false;
            try {
                const tagsOfTopic = await getTagsOfTopic(topicId);
                const tagsData = Array.isArray(tagsOfTopic)
                    ? tagsOfTopic
                    : tagsOfTopic?.data || [];
                isConnected = tagsData.some((t) => Number(t.tagId) === tagId);
            } catch {}

            if (!isConnected) {
                await connectTopicAndTag(topicId, tagId);
            }

            const payload = {
                title: form.title.trim(),
                content: form.content.trim(),
                difficulty: form.difficulty,
                suitableAnswer1: form.demoAnswer.trim(),
                suitableAnswer2: "",
                tagIds: [tagId],
                tags: [],
                deleted: false,
            };

            await postQuestion(payload);
            toast.success("Question created successfully!");
            setSuccess(true);
            setForm(initialForm);
            await fetchMyQuestions();
            setActiveTab('question');
        } catch (err) {
            console.error("Error creating question:", err);
            toast.error(err.response?.data?.message || "Failed to create question!");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateTemplate = async (e) => {
        e.preventDefault();
        setTemplateLoading(true);
        try {
            // Chuẩn hóa dữ liệu gửi lên API
            const payload = {
                title: templateForm.title.trim(),
                description: templateForm.description.trim(),
                interviewSessionThumbnail: templateForm.interviewSessionThumbnail.trim(),
                totalQuestion: Number(templateForm.totalQuestion),
                difficulty: templateForm.difficulty,
                topicId: Number(templateForm.topicId),
                tagIds: templateForm.tagIds.map(id => Number(id)),
                questionIds: templateForm.questionIds.map(id => Number(id)),
            };
            await createInterviewSessionAPI(payload);
            toast.success("Interview session created successfully!");
            setShowTemplateModal(false);
            setTemplateForm({
                title: "",
                description: "",
                interviewSessionThumbnail: "",
                totalQuestion: "",
                difficulty: "",
                topicId: "",
                tagIds: [],
                questionIds: [],
            });
            await fetchMySessions();
        } catch (err) {
            toast.error("Failed to create interview session!");
        } finally {
            setTemplateLoading(false);
        }
    };

    const filteredQuestions = myQuestions.filter(question => {
        const searchLower = searchTerm.toLowerCase();
        return (
            question.title.toLowerCase().includes(searchLower) ||
            question.content.toLowerCase().includes(searchLower) ||
            question.tags.some((tag) =>
                tag.title.toLowerCase().includes(searchLower)
            ) ||
            question.difficulty.toLowerCase().includes(searchLower)
        );
    });

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white dark:bg-neutral-900 rounded-xl shadow-md mt-6 md:mt-10 z-10 relative">
            <h2 className="text-2xl font-bold mb-6 text-center">Interview Management</h2>
            <div className="flex border-b mb-6 overflow-x-auto">
                <button
                    className={`py-2 px-4 font-medium whitespace-nowrap ${activeTab === 'session' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500 dark:text-gray-400'}`}
                    onClick={() => setActiveTab('session')}
                >
                    Interview Session Management ({mySessions.length})
                </button>
                <button
                    className={`py-2 px-4 font-medium whitespace-nowrap ${activeTab === 'question' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500 dark:text-gray-400'}`}
                    onClick={() => setActiveTab('question')}
                >
                    Question Management
                </button>
            </div>
            {isLoading ? (
                <div className="flex justify-center items-center py-10">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : activeTab === 'session' ? (
                <div className="space-y-4">
                    {/* Header + actions */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-4">
                        <h3 className="text-xl font-semibold">My Interview Sessions</h3>
                        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
                            <input
                                type="text"
                                placeholder="Search sessions..."
                                className="px-3 py-1 border rounded-md dark:bg-neutral-800 dark:border-neutral-700 flex-grow"
                                value={sessionSearchTerm}
                                onChange={e => setSessionSearchTerm(e.target.value)}
                            />
                            <div className="flex gap-2">
                                <button
                                    onClick={fetchMySessions}
                                    className="px-3 py-1 bg-gray-100 dark:bg-neutral-700 rounded-md text-sm"
                                >
                                    Refresh
                                </button>
                                <button
                                    className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600"
                                    onClick={() => setShowTemplateModal(true)}
                                >
                                    Create a new template
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Danh sách session */}
                    {(!Array.isArray(mySessions) || mySessions.length === 0) ? (
                        <div className="text-center py-10">
                            <p className="text-gray-500 dark:text-gray-400">You have not created any interview sessions yet.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {mySessions
                                .filter(session =>
                                    session.title?.toLowerCase().includes(sessionSearchTerm.toLowerCase())
                                )
                                .map(session => (
                                    <div
                                        key={session.interviewSessionId}
                                        className="relative flex gap-4 items-center bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 rounded-xl shadow-sm hover:shadow-lg transition-shadow p-4"
                                    >
                                        {session.interviewSessionThumbnail && (
                                            <img
                                                src={session.interviewSessionThumbnail}
                                                alt="Session Thumbnail"
                                                className="w-16 h-16 object-cover rounded-lg border border-gray-200 dark:border-neutral-800"
                                            />
                                        )}
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-lg text-gray-800 dark:text-white">{session.title}</h4>
                                            <p className="text-gray-500 dark:text-gray-300 mt-1 text-sm">{session.description}</p>
                                            <div className="flex flex-wrap gap-2 mt-2 items-center">
                                                <span className="px-2 py-1 bg-gray-50 dark:bg-neutral-800 rounded text-xs text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-neutral-700">
                                                    Total Questions: {session.totalQuestion}
                                                </span>
                                                <span className={`px-2 py-1 text-xs rounded-full border ${
                                                    session.difficulty === 'EASY' ? 'bg-green-50 text-green-700 border-green-100 dark:bg-green-900 dark:text-green-200' :
                                                    session.difficulty === 'MEDIUM' ? 'bg-yellow-50 text-yellow-700 border-yellow-100 dark:bg-yellow-900 dark:text-yellow-200' :
                                                    'bg-red-50 text-red-700 border-red-100 dark:bg-red-900 dark:text-red-200'
                                                }`}>
                                                    {session.difficulty.charAt(0) + session.difficulty.slice(1).toLowerCase()}
                                                </span>
                                                {Array.isArray(session.tags) && session.tags.length > 0 && (
                                                    <div className="flex flex-wrap gap-1">
                                                        {session.tags.map(tag => (
                                                            <span
                                                                key={tag.tagId}
                                                                className="px-2 py-1 bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-200 text-xs rounded-full border border-blue-100 dark:border-blue-800"
                                                            >
                                                                {tag.title}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        {/* 3 chấm menu */}
                                        <div className="absolute top-4 right-4">
                                            <button
                                                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 transition"
                                                onClick={() => setOpenSessionMenuId(openSessionMenuId === session.interviewSessionId ? null : session.interviewSessionId)}
                                            >
                                                <span className="text-xl text-gray-500 dark:text-gray-300">⋮</span>
                                            </button>
                                            {openSessionMenuId === session.interviewSessionId && (
                                                <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 rounded-xl shadow-lg z-10 py-2">
                                                    <button
                                                        className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-neutral-800 rounded transition"
                                                        onClick={() => {
                                                            setOpenSessionMenuId(null);
                                                            setEditSessionModal({ open: true, session });
                                                        }}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-700 rounded transition"
                                                        onClick={() => {
                                                            setOpenSessionMenuId(null);
                                                            setDeleteSessionModal({ open: true, session });
                                                        }}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                        </div>
                    )}
                </div>
            ) : activeTab === 'question' ? (
                <div className="space-y-4">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-4">
                        <h3 className="text-xl font-semibold">My Questions</h3>
                        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
                            <input
                                type="text"
                                placeholder="Search questions..."
                                className="px-3 py-1 border rounded-md dark:bg-neutral-800 dark:border-neutral-700 flex-grow"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <div className="flex gap-2">
                                <button
                                    onClick={fetchMyQuestions}
                                    className="px-3 py-1 bg-gray-100 dark:bg-neutral-700 rounded-md text-sm"
                                >
                                    Refresh
                                </button>
                                <button
                                    onClick={() => setActiveTab("create")}
                                    className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600"
                                >
                                    Thêm mới
                                </button>
                            </div>
                        </div>
                    </div>
                    {filteredQuestions.length === 0 ? (
                        <div className="text-center py-10">
                            {searchTerm ? (
                                <>
                                    <p className="text-gray-500 dark:text-gray-400">No matching questions found</p>
                                    <button
                                        onClick={() => setSearchTerm("")}
                                        className="mt-4 px-4 py-2 bg-gray-100 dark:bg-neutral-700 rounded-md hover:bg-gray-200 dark:hover:bg-neutral-600"
                                    >
                                        Clear filter
                                    </button>
                                </>
                            ) : (
                                <>
                                    <p className="text-gray-500 dark:text-gray-400">You have not created any questions yet</p>
                                    <button
                                        onClick={() => setActiveTab("create")}
                                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                    >
                                        Create your first question
                                    </button>
                                </>
                            )}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredQuestions.map((question) => (
                                <div
                                    key={question.questionId}
                                    className="p-4 border rounded-lg dark:border-neutral-700 hover:shadow-md transition-shadow"
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <h4 className="font-medium text-lg">
                                                {question.title}
                                            </h4>
                                            <p className="text-gray-600 dark:text-gray-300 mt-1 whitespace-pre-line">
                                                {question.content}
                                            </p>
                                            <div className="flex flex-wrap items-center gap-3 mt-3">
                                                <span className={`px-2 py-1 text-xs rounded-full ${question.difficulty === 'EASY' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                                                        question.difficulty === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                                                            'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                                    }`}>
                                                    {question.difficulty.charAt(0) + question.difficulty.slice(1).toLowerCase()}
                                                </span>
                                                {question.tags.length > 0 && (
                                                    <div className="flex flex-wrap gap-2">
                                                        {question.tags.map(
                                                            (tag) => (
                                                                <span
                                                                    key={
                                                                        tag.tagId
                                                                    }
                                                                    className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs rounded-full"
                                                                >
                                                                    {tag.title}
                                                                </span>
                                                            )
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    {question.suitableAnswer1 && (
                                        <div className="mt-3 p-3 bg-gray-50 dark:bg-neutral-800 rounded">
                                            <p className="font-medium">Sample Answer:</p>
                                            <p className="mt-1 whitespace-pre-line">{question.suitableAnswer1}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block mb-1 font-medium">Topic <span className="text-red-500">*</span></label>
                        <select
                            name="topic"
                            value={form.topic}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md dark:bg-neutral-800 dark:text-white"
                            required
                            disabled={isLoading}
                        >
                            <option value="">Select topic</option>
                            {topics.map((t) => (
                                <option
                                    key={t.topicId || t.id}
                                    value={t.topicId || t.id}
                                >
                                    {t.title}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">
                            Tag <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="tag"
                            value={form.tag}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md dark:bg-neutral-800 dark:text-white"
                            required
                            disabled={isLoading}
                        >
                            <option value="">Select tag</option>
                            {tags.map((t) => (
                                <option
                                    key={t.tagId || t.id}
                                    value={t.tagId || t.id}
                                >
                                    {t.title}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Title <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md dark:bg-neutral-800 dark:text-white"
                            required
                            disabled={isLoading}
                            placeholder="Enter question title"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Question Content <span className="text-red-500">*</span></label>
                        <textarea
                            name="content"
                            value={form.content}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md dark:bg-neutral-800 dark:text-white"
                            rows={4}
                            required
                            disabled={isLoading}
                            placeholder="Enter detailed question content"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Difficulty <span className="text-red-500">*</span></label>
                        <select
                            name="difficulty"
                            value={form.difficulty}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md dark:bg-neutral-800 dark:text-white"
                            required
                            disabled={isLoading}
                        >
                            <option value="">Select difficulty</option>
                            {difficulties.map((d) => (
                                <option key={d.value} value={d.value}>
                                    {d.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Sample Answer <span className="text-red-500">*</span></label>
                        <textarea
                            name="demoAnswer"
                            value={form.demoAnswer}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md dark:bg-neutral-800 dark:text-white"
                            rows={3}
                            required
                            disabled={isLoading}
                            placeholder="Enter sample answer for the question"
                        />
                    </div>
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={() => setActiveTab('question')}
                            className="flex-1 py-2 px-4 bg-gray-200 hover:bg-gray-300 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-black dark:text-white font-semibold rounded-md transition"
                            disabled={isLoading}
                        >
                            Back
                        </button>
                        <button
                            type="submit"
                            className={`flex-1 py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md transition ${
                                isLoading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Processing...' : 'Create Question'}
                        </button>
                    </div>
                    {success && (
                        <div className="text-green-600 text-center font-medium mt-2">
                            Question created successfully!
                        </div>
                    )}
                </form>
            )}
            {/* Modal tạo template */}
            {showTemplateModal && (
                <HRCreateSessionModal
                    open={showTemplateModal}
                    onClose={() => setShowTemplateModal(false)}
                    templateForm={templateForm}
                    setTemplateForm={setTemplateForm}
                    templateLoading={templateLoading}
                    handleCreateTemplate={handleCreateTemplate}
                    topics={topics}
                    tags={tags}
                    myQuestions={myQuestions}
                />
            )}
            {/* Modal edit session */}
            {editSessionModal.open && (
                <HREditSessionModal
                    open={editSessionModal.open}
                    session={editSessionModal.session}
                    onClose={() => setEditSessionModal({ open: false, session: null })}
                    topics={topics}
                    tags={tags}
                    myQuestions={myQuestions}
                    onUpdated={fetchMySessions}
                />
            )}
            {/* Modal xác nhận xóa */}
            {deleteSessionModal.open && (
                <HRDeleteSessionConfirm
                    open={deleteSessionModal.open}
                    session={deleteSessionModal.session}
                    onClose={() => setDeleteSessionModal({ open: false, session: null })}
                    onDeleted={fetchMySessions}
                />
            )}
        </div>
    );
}
