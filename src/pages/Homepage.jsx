import React from "react";
import BenefitSection from "~/sections/BenefitSection";
import Header from "~/sections/Header";
import Hero from "~/sections/Hero";
import LogoSection from "~/sections/LogoSection";

const Homepage = () => {
    return (
        <div className="">
            <Header />
            <Hero />
            <LogoSection />
            <BenefitSection />
        </div>
    );
};

export default Homepage;
