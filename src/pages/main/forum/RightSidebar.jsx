import React from "react";
import { MessageCircle } from "lucide-react";

const RightSidebar = () => {
    const DiscussionItem = ({ title, comments }) => (
        <li className="flex justify-between items-center px-3 py-2 bg-gray-50 dark:bg-[#2a2a3b] hover:bg-blue-100 dark:hover:bg-[#3b3b4f] rounded-lg transition">
            <span className="text-sm font-medium text-gray-800 dark:text-gray-100">
                {title}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <MessageCircle size={14} />
                {comments}
            </span>
        </li>
    );

    return (
        <aside className="w-72 h-fit hidden xl:block bg-white dark:bg-[#1e1e2f] p-6 rounded-2xl shadow-md dark:shadow-none relative z-5">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                💬 Trending Discussions
            </h3>
            <ul className="space-y-3">
                <DiscussionItem
                    title="What is your achievement this week?"
                    comments={38}
                />
                <DiscussionItem title="Introduction to PYJSX" comments={3} />
                <DiscussionItem
                    title="CMS Contest Winners"
                    comments={14}
                />
                <DiscussionItem
                    title="Git & GitHub: Getting Started"
                    comments={2}
                />
                <DiscussionItem
                    title="A little more sharing..."
                    comments={1}
                />
            </ul>
        </aside>
    );
};

export default RightSidebar;
