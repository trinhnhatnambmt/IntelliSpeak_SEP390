import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllInterviewSessionWithId } from "~/apis";
import TopicDetailCard from "~/components/TopicDetailCard";

const TopicDetail = () => {
    const { id } = useParams();
    const [interviewSessions, setInterviewSessions] = useState([]);
    useEffect(() => {
        getAllInterviewSessionWithId(id).then((res) => {
            // console.log(res);
            setInterviewSessions(res);
        });
    }, [id]);
    return (
        <div className="container mx-auto px-5 mt-30">
            <h1 className="font-extrabold text-4xl">
                Interview Topic: {interviewSessions?.title}
            </h1>
            <h2 className="mt-5 text-lg w-[80%]">
                {interviewSessions?.description}
            </h2>
            <p className="mt-5 text-lg w-[80%]">
                Below are the mock interview sessions created by IntelliSpeak,
                designed for anyone pursuing a career as a{" "}
                {interviewSessions?.title} developer.
            </p>

            <div className="mt-10 mb-10 w-[80%] relative z-10 flex flex-col gap-5">
                {interviewSessions?.interviewSessionDTOs?.map((item, index) => (
                    <TopicDetailCard
                        key={index}
                        interviewSessionThumbnail={
                            item?.interviewSessionThumbnail
                        }
                        interviewSessionId={item?.interviewSessionId}
                        title={item?.title}
                        description={item?.description}
                        difficulty={item?.difficulty}
                        totalQuestion={item?.totalQuestion}
                    />
                ))}
            </div>
        </div>
    );
};

export default TopicDetail;
