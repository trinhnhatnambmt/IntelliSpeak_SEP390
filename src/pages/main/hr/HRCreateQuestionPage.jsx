import React, { useState, useEffect } from "react";
import {
    getAllTopic,
    postQuestion,
    getTagsOfTopic,
    getMyQuestionsAPI,
    getMyInterviewSessionsAPI,
    createInterviewSessionAPI,
    getAllTag,
} from "~/apis/index";
import { toast } from "react-toastify";
import HRCreateSessionModal from "./HRCreateSessionModal";
import HREditSessionModal from "./HREditSessionModal";
import HRDeleteSessionConfirm from "./HRDeleteSessionConfirm";
import HRCreateQuestionModal from "./HRCreateQuestionModal";
import HRInterviewTemplateTab from "./HRInterviewTemplateTab";
import HRQuestionManagementTab from "./HRQuestionManagementTab";
import HRJDUploadTab from "./HRJDUploadTab";
import HRPotentialCandidatesTab from "./HRPotentialCandidatesTab";

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
    const [showCreateQuestionModal, setShowCreateQuestionModal] =
        useState(false);
    const [topics, setTopics] = useState([]);
    const [allTags, setAllTags] = useState([]); // all tags from API
    const [myQuestions, setMyQuestions] = useState([]);
    // Only tags that have at least one question
    const tagsInMyQuestions = React.useMemo(() => {
        const tagMap = {};
        myQuestions.forEach((q) => {
            (q.tags || []).forEach((tag) => {
                tagMap[tag.tagId || tag.id] = tag;
            });
        });
        return Object.values(tagMap);
    }, [myQuestions]);
    const [selectedTagFilter, setSelectedTagFilter] = useState("");
    const [tags, setTags] = useState([]); // tags filtered by topic
    const [selectedTopic, setSelectedTopic] = useState("");
    const [mySessions, setMySessions] = useState([]);
    const [activeTab, setActiveTab] = useState("session");
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
    const [editSessionModal, setEditSessionModal] = useState({
        open: false,
        session: null,
    });
    const [deleteSessionModal, setDeleteSessionModal] = useState({
        open: false,
        session: null,
    });

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
            // Ensure it's always an array
            const sessions = Array.isArray(res) ? res : res?.data || [];
            setMySessions(sessions);
        } catch (error) {
            console.error("Error fetching interview sessions:", error);
            toast.error("Failed to fetch interview sessions");
            setMySessions([]); // Fallback to empty array if error
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
                setTopics(
                    Array.isArray(topicsRes) ? topicsRes : topicsRes?.data || []
                );
                setAllTags(
                    Array.isArray(tagsRes) ? tagsRes : tagsRes?.data || []
                );
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
        console.log("[handleTopicChange] topicId:", topicId);
        setSelectedTopic(topicId);
        setTags([]);
        setIsLoading(true);
        try {
            if (topicId) {
                const tagsOfTopic = await getTagsOfTopic(topicId);
                console.log("[handleTopicChange] tagsOfTopic:", tagsOfTopic);
                const tagsData = Array.isArray(tagsOfTopic)
                    ? tagsOfTopic
                    : tagsOfTopic?.data || [];
                setTags(tagsData);
            } else {
                setTags([]);
            }
        } catch (err) {
            console.error("[handleTopicChange] error:", err);
            setTags([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateQuestion = async (modalForm, { setSuccess, setForm }) => {
        setIsLoading(true);
        const tagId = Number(modalForm.tag);
        try {
            const payload = {
                title: modalForm.title.trim(),
                content: modalForm.content.trim(),
                difficulty: modalForm.difficulty,
                suitableAnswer1: modalForm.demoAnswer.trim(),
                suitableAnswer2: modalForm.demoAnswer2
                    ? modalForm.demoAnswer2.trim()
                    : "",
                tagIds: [tagId],
                tags: [],
                deleted: false,
            };
            await postQuestion(payload);
            toast.success("Question created successfully!");
            setSuccess(true);
            setForm(initialForm);
            await fetchMyQuestions();
            setActiveTab("question");
            setShowCreateQuestionModal(false);
        } catch (err) {
            console.error("Error creating question:", err);
            toast.error(
                err.response?.data?.message || "Failed to create question!"
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateTemplate = async (e) => {
        e.preventDefault();
        setTemplateLoading(true);
        try {
            // Normalize data for API
            const payload = {
                title: templateForm.title.trim(),
                description: templateForm.description.trim(),
                interviewSessionThumbnail:
                    templateForm.interviewSessionThumbnail.trim(),
                totalQuestion: Number(templateForm.totalQuestion),
                difficulty: templateForm.difficulty,
                topicId: Number(templateForm.topicId),
                tagIds: templateForm.tagIds.map((id) => Number(id)),
                questionIds: templateForm.questionIds.map((id) => Number(id)),
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

    const filteredQuestions = myQuestions.filter((question) => {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch =
            question.title.toLowerCase().includes(searchLower) ||
            question.content.toLowerCase().includes(searchLower) ||
            question.tags.some((tag) =>
                tag.title.toLowerCase().includes(searchLower)
            ) ||
            question.difficulty.toLowerCase().includes(searchLower);
        const matchesTag =
            !selectedTagFilter ||
            question.tags.some(
                (tag) => String(tag.tagId) === String(selectedTagFilter)
            );
        const matchesDifficulty =
            !selectedDifficulty || question.difficulty === selectedDifficulty;
        return matchesSearch && matchesTag && matchesDifficulty;
    });

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white dark:bg-neutral-900 rounded-xl shadow-md mt-6 md:mt-10 z-10 relative">
            <h2 className="text-2xl font-bold mb-6 text-center">
                Interview Management
            </h2>
            <div className="flex border-b mb-6 overflow-x-auto">
                <button
                    className={`py-2 px-4 font-medium whitespace-nowrap ${activeTab === "session"
                            ? "border-b-2 border-blue-500 text-blue-500"
                            : "text-gray-500 dark:text-gray-400"
                        }`}
                    onClick={() => setActiveTab("session")}
                >
                    Interview Template Management ({mySessions.length})
                </button>
                <button
                    className={`py-2 px-4 font-medium whitespace-nowrap ${activeTab === "question"
                            ? "border-b-2 border-blue-500 text-blue-500"
                            : "text-gray-500 dark:text-gray-400"
                        }`}
                    onClick={() => setActiveTab("question")}
                >
                    Question Management
                </button>
                <button
                    className={`py-2 px-4 font-medium whitespace-nowrap ${activeTab === "jd"
                            ? "border-b-2 border-blue-500 text-blue-500"
                            : "text-gray-500 dark:text-gray-400"
                        }`}
                    onClick={() => setActiveTab("jd")}
                >
                    JD Upload
                </button>
                <button
                    className={`py-2 px-4 font-medium whitespace-nowrap ${activeTab === "candidates"
                            ? "border-b-2 border-blue-500 text-blue-500"
                            : "text-gray-500 dark:text-gray-400"
                        }`}
                    onClick={() => setActiveTab("candidates")}
                >
                    Potential Candidates
                </button>
            </div>
            {isLoading ? (
                <div className="flex justify-center items-center py-10">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : activeTab === "session" ? (
                <HRInterviewTemplateTab
                    mySessions={mySessions}
                    sessionSearchTerm={sessionSearchTerm}
                    setSessionSearchTerm={setSessionSearchTerm}
                    fetchMySessions={fetchMySessions}
                    setShowTemplateModal={setShowTemplateModal}
                    setOpenSessionMenuId={setOpenSessionMenuId}
                    openSessionMenuId={openSessionMenuId}
                    setEditSessionModal={setEditSessionModal}
                    setDeleteSessionModal={setDeleteSessionModal}
                />
            ) : activeTab === "question" ? (
                <HRQuestionManagementTab
                    myQuestions={myQuestions}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    selectedTagFilter={selectedTagFilter}
                    setSelectedTagFilter={setSelectedTagFilter}
                    selectedDifficulty={selectedDifficulty}
                    setSelectedDifficulty={setSelectedDifficulty}
                    tagsInMyQuestions={tagsInMyQuestions}
                    setShowCreateQuestionModal={setShowCreateQuestionModal}
                    fetchMyQuestions={fetchMyQuestions}
                />
            ) : activeTab === "jd" ? (
                <HRJDUploadTab />
            ) : activeTab === "candidates" ? (
                <HRPotentialCandidatesTab />
            ) : null}
            {/* Modal tạo câu hỏi mới */}
            {showCreateQuestionModal && (
                <HRCreateQuestionModal
                    open={showCreateQuestionModal}
                    onClose={() => setShowCreateQuestionModal(false)}
                    onSubmit={handleCreateQuestion}
                    topics={topics}
                    mySessions={mySessions}
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
                    onClose={() =>
                        setEditSessionModal({ open: false, session: null })
                    }
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
                    onClose={() =>
                        setDeleteSessionModal({ open: false, session: null })
                    }
                    onDeleted={fetchMySessions}
                />
            )}
        </div>
    );
}