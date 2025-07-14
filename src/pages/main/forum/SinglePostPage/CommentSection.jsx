import React from "react";

const CommentSection = ({ commentRef }) => {
    return (
        <div
            ref={commentRef}
            className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700"
        >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                💬 Bình luận
            </h3>

            {/* Comment Input */}
            <div className="flex items-start gap-3 mb-6">
                <img
                    src="https://api.dicebear.com/7.x/miniavs/svg?seed=commenter"
                    className="w-9 h-9 rounded-full"
                    alt="avatar"
                />
                <textarea
                    placeholder="Viết bình luận..."
                    className="w-full p-3 rounded-md bg-gray-100 dark:bg-gray-800 text-sm text-gray-900 dark:text-white resize-none focus:outline-none focus:ring focus:border-blue-300"
                    rows={3}
                ></textarea>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm">
                Gửi bình luận
            </button>

            {/* Sample comments */}
            <div className="mt-8 space-y-6">
                <div className="flex items-start gap-3">
                    <img
                        src="https://api.dicebear.com/7.x/miniavs/svg?seed=user123"
                        className="w-9 h-9 rounded-full"
                        alt="avatar"
                    />
                    <div>
                        <p className="text-sm font-semibold text-gray-800 dark:text-white">
                            Nguyễn Văn A
                        </p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                            Bài viết rất hữu ích, cảm ơn bạn đã chia sẻ!
                        </p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <img
                        src="https://api.dicebear.com/7.x/miniavs/svg?seed=user456"
                        className="w-9 h-9 rounded-full"
                        alt="avatar"
                    />
                    <div>
                        <p className="text-sm font-semibold text-gray-800 dark:text-white">
                            Trần Thị B
                        </p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                            Mong bạn viết thêm bài về cải tiến DevOps team nữa
                            nhé.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommentSection;
