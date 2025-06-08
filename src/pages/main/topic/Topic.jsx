import React from "react";
import TopicCard from "~/components/TopicCard";

const Topic = () => {
    return (
        <div className="container mx-auto px-5 mt-30">
            <h1 className="font-extrabold text-4xl">Chủ đề</h1>
            <h2 className="mt-5 text-lg w-[80%]">
                Để bắt đầu một cách thuận lợi, bạn nên tập trung vào một chủ đề
                học. Ví dụ: Để đi làm với vị trí "Lập trình viên Front-end" bạn
                nên tập trung vào chủ đề "Front-end".
            </h2>

            <div className="mt-10 grid grid-cols-3 gap-5 mb-10">
                <TopicCard />
                <TopicCard />
                <TopicCard />
            </div>
        </div>
    );
};

export default Topic;
