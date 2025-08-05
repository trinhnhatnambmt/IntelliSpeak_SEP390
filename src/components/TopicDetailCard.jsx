import React from "react";
import { useNavigate } from "react-router-dom";

const TopicDetailCard = () => {
    const navigate = useNavigate();
    return (
        <div className="w-full rounded-2xl p-[16px] flex gap-5 bg-white dark:bg-[#252525] shadow-md dark:shadow-none transition-colors duration-300">
            <img
                src="https://images.unsplash.com/photo-1667372393086-9d4001d51cf1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8amF2YXNjcmlwdHxlbnwwfHwwfHx8MA%3D%3D"
                alt="JavaScript basics"
                width={255}
                height={144}
                className="object-cover rounded-2xl border border-gray-200 dark:border-gray-600"
            />
            <div className="flex-1">
                <h3 className="font-extrabold text-2xl text-gray-900 dark:text-white">
                    Kiến thức cơ bản về JS
                </h3>
                <span className="text-lg text-orange-500 dark:text-orange-400 mt-4 block">
                    Miễn phí
                </span>
                <p className="mt-2 text-gray-700 dark:text-gray-300">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Blanditiis, hic!
                </p>
                <button
                    onClick={() => navigate("/main/interviewPage")}
                    className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold rounded-full transition duration-300 flex items-center cursor-pointer"
                >
                    Bắt đầu phỏng vấn
                </button>
            </div>
        </div>
    );
};

export default TopicDetailCard;