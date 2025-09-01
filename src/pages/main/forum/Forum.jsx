import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import SideBar from "./SideBar";
import RightSidebar from "./RightSidebar";
import { Link, useLocation } from "react-router-dom";
import { getAllForumPostAPI, getAllForumTopicsAPI, likeOrUnlikePostAPI, savePostAPI, unsavePostAPI } from "~/apis";
import { toast } from "react-toastify";
import CreatePostModal from "~/components/forum/CreatePostModal";

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState({}); // Track liked state for each post
  const [savedPosts, setSavedPosts] = useState({}); // Track saved state for each post
  const location = useLocation();

  const [topics, setTopics] = useState([]);
  const [selectedTopicId, setSelectedTopicId] = useState(null);
  const [expandForm, setExpandForm] = useState(false);

  // Fetch topics for select
  useEffect(() => {
    const fetchTopics = async () => {
      const data = await getAllForumTopicsAPI();
      if (Array.isArray(data)) {
        setTopics(data);
        setSelectedTopicId(null);
      }
    };
    fetchTopics();
  }, []);


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await getAllForumPostAPI();
        setPosts(res.data);

        // Initialize liked state for each post
        const initialLikedState = {};
        const initialSavedState = {};
        res.data.forEach(post => {
          initialLikedState[post.postId] = post.isLiked || false;
          initialSavedState[post.postId] = post.isSaved || false;
        });
        setLikedPosts(initialLikedState);
        setSavedPosts(initialSavedState);
      } catch (error) {
        console.error("Error fetching posts:", error);
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
      console.error("Error when liking/unliking post:", error);
      toast.error("Action failed");
    }
  };

  const handleSave = async (postId) => {
    try {
      const currentSaveState = !savedPosts[postId];

      if (currentSaveState) {
        // Save post
        const response = await savePostAPI(postId);
        toast.success(response.message || "Post saved successfully");
      } else {
        // Unsave post
        const response = await unsavePostAPI(postId);
        toast.success(response.message || "Post removed from saved");
      }

      // Update UI based on API response
      setSavedPosts(prev => ({
        ...prev,
        [postId]: currentSaveState
      }));

    } catch (error) {
      console.error("Error when saving/unsaving post:", error);
      toast.error("Action failed");
    }
  };

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
              🕓 {post.readTimeEstimate || 3} min read
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
        {/* <SideBar /> */}
        <div className="w-64 h-[fit-content] p-6  hidden lg:block relative z-10 rounded-2xl"></div>
        {/* Main content */}
        <main className="flex-1 max-w-[800px] mx-auto p-6 relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex space-x-4">
              <Link to="/main/forum">
                <button
                  className={`px-4 py-1 rounded-md ${isForumPage
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 dark:text-gray-300 hover:underline"
                    }`}
                >
                  Explore
                </button>
              </Link>

              <Link to="/main/saved-forum">
                <button
                  className={`px-4 py-1 rounded-md ${!isForumPage
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 dark:text-gray-300 hover:underline"
                    }`}
                >
                  Saved
                </button>
              </Link>
            </div>
            <button
              className="flex items-center gap-2 bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md shadow transition-all duration-300"
              onClick={() => setExpandForm(true)}
            >
              <span>✍️ Create Post</span>
            </button>
          </div>

          {/* Modal for New Post Form */}
          <CreatePostModal
            isOpen={expandForm}
            onClose={() => setExpandForm(false)}
            onPostCreated={async () => {
              const res = await getAllForumPostAPI();
              setPosts(res.data);
            }}
          />

          {/* Forum Posts List */}
          {posts.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-400">
              No posts yet.
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