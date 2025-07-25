import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import RightSideBar from "./RightSideBar";
import LeftSideBar from "./LeftSideBar";
import CommentSection from "./CommentSection";
import { getForumPostByIdAPI } from "~/apis";
import parse from "html-react-parser";

const SinglePostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const commentRef = useRef(null);

  const scrollToComment = () => {
    commentRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getForumPostByIdAPI(postId);
        setPost(data.data);
      } catch (err) {
        console.error("Lỗi khi lấy chi tiết bài viết:", err);
      }
    };
    fetchPost();
  }, [postId]);

  if (!post)
    return <div className="text-center py-10">Đang tải bài viết...</div>;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#0e0c15] py-10 px-4">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-11 gap-6 relative z-10">
        {/* Left Sidebar */}
        <LeftSideBar postId={post.postId} scrollToComment={scrollToComment} />

        {/* Main content */}
        <div className="col-span-10 lg:col-span-8 bg-white dark:bg-[#1e1e2f] rounded-xl shadow p-6 ml-10">
          {/* Author Info */}
          <div className="flex items-center mb-4">
            <img
              src={
                post.userAvatar ||
                "https://api.dicebear.com/7.x/miniavs/svg?seed=1"
              }
              className="w-10 h-10 rounded-full"
              alt="author"
            />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                {post.userName}
              </p>
              <p className="text-xs text-gray-400">
                Đăng lúc{" "}
                {new Date(post.createAt).toLocaleString("vi-VN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
              </p>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
            {post.title}
          </h1>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 text-sm mb-6">
            {(post.tags || []).map((tag) => (
              <span
                key={tag}
                className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-white px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Post Content */}
          <div className="prose dark:prose-invert prose-lg max-w-none text-gray-800 dark:text-gray-200 mb-6">
            {parse(post.content || "")}
          </div>

          {/* Post Images (bỏ ảnh đầu tiên đã là cover) */}
          {post.image && post.image.length > 1 && (
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {post.image.slice(1).map((imgUrl, index) => (
                <img
                  key={index}
                  src={imgUrl}
                  alt={`post-image-${index}`}
                  className="w-full rounded-lg object-cover max-h-80"
                />
              ))}
            </div>
          )}

          {/* Comment Section */}
          <CommentSection commentRef={commentRef} />
        </div>

        {/* Right Sidebar */}
        <RightSideBar />
      </div>
    </div>
  );
};

export default SinglePostPage;
