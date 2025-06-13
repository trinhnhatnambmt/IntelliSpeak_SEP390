import { Avatar } from "antd";
import { Mail, MapIcon, Phone } from "lucide-react";
import { motion } from "framer-motion";
import InterviewCard from "~/components/InterviewCard";
import Footer from "~/sections/Footer";

const Profile = () => {
    const personalInfo = [
        {
            icon: <Mail className="w-5 h-5" />,
            label: "trinhnhathuy3@gmail.com",
        },
        { icon: <Phone className="w-5 h-5" />, label: "094353454" },
        { icon: <MapIcon className="w-5 h-5" />, label: "Vietnam" },
    ];

    return (
        <div>
            <div className="container mx-auto px-5 flex mt-10 relative z-10">
                <div className="w-1/3">
                    <div className="w-[380px] h-[179px] bg-[#252525] rounded-2xl p-6">
                        <Avatar
                            size={64}
                            src="https://files.fullstack.edu.vn/f8-prod/user_photos/245178/6319b21466789.jpg"
                        />
                        <h2 className="font-extrabold text-2xl mt-3 text-white">
                            Trinh Nhat Huy
                        </h2>
                        <p className="mt-2 text-neutral-400">@trinhnhathuy3</p>
                    </div>
                    <div className="w-[380px] h-[198px] bg-[#252525] rounded-2xl p-6 mt-6">
                        <h2 className="font-extrabold text-2xl text-white">
                            Thông tin cá nhân
                        </h2>
                        {personalInfo.map((item) => (
                            <div
                                className="flex items-center mt-3 text-neutral-300"
                                key={item.label}
                            >
                                <span className="mr-3 text-neutral-400">
                                    {item.icon}
                                </span>
                                <span>{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-2/3">
                    <div className="w-full bg-[#252525] rounded-2xl p-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-white"
                        >
                            <h2 className="text-2xl font-bold mb-4">
                                Thống kê luyện phỏng vấn
                            </h2>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="bg-[#333] rounded-xl p-4 shadow-md hover:shadow-lg transition duration-300">
                                    <p className="text-sm text-neutral-400">
                                        Số buổi luyện tập
                                    </p>
                                    <p className="text-xl font-semibold mt-1">
                                        12 buổi
                                    </p>
                                    <p className="text-green-400 text-sm mt-1">
                                        +3 buổi trong tuần
                                    </p>
                                </div>
                                <div className="bg-[#333] rounded-xl p-4 shadow-md hover:shadow-lg transition duration-300">
                                    <p className="text-sm text-neutral-400">
                                        Câu hỏi đã trả lời
                                    </p>
                                    <p className="text-xl font-semibold mt-1">
                                        134 câu
                                    </p>
                                    <p className="text-green-400 text-sm mt-1">
                                        +25% so với tuần trước
                                    </p>
                                </div>
                                <div className="bg-[#333] rounded-xl p-4 shadow-md hover:shadow-lg transition duration-300">
                                    <p className="text-sm text-neutral-400">
                                        Điểm trung bình
                                    </p>
                                    <p className="text-xl font-semibold mt-1">
                                        8.4 / 10
                                    </p>
                                    <p className="text-yellow-400 text-sm mt-1">
                                        Giữ ổn định
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                    <div className="w-full py-10 ">
                        <h2 className="font-extrabold text-3xl">
                            Lịch sử phỏng vấn của bạn
                        </h2>
                        <div className="mt-5 grid grid-cols-2 gap-5">
                            <InterviewCard type="profile" />
                            <InterviewCard type="profile" />
                            <InterviewCard type="profile" />
                            <InterviewCard type="profile" />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Profile;
