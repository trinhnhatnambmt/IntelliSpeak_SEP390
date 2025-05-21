import React from "react";
import { howItWork1, howItWork2 } from "~/assets";
import Heading from "~/components/Heading";
import Stepper, { Step } from "~/components/Stepper";

const GuideSection = () => {
    return (
        <section
            className="container mx-auto my-12 px-4 pt-20 md:pb-10"
            id="guide"
        >
            <Heading
                tag="Trải nghiệm phỏng vấn ảo cực dễ"
                title="Lộ trình luyện tập phỏng vấn với ItelliSpeak"
            />

            <Stepper
                initialStep={1}
                onStepChange={(step) => {
                    console.log(step);
                }}
                onFinalStepCompleted={() => console.log("All steps completed!")}
                backButtonText="Quay lại"
                nextButtonText="Tiếp theo"
            >
                <Step>
                    <div className="flex flex-col items-start gap-4 p-6 border-1 border-[#252134] rounded-2xl  transition-all duration-300 hover:border-[#00d8ff]">
                        <h2 className="text-2xl font-bold text-white">
                            Bước 1
                        </h2>
                        <p className="text-lg font-semibold text-[#00d8ff]">
                            Đăng ký & đăng nhập
                        </p>
                        <p className="text-base text-gray-400 leading-relaxed">
                            Người dùng tạo tài khoản, xác minh và đăng nhập vào
                            nền tảng.
                        </p>
                    </div>
                </Step>
                <Step>
                    <div className="flex flex-col items-start gap-4 p-6 border-1 border-[#252134] rounded-2xl  transition-all duration-300 hover:border-[#00d8ff]">
                        <h2 className="text-2xl font-bold text-white">
                            Bước 2
                        </h2>
                        <p className="text-lg font-semibold text-[#00d8ff]">
                            Tham gia phỏng vấn ảo
                        </p>
                        <img
                            src={howItWork1}
                            alt=""
                            style={{
                                width: "100%",
                                height: "400px",
                                objectFit: "cover",
                                borderRadius: "15px",
                                objectPosition: "center -10px",
                            }}
                        />
                        <p className="text-base text-gray-400 leading-relaxed">
                            Bắt đầu buổi phỏng vấn ảo với các câu hỏi mô phỏng
                            thực tế.
                        </p>
                    </div>
                </Step>
                <Step>
                    <div className="flex flex-col gap-4 p-6 border-1 border-[#252134] rounded-2xl  transition-all duration-300 hover:border-[#00d8ff]">
                        <h2 className="text-2xl font-bold text-white">
                            Bước 3
                        </h2>
                        <p className="text-lg font-semibold text-[#00d8ff]">
                            Xem kết quả đánh giá
                        </p>

                        <img
                            src={howItWork2}
                            alt=""
                            style={{
                                width: "100%",
                                height: "400px",
                                objectFit: "cover",
                                borderRadius: "15px",
                                objectPosition: "center -90px",
                            }}
                        />

                        <p className="text-base text-gray-400 leading-relaxed">
                            Sau khi phỏng vấn, AI sẽ đưa ra đánh giá tổng quan.
                        </p>
                    </div>
                </Step>
                <Step>
                    <div className="flex flex-col items-start gap-4 p-6 border-1 border-[#252134] rounded-2xl  transition-all duration-300 hover:border-[#00d8ff]">
                        <h2 className="text-2xl font-bold text-white">
                            Bước 4
                        </h2>
                        <p className="text-lg font-semibold text-[#00d8ff]">
                            Nhận đề xuất cải thiện
                        </p>
                        <p className="text-base text-gray-400 leading-relaxed">
                            Hệ thống đề xuất những điểm cần cải thiện trong cách
                            trả lời.
                        </p>
                    </div>
                </Step>
                <Step>
                    <div className="flex flex-col items-start gap-4 p-6 border-1 border-[#252134] rounded-2xl  transition-all duration-300 hover:border-[#00d8ff]">
                        <h2 className="text-2xl font-bold text-white">
                            Bước 5
                        </h2>
                        <p className="text-lg font-semibold text-[#00d8ff]">
                            Luyện tập hoặc lưu lịch sử
                        </p>
                        <p className="text-base text-gray-400 leading-relaxed">
                            Người dùng có thể luyện tập lại hoặc lưu lại kết quả
                            để theo dõi tiến bộ.
                        </p>
                    </div>
                </Step>
            </Stepper>
        </section>
    );
};

export default GuideSection;
