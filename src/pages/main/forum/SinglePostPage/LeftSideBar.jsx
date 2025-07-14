import React from "react";
import { Heart, ThumbsUp, ThumbsDown, MessageCircle, Save } from "lucide-react";

const LeftSideBar = ({ scrollToComment }) => {
    return (
        <div className="fixed hidden lg:flex flex-col items-center space-y-5 col-span-1 pt-10 text-gray-500 dark:text-gray-400">
            <Heart className="cursor-pointer hover:text-red-500" />
            <ThumbsUp className="cursor-pointer hover:text-green-500" />
            <ThumbsDown className="cursor-pointer hover:text-red-400" />
            <Save className="cursor-pointer hover:text-yellow-400" />
            <MessageCircle
                className="cursor-pointer hover:text-blue-500"
                onClick={scrollToComment}
            />
        </div>
    );
};

export default LeftSideBar;
