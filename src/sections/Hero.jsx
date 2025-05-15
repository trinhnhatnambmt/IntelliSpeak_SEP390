import React from "react";
import { service3 } from "~/assets";
import Button from "~/components/Button";
import GradientText from "~/components/GradientText";
import { words } from "~/constants";

const Hero = () => {
    return (
        <section className="w-full flex flex-col items-center  relative px-10">
            <div className="hero-text relative z-1 max-w-[62rem] text-center mb-[3.875rem]">
                <h1>Thực hành phỏng vấn với AI </h1>
                <h1>
                    <span className="slide">
                        <span className="wrapper">
                            {words.map((word) => (
                                <span
                                    key={word.text}
                                    className="flex items-center md:gap-3 gap-1 pb-2"
                                >
                                    <img
                                        src={word.imgPath}
                                        alt={word.text}
                                        className="xl:size-12 md:size-10 size-7 md:p-2 p-1 rounded-full bg-emerald-500"
                                    />
                                    <span>{word.text}</span>
                                </span>
                            ))}
                        </span>
                    </span>
                </h1>
                <h1 className="flex items-center justify-center gap-4">
                    <div>cùng</div>
                    <div>
                        <GradientText
                            colors={[
                                "#40ffaa",
                                "#4079ff",
                                "#40ffaa",
                                "#4079ff",
                                "#40ffaa",
                            ]}
                            animationSpeed={10}
                            showBorder={false}
                            className="custom-class"
                        >
                            ItelliSpeak
                        </GradientText>
                    </div>
                </h1>

                <p className="md:text-xl relative z-10 pointer-events-none text-white-50">
                    Tự tin hơn trong mỗi buổi phỏng vấn🧑‍🎓 - Nơi bạn có thể luyện
                    tập kỹ năng nói, ghi âm câu trả lời, và nhận phản hồi từ AI
                    để cải thiện giọng nói, tốc độ, độ rõ ràng và cảm xúc của
                    chính bản thân
                </p>
            </div>
            <div className="flex items-center gap-4">
                <Button className="px-4 py-2">Xem Chi Tiết Gói</Button>
                <Button className="px-4 py-2">Trải nghiệm miễn phí</Button>
            </div>
            <div className="relative max-w-[23rem] mx-auto md:max-w-5xl xl:mb-24">
                <div className="relative w-[1024px] h-[514px] rounded-2xl border-green-300 border-2 mt-[100px] bg-[#0e0c15]">
                    <div className="h-[1.4rem] bg-gray-600 rounded-t-2xl" />
                    <div className="aspect-[33/40] rounded-b-[0.9rem] overflow-hidden md:aspect-[688/490] lg:aspect-[1024/490]">
                        <img
                            src={service3}
                            className="w-full scale-[1.7] translate-y-[8%] md:scale-[1] md:-translate-y-[10%] lg:-translate-y-[23%]"
                            width={1024}
                            height={490}
                            alt="AI"
                        />

                        {/* <ScrollParallax isAbsolutelyPositioned>
                            <ul className="hidden absolute -left-[5.5rem] bottom-[7.5rem] px-1 py-1 bg-n-9/40 backdrop-blur border border-n-1/10 rounded-2xl xl:flex">
                                {heroIcons.map((icon, index) => (
                                    <li className="p-5" key={index}>
                                        <img
                                            src={icon}
                                            width={24}
                                            height={25}
                                            alt={icon}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </ScrollParallax>

                        <ScrollParallax isAbsolutelyPositioned>
                            <Notification
                                className="hidden absolute -right-[5.5rem] bottom-[11rem] w-[18rem] xl:flex"
                                title="Code generation"
                            />
                        </ScrollParallax> */}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
