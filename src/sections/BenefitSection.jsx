import clsx from "clsx";
import { check2, grid, loading1 } from "~/assets";
import { Gradient } from "~/components/designs/Roadmap";
import Heading from "~/components/Heading";
import SpotlightCard from "~/components/SpotlightCard ";
import TagLine from "~/components/Tagline";
import { roadmap } from "~/constants";

const BenefitSection = () => {
    return (
        <div className="container mx-auto my-12 px-4 md:pb-10">
            <Heading tag="Sẵn sàng để bắt đầu" title="Những tính năng nổi bật" />
            <div className="relative grid gap-6 md:grid-cols-2 md:gap-4 md:pb-[7rem]">
                {roadmap.map((item) => {
                    const status =
                        item.status === "done" ? "Done" : "In progress";

                    return (
                        <div
                            className="md:flex even:md:translate-y-[7rem] p-0.25 rounded-[2.5rem] border-1 border-[#252134] hover:border-emerald-500 transition-all duration-300"
                            key={item.id}
                        >
                            <div className="relative p-8 bg-n-8 rounded-[2.4375rem] overflow-hidden xl:p-15">
                                <div className="absolute top-0 left-0 max-w-full z-0">
                                    <img
                                        className="w-full"
                                        src={grid}
                                        width={550}
                                        height={550}
                                        alt="Grid"
                                    />
                                </div>
                                <div className="relative z-1">
                                    <div className="flex items-center justify-between max-w-[27rem] mb-8 md:mb-20">
                                        <TagLine>{item.date}</TagLine>

                                        <div className="flex items-center px-4 py-1 bg-white rounded text-n-8">
                                            <img
                                                className="mr-2.5"
                                                src={
                                                    item.status === "done"
                                                        ? check2
                                                        : loading1
                                                }
                                                width={16}
                                                height={16}
                                                alt={status}
                                            />
                                            <div className="text-black font-bold">
                                                {status}
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        className={
                                            (clsx("mb-10 -my-10 -mx-15"),
                                            item.colorful && "mb-30")
                                        }
                                    >
                                        <img
                                            className="w-full"
                                            src={item.imageUrl}
                                            width={628}
                                            height={426}
                                            alt={item.title}
                                        />
                                    </div>
                                    <h4 className="text-3xl font-extrabold mb-4 ">
                                        {item.title}
                                    </h4>
                                    <p className="text-gray-400">{item.text}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}

                <Gradient />
            </div>
        </div>
    );
};

export default BenefitSection;
