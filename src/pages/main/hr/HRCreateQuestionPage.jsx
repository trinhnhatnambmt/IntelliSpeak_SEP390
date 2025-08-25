import React, { useState, useEffect } from "react";
import {
    getAllTopic,
    postQuestion,
    getTagsOfTopic,
    getMyQuestionsAPI,
    getMyInterviewSessionsAPI,
    createInterviewSessionAPI,
    getAllTag
} from "~/apis/index";
import { toast } from "react-toastify";
import HRCreateSessionModal from "./HRCreateSessionModal";
import HREditSessionModal from "./HREditSessionModal";
import HRDeleteSessionConfirm from "./HRDeleteSessionConfirm";
import HRCreateQuestionModal from "./HRCreateQuestionModal";

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
    const [showCreateQuestionModal, setShowCreateQuestionModal] = useState(false);
    const [topics, setTopics] = useState([]);
    const [allTags, setAllTags] = useState([]); // all tags from API
    const [myQuestions, setMyQuestions] = useState([]);
    // Only tags that have at least one question
    const tagsInMyQuestions = React.useMemo(() => {
        const tagMap = {};
        myQuestions.forEach(q => {
            (q.tags || []).forEach(tag => {
                tagMap[tag.tagId || tag.id] = tag;
            });
        });
        return Object.values(tagMap);
    }, [myQuestions]);
    const [selectedTagFilter, setSelectedTagFilter] = useState("");
    const [tags, setTags] = useState([]); // tags filtered by topic
    const [selectedTopic, setSelectedTopic] = useState("");
    const [mySessions, setMySessions] = useState([]);
    const [activeTab, setActiveTab] = useState('session');
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDifficulty, setSelectedDifficulty] = useState("");
    const [sessionSearchTerm, setSessionSearchTerm] = useState("");
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
    const [openSessionMenuId, setOpenSessionMenuId] = useState(null);
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
                setAllTags(Array.isArray(tagsRes) ? tagsRes : tagsRes?.data || []);
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

    // When topic changes, fetch tags of that topic
    const handleTopicChange = async (topicId) => {
        console.log('[handleTopicChange] topicId:', topicId);
        setSelectedTopic(topicId);
        setTags([]);
        setIsLoading(true);
        try {
            if (topicId) {
                const tagsOfTopic = await getTagsOfTopic(topicId);
                console.log('[handleTopicChange] tagsOfTopic:', tagsOfTopic);
                const tagsData = Array.isArray(tagsOfTopic) ? tagsOfTopic : tagsOfTopic?.data || [];
                setTags(tagsData);
            } else {
                setTags([]);
            }
        } catch (err) {
            console.error('[handleTopicChange] error:', err);
            setTags([]);
        } finally {
            setIsLoading(false);
        }
    };


    // Remove handleChange, handleSubmit for inline form, use modal instead

    // handleTemplateChange is not used


    const handleCreateQuestion = async (modalForm, { setSuccess, setForm }) => {
        setIsLoading(true);
        const tagId = Number(modalForm.tag);
        try {
            const payload = {
                title: modalForm.title.trim(),
                content: modalForm.content.trim(),
                difficulty: modalForm.difficulty,
                suitableAnswer1: modalForm.demoAnswer.trim(),
                suitableAnswer2: modalForm.demoAnswer2 ? modalForm.demoAnswer2.trim() : "",
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
            setShowCreateQuestionModal(false);
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
        } catch {
            toast.error("Failed to create interview session!");
        } finally {
            setTemplateLoading(false);
        }
    };

    const filteredQuestions = myQuestions.filter(question => {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch =
            question.title.toLowerCase().includes(searchLower) ||
            question.content.toLowerCase().includes(searchLower) ||
            question.tags.some(tag => tag.title.toLowerCase().includes(searchLower)) ||
            question.difficulty.toLowerCase().includes(searchLower);
        const matchesTag = !selectedTagFilter || question.tags.some(tag => String(tag.tagId) === String(selectedTagFilter));
        const matchesDifficulty = !selectedDifficulty || question.difficulty === selectedDifficulty;
        return matchesSearch && matchesTag && matchesDifficulty;
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
                                                <span className={`px-2 py-1 text-xs rounded-full border ${session.difficulty === 'EASY' ? 'bg-green-50 text-green-700 border-green-100 dark:bg-green-900 dark:text-green-200' :
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
                        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto items-center">
                            <input
                                type="text"
                                placeholder="Search questions..."
                                className="px-3 py-1 border rounded-md dark:bg-neutral-800 dark:border-neutral-700 flex-grow"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <select
                                className="px-3 py-1 border rounded-md dark:bg-neutral-800 dark:border-neutral-700 text-sm"
                                value={selectedTagFilter}
                                onChange={e => setSelectedTagFilter(e.target.value)}
                            >
                                <option value="">All Tags</option>
                                {tagsInMyQuestions.map(tag => (
                                    <option key={tag.tagId || tag.id} value={tag.tagId || tag.id}>{tag.title}</option>
                                ))}
                            </select>
                            <select
                                className="px-3 py-1 border rounded-md dark:bg-neutral-800 dark:border-neutral-700 text-sm"
                                value={selectedDifficulty}
                                onChange={e => setSelectedDifficulty(e.target.value)}
                            >
                                <option value="">All Difficulties</option>
                                <option value="EASY">Easy</option>
                                <option value="MEDIUM">Medium</option>
                                <option value="HARD">Hard</option>
                            </select>
                            <button
                                onClick={() => setShowCreateQuestionModal(true)}
                                className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600"
                            >
                                Add New
                            </button>
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
                                        Clear Filter
                                    </button>
                                </>
                            ) : (
                                <>
                                    <p className="text-gray-500 dark:text-gray-400">You have not created any questions yet</p>
                                    <button
                                        onClick={() => setShowCreateQuestionModal(true)}
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
                                    {(question.suitableAnswer1 || question.suitableAnswer2) && (
                                        <div className="mt-3 p-3 bg-gray-50 dark:bg-neutral-800 rounded">
                                            <p className="font-medium">Sample Answer 1:</p>
                                            <p className="mt-1 whitespace-pre-line">{question.suitableAnswer1}</p>
                                            {question.suitableAnswer2 && (
                                                <>
                                                    <p className="font-medium mt-3">Sample Answer 2:</p>
                                                    <p className="mt-1 whitespace-pre-line">{question.suitableAnswer2}</p>
                                                </>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ) : null}
            {/* Modal tạo câu hỏi mới */}
            {showCreateQuestionModal && (
                <HRCreateQuestionModal
                    open={showCreateQuestionModal}
                    onClose={() => setShowCreateQuestionModal(false)}
                    onSubmit={handleCreateQuestion}
                    topics={topics}
                    tags={tags}
                    difficulties={difficulties}
                    loading={isLoading}
                    onTopicChange={handleTopicChange}
                    selectedTopic={selectedTopic}
                />
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
