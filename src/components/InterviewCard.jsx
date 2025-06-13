/* eslint-disable no-undef */
import React from "react";
import { ChevronRight } from "lucide-react";
import { service2 } from "~/assets";
import { Link } from "react-router-dom";

const InterviewCard = ({ type = main }) => {
    return (
        <>
            <div className="w-[90%]] h-[480px] group mx-auto  bg-[#252525] p-2  border-0  overflow-hidden rounded-md text-white ">
                <figure className="w-full h-80 group-hover:h-72 transition-all duration-300 bg-[#0a121a]  p-2 rounded-md relative overflow-hidden">
                    <div
                        style={{
                            background:
                                "linear-gradient(123.9deg, #4727a5 1.52%, rgba(0, 0, 0, 0) 68.91%)",
                        }}
                        className="absolute top-0 left-0 w-full h-full  group-hover:opacity-100 opacity-0  transition-all duration-300"
                    ></div>
                    <img
                        src={service2}
                        alt="shoes"
                        width={600}
                        height={600}
                        className="absolute -bottom-1 group-hover:-bottom-5 right-0 h-64 w-[80%] group-hover:border-4 border-4 group-hover:border-[#76aaf82d] rounded-lg object-cover transition-all duration-300"
                    />
                </figure>
                <article className="p-4 space-y-2">
                    <div className="h-8 w-40 bg-[#4393fc] rounded-md flex items-center justify-center mb-2">
                        Non - Technical
                    </div>
                    <h1 className="text-xl font-semibold capitalize">
                        Incorporate your company
                    </h1>
                    <p className="text-base leading-[120%]">
                        Form a legal entity, issue stock, and start accepting
                        payments.
                    </p>
                    {type === "main" && (
                        <Link
                            to="#"
                            className=" text-base text-white font-normal group-hover:opacity-100 opacity-0 translate-y-2 group-hover:translate-y-0 pt-2 flex gap-1 transition-all duration-300 "
                        >
                            View Interview
                            <span>
                                <ChevronRight />
                            </span>
                        </Link>
                    )}

                    {type === "profile" && (
                        <div className="flex flex-col sm:flex-row gap-2 pt-2">
                            <Link
                                to="#"
                                className="text-base text-white font-normal group-hover:opacity-100 opacity-0 translate-y-2 group-hover:translate-y-0 flex gap-1 transition-all duration-300"
                            >
                                Retake Interview
                                <span>
                                    <ChevronRight />
                                </span>
                            </Link>
                            <Link
                                to="/main/feedback"
                                className="text-base text-white font-normal group-hover:opacity-100 opacity-0 translate-y-2 group-hover:translate-y-0 flex gap-1 transition-all duration-300"
                            >
                                View Feedback
                                <span>
                                    <ChevronRight />
                                </span>
                            </Link>
                        </div>
                    )}
                </article>
            </div>
        </>
    );
};

export default InterviewCard;
