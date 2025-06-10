import React from "react";
import TopicDetailCard from "~/components/TopicDetailCard";

const TopicDetail = () => {
    return (
        <div className="container mx-auto px-5 mt-30">
            <h1 className="font-extrabold text-4xl">
                Phỏng vấn chủ đề Front-End
            </h1>
            <h2 className="mt-5 text-lg w-[80%]">
                Hầu hết các websites hoặc ứng dụng di động đều có 2 phần là
                Front-end và Back-end. Front-end là phần giao diện người dùng
                nhìn thấy và có thể tương tác, đó chính là các ứng dụng mobile
                hay những website bạn đã từng sử dụng. Vì vậy, nhiệm vụ của lập
                trình viên Front-end là xây dựng các giao diện đẹp, dễ sử dụng
                và tối ưu trải nghiệm người dùng.
            </h2>
            <p className="mt-5 text-lg w-[80%]">
                Dưới đây là các buổi phỏng vấn mô phỏng ItelliSpeak đã tạo ra
                dành cho bất cứ ai theo đuổi sự nghiệp trở thành một lập trình
                viên Front-end.
            </p>

            <div className="mt-10 mb-10 w-[80%] relative z-10 flex flex-col gap-5">
                <TopicDetailCard />
                <TopicDetailCard />
                <TopicDetailCard />
                <TopicDetailCard />
                <TopicDetailCard />
            </div>
        </div>
    );
};

export default TopicDetail;
