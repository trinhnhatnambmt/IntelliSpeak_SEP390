import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import SideBar from "./SideBar";
import RightSidebar from "./RightSidebar";
import { Link, useLocation } from "react-router-dom";
import { getAllForumPostAPI, likeOrUnlikePostAPI } from "~/apis";
import { toast } from "react-toastify";

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState({}); // Track liked state for each post
  const location = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await getAllForumPostAPI();
        setPosts(res.data);

        // Initialize liked state for each post
        const initialLikedState = {};
        res.data.forEach(post => {
          initialLikedState[post.postId] = false; // You should replace this with actual liked state from API if available
        });
        setLikedPosts(initialLikedState);
      } catch (error) {
        console.error("Lỗi khi lấy bài viết:", error);
      }
    };
    fetchPosts();
  }, [location.pathname]);

  const handleLike = async (postId) => {
    try {
      const currentLikeState = !likedPosts[postId];
      const response = await likeOrUnlikePostAPI({
        postId,
        liked: currentLikeState
      });

      // Update UI based on API response
      setLikedPosts(prev => ({
        ...prev,
        [postId]: currentLikeState
      }));

      // Update reaction count in posts
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.postId === postId
            ? {
              ...post,
              reactionCount: currentLikeState
                ? (post.reactionCount || 0) + 1
                : Math.max((post.reactionCount || 0) - 1, 0)
            }
            : post
        )
      );

      toast.success(response.message);
    } catch (error) {
      console.error("Lỗi khi like/unlike bài viết:", error);
      toast.error("Thao tác thất bại");
    }
  };

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
            {post.userName} •{" "}
            {new Date(post.createAt).toLocaleString("vi-VN", {
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
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleLike(post.postId);
                }}
                className="flex items-center"
              >
                <Heart
                  className={`cursor-pointer transition-all duration-200 ${likedPosts[post.postId]
                      ? "fill-red-500 text-red-500"
                      : "text-gray-400 hover:text-red-500"
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

  const isForumPage = location.pathname === "/main/forum";

  return (
    <div className="flex bg-gray-100 dark:bg-[#0e0c15] text-gray-900 dark:text-white transition-colors duration-300 pt-5">
      <div className="mx-auto flex container px-5">
        {/* Left Sidebar */}
        <SideBar />

        {/* Main content */}
        <main className="flex-1 max-w-[800px] mx-auto p-6 relative z-10">
          <div className="flex space-x-4 mb-4">
            <Link to="/main/forum">
              <button
                className={`px-4 py-1 rounded-md ${isForumPage
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 dark:text-gray-300 hover:underline"
                  }`}
              >
                Khám phá
              </button>
            </Link>

            <Link to="/main/saved-forum">
              <button
                className={`px-4 py-1 rounded-md ${!isForumPage
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 dark:text-gray-300 hover:underline"
                  }`}
              >
                Đã lưu
              </button>
            </Link>
          </div>

          {posts.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-400">
              Chưa có bài viết nào.
            </div>
          ) : (
            posts.map((post) => <PostCard key={post.postId} post={post} />)
          )}
        </main>

        {/* Right Sidebar */}
        <RightSidebar />
      </div>
    </div>
  );
};

export default Forum;