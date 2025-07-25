import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import RightSidebar from "./RightSidebar";
import { Link } from "react-router-dom";
import { getSavedPostsAPI } from "~/apis";

const SavedForum = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchSavedPosts = async () => {
      try {
        const res = await getSavedPostsAPI();
        setPosts(res.data);
      } catch (error) {
        console.error("Lỗi khi lấy bài viết đã lưu:", error);
      }
    };
    fetchSavedPosts();
  }, []);

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
          <div className="text-sm text-gray-600 dark:text-gray-300 flex items-center justify-between">
            <span>❤️ {post.reactionCount || 0} Lượt thích</span>
            <span>🕓 {post.readTimeEstimate || 3} phút đọc</span>
          </div>
        </div>
      </Link>
    </div>
  );

  return (
    <div className="flex bg-gray-100 dark:bg-[#0e0c15] text-gray-900 dark:text-white transition-colors duration-300 pt-5">
      <div className="mx-auto flex container px-5">
        {/* Left Sidebar */}
        <SideBar />

        {/* Main content */}
        <main className="flex-1 max-w-[800px] mx-auto p-6 relative z-10">
          <div className="flex space-x-4 mb-4">
            <Link
              to="/main/forum"
              className="px-4 py-1 text-gray-600 dark:text-gray-300 hover:underline"
            >
              Khám phá
            </Link>

            <button className="px-4 py-1 bg-blue-600 text-white rounded-md">
              Đã lưu
            </button>
          </div>

          {posts.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-400">
              Chưa có bài viết nào.
            </div>
          ) : (
            posts.map((post) => <PostCard key={post.id} post={post} />)
          )}
        </main>

        {/* Right Sidebar */}
        <RightSidebar />
      </div>
    </div>
  );
};

export default SavedForum;
