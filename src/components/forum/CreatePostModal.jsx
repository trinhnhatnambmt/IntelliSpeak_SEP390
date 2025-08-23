import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { toast } from "react-toastify";
import { uploadImageAPI, postForumAPI, getAllForumTopicsAPI } from "~/apis/index";

const CreatePostModal = ({ isOpen, onClose, onPostCreated }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [coverImagePreview, setCoverImagePreview] = useState(null);
    const [coverImageFile, setCoverImageFile] = useState(null);
    const [topics, setTopics] = useState([]);
    const [selectedTopicId, setSelectedTopicId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Fetch topics
    useEffect(() => {
        const fetchTopics = async () => {
            const data = await getAllForumTopicsAPI();
            if (Array.isArray(data)) {
                setTopics(data);
                setSelectedTopicId(null);
            }
        };
        fetchTopics();
    }, []);

    // Reset form when modal closes
    useEffect(() => {
        if (!isOpen) {
            setTitle("");
            setContent("");
            setCoverImagePreview(null);
            setCoverImageFile(null);
            setSelectedTopicId(null);
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

    // Handle publish new post
    const handlePublish = async () => {
        let loadingToastId = null;
        try {
            setIsLoading(true);
            loadingToastId = toast.loading("Posting your article...");

            if (!title.trim() || !content.trim()) {
                toast.update(loadingToastId, {
                    render: "Title and content cannot be empty!",
                    type: "error",
                    isLoading: false,
                    autoClose: 3000,
                });
                return;
            }

            if (!selectedTopicId || isNaN(selectedTopicId)) {
                toast.update(loadingToastId, {
                    render: "You must select a valid topic!",
                    type: "error",
                    isLoading: false,
                    autoClose: 3000,
                });
                return;
            }

            const { div, imgTags, base64Images } = extractBase64ImagesFromHTML(content);

            const allImages = [];
            if (coverImageFile) allImages.push(coverImageFile);
            const contentImagesAsFiles = base64Images.map((base64, i) =>
                convertBase64ToFile(base64, `content_img_${i}.png`)
            );
            allImages.push(...contentImagesAsFiles);

            let uploadedUrls = [];
            if (allImages.length > 0) {
                uploadedUrls = await uploadImageAPI(allImages);
            }

            imgTags.forEach((img) => img.remove());
            const newContent = div.innerHTML;

            const payload = {
                title,
                content: newContent,
                images: uploadedUrls,
                forumTopicTypeId: Number(selectedTopicId),
            };

            await postForumAPI(payload);

            toast.update(loadingToastId, {
                render: "Post published successfully!",
                type: "success",
                isLoading: false,
                autoClose: 3000,
            });

            // Reset form and close modal
            setTitle("");
            setContent("");
            setCoverImagePreview(null);
            setCoverImageFile(null);
            setSelectedTopicId(null);

            // Notify parent component
            if (onPostCreated) {
                onPostCreated();
            }

            onClose();
        } catch (err) {
            console.error(err);
            toast.update(loadingToastId, {
                render: "Failed to publish post. Please try again.",
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
            className="fixed inset-0 z-30 flex items-start justify-center pt-16"
            style={{
                backgroundColor: 'rgba(50, 50, 50, 0.7)',
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)'
            }}
        >
            <div className="bg-white dark:bg-[#1e1e2f] rounded-xl shadow-lg p-8 w-full max-w-2xl max-h-[calc(100vh-8rem)] overflow-y-auto relative mx-4 mt-10">
                <button
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
                    onClick={onClose}
                    title="Close"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">✍️ Create New Post</h1>

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

                {/* Topic Select */}
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-neutral-300">Select Topic</label>
                    <select
                        value={selectedTopicId ?? ""}
                        onChange={(e) => setSelectedTopicId(Number(e.target.value))}
                        className="w-full p-3 rounded-md border border-gray-300 dark:border-neutral-700 bg-white dark:bg-[#181818] text-gray-700 dark:text-neutral-200 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    >
                        <option value="" disabled>--Select Topic--</option>
                        {topics.length === 0 ? (
                            <option disabled>No topics available</option>
                        ) : (
                            topics.map((topic) => (
                                <option key={topic.id} value={Number(topic.id)}>
                                    {topic.title}
                                </option>
                            ))
                        )}
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
                <ReactQuill
                    theme="snow"
                    value={content}
                    onChange={setContent}
                    placeholder="✍️ Write your post content here..."
                    className="mb-6 bg-white dark:bg-[#181818] text-black dark:text-white border-none rounded-md"
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

                {/* Publish Button */}
                <div className="flex justify-between items-center mt-10">
                    <button
                        onClick={handlePublish}
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
                                <span>Posting...</span>
                            </>
                        ) : (
                            <span>🚀 Publish</span>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreatePostModal;