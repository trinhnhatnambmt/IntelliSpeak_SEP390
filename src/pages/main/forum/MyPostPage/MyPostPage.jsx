import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { toast } from "react-toastify";
import {
    uploadImageAPI,
    postForumAPI,
    getAllForumTopicsAPI,
    getMyForumPostsAPI,
    deleteForumPostAPI,
    updateForumPostAPI,
    likeOrUnlikePostAPI
} from "~/apis/index";
import { Link } from "react-router-dom";
import { MoreHorizontal, Heart } from "lucide-react";

const MyPostPage = () => {
    // State for new post
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [coverImagePreview, setCoverImagePreview] = useState(null);
    const [coverImageFile, setCoverImageFile] = useState(null);
    const [topics, setTopics] = useState([]);
    const [selectedTopicId, setSelectedTopicId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // State for my posts
    const [myPosts, setMyPosts] = useState([]);
    const [loadingPosts, setLoadingPosts] = useState(true);
    const [openMenuPostId, setOpenMenuPostId] = useState(null);
    const [likedPosts, setLikedPosts] = useState({});

    // State for edit modal
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editPost, setEditPost] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editContent, setEditContent] = useState("");
    const [editTopicId, setEditTopicId] = useState(null);
    const [editCoverImagePreview, setEditCoverImagePreview] = useState(null);
    const [editCoverImageFile, setEditCoverImageFile] = useState(null);
    const [editLoading, setEditLoading] = useState(false);

    // Fetch topics
    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const data = await getAllForumTopicsAPI();
                if (Array.isArray(data)) {
                    setTopics(data);
                    setSelectedTopicId(null);
                }
            } catch (err) {
                toast.error("Error loading topic list.");
            }
        };
        fetchTopics();
    }, []);

    // Fetch my posts with like status
    const fetchMyPosts = async () => {
        setLoadingPosts(true);
        try {
            const res = await getMyForumPostsAPI();
            if (res && Array.isArray(res.data)) {
                setMyPosts(res.data);

                // Initialize liked state (replace with actual API data if available)
                const initialLikedState = {};
                res.data.forEach(post => {
                    initialLikedState[post.postId] = post.isLiked || false;
                });
                setLikedPosts(initialLikedState);
            } else {
                setMyPosts([]);
            }
        } catch (err) {
            setMyPosts([]);
            toast.error("Error loading your posts.");
        } finally {
            setLoadingPosts(false);
        }
    };

    useEffect(() => {
        fetchMyPosts();
    }, []);

    // Handle like/unlike post
    const handleLike = async (postId, e) => {
        e.preventDefault();
        e.stopPropagation();

        try {
            const currentLikeState = !likedPosts[postId];
            const response = await likeOrUnlikePostAPI({
                postId,
                liked: currentLikeState
            });

            // Optimistic UI update
            setLikedPosts(prev => ({
                ...prev,
                [postId]: currentLikeState
            }));

            setMyPosts(prevPosts =>
                prevPosts.map(post =>
                    post.postId === postId
                        ? {
                            ...post,
                            reactionCount: currentLikeState
                                ? (post.reactionCount || 0) + 1
                                : Math.max((post.reactionCount || 0) - 1, 0),
                            isLiked: currentLikeState
                        }
                        : post
                )
            );

            toast.success(response.message);
        } catch (error) {
            console.error("Error liking/unliking post:", error);
            toast.error("Action failed");
            // Revert UI on error
            setLikedPosts(prev => ({
                ...prev,
                [postId]: !prev[postId]
            }));
        }
    };

    // Handle image upload for new post
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCoverImagePreview(URL.createObjectURL(file));
            setCoverImageFile(file);
        }
    };

    // Handle image upload for edit post
    const handleEditImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setEditCoverImagePreview(URL.createObjectURL(file));
            setEditCoverImageFile(file);
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

            // Reset form and refresh posts
            setTitle("");
            setContent("");
            setCoverImagePreview(null);
            setCoverImageFile(null);
            setSelectedTopicId(null);
            await fetchMyPosts();
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

    // Handle edit post
    const handleEdit = (post) => {
        setEditPost(post);
        setEditTitle(post.title);
        setEditContent(post.content);
        setEditTopicId(post.forumTopicTypeId || post.forumTopicType?.id || null);
        setEditCoverImagePreview(post.image?.[0] || null);
        setEditCoverImageFile(null);
        setEditModalOpen(true);
        setOpenMenuPostId(null);
    };

    // Handle delete post
    const handleDelete = async (postId) => {
        const confirmed = window.confirm("Are you sure you want to delete this post?");
        if (!confirmed) return;

        try {
            await deleteForumPostAPI(postId);
            toast.success("Post deleted successfully!");
            await fetchMyPosts();
        } catch (error) {
            toast.error("Failed to delete post!");
        }
    };

    // Handle save edited post
    const handleSaveEdit = async () => {
        if (!editTitle.trim() || !editContent.trim()) {
            toast.error("Title and content cannot be empty!");
            return;
        }

        if (!editTopicId || isNaN(editTopicId)) {
            toast.error("You must select a valid topic!");
            return;
        }

        setEditLoading(true);
        const loadingToastId = toast.loading("Updating post...");

        try {
            // Process content images
            const { div, imgTags, base64Images } = extractBase64ImagesFromHTML(editContent);
            imgTags.forEach((img) => img.remove());
            const newContent = div.innerHTML;

            // Prepare images array for API
            let imagesPayload = [];
            if (editPost.image && editPost.image.length > 0) {
                imagesPayload = editPost.image.map(img => ({
                    id: img.id,
                    url: img.url
                }));
            }

            // Handle new cover image upload if changed
            let uploadedUrls = [];
            if (editCoverImageFile) {
                uploadedUrls = await uploadImageAPI([editCoverImageFile]);
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
                title: editTitle,
                content: newContent,
                forumTopicTypeId: Number(editTopicId),
                images: imagesPayload,
            };

            // Call API to update post
            await updateForumPostAPI(editPost.postId, payload);

            toast.update(loadingToastId, {
                render: "Post updated successfully!",
                type: "success",
                isLoading: false,
                autoClose: 3000,
            });

            setEditModalOpen(false);
            await fetchMyPosts();
        } catch (err) {
            console.error(err);
            toast.update(loadingToastId, {
                render: "Failed to update post!",
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
        } finally {
            setEditLoading(false);
        }
    };

    const PostCard = ({ post }) => (
        <div className="bg-white dark:bg-[#1e1e2f] shadow rounded-lg overflow-hidden mb-10 border border-neutral-200 dark:border-neutral-700 relative">
            <div className="absolute top-3 right-3 z-20">
                <button
                    className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none"
                    onClick={(e) => {
                        e.preventDefault();
                        setOpenMenuPostId(openMenuPostId === post.postId ? null : post.postId);
                    }}
                >
                    <MoreHorizontal className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>
                {openMenuPostId === post.postId && (
                    <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-[#23233a] border border-gray-200 dark:border-gray-700 rounded shadow-lg py-1 z-30">
                        <button
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                            onClick={(e) => {
                                e.preventDefault();
                                handleEdit(post);
                            }}
                        >
                            Edit
                        </button>
                        <button
                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-800"
                            onClick={(e) => {
                                e.preventDefault();
                                handleDelete(post.postId);
                            }}
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>
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
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <button
                                onClick={(e) => handleLike(post.postId, e)}
                                className="flex items-center"
                                aria-label={likedPosts[post.postId] ? "Unlike bài viết" : "Like bài viết"}
                            >
                                <Heart
                                    className={`cursor-pointer transition-all duration-200 ${likedPosts[post.postId]
                                        ? "fill-red-500 text-red-500"
                                        : "text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-500"
                                        }`}
                                    size={24}
                                />
                                <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                                    {post.reactionCount || 0}
                                </span>
                            </button>
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                            🕓 {post.readTimeEstimate || 3} phút đọc
                        </span>
                    </div>
                </div>
            </Link>
        </div>
    );


    // State for modal trigger
    const [expandForm, setExpandForm] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-[#0e0c15] text-gray-900 dark:text-white transition-colors duration-300 container mx-auto px-4 py-7">
            {/* My Posts Section Header with New Post Button */}
            <div className="w-[90%] max-w-3xl mx-auto flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">My Posts</h2>
                <button
                    className="flex items-center gap-2 bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md shadow transition-all duration-300"
                    onClick={() => setExpandForm(true)}
                >
                    <span>✍️ Create Post</span>
                </button>
            </div>

            {/* New Post Modal */}
            {expandForm && (
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
                            onClick={() => setExpandForm(false)}
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
                                onClick={async () => { await handlePublish(); setExpandForm(false); }}
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
            )}

            {/* My Posts Section */}
            <div className="w-[90%] max-w-3xl mx-auto">
                {loadingPosts ? (
                    <div className="text-center text-gray-500 dark:text-gray-400">Loading posts...</div>
                ) : myPosts.length === 0 ? (
                    <div className="text-center text-gray-500 dark:text-gray-400">You have no posts yet.</div>
                ) : (
                    myPosts.map((post) => <PostCard key={post.postId} post={post} />)
                )}
            </div>

            {/* Edit Post Modal */}
            {editModalOpen && (
                <div
                    className="fixed inset-0 z-20 flex items-start justify-center pt-16"
                    style={{
                        backgroundColor: 'rgba(50, 50, 50, 0.7)',
                        backdropFilter: 'blur(4px)',
                        WebkitBackdropFilter: 'blur(4px)'
                    }}
                >
                    <div className="bg-white dark:bg-[#1e1e2f] rounded-xl shadow-lg p-8 w-full max-w-2xl max-h-[calc(100vh-8rem)] overflow-y-auto relative mx-4">
                        <button
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
                            onClick={() => setEditModalOpen(false)}
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
                                onChange={handleEditImageUpload}
                                className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer dark:file:bg-blue-500 dark:hover:file:bg-blue-600"
                            />
                            {editCoverImagePreview && (
                                <img
                                    src={editCoverImagePreview}
                                    alt="Preview"
                                    className="mt-4 rounded-lg max-h-64 object-cover w-full border border-gray-300 dark:border-neutral-700"
                                />
                            )}
                        </div>

                        {/* Topic */}
                        <div className="mb-6">
                            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-neutral-300">Select Topic</label>
                            <select
                                value={editTopicId ?? ""}
                                onChange={(e) => setEditTopicId(Number(e.target.value))}
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
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            className="w-full p-4 mb-5 text-xl font-semibold rounded-md border border-gray-300 dark:border-neutral-700 bg-white dark:bg-[#181818] text-gray-800 dark:text-neutral-100 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        />

                        {/* Content */}
                        <ReactQuill
                            theme="snow"
                            value={editContent}
                            onChange={setEditContent}
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

                        {/* Nút lưu */}
                        <div className="flex justify-end mt-6">
                            <button
                                onClick={handleSaveEdit}
                                disabled={editLoading}
                                className={`flex items-center justify-center gap-2 bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg ${editLoading ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                            >
                                {editLoading ? (
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
            )}
        </div>
    );
};

export default MyPostPage;