import React, { useEffect, useState } from "react";
import { getAllTopic } from "~/apis";
import TopicCard from "~/components/TopicCard";

const Topic = () => {
    const [topic, setTopic] = useState([]);
    useEffect(() => {
        getAllTopic().then((res) => {
            setTopic(res);
        });
    }, []);
    return (
        <div className="transition-colors duration-300 bg-white shadow-lg dark:bg-[#0e0c15] pt-10 h-screen">
            <div className="container mx-auto px-5 mt-10">
                <h1 className="font-extrabold text-4xl text-neutral-900 dark:text-white">
                    Topics
                </h1>
                <h2 className="mt-5 text-lg text-neutral-700 dark:text-neutral-300 max-w-3xl">
                    To get started effectively, you should focus on one learning
                    topic. For example: If you want to work as a "Front-end
                    Developer", you should concentrate on the "Front-end" topic.
                </h2>

                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
                    {topic?.map((item, index) => (
                        <TopicCard
                            key={index}
                            title={item.title}
                            description={item.description}
                            topicId={item.topicId}
                            thumbnail={item.thumbnail}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Topic;
