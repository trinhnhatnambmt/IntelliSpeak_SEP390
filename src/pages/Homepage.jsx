import React from "react";
import BenefitSection from "~/sections/BenefitSection";
import DirectMeetSection from "~/sections/DirectMeetSection";
import Footer from "~/sections/Footer";
import GuideSection from "~/sections/GuideSection";
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
            <GuideSection />
            <DirectMeetSection />
            <Footer />
        </div>
    );
};

export default Homepage;
