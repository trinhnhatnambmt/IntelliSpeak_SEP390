import React, { useState } from "react";
import { robot } from "~/assets";
import Button from "~/components/Button/Button";
import ModalInterview from "../../../components/InterviewModal";
import InterviewCard from "../../../components/InterviewCard";
import { useNavigate } from "react-router-dom";

const InterviewPractice = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        navigate("interviewPage");
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="min-h-screen bg-white text-black dark:bg-[#0e0c15] dark:text-white transition-colors duration-300">
            {/* <div className="fixed top-0 left-0 w-full min-h-screen z-0 bg-[linear-gradient(to_right,#6262622e_1px,transparent_1px),linear-gradient(to_bottom,#6262622e_1px,transparent_1px)] bg-[size:38px_42px] [mask-image:radial-gradient(ellipse_120%_85%_at_50%_100%,#000_70%,transparent_110%)] pointer-events-none"></div> */}

            <div className="container mx-auto px-5 relative z-10 pt-5">
                <div className="w-full h-[330px] ">
                    <div className="relative h-full w-full bg-[#171532] rounded-3xl">
                        <div className="absolute rounded-3xl bottom-0 left-0 right-0 top-0 bg-[radial-gradient(125%_125%_at_50%_10%,rgba(255,255,255,0)_40%,rgba(102,51,238,1)_100%)]"></div>
                        <div className="flex items-center justify-between h-full px-15 py-6 gap-2">
                            <div className="flex flex-col gap-5 w-1/2 ">
                                <h1 className="text-4xl font-bold text-white mb-4">
                                    Rèn Luyện Phỏng Vấn – Tự Tin Ghi Điểm
                                </h1>
                                <p className="text-lg text-gray-300 mb-10">
                                    Mô phỏng buổi phỏng vấn thực tế với AI, nhận
                                    phản hồi chi tiết và cải thiện kỹ năng giao
                                    tiếp để chinh phục nhà tuyển dụng.
                                </p>
                                <Button
                                    className="absolute bottom-5 left-15 py-2 px-4 text-black bg-[#CAC5FE] before:bg-purple-400 mt-5"
                                    onClick={showModal}
                                >
                                    Bắt đầu luyện tập
                                </Button>
                                <ModalInterview
                                    open={isModalOpen}
                                    onOk={handleOk}
                                    onCancel={handleCancel}
                                />
                            </div>
                            <div>
                                <img
                                    src={robot}
                                    alt=""
                                    width="441px"
                                    height="322px"
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full py-10 ">
                    <h2 className="font-extrabold text-3xl">
                        Chọn một đề tài phỏng vấn
                    </h2>
                    <div className="mt-5 grid grid-cols-3 gap-5">
                        <InterviewCard type="main" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InterviewPractice;
