import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import { MessageCircle } from "lucide-react";
import { getTopPostsAPI } from "~/apis/index";
import { toast } from "react-toastify";

const RightSidebar = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch top replied posts
    useEffect(() => {
        const fetchTopPosts = async () => {
            try {
                const response = await getTopPostsAPI();
                if (response.code === 200) {
                    setPosts(response.data);
                } else {
                    setError("Failed to fetch trending discussions");
                    toast.error("Failed to fetch trending discussions");
                }
            } catch (err) {
                console.error("Error fetching top posts:", err);
                setError("Failed to fetch trending discussions");
                toast.error("Failed to fetch trending discussions");
            } finally {
                setIsLoading(false);
            }
        };
        fetchTopPosts();
    }, []);

    const DiscussionItem = ({ title, comments, postId }) => (
        <Link to={`/main/singlePostPage/${postId}`} className="block">
            <li className="flex justify-between items-center px-3 py-2 bg-gray-50 dark:bg-[#2a2a3b] hover:bg-blue-100 dark:hover:bg-[#3b3b4f] rounded-lg transition">
                <span className="text-sm font-medium text-gray-800 dark:text-gray-100">
                    {title}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    <MessageCircle size={14} />
                    {comments}
                </span>
            </li>
        </Link>
    );

    return (
        <aside className="w-72 h-fit hidden xl:block bg-white dark:bg-[#1e1e2f] p-6 rounded-2xl shadow-md dark:shadow-none relative z-5">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                💬 Trending Discussions
            </h3>
            {isLoading ? (
                <p className="text-sm text-gray-500 dark:text-gray-400">Loading...</p>
            ) : error ? (
                <p className="text-sm text-red-500 dark:text-red-400">{error}</p>
            ) : (
                <ul className="space-y-3">
                    {posts.length === 0 ? (
                        <p className="text-sm text-gray-500 dark:text-gray-400">No discussions available</p>
                    ) : (
                        posts.map((post) => (
                            <DiscussionItem
                                key={post.postId}
                                title={post.title}
                                comments={post.repliedCount ? post.repliedCount : post.reactionCount}
                                postId={post.postId}
                            />
                        ))
                    )}
                </ul>
            )}
        </aside>
    );
};

export default RightSidebar;