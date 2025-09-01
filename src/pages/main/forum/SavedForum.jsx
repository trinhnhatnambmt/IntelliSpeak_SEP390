import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import RightSidebar from "./RightSidebar";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
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
          src={post?.thumbnail || "https://placehold.co/800x300?text=No+Image"}
          alt="Post banner"
          className="w-full h-56 object-cover"
        />
        <div className="p-4">
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            {post.userName} •{" "}
            {new Date(post.createAt).toLocaleString("en-US", {
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
            <span>#{post.forumTopicType?.title || "topic"}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="flex items-center">
                <Heart
                  className={`cursor-pointer transition-all duration-200 text-gray-400`}
                  size={24}
                />
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                  {post.reactionCount || 0}
                </span>
              </span>
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
    <div className="flex bg-gray-100 dark:bg-[#0e0c15] text-gray-900 dark:text-white transition-colors duration-300 pt-5">
      <div className="mx-auto flex container px-5">
        {/* Left Sidebar */}
        {/* <SideBar /> */}
        <div className="w-64 h-[fit-content] p-6  hidden lg:block relative z-10 rounded-2xl"></div>
        {/* Main content */}
        <main className="flex-1 max-w-[800px] mx-auto p-6 relative z-10">
          <div className="flex space-x-4 mb-4">
            <Link
              to="/main/forum"
              className="px-4 py-1 text-gray-600 dark:text-gray-300 hover:underline"
            >
              Explore
            </Link>

            <button className="px-4 py-1 bg-blue-600 text-white rounded-md">
              Saved
            </button>
          </div>

          {posts.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-400">
              No saved posts yet.
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
