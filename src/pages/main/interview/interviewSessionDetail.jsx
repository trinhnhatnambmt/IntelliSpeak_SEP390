import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    deleteQuestionFromSessionAPI,
    getDetailSessionAPI,
    getListQuestionNotInInterviewSessionAPI,
    updataQuestionInDetailAPI,
    addQuestionNotInInterviewSessionAPI, // Thêm import này nếu chưa có
} from "~/apis";
import { Clock, BarChart, Tag, Layers, MoreVertical } from "lucide-react";
import { toast } from "react-toastify";
import {
    Dropdown,
    Menu,
    Button,
    Modal,
    Form,
    Input,
    Select,
    Checkbox,
    Empty,
} from "antd";
import ModalEditQuestion from "./ModalEditQuestion";

const { Option } = Select;

const InterviewSessionDetail = () => {
    const { id } = useParams();
    const [session, setSession] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingQuestion, setEditingQuestion] = useState(null);
    const [questionNotInInterviewSessions, setQuestionNotInInterviewSessions] =
        useState([]);
    const [form] = Form.useForm();

    // State mới cho modal add
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [selectedQuestionIds, setSelectedQuestionIds] = useState([]);

    const interviewSessionId = session?.interviewSessionId;

    useEffect(() => {
        getDetailSessionAPI(id).then((res) => setSession(res));
    }, [id]);

    useEffect(() => {
        if (interviewSessionId) {
            // Chỉ gọi khi có id
            getListQuestionNotInInterviewSessionAPI(interviewSessionId).then(
                (res) => {
                    console.log(res);
                    setQuestionNotInInterviewSessions(res);
                }
            );
        }
    }, [interviewSessionId]);

    const handleDelete = (questionId) => {
        deleteQuestionFromSessionAPI(interviewSessionId, questionId).then(
            (res) => {
                toast.success(res?.message);
                getDetailSessionAPI(id).then((res) => setSession(res));
            }
        );
    };

    const handleEdit = (question) => {
        setEditingQuestion(question);
        form.setFieldsValue({
            title: question.title,
            content: question.content,
            suitableAnswer1: question.suitableAnswer1,
            suitableAnswer2: question.suitableAnswer2,
            difficulty: question.difficulty,
            source: question.source,
        });
        setIsModalVisible(true);
    };

    const handleModalOk = () => {
        form.validateFields().then((values) => {
            updataQuestionInDetailAPI(editingQuestion.questionId, values)
                .then((res) => {
                    toast.success("Question updated successfully!");
                    setIsModalVisible(false);
                    form.resetFields();
                    getDetailSessionAPI(id).then((res) => setSession(res));
                })
                .catch(() => {
                    toast.error("Failed to update question.");
                });
        });
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    // Hàm mới cho add question
    const showAddModal = () => {
        setIsAddModalVisible(true);
        setSelectedQuestionIds([]); // Reset selected khi mở modal
    };

    const handleAddModalOk = () => {
        if (selectedQuestionIds.length === 0) {
            toast.error("Please select at least one question.");
            return;
        }

        const data = { questionIds: selectedQuestionIds };
        addQuestionNotInInterviewSessionAPI(interviewSessionId, data)
            .then((res) => {
                toast.success("Questions added successfully!");
                setIsAddModalVisible(false);
                getDetailSessionAPI(id).then((res) => setSession(res));
                getListQuestionNotInInterviewSessionAPI(
                    interviewSessionId
                ).then((res) => {
                    setQuestionNotInInterviewSessions(res);
                });
            })
            .catch(() => {
                toast.error("Failed to add questions.");
            });
    };

    const handleAddModalCancel = () => {
        setIsAddModalVisible(false);
        setSelectedQuestionIds([]);
    };

    const handleCheckboxChange = (checkedValues) => {
        setSelectedQuestionIds(checkedValues);
    };

    const menu = (question) => (
        <Menu>
            <Menu.Item key="edit" onClick={() => handleEdit(question)}>
                Edit Question
            </Menu.Item>
            <Menu.Item
                key="delete"
                onClick={() => handleDelete(question.questionId)}
                style={{ color: "red" }}
            >
                Remove Question
            </Menu.Item>
        </Menu>
    );

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
            <div className="bg-gray-800 rounded-2xl shadow-xl p-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white flex items-center">
                        <Layers size={24} className="text-blue-400 mr-2" />
                        Questions
                    </h2>
                    <Button type="primary" onClick={showAddModal}>
                        Add Question
                    </Button>
                </div>
                <div className="space-y-8">
                    {session.questions.map((q, index) => (
                        <div
                            key={q.questionId}
                            className="border border-gray-600 rounded-xl p-6 bg-gradient-to-br from-gray-700 to-gray-800 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-semibold text-blue-200">
                                    {index + 1}. {q.title}
                                </h3>
                                <Dropdown
                                    overlay={() => menu(q)}
                                    trigger={["click"]}
                                >
                                    <Button
                                        type="text"
                                        icon={<MoreVertical size={24} />}
                                        className="text-gray-300 hover:text-blue-400 transition-transform duration-200 hover:scale-110"
                                        aria-label="More options"
                                    />
                                </Dropdown>
                            </div>
                            <p className="text-gray-200 text-base leading-relaxed mb-4">
                                {q.content}
                            </p>
                            <div className="text-sm text-gray-300 space-y-2">
                                <p>
                                    <strong className="text-blue-300">
                                        Answer 1:
                                    </strong>{" "}
                                    {q.suitableAnswer1}
                                </p>
                                <p>
                                    <strong className="text-blue-300">
                                        Answer 2:
                                    </strong>{" "}
                                    {q.suitableAnswer2}
                                </p>
                            </div>
                            <div className="mt-4 text-xs text-gray-400 flex gap-4">
                                <span className="flex items-center gap-1">
                                    <BarChart
                                        size={14}
                                        className="text-blue-400"
                                    />
                                    Difficulty:{" "}
                                    <span className="font-medium">
                                        {q.difficulty}
                                    </span>
                                </span>
                                <span className="flex items-center gap-1">
                                    <Tag size={14} className="text-blue-400" />
                                    Source:{" "}
                                    <span className="font-medium">
                                        {q.source}
                                    </span>
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Edit Question Modal */}
            <ModalEditQuestion
                onOk={handleModalOk}
                onCancel={handleModalCancel}
                visible={isModalVisible}
                form={form}
            />

            {/* Modal mới cho Add Question */}
            <Modal
                title="Add Questions to Session"
                visible={isAddModalVisible}
                onOk={handleAddModalOk}
                onCancel={handleAddModalCancel}
                okText="Add Selected"
                cancelText="Cancel"
            >
                {questionNotInInterviewSessions.length > 0 ? (
                    <Checkbox.Group
                        style={{ width: "100%" }}
                        onChange={handleCheckboxChange}
                        value={selectedQuestionIds}
                    >
                        <div className="space-y-4">
                            {questionNotInInterviewSessions.map((q) => (
                                <Checkbox
                                    key={q.questionId}
                                    value={q.questionId}
                                >
                                    {q.content}
                                </Checkbox>
                            ))}
                        </div>
                    </Checkbox.Group>
                ) : (
                    <Empty description="No questions available to add." />
                )}
            </Modal>
        </div>
    );
};

export default InterviewSessionDetail;
