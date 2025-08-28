import React, { useState, useEffect } from "react";
import CustomModal from "../../../components/CustomModal";
import { uploadImageAPI, getAllTag } from "~/apis/index";
import { toast } from "react-toastify";
import { all } from "axios";
export default function HRCreateSessionModal({
    open,
    onClose,
    templateForm,
    setTemplateForm,
    templateLoading,
    handleCreateTemplate,
    topics,
    myQuestions,
}) {
    const [thumbnailUploading, setThumbnailUploading] = useState(false);
    const [allTags, setAllTags] = useState([]);

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const res = await getAllTag();
                // API returns { code, message, data: [...] }
                setAllTags(res || []);
                // Đừng log ở đây vì allTags chưa cập nhật kịp!
            } catch {
                setAllTags([]);
            }
        };
        fetchTags();
    }, []);

    // Log allTags mỗi khi nó thay đổi
    useEffect(() => {
        console.log("all tag", allTags);
    }, [allTags]);

    // Handle input changes for form fields
    const handleChange = (e) => {
        const { name, value, checked } = e.target;
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

    // Detect dark mode
    const isDark = document.documentElement.classList.contains("dark");

    // Handle image upload for thumbnail
    const handleThumbnailUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setThumbnailUploading(true);
        try {
            const urls = await uploadImageAPI([file]);
            if (urls && urls.length > 0) {
                setTemplateForm((prev) => ({
                    ...prev,
                    interviewSessionThumbnail: urls[0],
                }));
                toast.success("Upload successful!");
            }
        } catch {
            toast.error("Upload failed!");
        } finally {
            setThumbnailUploading(false);
        }
    };

    return (
        <CustomModal
            open={open}
            onClose={onClose}
            title={
                <span className="text-xl font-bold text-gray-800 dark:text-white">
                    Create Interview Template
                </span>
            }
            backgroundColor={isDark ? "#111112" : "#fff"}
            className="hr-create-session-modal"
        >
            <form onSubmit={handleCreateTemplate} className="space-y-4">
                {/* Thumbnail upload on top, only upload, no URL input */}
                <div>
                    <label className="block mb-1 font-medium text-gray-700 dark:text-gray-100">
                        Thumbnail <span className="text-red-500">*</span>
                    </label>
                    {templateForm.interviewSessionThumbnail &&
                        !thumbnailUploading && (
                            <div className="flex justify-center">
                                <img
                                    src={templateForm.interviewSessionThumbnail}
                                    alt="Thumbnail Preview"
                                    className="w-1/2 max-h-64 object-contain rounded border border-gray-200 dark:border-[#333] mb-3"
                                />
                            </div>
                        )}
                    <div className="flex items-center gap-4">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleThumbnailUpload}
                            disabled={templateLoading || thumbnailUploading}
                            className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer dark:file:bg-blue-500 dark:hover:file:bg-blue-600"
                        />
                        {thumbnailUploading && (
                            <span className="text-xs text-blue-500">
                                Uploading...
                            </span>
                        )}
                    </div>
                </div>
                <div>
                    <label className="block mb-1 font-medium text-gray-700 dark:text-gray-100">
                        Title <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={templateForm.title}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-200 dark:border-[#333] rounded-lg dark:bg-[#23232a] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400 dark:placeholder-gray-500"
                        required
                        disabled={templateLoading}
                        placeholder="Enter session title"
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium text-gray-700 dark:text-gray-100">
                        Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        name="description"
                        value={templateForm.description}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-200 dark:border-[#333] rounded-lg dark:bg-[#23232a] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400 dark:placeholder-gray-500"
                        rows={3}
                        required
                        disabled={templateLoading}
                        placeholder="Enter session description"
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium text-gray-700 dark:text-gray-100">
                        Total Questions <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        name="totalQuestion"
                        value={templateForm.totalQuestion}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-200 dark:border-[#333] rounded-lg dark:bg-[#23232a] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400 dark:placeholder-gray-500"
                        required
                        disabled={templateLoading}
                        min={1}
                        placeholder="Enter total questions"
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium text-gray-700 dark:text-gray-100">
                        Difficulty <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="difficulty"
                        value={templateForm.difficulty}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-200 dark:border-[#333] rounded-lg dark:bg-[#23232a] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                    <label className="block mb-1 font-medium text-gray-700 dark:text-gray-100">
                        Topic <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="topicId"
                        value={templateForm.topicId}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-200 dark:border-[#333] rounded-lg dark:bg-[#23232a] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                        disabled={templateLoading}
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
                    <label className="block mb-1 font-medium text-gray-700 dark:text-gray-100">
                        Tags <span className="text-red-500">*</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {allTags.map((tag) => (
                            <label
                                key={tag.id}
                                className="flex items-center gap-1 bg-gray-50 dark:bg-[#23232a] px-2 py-1 rounded border border-gray-200 dark:border-[#333]"
                            >
                                <input
                                    type="checkbox"
                                    name="tagIds"
                                    value={tag.id}
                                    checked={templateForm.tagIds.includes(
                                        String(tag.id)
                                    )}
                                    onChange={handleChange}
                                    disabled={templateLoading}
                                />
                                <span className="text-xs text-gray-700 dark:text-gray-200">
                                    {tag.title}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="flex gap-3 mt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 py-2 px-4 bg-gray-100 hover:bg-gray-200 dark:bg-[#23232a] dark:hover:bg-[#23232a]/80 text-gray-700 dark:text-white font-semibold rounded-lg transition border border-gray-200 dark:border-[#333]"
                        disabled={templateLoading}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className={`flex-1 py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition ${
                            templateLoading
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                        }`}
                        disabled={templateLoading}
                    >
                        {templateLoading ? "Processing..." : "Create"}
                    </button>
                </div>
            </form>
        </CustomModal>
    );
}
