import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import RightSideBar from "./RightSideBar";
import LeftSideBar from "./LeftSideBar";
import CommentSection from "./CommentSection";
import { getForumPostByIdAPI, postReplyAPI, getForumPostRepliesAPI } from "~/apis";
import { toast } from "react-toastify";
import parse from "html-react-parser";

const SinglePostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const commentRef = useRef(null);
  const [commentContent, setCommentContent] = useState("");
  const [isCommentLoading, setIsCommentLoading] = useState(false);
  const [comments, setComments] = useState([]);
  // Fetch comments for this post
  const fetchComments = async () => {
    try {
      const res = await getForumPostRepliesAPI(postId);
      setComments(res.data || []);
    } catch {
      setComments([]);
    }
  };


  const scrollToComment = () => {
    commentRef.current?.scrollIntoView({ behavior: "smooth" });
  };


  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getForumPostByIdAPI(postId);
        setPost(data.data);
        setIsSaved(!!data.data.isSaved);
      } catch {
        // Error fetching post details
      }
    };
    fetchPost();
    fetchComments();
    // eslint-disable-next-line
  }, [postId]);


  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentContent.trim()) {
      toast.error("Please enter a comment.");
      return;
    }
    setIsCommentLoading(true);
    try {
      await postReplyAPI({
        postId: Number(postId),
        content: commentContent,
      });
      toast.success("Comment submitted!");
      setCommentContent("");
      await fetchComments();
    } catch (err) {
      toast.error("Failed to submit comment!");
    } finally {
      setIsCommentLoading(false);
    }
  };

  if (!post)
    return <div className="text-center py-10">Loading post...</div>;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#0e0c15] py-10 px-4">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-11 gap-6 relative z-10">
        {/* Left Sidebar */}
        <LeftSideBar postId={post.postId} scrollToComment={scrollToComment} isSaved={isSaved} setIsSaved={setIsSaved} />

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
                Posted at {new Date(post.createAt).toLocaleString("en-US", {
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
          <div ref={commentRef} className="mt-10">
            <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">Comments</h3>
            <form
              onSubmit={handleCommentSubmit}
              className="mb-8 bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-[#23233a] dark:via-[#181818] dark:to-[#23233a] p-6 rounded-2xl shadow-lg border border-blue-100 dark:border-[#23233a] flex flex-col gap-4"
            >
              <label htmlFor="comment-content" className="font-semibold text-gray-700 dark:text-gray-200 mb-1">Add a Comment</label>
              <div className="relative">
                <textarea
                  id="comment-content"
                  placeholder="Write your comment..."
                  className="w-full resize-none p-3 pr-12 rounded-xl border-2 border-blue-200 dark:border-blue-700 bg-white dark:bg-[#181818] text-gray-800 dark:text-white min-h-[90px] focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 transition-all text-base shadow-sm"
                  value={commentContent}
                  onChange={e => setCommentContent(e.target.value)}
                  disabled={isCommentLoading}
                  maxLength={500}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      if (!isCommentLoading && commentContent.trim()) {
                        handleCommentSubmit(e);
                      }
                    }
                  }}
                />
                <button
                  type="submit"
                  disabled={isCommentLoading || !commentContent.trim()}
                  className="absolute bottom-3 right-3 bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-600 dark:to-blue-800 hover:from-blue-600 hover:to-blue-800 dark:hover:from-blue-700 dark:hover:to-blue-900 text-white rounded-full p-2 shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  tabIndex={-1}
                  aria-label="Submit comment"
                >
                  {isCommentLoading ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 6.487a2.25 2.25 0 0 1 0 3.182L10.67 15.86a.75.75 0 0 1-.53.22H7.5v-2.64a.75.75 0 0 1 .22-.53l6.192-6.192a2.25 2.25 0 0 1 3.182 0Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 7.5l.75.75" />
                    </svg>
                  )}
                </button>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-gray-400 dark:text-gray-500">{commentContent.length}/500</span>
              </div>
            </form>
            {/* Existing comments */}
            <div className="space-y-4">
              {comments.length === 0 ? (
                <div className="text-gray-500 dark:text-gray-400 text-center">No comments yet.</div>
              ) : (
                comments.map((cmt) => (
                  <div key={cmt.id} className="bg-white dark:bg-[#23233a] rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center mb-2">
                      <img
                        src={cmt.user?.avatar || "https://api.dicebear.com/7.x/miniavs/svg?seed=2"}
                        alt="avatar"
                        className="w-8 h-8 rounded-full mr-2 object-cover"
                      />
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-800 dark:text-white mr-2">
                          {(cmt.user?.firstName || cmt.user?.lastName) ? `${cmt.user?.firstName || ''} ${cmt.user?.lastName || ''}`.trim() : 'User Name'}
                        </span>
                        <span className="text-xs text-gray-400">{new Date(cmt.createAt).toLocaleString("en-US", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: false })}</span>
                      </div>
                    </div>
                    {/* Removed comment title display */}
                    <div className="text-gray-700 dark:text-gray-200">
                      {cmt.content}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <RightSideBar />
      </div>
    </div>
  );
};

export default SinglePostPage;
