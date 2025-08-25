import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { toast } from "react-toastify";
import { uploadImageAPI, updateForumPostAPI, getAllForumTopicsAPI } from "~/apis/index";

const EditPostModal = ({ isOpen, onClose, post, onPostUpdated }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [coverImagePreview, setCoverImagePreview] = useState(null);
    const [coverImageFile, setCoverImageFile] = useState(null);
    const [topics, setTopics] = useState([]);
    const [selectedTopicId, setSelectedTopicId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isOpen && post) {
            setTitle(post.title || "");
            setContent(post.content || "");
            setCoverImagePreview(post.image?.[0] || null);
            setCoverImageFile(null);
            setSelectedTopicId(post.forumTopicTypeId || post.forumTopicType?.id || null);
        }
    }, [isOpen, post]);

    useEffect(() => {
        if (isOpen) {
            const fetchTopics = async () => {
                const data = await getAllForumTopicsAPI();
                if (Array.isArray(data)) setTopics(data);
            };
            fetchTopics();
        }
    }, [isOpen]);

    // Handle image upload
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCoverImagePreview(URL.createObjectURL(file));
            setCoverImageFile(file);
        }
    };

    // Extract base64 images from HTML content
    const extractBase64ImagesFromHTML = (htmlContent) => {
        const div = document.createElement("div");
        div.innerHTML = htmlContent;
        const imgTags = div.querySelectorAll("img");
        const base64Images = [];
        imgTags.forEach((img) => {
            const src = img.src;
            if (src.startsWith("data:image")) {
                base64Images.push(src);
            }
        });
        return { div, imgTags, base64Images };
    };

    // Convert base64 to file
    const convertBase64ToFile = (base64, filename) => {
        const arr = base64.split(",");
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) u8arr[n] = bstr.charCodeAt(n);
        return new File([u8arr], filename, { type: mime });
    };

    const handleSave = async () => {
        if (!title.trim() || !content.trim()) {
            toast.error("Title and content cannot be empty!");
            return;
        }
        if (!selectedTopicId || isNaN(selectedTopicId)) {
            toast.error("You must select a valid topic!");
            return;
        }
        setIsLoading(true);
        const loadingToastId = toast.loading("Updating post...");
        try {
            // Process content images
            const { div, imgTags, base64Images } = extractBase64ImagesFromHTML(content);
            imgTags.forEach((img) => img.remove());
            const newContent = div.innerHTML;
            // Prepare images array for API
            let imagesPayload = [];
            if (post.image && post.image.length > 0) {
                imagesPayload = post.image.map(img => ({
                    id: img.id,
                    url: img.url
                }));
            }
            // Handle new cover image upload if changed
            let uploadedUrls = [];
            if (coverImageFile) {
                uploadedUrls = await uploadImageAPI([coverImageFile]);
                if (uploadedUrls.length > 0) {
                    if (imagesPayload.length > 0) {
                        imagesPayload[0] = { url: uploadedUrls[0] };
                    } else {
                        imagesPayload.push({ url: uploadedUrls[0] });
                    }
                }
            }
            // Handle content images (base64 to upload)
            const contentImagesAsFiles = base64Images.map((base64, i) =>
                convertBase64ToFile(base64, `content_img_${i}.png`)
            );
            if (contentImagesAsFiles.length > 0) {
                const contentImageUrls = await uploadImageAPI(contentImagesAsFiles);
                contentImageUrls.forEach(url => {
                    imagesPayload.push({ url });
                });
            }
            // Prepare the final payload
            const payload = {
                title,
                content: newContent,
                forumTopicTypeId: Number(selectedTopicId),
                images: imagesPayload,
            };
            // Call API to update post
            await updateForumPostAPI(post.postId, payload);
            toast.update(loadingToastId, {
                render: "Post updated successfully!",
                type: "success",
                isLoading: false,
                autoClose: 3000,
            });
            if (onPostUpdated) onPostUpdated();
            onClose();
        } catch (err) {
            console.error(err);
            toast.update(loadingToastId, {
                render: "Failed to update post!",
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-start justify-center pt-16"
            style={{
                backgroundColor: 'rgba(50, 50, 50, 0.7)',
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)'
            }}
        >
            <div className="bg-white dark:bg-[#1e1e2f] rounded-xl shadow-lg p-8 w-full max-w-2xl max-h-[calc(100vh-8rem)] overflow-y-auto relative mx-4">
                <button
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
                    onClick={onClose}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Edit Post</h2>
                {/* Cover Image */}
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-neutral-300">Cover Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer dark:file:bg-blue-500 dark:hover:file:bg-blue-600"
                    />
                    {coverImagePreview && (
                        <img
                            src={coverImagePreview}
                            alt="Preview"
                            className="mt-4 rounded-lg max-h-64 object-cover w-full border border-gray-300 dark:border-neutral-700"
                        />
                    )}
                </div>
                {/* Topic */}
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-neutral-300">Select Topic</label>
                    <select
                        value={selectedTopicId ?? ""}
                        onChange={(e) => setSelectedTopicId(Number(e.target.value))}
                        className="w-full p-3 rounded-md border border-gray-300 dark:border-neutral-700 bg-white dark:bg-[#181818] text-gray-700 dark:text-neutral-200 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    >
                        <option value="" disabled>--Select Topic--</option>
                        {topics.map((topic) => (
                            <option key={topic.id} value={Number(topic.id)}>
                                {topic.title}
                            </option>
                        ))}
                    </select>
                </div>
                {/* Title */}
                <input
                    type="text"
                    placeholder="📝 Post title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-4 mb-5 text-xl font-semibold rounded-md border border-gray-300 dark:border-neutral-700 bg-white dark:bg-[#181818] text-gray-800 dark:text-neutral-100 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
                {/* Content Editor */}
                <div className="mb-6">
                    <ReactQuill
                        theme="snow"
                        value={content}
                        onChange={setContent}
                        placeholder="✍️ Write your post content here..."
                        className="bg-white dark:bg-[#181818] text-black dark:text-white border-none rounded-md"
                        modules={{
                            toolbar: [
                                [{ header: [1, 2, 3, false] }],
                                ["bold", "italic", "underline"],
                                ["blockquote", "code-block"],
                                [{ list: "ordered" }, { list: "bullet" }],
                                ["link", "image"],
                                ["clean"],
                            ],
                        }}
                    />
                </div>
                {/* Save Button */}
                <div className="flex justify-end mt-6">
                    <button
                        onClick={handleSave}
                        disabled={isLoading}
                        className={`flex items-center justify-center gap-2 bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                        {isLoading ? (
                            <>
                                <svg
                                    className="animate-spin h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                    ></path>
                                </svg>
                                <span>Saving...</span>
                            </>
                        ) : (
                            <span>💾 Save Changes</span>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditPostModal;
