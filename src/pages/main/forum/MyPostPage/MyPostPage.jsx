import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
    getAllForumTopicsAPI,
    getMyForumPostsAPI,
    deleteForumPostAPI,
    updateForumPostAPI,
    likeOrUnlikePostAPI,
    uploadImageAPI
} from "~/apis/index";
import { Link } from "react-router-dom";
import { MoreHorizontal, Heart, Edit, Trash2 } from "lucide-react";
import CreatePostModal from "~/components/forum/CreatePostModal";
import EditPostModal from "~/components/forum/EditPostModal";

const MyPostPage = () => {
    // State for my posts
    const [myPosts, setMyPosts] = useState([]);
    const [loadingPosts, setLoadingPosts] = useState(true);
    const [openMenuPostId, setOpenMenuPostId] = useState(null);
    const [likedPosts, setLikedPosts] = useState({});

    // State for edit modal
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editPost, setEditPost] = useState(null);

    // State for create post modal
    const [createPostModalOpen, setCreatePostModalOpen] = useState(false);


    // Fetch my posts with like status
    const fetchMyPosts = async () => {
        setLoadingPosts(true);
        try {
            const res = await getMyForumPostsAPI();
            if (res && Array.isArray(res.data)) {
                setMyPosts(res.data);

                // Initialize liked state
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


    // Handle edit post
    const handleEdit = (post) => {
        setEditPost(post);
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
        } catch {
            toast.error("Failed to delete post!");
        }
    };


    const PostCard = ({ post }) => (
        <div className="bg-white dark:bg-[#1e1e2f] shadow rounded-lg overflow-hidden mb-6 border border-neutral-200 dark:border-neutral-700 relative">
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
                            className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                            onClick={(e) => {
                                e.preventDefault();
                                handleEdit(post);
                            }}
                        >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                        </button>
                        <button
                            className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-800"
                            onClick={(e) => {
                                e.preventDefault();
                                handleDelete(post.postId);
                            }}
                        >
                            <Trash2 className="w-4 h-4 mr-2" />
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
                        {post.userName} • {new Date(post.createAt).toLocaleString("en-US", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                        })}
                    </div>
                    <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{post.title}</h2>
                    <div className="text-sm text-gray-500 dark:text-gray-400 space-x-2 mb-2">
                        <span>#{post.forumTopicType?.title || "topic"}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <button
                                onClick={(e) => handleLike(post.postId, e)}
                                className="flex items-center"
                                aria-label={likedPosts[post.postId] ? "Unlike post" : "Like post"}
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
                            🕓 {post.readTimeEstimate || 3} min read
                        </span>
                    </div>
                </div>
            </Link>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-[#0e0c15] text-gray-900 dark:text-white transition-colors duration-300 container mx-auto px-4 py-7">
            {/* My Posts Section Header with New Post Button */}
            <div className="w-[90%] max-w-3xl mx-auto flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">My Posts</h2>
                <button
                    className="flex items-center gap-2 bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md shadow transition-all duration-300"
                    onClick={() => setCreatePostModalOpen(true)}
                >
                    <span>✍️ Create Post</span>
                </button>
            </div>

            {/* Create Post Modal */}
            <CreatePostModal
                isOpen={createPostModalOpen}
                onClose={() => setCreatePostModalOpen(false)}
                onPostCreated={fetchMyPosts}
            />

            {/* My Posts Section */}
            <div className="w-[90%] max-w-3xl mx-auto">
                {loadingPosts ? (
                    <div className="text-center text-gray-500 dark:text-gray-400 py-10">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                        <p className="mt-2">Loading your posts...</p>
                    </div>
                ) : myPosts.length === 0 ? (
                    <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                        <div className="text-4xl mb-4">📝</div>
                        <h3 className="text-xl font-medium mb-2">You haven't created any posts yet</h3>
                        <p className="mb-4">Share your thoughts and experiences with the community</p>
                        <button
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
                            onClick={() => setCreatePostModalOpen(true)}
                        >
                            Create Your First Post
                        </button>
                    </div>
                ) : (
                    <div>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            You have {myPosts.length} {myPosts.length === 1 ? 'post' : 'posts'}
                        </p>
                        {myPosts.map((post) => (
                            <PostCard key={post.postId} post={post} />
                        ))}
                    </div>
                )}
            </div>

            {/* Edit Post Modal */}
            <EditPostModal
                isOpen={editModalOpen}
                onClose={() => setEditModalOpen(false)}
                post={editPost}
                onPostUpdated={fetchMyPosts}
            />
        </div>
    );
};

export default MyPostPage;