import React from "react";
import { howItWork1, howItWork2 } from "~/assets";
import Heading from "~/components/Heading";
import Stepper, { Step } from "~/components/Stepper";

const GuideSection = () => {
    return (
        <section
            className="container mx-auto my-12 px-4 pt-20 md:pb-10"
            id="guide"
        >
            <Heading
                tag="Effortless Virtual Interview Experience"
                title="Your Interview Practice Roadmap with IntelliSpeak"
            />

            <Stepper
                initialStep={1}
                onStepChange={(step) => {
                    console.log(step);
                }}
                onFinalStepCompleted={() => console.log("All steps completed!")}
                backButtonText="Previous"
                nextButtonText="Next"
            >
                <Step>
                    <div className="flex flex-col items-start gap-4 p-6 border-1 border-[#252134] rounded-2xl transition-all duration-300 hover:border-[#00d8ff]">
                        <h2 className="text-2xl font-bold text-white">
                            Step 1
                        </h2>
                        <p className="text-lg font-semibold text-[#00d8ff]">
                            Sign Up & Log In
                        </p>
                        <p className="text-base text-gray-400 leading-relaxed">
                            Create your account, verify, and log into the
                            platform.
                        </p>
                    </div>
                </Step>
                <Step>
                    <div className="flex flex-col items-start gap-4 p-6 border-1 border-[#252134] rounded-2xl transition-all duration-300 hover:border-[#00d8ff]">
                        <h2 className="text-2xl font-bold text-white">
                            Step 2
                        </h2>
                        <p className="text-lg font-semibold text-[#00d8ff]">
                            Join a Virtual Interview
                        </p>
                        <img
                            src={howItWork1}
                            alt=""
                            style={{
                                width: "100%",
                                height: "400px",
                                objectFit: "cover",
                                borderRadius: "15px",
                                objectPosition: "center -10px",
                            }}
                        />
                        <p className="text-base text-gray-400 leading-relaxed">
                            Start a mock interview with realistic, job-focused
                            questions.
                        </p>
                    </div>
                </Step>
                <Step>
                    <div className="flex flex-col gap-4 p-6 border-1 border-[#252134] rounded-2xl transition-all duration-300 hover:border-[#00d8ff]">
                        <h2 className="text-2xl font-bold text-white">
                            Step 3
                        </h2>
                        <p className="text-lg font-semibold text-[#00d8ff]">
                            Review Your Results
                        </p>

                        <img
                            src={howItWork2}
                            alt=""
                            style={{
                                width: "100%",
                                height: "400px",
                                objectFit: "cover",
                                borderRadius: "15px",
                                objectPosition: "center -90px",
                            }}
                        />

                        <p className="text-base text-gray-400 leading-relaxed">
                            After the session, AI provides a detailed
                            performance summary.
                        </p>
                    </div>
                </Step>
                <Step>
                    <div className="flex flex-col items-start gap-4 p-6 border-1 border-[#252134] rounded-2xl transition-all duration-300 hover:border-[#00d8ff]">
                        <h2 className="text-2xl font-bold text-white">
                            Step 4
                        </h2>
                        <p className="text-lg font-semibold text-[#00d8ff]">
                            Get Improvement Suggestions
                        </p>
                        <p className="text-base text-gray-400 leading-relaxed">
                            The system highlights areas where you can improve
                            your answers.
                        </p>
                    </div>
                </Step>
                <Step>
                    <div className="flex flex-col items-start gap-4 p-6 border-1 border-[#252134] rounded-2xl transition-all duration-300 hover:border-[#00d8ff]">
                        <h2 className="text-2xl font-bold text-white">
                            Step 5
                        </h2>
                        <p className="text-lg font-semibold text-[#00d8ff]">
                            Practice Again or Save History
                        </p>
                        <p className="text-base text-gray-400 leading-relaxed">
                            Rehearse your interview again or save your results
                            to track progress over time.
                        </p>
                    </div>
                </Step>
            </Stepper>
        </section>
    );
};

export default GuideSection;
