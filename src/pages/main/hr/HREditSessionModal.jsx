import React, { useState, useMemo, useEffect } from "react";
import { updateQuestionTemplateAPI, getTagsOfTopic, updateInterviewSessionThumbnailAPI } from "~/apis/index";
import CustomModal from "../../../components/CustomModal";
import { uploadImageAPI } from "~/apis/index";
import { toast } from "react-toastify";

export default function HREditSessionModal({
    open,
    session,
    onClose,
    topics,
    myQuestions,
    onUpdated,
}) {
    const [form, setForm] = useState({
        title: session?.title || "",
        description: session?.description || "",
        interviewSessionThumbnail: session?.interviewSessionThumbnail || "",
        difficulty: session?.difficulty || "",
        topicId: session?.topicId || "",
        tagIds: session?.tags?.map((t) => String(t.tagId)) || [],
    });
    const [pendingThumbnail, setPendingThumbnail] = useState(null); // Store uploaded thumbnail URL temporarily
    const [thumbnailFile, setThumbnailFile] = useState(null); // Store the selected file for preview
    const [allTags, setAllTags] = useState([]);
    const [loading, setLoading] = useState(false);
    const [thumbnailUploading, setThumbnailUploading] = useState(false);

    // Compare current form with original session to disable Save button if unchanged
    const isUnchanged = useMemo(() => {
        if (!session) return true;
        const compareArr = (a, b) =>
            Array.isArray(a) &&
            Array.isArray(b) &&
            a.length === b.length &&
            a.every((v, i) => v === b[i]);
        return (
            form.title === (session.title || "") &&
            form.description === (session.description || "") &&
            form.difficulty === (session.difficulty || "") &&
            String(form.topicId) === String(session.topicId || "") &&
            compareArr(
                form.tagIds,
                session.tags?.map((t) => String(t.tagId)) || []
            )
        );
    }, [form, session]);

    // Fetch tags when topicId changes or modal opens
    useEffect(() => {
        const fetchTags = async () => {
            if (!form.topicId) {
                setAllTags([]);
                return;
            }
            try {
                const res = await getTagsOfTopic(form.topicId);
                const tagsData = res.data || res || [];
                setAllTags(tagsData);
                // Filter tagIds to only include tags valid for the current topic
                setForm((prev) => ({
                    ...prev,
                    tagIds: prev.tagIds.filter((id) =>
                        tagsData.some((tag) => String(tag.tagId || tag.id) === id)
                    ),
                }));
            } catch (err) {
                console.error("Error fetching tags for topic:", err);
                setAllTags([]);
                toast.error("Failed to fetch tags for the selected topic");
            }
        };
        fetchTags();
    }, [form.topicId]);

    // Handle file selection for thumbnail
    const handleThumbnailSelect = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setThumbnailUploading(true);
        try {
            const urls = await uploadImageAPI([file]);
            if (urls && Array.isArray(urls) && urls.length > 0 && typeof urls[0] === "string") {
                setPendingThumbnail(urls[0]); // Store the uploaded URL
                setThumbnailFile(URL.createObjectURL(file)); // Create a local URL for preview
                toast.success("Thumbnail uploaded successfully! Click 'Update Thumbnail' to save.");
            } else {
                throw new Error("Invalid image upload response");
            }
        } catch (err) {
            console.error("Error uploading thumbnail:", err);
            toast.error("Failed to upload thumbnail!");
        } finally {
            setThumbnailUploading(false);
        }
    };

    // Handle thumbnail update submission
    const handleThumbnailUpdate = async () => {
        if (!pendingThumbnail) {
            toast.error("No thumbnail selected to update!");
            return;
        }
        setThumbnailUploading(true);
        try {
            console.log("Thumbnail update data:", {
                sessionId: session.interviewSessionId,
                thumbnailUrl: pendingThumbnail,
            });
            await updateInterviewSessionThumbnailAPI(session.interviewSessionId, pendingThumbnail);
            setForm((prev) => ({
                ...prev,
                interviewSessionThumbnail: pendingThumbnail,
            }));
            setPendingThumbnail(null); // Clear pending thumbnail after successful update
            setThumbnailFile(null); // Clear local preview
            toast.success("Thumbnail updated successfully!");
            if (onUpdated) await onUpdated(); // Refresh session data
        } catch (err) {
            console.error("Error updating thumbnail:", err);
            toast.error("Failed to update thumbnail!");
        } finally {
            setThumbnailUploading(false);
        }
    };

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
        } else {
            setForm((prev) => ({
                ...prev,
                [name]: value,
                // Reset tagIds when topic changes to ensure only valid tags are selected
                ...(name === "topicId" ? { tagIds: [] } : {}),
            }));
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!form.tagIds.length) {
            toast.error("Please select at least one tag.");
            return;
        }
        setLoading(true);
        try {
            const payload = {
                topicId: Number(form.topicId),
                title: form.title.trim(),
                description: form.description.trim(),
                difficulty: form.difficulty,
                tagIds: form.tagIds.map((id) => Number(id)),
            };
            console.log("Update session payload:", payload);
            await updateQuestionTemplateAPI(session.interviewSessionId, payload);
            toast.success("Interview session updated successfully!");
            if (onUpdated) await onUpdated();
            onClose();
        } catch (err) {
            console.error("Error updating interview session:", err);
            toast.error(
                err.response?.data?.message || "Failed to update interview session!"
            );
        } finally {
            setLoading(false);
        }
    };

    // Detect dark mode
    const isDark = document.documentElement.classList.contains("dark");

    return (
        <CustomModal
            open={open}
            onClose={onClose}
            title={
                <span className="text-xl font-bold text-gray-800 dark:text-white">
                    Edit Interview Template
                </span>
            }
            backgroundColor={isDark ? "#111112" : "#fff"}
            className="hr-edit-session-modal"
        >
            <form onSubmit={handleUpdate} className="space-y-4">
                {/* Thumbnail upload */}
                <div>
                    <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">
                        Thumbnail <span className="text-red-500">*</span>
                    </label>
                    {(form.interviewSessionThumbnail || thumbnailFile) && !thumbnailUploading && (
                        <div className="flex justify-center">
                            <img
                                src={thumbnailFile || form.interviewSessionThumbnail}
                                alt="Thumbnail Preview"
                                className="w-1/2 max-h-64 object-contain rounded border border-gray-200 dark:border-[#333] mb-3"
                            />
                        </div>
                    )}
                    <div className="flex items-center gap-4">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleThumbnailSelect}
                            disabled={loading || thumbnailUploading}
                            className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer dark:file:bg-blue-500 dark:hover:file:bg-blue-600"
                        />
                        {thumbnailUploading && (
                            <span className="text-xs text-blue-500">
                                Uploading...
                            </span>
                        )}
                    </div>
                    {pendingThumbnail && (
                        <button
                            type="button"
                            onClick={handleThumbnailUpdate}
                            disabled={loading || thumbnailUploading}
                            className={`mt-2 py-2 px-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition ${loading || thumbnailUploading ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                        >
                            {thumbnailUploading ? "Updating..." : "Update Thumbnail"}
                        </button>
                    )}
                </div>
                <div>
                    <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">
                        Title <span className="text-red-500">*</span>
                    </label>
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
                    <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">
                        Description <span className="text-red-500">*</span>
                    </label>
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
                    <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">
                        Difficulty <span className="text-red-500">*</span>
                    </label>
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
                    <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">
                        Topic <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="topicId"
                        value={form.topicId}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-200 dark:border-neutral-700 rounded-lg dark:bg-neutral-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                        disabled={loading}
                    >
                        <option value="" disabled>Select topic</option>
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
                    <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">
                        Tags <span className="text-red-500">*</span>
                    </label>
                    {form.topicId ? (
                        <div className="flex flex-wrap gap-2">
                            {allTags.map((tag) => (
                                <label
                                    key={tag.tagId || tag.id}
                                    className="flex items-center gap-1 bg-gray-50 dark:bg-[#23232a] px-2 py-1 rounded border border-gray-200 dark:border-[#333]"
                                >
                                    <input
                                        type="checkbox"
                                        name="tagIds"
                                        value={tag.tagId || tag.id}
                                        checked={form.tagIds.includes(
                                            String(tag.tagId || tag.id)
                                        )}
                                        onChange={handleChange}
                                        disabled={loading}
                                        className="cursor-pointer"
                                    />
                                    <span className="text-xs text-gray-700 dark:text-gray-200">
                                        {tag.title}
                                    </span>
                                </label>
                            ))}
                        </div>
                    ) : (
                        <div className="text-sm text-gray-500 dark:text-gray-300">
                            Please select a topic to view available tags.
                        </div>
                    )}
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
                        className={`flex-1 py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition ${loading || isUnchanged ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                        disabled={loading || isUnchanged}
                    >
                        {loading ? "Saving..." : "Save"}
                    </button>
                </div>
            </form>
        </CustomModal>
    );
}
