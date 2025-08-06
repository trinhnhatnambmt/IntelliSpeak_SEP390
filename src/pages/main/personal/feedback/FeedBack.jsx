import { CalendarIcon, House, PhoneOff, Repeat, Star } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const FeedBack = () => {
    const navigate = useNavigate();
    return (
        <div className="container mx-auto px-5">
            <h1 className="font-extrabold text-4xl text-center mt-40 mb-5 ">
                Feedback on the Interview — Frontend Developer Interview
            </h1>
            <div className="flex items-center justify-center gap-10 mb-10">
                <div className="flex items-center gap-2">
                    <p className="flex items-center gap-1 text-lg font-semibold">
                        <Star /> Kết quả tổng quan:
                    </p>
                    <p>12/100</p>
                </div>
                <div className="flex items-center gap-1 text-lg font-semibold">
                    <CalendarIcon /> <p>Feb 28, 2025 – 3:45 PM</p>
                </div>
            </div>
            <div className="w-[90%] h-[1px] bg-gray-400 mx-auto"></div>
            <p className="w-[70%] text-lg mx-auto mt-10 text-gray-800 dark:text-[#D2DEF1]">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Officia saepe vero, ipsa deserunt beatae vel necessitatibus,
                nobis magni culpa voluptate doloribus. Nihil alias accusamus
                perspiciatis ea earum atque? Reiciendis nam beatae sint placeat
                commodi autem quidem excepturi ea, ab possimus, deleniti
                molestiae aut rerum facere libero aspernatur voluptatem dolores,
                veniam sit veritatis ipsa iure alias numquam corrupti! Est eum,
                velit enim eaque saepe cum quisquam dolores architecto fugiat id
                accusantium excepturi dignissimos soluta, magni non facilis amet
                atque blanditiis quas doloremque aliquam in possimus. Ad
                veritatis, nemo, dolorum error velit harum modi quisquam, omnis
                iste accusantium eligendi aliquid animi .
            </p>
            <div className="w-[90%] mx-auto mt-10 mb-10">
                <h2 className="font-extrabold text-3xl mt-10 mb-5">
                    Breakdown of Evaluation:
                </h2>
                <div className="mt-5">
                    <h3 className="font-extrabold text-lg text-gray-800 dark:text-[#D2DEF1]">
                        1.Enthusiasm & Interest (0/20)
                    </h3>
                    <p className="mt-2">
                        The candidate openly states, "I really don't," when
                        asked why they want to work for the company.
                    </p>
                </div>
                <div className="mt-5">
                    <h3 className="font-extrabold text-lg text-gray-800 dark:text-[#D2DEF1]">
                        1.Enthusiasm & Interest (0/20)
                    </h3>
                    <p className="mt-2">
                        The candidate openly states, "I really don't," when
                        asked why they want to work for the company.
                    </p>
                </div>
                <div className="mt-5">
                    <h3 className="font-extrabold text-lg text-gray-800 dark:text-[#D2DEF1]">
                        1.Enthusiasm & Interest (0/20)
                    </h3>
                    <p className="mt-2">
                        The candidate openly states, "I really don't," when
                        asked why they want to work for the company.
                    </p>
                </div>
                <div className="mt-10 relative z-10">
                    <div className="flex items-center gap-2">
                        <h2 className="font-extrabold text-3xl">
                            Final Verdict:
                        </h2>
                        <div className="w-[262px] h-[40px] rounded-2xl bg-gray-200 dark:bg-[#27282F] flex items-center justify-center">
                            <p className="text-2xl font-extrabold text-red-400">
                                Not Recommended
                            </p>
                        </div>
                    </div>
                    <p className="mt-2">
                        This candidate does not appear to be seriously
                        considering the role and fails to provide meaningful
                        responses. If this is reflective of their true attitude,
                        they would not be a good fit for most positions.
                    </p>
                </div>

                <div className="flex items-center justify-center gap-5 mt-10 relative z-10">
                    <button
                        onClick={() => navigate("/main")}
                        className="px-6 py-3 bg-violet-500 text-white font-semibold rounded-full hover:bg-violet-600 transition duration-300 flex items-center cursor-pointer"
                    >
                        <House className="mr-2 h-4 w-4" />
                        Trở lại trang chủ
                    </button>
                    <button
                        onClick={() => navigate("#")}
                        className="px-6 py-3 bg-gray-700 text-white font-semibold rounded-full hover:bg-gray-800 transition duration-300 flex items-center cursor-pointer"
                    >
                        <Repeat className="mr-2 h-4 w-4" />
                        Làm lại phỏng vấn
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FeedBack;
