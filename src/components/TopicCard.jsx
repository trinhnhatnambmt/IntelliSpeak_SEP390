import React from "react";
import { ChevronRight, ChevronsRight } from "lucide-react";
import { Link } from "react-router-dom";

const TopicCard = () => {
    return (
        <>
            <div className="w-[90%] relative mt-4  group mx-auto bg-[#252525] border-0  overflow-hidden rounded-md text-white">
                <figure className="w-full h-62 rounded-md  overflow-hidden">
                    <img
                        src={
                            "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        }
                        alt="shoes"
                        width={600}
                        height={600}
                        className="h-full w-full  scale-105 group-hover:scale-100 rounded-lg object-cover transition-all duration-300"
                    />
                </figure>
                <div className="p-4 space-y-1  transition-all duration-300 ">
                    <h1 className="text-lg font-medium capitalize ">
                        FrontEnd
                    </h1>
                    <span className="text-md">
                        Lập trình viên Front-end là người xây dựng ra giao diện
                        websites. Trong phần này Itellispeak sẽ chia sẻ cho bạn
                        lộ trình phỏng vấn để trở thành lập trình viên Front-end
                        nhé.
                    </span>
                    <Link
                        to="/main/topicDetail"
                        className="bg-green-400 w-fit text-base text-white rounded-md  font-normal p-2 flex justify-center mt-5"
                    >
                        Xem chi tiết
                        <span className="relative">
                            <ChevronRight className="group-hover:opacity-0 opacity-100 translate-y-0 group-hover:translate-y-2 transition-all duration-300 " />
                            <ChevronsRight className="absolute top-0 group-hover:opacity-100 opacity-0 translate-y-2 group-hover:translate-y-0 transition-all duration-300 " />
                        </span>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default TopicCard;
