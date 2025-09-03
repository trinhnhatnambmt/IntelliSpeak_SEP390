import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { Modal } from "antd"; // Import antd Modal
import LeftSideBar from "./LeftSideBar";
import { getForumPostByIdAPI, postReplyAPI, getForumPostRepliesAPI, editCommentAPI, deleteCommentAPI } from "~/apis";
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
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState({ open: false, comment: null });
  const [editCommentContent, setEditCommentContent] = useState("");

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
      console.log("Failed to submit comment!", err);
    } finally {
      setIsCommentLoading(false);
    }
  };

  const handleEditComment = async (commentId) => {
    if (!editCommentContent.trim()) {
      toast.error("Comment cannot be empty.");
      return;
    }
    setIsCommentLoading(true);
    try {
      await editCommentAPI(commentId, editCommentContent);
      setEditingCommentId(null);
      setEditCommentContent("");
      await fetchComments();
    } catch (err) {
      // toast.error handled by editCommentAPI
    } finally {
      setIsCommentLoading(false);
    }
  };

  const handleDeleteComment = async () => {
    setIsCommentLoading(true);
    try {
      await deleteCommentAPI(showDeleteModal.comment.id);
      setShowDeleteModal({ open: false, comment: null });
      await fetchComments();
    } catch (err) {
      // toast.error handled by deleteCommentAPI
    } finally {
      setIsCommentLoading(false);
    }
  };

  const startEditing = (comment) => {
    setEditingCommentId(comment.id);
    setEditCommentContent(comment.content);
  };

  const cancelEditing = () => {
    setEditingCommentId(null);
    setEditCommentContent("");
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
                post.avatar ||
                "https://api.dicebear.com/7.x/miniavs/svg?seed=1"
              }
              className="w-10 h-10 rounded-full object-cover"
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
                  maxLength={255}
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
                <span className="text-xs text-gray-400 dark:text-gray-500">{commentContent.length}/255</span>
              </div>
            </form>
            {/* Existing comments */}
            <div className="space-y-4">
              {comments.length === 0 ? (
                <div className="text-gray-500 dark:text-gray-400 text-center">No comments yet.</div>
              ) : (
                comments.map((cmt) => (
                  <div key={cmt.id} className="bg-white dark:bg-[#23233a] rounded-lg p-4 border border-gray-200 dark:border-gray-700 relative">
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
                    {editingCommentId === cmt.id ? (
                      <div className="space-y-2">
                        <textarea
                          value={editCommentContent}
                          onChange={(e) => setEditCommentContent(e.target.value)}
                          className="w-full resize-none p-3 rounded-xl border-2 border-blue-200 dark:border-blue-700 bg-white dark:bg-[#181818] text-gray-800 dark:text-white min-h-[90px] focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 transition-all text-base shadow-sm"
                          placeholder="Edit your comment..."
                          maxLength={255}
                          aria-label="Edit comment"
                        />
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={cancelEditing}
                            className="px-4 py-2 bg-gray-200 dark:bg-neutral-700 rounded-md hover:bg-gray-300 dark:hover:bg-neutral-600"
                            aria-label="Cancel edit"
                            disabled={isCommentLoading}
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={() => handleEditComment(cmt.id)}
                            className={`px-4 py-2 rounded-md ${isCommentLoading || !editCommentContent.trim()
                              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                              : "bg-blue-500 text-white hover:bg-blue-600"
                              }`}
                            aria-label="Save edited comment"
                            disabled={isCommentLoading || !editCommentContent.trim()}
                          >
                            Save
                          </button>
                        </div>
                        <div className="text-xs text-gray-400 dark:text-gray-500">{editCommentContent.length}/255</div>
                      </div>
                    ) : (
                      <div className="text-gray-700 dark:text-gray-200">
                        {cmt.content}
                      </div>
                    )}
                    {cmt.yours && (
                      <Menu as="div" className="absolute top-4 right-4">
                        <Menu.Button className="p-1 rounded-full text-gray-500 dark:text-gray-400 opacity-50 hover:opacity-100 transition-opacity duration-200" aria-label="Comment options">
                          <span className="text-lg font-medium">⋮</span>
                        </Menu.Button>
                        <Transition
                          as={React.Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 mt-2 w-32 origin-top-right bg-white dark:bg-[#23233a] border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-10">
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  className={`w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 ${active ? "bg-gray-100 dark:bg-neutral-700" : ""}`}
                                  onClick={() => startEditing(cmt)}
                                  disabled={isCommentLoading}
                                >
                                  Edit
                                </button>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  className={`w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 ${active ? "bg-gray-100 dark:bg-neutral-700" : ""}`}
                                  onClick={() => setShowDeleteModal({ open: true, comment: cmt })}
                                  disabled={isCommentLoading}
                                >
                                  Delete
                                </button>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Comment Confirmation Modal (using antd Modal, light theme only) */}
      {showDeleteModal.open && showDeleteModal.comment && (
        <Modal
          open={showDeleteModal.open}
          onCancel={() => setShowDeleteModal({ open: false, comment: null })}
          title={
            <span className="text-xl font-bold text-gray-800">
              Delete Comment
            </span>
          }
          centered
          footer={null}
          styles={{
            content: {
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "16px",
              padding: 0,
            },
            header: {
              padding: "24px 24px 16px",
              borderBottom: "1px solid #e5e7eb",
            },
            body: {
              padding: "24px",
            },
          }}
        >
          <div className="space-y-4">
            <p className="text-gray-600">
              Are you sure you want to delete this comment?
            </p>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowDeleteModal({ open: false, comment: null })}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                aria-label="Cancel delete"
                disabled={isCommentLoading}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteComment}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                aria-label="Confirm delete"
                disabled={isCommentLoading}
              >
                Delete
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default SinglePostPage;
