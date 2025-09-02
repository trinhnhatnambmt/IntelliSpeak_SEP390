import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { squarelogo, intellispeakdark } from "~/assets";
import { LeftLine, RightLine } from "~/components/designs/Pricing";
import Heading from "~/components/Heading";
import PricingList from "~/components/PricingList";
import { selectCurrentUser } from "~/redux/user/userSlice";

const UpgradePlan = () => {
    const currentUser = useSelector(selectCurrentUser);

    const navigate = useNavigate();
    return (
        <div className="container mx-auto px-5 py-5">
            <div className="flex items-center gap-4">
                <img
                    src={squarelogo}
                    alt=""
                    height={40}
                    className="cursor-pointer h-[40px] w-auto"
                    onClick={() => navigate(currentUser ? "/main" : "/")}
                />
                <img
                    src={intellispeakdark}
                    alt=""
                    height={40}
                    onClick={() => navigate(currentUser ? "/main" : "/")}
                    className="h-[40px] w-auto cursor-pointer"
                />
            </div>
            <div className="mt-10 relative w-[1400px] mx-auto">
                <Heading
                    title="Our Services"
                    tag="Get Started with ItelliSpeak"
                />
                <PricingList />
                <LeftLine />
                <RightLine />
            </div>
        </div>
    );
};

export default UpgradePlan;
