import React from "react";
import { check } from "~/assets";
import { pricing } from "~/constants";
import Button from "./Button/Button";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

const PricingList = () => {
    const navigate = useNavigate();
    return (
        <div className="flex gap-[1rem] max-lg:flex-wrap">
            {pricing.map((item) => (
                <div
                    key={item.id}
                    className="w-[19rem] max-lg:w-full h-full px-6 border border-[#252134] rounded-[2rem] lg:w-auto even:py-14 odd:py-8 odd:my-4"
                >
                    <h4
                        className={clsx(
                            `text-5xl font-bold mb-4`,
                            item.id === "0" && "text-[#FFB800]",
                            item.id === "1" && "text-emerald-500",
                            item.id === "2" && "text-pink-500"
                        )}
                    >
                        {item.title}
                    </h4>

                    <p className="body-2 min-h-[4rem] mb-3 text-gray-400">
                        {item.description}
                    </p>

                    <div className="flex items-center h-[5.5rem] mb-6">
                        {item.price && (
                            <>
                                <div className="text-5xl">$</div>
                                <div className="text-[5.5rem] leading-none font-bold">
                                    {item.price}
                                </div>
                                <div className="text-4xl">/ tháng</div>
                            </>
                        )}
                    </div>

                    <Button
                        onClick={() => navigate("/main/payment")}
                        className={clsx(
                            "w-full mb-6 py-3",
                            item.price === "0" &&
                                "bg-orange-400 text-xl before:bg-orange-500",
                            item.price === "9.99" &&
                                "bg-emerald-400 text-xl before:bg-emerald-500",
                            item.price === null &&
                                "bg-pink-400 text-xl before:bg-pink-500"
                        )}
                    >
                        {item.price ? "Đăng ký ngay" : "Liên hệ với chúng tôi"}
                    </Button>

                    <ul>
                        {item.features.map((feature, index) => (
                            <li
                                key={index}
                                className="flex items-start py-5 border-t border-[#252134]"
                            >
                                <img
                                    src={check}
                                    width={24}
                                    height={24}
                                    alt="Check"
                                />
                                <p className="body-2 ml-4">{feature}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default PricingList;
