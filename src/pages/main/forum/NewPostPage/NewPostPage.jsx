import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { toast } from "react-toastify";
import {
    uploadImageAPI,
    postForumAPI,
    getAllForumTopicsAPI,
} from "~/apis/index";
import axios from "axios";
import { Link } from "react-router-dom";

const MyPostPage = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [coverImagePreview, setCoverImagePreview] = useState(null);
    const [coverImageFile, setCoverImageFile] = useState(null);
    const [topics, setTopics] = useState([]);
    const [selectedTopicId, setSelectedTopicId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [myPosts, setMyPosts] = useState([]);
    const [loadingPosts, setLoadingPosts] = useState(true);

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const data = await getAllForumTopicsAPI();
                if (Array.isArray(data) && data.length > 0) {
                    setTopics(data);
                    setSelectedTopicId(null);
                }
            } catch (err) {
                toast.error("Lỗi khi tải danh sách chủ đề.");
            }
        };
        fetchTopics();
    }, []);

    useEffect(() => {
        const fetchMyPosts = async () => {
            setLoadingPosts(true);
            try {
                const res = await axios.get("/forum-post/my-posts");
                if (res.data && Array.isArray(res.data.data)) {
                    setMyPosts(res.data.data);
                } else {
                    setMyPosts([]);
                }
            } catch (err) {
                setMyPosts([]);
            } finally {
                setLoadingPosts(false);
            }
        };
        fetchMyPosts();
    }, []);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCoverImagePreview(URL.createObjectURL(file));
            setCoverImageFile(file);
        }
    };

    const extractBase64ImagesFromHTML = () => {
        const div = document.createElement("div");
        div.innerHTML = content;
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

    const convertBase64ToFile = (base64, filename) => {
        const arr = base64.split(",");
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) u8arr[n] = bstr.charCodeAt(n);
        return new File([u8arr], filename, { type: mime });
    };

    const handlePublish = async () => {
        let loadingToastId = null;
        try {
            setIsLoading(true);
            loadingToastId = toast.loading("⏳ Đang đăng bài viết...");

            if (!title.trim() || !content.trim()) {
                toast.update(loadingToastId, {
                    render: "Tiêu đề và nội dung không được để trống!",
                    type: "error",
                    isLoading: false,
                    autoClose: 3000,
                });
                return;
            }

            if (!selectedTopicId || isNaN(selectedTopicId)) {
                toast.update(loadingToastId, {
                    render: "Bạn phải chọn một chủ đề hợp lệ!",
                    type: "error",
                    isLoading: false,
                    autoClose: 3000,
                });
                return;
            }

            const { div, imgTags, base64Images } = extractBase64ImagesFromHTML();

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
                render: "Bài viết đã được đăng thành công!",
                type: "success",
                isLoading: false,
                autoClose: 3000,
            });

            setTitle("");
            setContent("");
            setCoverImagePreview(null);
            setCoverImageFile(null);
            setSelectedTopicId(null);
        } catch (err) {
            console.error(err);
            toast.update(loadingToastId, {
                render: "Đăng bài thất bại. Vui lòng thử lại.",
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
        } finally {
            setIsLoading(false);
        }
    };

    // Forum-like PostCard for my posts
    const PostCard = ({ post }) => (
        <div className="bg-white dark:bg-[#1e1e2f] shadow rounded-lg overflow-hidden mb-10">
            <Link to={`/main/singlePostPage/${post.postId}`}>
                <img
                    src={post.image?.[0] || "https://placehold.co/800x300?text=No+Image"}
                    alt="Post banner"
                    className="w-full h-56 object-cover"
                />
                <div className="p-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                        {post.userName} • {new Date(post.createAt).toLocaleString("vi-VN", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                        })}
                    </div>
                    <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                    <div className="text-sm text-gray-500 dark:text-gray-400 space-x-2 mb-2">
                        <span>#{post.forumTopicType?.title || "chủ đề"}</span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300 flex items-center justify-between">
                        <span>❤️ {post.reactionCount || 0} Lượt thích</span>
                        <span>🕓 {post.readTimeEstimate || 3} phút đọc</span>
                    </div>
                </div>
            </Link>
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-7">
            <div className="w-[90%] max-w-3xl mx-auto bg-white dark:bg-[#252525] border border-neutral-200 dark:border-neutral-700 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 p-8 relative z-10">
                <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">✍️ Tạo bài viết mới</h1>

                {/* Ảnh bìa */}
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-neutral-300">Ảnh bìa</label>
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

                {/* Chủ đề */}
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-neutral-300">Chọn chủ đề</label>
                    <select
                        value={selectedTopicId ?? ""}
                        onChange={(e) => setSelectedTopicId(Number(e.target.value))}
                        className="w-full p-3 rounded-md border border-gray-300 dark:border-neutral-700 bg-white dark:bg-[#181818] text-gray-700 dark:text-neutral-200 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    >
                        <option value="" disabled>--Chọn chủ đề--</option>
                        {topics.length === 0 ? (
                            <option disabled>Không có chủ đề</option>
                        ) : (
                            topics.map((topic) => (
                                <option key={topic.id} value={Number(topic.id)}>
                                    {topic.title}
                                </option>
                            ))
                        )}
                    </select>
                </div>

                {/* Tiêu đề */}
                <input
                    type="text"
                    placeholder="📝 Tiêu đề bài viết..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-4 mb-5 text-xl font-semibold rounded-md border border-gray-300 dark:border-neutral-700 bg-white dark:bg-[#181818] text-gray-800 dark:text-neutral-100 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />

                {/* Nội dung */}
                <ReactQuill
                    theme="snow"
                    value={content}
                    onChange={setContent}
                    placeholder="✍️ Viết nội dung bài viết ở đây..."
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

                {/* Nút đăng */}
                <div className="flex justify-between items-center mt-10">
                    <button
                        onClick={handlePublish}
                        disabled={isLoading}
                        className={`flex items-center justify-center gap-2 bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg ${isLoading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
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
                                <span>Đang đăng...</span>
                            </>
                        ) : (
                            <span>🚀 Đăng bài</span>
                        )}
                    </button>
                </div>
            </div>

            {/* My Posts Section */}
            <div className="w-[90%] max-w-3xl mx-auto mt-12">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Bài viết của tôi</h2>
                {loadingPosts ? (
                    <div className="text-center text-gray-500 dark:text-gray-400">Đang tải bài viết...</div>
                ) : myPosts.length === 0 ? (
                    <div className="text-center text-gray-500 dark:text-gray-400">Bạn chưa có bài viết nào.</div>
                ) : (
                    myPosts.map((post) => <PostCard key={post.postId} post={post} />)
                )}
            </div>
        </div>
    );
};

export default MyPostPage;