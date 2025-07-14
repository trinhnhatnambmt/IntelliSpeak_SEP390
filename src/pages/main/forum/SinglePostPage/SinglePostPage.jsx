import React, { useRef } from "react";
import RightSideBar from "./RightSideBar";
import LeftSideBar from "./LeftSideBar";
import CommentSection from "./CommentSection";

const SinglePostPage = () => {
    const commentRef = useRef(null);

    const scrollToComment = () => {
        commentRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-[#0e0c15] py-10 px-4">
            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-11 gap-6 relative z-10">
                {/* Left Sidebar (icon bar) */}
                <LeftSideBar scrollToComment={scrollToComment} />

                {/* Main content */}
                <div className="col-span-10 lg:col-span-8 bg-white dark:bg-[#1e1e2f] rounded-xl shadow p-6 ml-10">
                    {/* Image */}
                    <img
                        src="https://placehold.co/800x400"
                        alt="cover"
                        className="rounded-xl mb-6 w-full object-cover"
                    />

                    {/* Author info */}
                    <div className="flex items-center mb-4">
                        <img
                            src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                            className="w-10 h-10 rounded-full"
                            alt="author"
                        />
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                Pratham naik
                            </p>
                            <p className="text-xs text-gray-400">
                                Posted on Jul 14
                            </p>
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                        Why Your Development Team Is 40% Slower Than Your
                        Competitors (And How to Fix It)
                    </h1>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 text-sm mb-6">
                        {[
                            "#webdev",
                            "#productivity",
                            "#devops",
                            "#opensource",
                        ].map((tag) => (
                            <span
                                key={tag}
                                className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-white px-2 py-1 rounded-full"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Post content */}
                    <div className="prose dark:prose-invert prose-lg max-w-none text-gray-800 dark:text-gray-200">
                        <p>
                            <em>
                                The productivity gap that's silently killing
                                your competitive edge
                            </em>
                        </p>
                        <p>
                            Your development team ships features more slowly
                            than your competitors. This is not speculation; it
                            is a measurable reality affecting 73% of software
                            teams globally.
                        </p>
                        <p>
                            In this article, we'll show you how to identify
                            bottlenecks and improve your development pipeline
                            using automation and AI.
                        </p>
                    </div>

                    {/* Comment section */}
                    <CommentSection commentRef={commentRef} />
                </div>

                {/* Right Sidebar */}
                <RightSideBar />
            </div>
        </div>
    );
};

export default SinglePostPage;
