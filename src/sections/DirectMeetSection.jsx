import React from "react";
import Earth from "~/components/Globe";

const DirectMeetSection = () => {
    return (
        <section
            className="container mx-auto my-12 px-20 py-20 md:py-10"
            id="highlight"
        >
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="md:w-1/2 space-y-6">
                    <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight">
                        Kết nối các nhà tuyển dụng thực sự trên toàn thế giới
                    </h1>
                    <p className="text-lg md:text-xl font-light text-gray-300 leading-relaxed">
                        Tăng cơ hội nghề nghiệp của bạn. Trải nghiệm luyện tập
                        thực tế và kết nối trực tiếp với các nhà tuyển dụng uy
                        tín trên toàn cầu.
                    </p>
                    <button className="mt-6 px-6 py-3 bg-green-500 text-white font-semibold rounded-full hover:bg-green-600 transition duration-300">
                        Tham gia ngay
                    </button>
                </div>
                <div className="md:w-1/2 flex justify-center">
                    <div className="relative w-full max-w-md">
                        <Earth className="transform hover:scale-105 transition-transform duration-500" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DirectMeetSection;
