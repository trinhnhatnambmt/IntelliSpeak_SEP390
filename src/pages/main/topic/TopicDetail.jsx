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
                Phỏng vấn chủ đề {interviewSessions?.title}
            </h1>
            <h2 className="mt-5 text-lg w-[80%]">
                {interviewSessions?.description}
            </h2>
            <p className="mt-5 text-lg w-[80%]">
                Dưới đây là các buổi phỏng vấn mô phỏng IntelliSpeak đã tạo ra
                dành cho bất cứ ai theo đuổi sự nghiệp trở thành một lập trình
                viên {interviewSessions?.title}.
            </p>

            <div className="mt-10 mb-10 w-[80%] relative z-10 flex flex-col gap-5">
                {interviewSessions?.interviewSessionDTOs?.map((item, index) => (
                    <TopicDetailCard
                        key={index}
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
