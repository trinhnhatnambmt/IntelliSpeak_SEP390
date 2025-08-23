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
  const [commentTitle, setCommentTitle] = useState("");
  const [commentContent, setCommentContent] = useState("");
  const [isCommentLoading, setIsCommentLoading] = useState(false);
  const [comments, setComments] = useState([]);
  // Fetch comments for this post
  const fetchComments = async () => {
    try {
      const res = await getForumPostRepliesAPI(postId);
      setComments(res.data || []);
    } catch (err) {
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
      } catch (err) {
        console.error("Error fetching post details:", err);
      }
    };
    fetchPost();
    fetchComments();
    // eslint-disable-next-line
  }, [postId]);


  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentTitle.trim() || !commentContent.trim()) {
      toast.error("Please enter a comment title and content.");
      return;
    }
    setIsCommentLoading(true);
    try {
      await postReplyAPI({
        postId: Number(postId),
        title: commentTitle,
        content: commentContent,
      });
      toast.success("Comment submitted!");
      setCommentTitle("");
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
            <form onSubmit={handleCommentSubmit} className="mb-8 bg-gray-50 dark:bg-[#23233a] p-4 rounded-lg">
              <input
                type="text"
                placeholder="Comment title"
                className="w-full mb-2 p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#181818] text-gray-800 dark:text-white"
                value={commentTitle}
                onChange={e => setCommentTitle(e.target.value)}
                disabled={isCommentLoading}
              />
              <textarea
                placeholder="Comment content"
                className="w-full mb-2 p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#181818] text-gray-800 dark:text-white min-h-[80px]"
                value={commentContent}
                onChange={e => setCommentContent(e.target.value)}
                disabled={isCommentLoading}
              />
              <button
                type="submit"
                disabled={isCommentLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded transition-all disabled:opacity-50"
              >
                {isCommentLoading ? "Sending..." : "Submit Comment"}
              </button>
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
                    <div className="mb-1 text-base font-semibold text-gray-900 dark:text-white">
                      {cmt.title}
                    </div>
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
