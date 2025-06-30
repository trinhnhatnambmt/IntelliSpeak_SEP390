import React from "react";
import TopicCard from "~/components/TopicCard";

const Topic = () => {
    return (
        <div className="container mx-auto px-5 mt-20 transition-colors duration-300 bg-white shadow-lg dark:bg-[#0e0c15] pt-10 h-screen">
            <h1 className="font-extrabold text-4xl text-neutral-900 dark:text-white">
                Chủ đề
            </h1>
            <h2 className="mt-5 text-lg text-neutral-700 dark:text-neutral-300 max-w-3xl">
                Để bắt đầu một cách thuận lợi, bạn nên tập trung vào một chủ đề
                học. Ví dụ: Để đi làm với vị trí "Lập trình viên Front-end" bạn
                nên tập trung vào chủ đề "Front-end".
            </h2>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
                <TopicCard />
                <TopicCard />
                <TopicCard />
            </div>
        </div>
    );
};

export default Topic;
