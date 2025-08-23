import React, { useEffect, useState } from "react";
import { check } from "~/assets";
import Button from "./Button/Button";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { getAllPackagesAPI, createPaymentLinkAPI } from "~/apis";

const PricingList = () => {
    const navigate = useNavigate();
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const res = await getAllPackagesAPI();
                setPackages(res.data || []);
            } catch (e) {
                setPackages([]);
            } finally {
                setLoading(false);
            }
        };
        fetchPackages();
    }, []);

    // Handle subscribe click
    const handleSubscribe = async (item) => {
        const isLoggedIn = !!localStorage.getItem("accessToken");
        if (item.price === 0 && !isLoggedIn) {
            navigate("/login");
            return;
        }
        if (item.price === 0) {
            navigate("/main");
            return;
        }
        try {
            const res = await createPaymentLinkAPI(item.packageId);
            if (res?.data?.paymentUrl) {
                window.location.href = res.data.paymentUrl;
            }
        } catch (e) {
            alert("Failed to create payment link.");
        }
    };

    if (loading) {
        return <div>Loading packages...</div>;
    }

    return (
        <div className="flex gap-[1rem] max-lg:flex-wrap">
            {packages.map((item, idx) => (
                <div
                    key={item.packageId}
                    className="w-[19rem] max-lg:w-full h-full px-6 border border-[#252134] rounded-[2rem] lg:w-auto even:py-14 odd:py-8 odd:my-4"
                >
                    <h4
                        className={clsx(
                            `text-5xl font-bold mb-4`,
                            idx === 0 && "text-[#FFB800]",
                            idx === 1 && "text-emerald-500",
                            idx === 2 && "text-pink-500"
                        )}
                    >
                        {item.packageName}
                    </h4>

                    <p className="body-2 min-h-[4rem] mb-3 text-gray-400">
                        {item.description}
                    </p>

                    <div className="flex items-center h-[5.5rem] mb-6">
                        {item.price !== null && (
                            <>
                                <div className="text-5xl leading-none font-bold">
                                    {item.price === 0 ? "0" : item.price.toLocaleString("vi-VN")}
                                    <span className="text-5xl align-top ml-1">₫</span>
                                </div>
                                <div className="text-4xl ml-2">/ month</div>
                            </>
                        )}
                    </div>

                    <Button
                        onClick={() => handleSubscribe(item)}
                        className={clsx(
                            "w-full mb-6 py-3",
                            item.price === 0 &&
                            "bg-orange-400 text-xl before:bg-orange-500",
                            item.price > 0 && item.price <= 100000 &&
                            "bg-emerald-400 text-xl before:bg-emerald-500",
                            item.price > 100000 &&
                            "bg-pink-400 text-xl before:bg-pink-500"
                        )}
                    >
                        {item.price === 0 ? "Get Started" : "Subscribe Now"}
                    </Button>

                    <ul>
                        <li className="flex items-start py-5 border-t border-[#252134]">
                            <img src={check} width={24} height={24} alt="Check" />
                            <p className="body-2 ml-4">{item.interviewCount} interview practices</p>
                        </li>
                        <li className="flex items-start py-5 border-t border-[#252134]">
                            <img src={check} width={24} height={24} alt="Check" />
                            <p className="body-2 ml-4">{item.cvAnalyzeCount} CV analyses</p>
                        </li>
                        <li className="flex items-start py-5 border-t border-[#252134]">
                            <img src={check} width={24} height={24} alt="Check" />
                            <p className="body-2 ml-4">{item.jdAnalyzeCount} JD analyses</p>
                        </li>
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default PricingList;
