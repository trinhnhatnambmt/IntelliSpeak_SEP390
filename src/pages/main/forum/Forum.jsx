import React from "react";

import SideBar from "./SideBar";
import RightSidebar from "./RightSidebar";
import { Link } from "react-router-dom";

const Forum = () => {
    const PostCard = () => (
        <div className="bg-white dark:bg-[#1e1e2f] shadow rounded-lg overflow-hidden mb-10">
            <Link to="/main/singlePostPage">
                <img
                    src="https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fbfhtzqpvgsutqycom5oa.png"
                    alt="Post banner"
                    className="w-full h-56 object-cover"
                />
                <div className="p-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                        Pratham naik • Jul 14 (4h ago)
                    </div>
                    <h2 className="text-xl font-bold mb-2">
                        Why Your Development Team Is 40% Slower Than Your
                        Competitors
                    </h2>
                    <div className="text-sm text-gray-500 dark:text-gray-400 space-x-2 mb-2">
                        <span>#webdev</span>
                        <span>#productivity</span>
                        <span>#opensource</span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300 flex items-center justify-between">
                        <span>❤️ 39 Reactions</span>
                        <span>🕓 5 min read</span>
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
                        <button className="px-4 py-1 bg-blue-600 text-white rounded-md">
                            Khám phá
                        </button>
                        <button className="px-4 py-1 text-gray-600 dark:text-gray-300">
                            Đã lưu
                        </button>
                    </div>

                    <PostCard />
                    <PostCard />
                    <PostCard />
                    <PostCard />
                </main>

                {/* Right Sidebar */}
                <RightSidebar />
            </div>
        </div>
    );
};

export default Forum;
