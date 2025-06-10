import React from "react";

const TopicDetailCard = () => {
    return (
        <div className="w-full rounded-2xl p-[16px] flex  gap-5 bg-[#252525]">
            <img
                src="https://images.unsplash.com/photo-1667372393086-9d4001d51cf1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8amF2YXNjcmlwdHxlbnwwfHwwfHx8MA%3D%3D"
                alt=""
                width={255}
                height={144}
                className="object-cover rounded-2xl"
            />
            <div className="">
                <h3 className="font-extrabold text-2xl">
                    Kiến thức cơ bản về JS
                </h3>
                <span className="text-lg text-orange-500 mt-4">Miễn phí</span>
                <p className="mt-2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Blanditiis, hic!
                </p>
                <button className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition duration-300 flex items-center cursor-pointer">
                    Bắt đầu phỏng vấn
                </button>
            </div>
        </div>
    );
};

export default TopicDetailCard;
