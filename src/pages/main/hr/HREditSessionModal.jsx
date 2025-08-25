import React, { useState } from "react";
import { createInterviewSessionAPI } from "~/apis/index"; // hoặc update API nếu có

export default function HREditSessionModal({
    open,
    session,
    onClose,
    topics,
    tags,
    myQuestions,
    onUpdated,
}) {
    const [form, setForm] = useState({
        title: session?.title || "",
        description: session?.description || "",
        interviewSessionThumbnail: session?.interviewSessionThumbnail || "",
        totalQuestion: session?.totalQuestion || "",
        difficulty: session?.difficulty || "",
        topicId: session?.topicId || "",
        tagIds: session?.tags?.map(t => String(t.tagId)) || [],
        questionIds: session?.questionIds?.map(q => String(q)) || [],
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name === "tagIds") {
            const tagId = value;
            setForm((prev) => ({
                ...prev,
                tagIds: checked
                    ? [...prev.tagIds, tagId]
                    : prev.tagIds.filter((id) => id !== tagId),
            }));
        } else if (name === "questionIds") {
            const qId = value;
            setForm((prev) => ({
                ...prev,
                questionIds: checked
                    ? [...prev.questionIds, qId]
                    : prev.questionIds.filter((id) => id !== qId),
            }));
        } else {
            setForm((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // TODO: Gọi API update session ở đây, ví dụ:
            // await updateInterviewSessionAPI(session.interviewSessionId, payload);
            // Nếu không có API update thì có thể dùng createInterviewSessionAPI như mẫu
            await createInterviewSessionAPI({
                ...form,
                totalQuestion: Number(form.totalQuestion),
                topicId: Number(form.topicId),
                tagIds: form.tagIds.map(id => Number(id)),
                questionIds: form.questionIds.map(id => Number(id)),
                interviewSessionId: session.interviewSessionId,
            });
            if (onUpdated) await onUpdated();
            onClose();
        } catch (err) {
            // TODO: show toast error
        } finally {
            setLoading(false);
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
            <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl p-6 w-full max-w-lg relative border border-gray-100 dark:border-neutral-800">
                <button
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-white text-2xl"
                    onClick={onClose}
                    disabled={loading}
                >
                    &times;
                </button>
                <h3 className="text-xl font-bold mb-4 text-center text-gray-800 dark:text-white">Edit Interview Session</h3>
                <form onSubmit={handleUpdate} className="space-y-4">
                    {/* Các trường giống như modal create, dùng form và handleChange */}
                    {/* ...copy/paste các trường input/select/checkbox như modal create... */}
                    {/* ...chỉ khác là dùng form thay vì templateForm */}
                    {/* ...nút Save thay cho Create... */}
                    <div>
                        <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Title <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-200 dark:border-neutral-700 rounded-lg dark:bg-neutral-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                            disabled={loading}
                            placeholder="Enter session title"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Description <span className="text-red-500">*</span></label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-200 dark:border-neutral-700 rounded-lg dark:bg-neutral-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                            rows={3}
                            required
                            disabled={loading}
                            placeholder="Enter session description"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Thumbnail URL</label>
                        <input
                            type="text"
                            name="interviewSessionThumbnail"
                            value={form.interviewSessionThumbnail}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-200 dark:border-neutral-700 rounded-lg dark:bg-neutral-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                            disabled={loading}
                            placeholder="Enter thumbnail image URL (optional)"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Total Questions <span className="text-red-500">*</span></label>
                        <input
                            type="number"
                            name="totalQuestion"
                            value={form.totalQuestion}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-200 dark:border-neutral-700 rounded-lg dark:bg-neutral-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                            disabled={loading}
                            min={1}
                            placeholder="Enter total questions"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Difficulty <span className="text-red-500">*</span></label>
                        <select
                            name="difficulty"
                            value={form.difficulty}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-200 dark:border-neutral-700 rounded-lg dark:bg-neutral-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                            disabled={loading}
                        >
                            <option value="">Select difficulty</option>
                            {["EASY", "MEDIUM", "HARD"].map((d) => (
                                <option key={d} value={d}>
                                    {d.charAt(0) + d.slice(1).toLowerCase()}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Topic <span className="text-red-500">*</span></label>
                        <select
                            name="topicId"
                            value={form.topicId}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-200 dark:border-neutral-700 rounded-lg dark:bg-neutral-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                            disabled={loading}
                        >
                            <option value="">Select topic</option>
                            {topics.map((t) => (
                                <option key={t.topicId || t.id} value={t.topicId || t.id}>
                                    {t.title}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Tags <span className="text-red-500">*</span></label>
                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag) => (
                                <label key={tag.tagId || tag.id} className="flex items-center gap-1 bg-gray-50 dark:bg-neutral-800 px-2 py-1 rounded border border-gray-200 dark:border-neutral-700">
                                    <input
                                        type="checkbox"
                                        name="tagIds"
                                        value={tag.tagId || tag.id}
                                        checked={form.tagIds.includes(String(tag.tagId || tag.id))}
                                        onChange={handleChange}
                                        disabled={loading}
                                    />
                                    <span className="text-xs text-gray-700 dark:text-gray-200">{tag.title}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Questions</label>
                        <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                            {myQuestions.map((q) => (
                                <label key={q.questionId} className="flex items-center gap-1 bg-gray-50 dark:bg-neutral-800 px-2 py-1 rounded border border-gray-200 dark:border-neutral-700">
                                    <input
                                        type="checkbox"
                                        name="questionIds"
                                        value={q.questionId}
                                        checked={form.questionIds.includes(String(q.questionId))}
                                        onChange={handleChange}
                                        disabled={loading}
                                    />
                                    <span className="text-xs text-gray-700 dark:text-gray-200">{q.title}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="flex gap-3 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-2 px-4 bg-gray-100 hover:bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-gray-700 dark:text-white font-semibold rounded-lg transition"
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={`flex-1 py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={loading}
                        >
                            {loading ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
