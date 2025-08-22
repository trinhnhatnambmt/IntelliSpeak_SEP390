import React, { useState } from "react";
import { Heart, MessageCircle, Save, XCircle } from "lucide-react";
import { likeOrUnlikePostAPI, savePostAPI, unsavePostAPI } from "~/apis/index";

const LeftSideBar = ({ postId, scrollToComment }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleLike = async () => {
    try {
      const newLikedState = !isLiked;
      await likeOrUnlikePostAPI({ postId, liked: newLikedState });
      setIsLiked(newLikedState);
    } catch (error) {
      console.error("Lỗi khi like/unlike:", error);
    }
  };

  const handleSaveToggle = async () => {
    try {
      if (!isSaved) {
        await savePostAPI(postId);
        setIsSaved(true);
      } else {
        await unsavePostAPI(postId);
        setIsSaved(false);
      }
    } catch (error) {
      console.error("Lỗi khi lưu/bỏ lưu bài viết:", error);
    }
  };

  return (
    <div className="fixed hidden lg:flex flex-col items-center space-y-5 col-span-1 pt-10 text-gray-500 dark:text-gray-400">
      {/* Like */}
      <Heart
        onClick={handleLike}
        className={`cursor-pointer transition-all duration-200 ${isLiked
            ? "fill-red-500 text-red-500"
            : "hover:text-red-500 text-red-500"
          }`}
        size={28}
      />

      {/* Save */}
      <Save
        onClick={handleSaveToggle}
        className={`cursor-pointer transition-all duration-200 ${isSaved ? "fill-yellow-400 text-yellow-400" : "hover:text-yellow-400"
          }`}
        size={28}
      />

      {/* Comment */}
      <MessageCircle
        className="cursor-pointer hover:text-blue-500"
        onClick={scrollToComment}
        size={28}
      />
    </div>
  );
};

export default LeftSideBar;
