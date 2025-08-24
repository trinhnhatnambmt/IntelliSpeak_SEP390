import React from "react";

export default function HRCreateSessionModal({
    open,
    onClose,
    templateForm,
    setTemplateForm,
    templateLoading,
    handleCreateTemplate,
    topics,
    tags,
    myQuestions,
}) {
    if (!open) return null;

    const handleChange = (e) => {
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

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
            <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl p-6 w-full max-w-lg relative border border-gray-100 dark:border-neutral-800">
                <button
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-white text-2xl"
                    onClick={onClose}
                    disabled={templateLoading}
                >
                    &times;
                </button>
                <h3 className="text-xl font-bold mb-4 text-center text-gray-800 dark:text-white">Create Interview Session</h3>
                <form onSubmit={handleCreateTemplate} className="space-y-4">
                    <div>
                        <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Title <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            name="title"
                            value={templateForm.title}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-200 dark:border-neutral-700 rounded-lg dark:bg-neutral-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                            disabled={templateLoading}
                            placeholder="Enter session title"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Description <span className="text-red-500">*</span></label>
                        <textarea
                            name="description"
                            value={templateForm.description}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-200 dark:border-neutral-700 rounded-lg dark:bg-neutral-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                            rows={3}
                            required
                            disabled={templateLoading}
                            placeholder="Enter session description"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Thumbnail URL</label>
                        <input
                            type="text"
                            name="interviewSessionThumbnail"
                            value={templateForm.interviewSessionThumbnail}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-200 dark:border-neutral-700 rounded-lg dark:bg-neutral-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                            disabled={templateLoading}
                            placeholder="Enter thumbnail image URL (optional)"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Total Questions <span className="text-red-500">*</span></label>
                        <input
                            type="number"
                            name="totalQuestion"
                            value={templateForm.totalQuestion}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-200 dark:border-neutral-700 rounded-lg dark:bg-neutral-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                            disabled={templateLoading}
                            min={1}
                            placeholder="Enter total questions"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Difficulty <span className="text-red-500">*</span></label>
                        <select
                            name="difficulty"
                            value={templateForm.difficulty}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-200 dark:border-neutral-700 rounded-lg dark:bg-neutral-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                            disabled={templateLoading}
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
                            value={templateForm.topicId}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-200 dark:border-neutral-700 rounded-lg dark:bg-neutral-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                            disabled={templateLoading}
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
                                        checked={templateForm.tagIds.includes(String(tag.tagId || tag.id))}
                                        onChange={handleChange}
                                        disabled={templateLoading}
                                    />
                                    <span className="text-xs text-gray-700 dark:text-gray-200">{tag.title}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="flex gap-3 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-2 px-4 bg-gray-100 hover:bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-gray-700 dark:text-white font-semibold rounded-lg transition"
                            disabled={templateLoading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={`flex-1 py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition ${templateLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={templateLoading}
                        >
                            {templateLoading ? 'Processing...' : 'Create'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
