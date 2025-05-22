import React from "react";
import { useNavigate } from "react-router-dom";
import { logo } from "~/assets";
import { LeftLine, RightLine } from "~/components/designs/Pricing";
import Heading from "~/components/Heading";
import PricingList from "~/components/PricingList";

const UpgradePlan = () => {
    const navigate = useNavigate();
    return (
        <div className="container mx-auto px-5 py-5">
            <img
                src={logo}
                alt=""
                width={200}
                onClick={() => navigate("/")}
                className="cursor-pointer"
            />
            <div className="mt-10 relative w-[1400px] mx-auto">
                <Heading
                    title="Dịch vụ của chúng tôi "
                    tag="Bắt đầu với ItelliSpeak"
                />
                <PricingList />
                <LeftLine />
                <RightLine />
            </div>
        </div>
    );
};

export default UpgradePlan;
