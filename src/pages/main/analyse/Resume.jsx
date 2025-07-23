import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ATS from "~/components/ATS";
import Details from "~/components/Detail";
import Summary from "~/components/Summary";
import mockFeedback from "~/constants/mockdata";

const Resume = () => {
    const { id } = useParams();
    const [imageUrl, setImageUrl] = useState("");
    const [resumeUrl, setResumeUrl] = useState("");
    const [feedback, setFeedback] = useState(null);
    const navigate = useNavigate();
    return (
        <main className="!pt-0">
            <nav className="resume-nav">
                <Link to="/main" className="back-button bg-white">
                    <img
                        src="/icons/back.svg"
                        alt="logo"
                        className="w-2.5 h-2.5"
                    />
                    <span className="text-gray-800 text-sm font-semibold">
                        Trở về trang chủ
                    </span>
                </Link>
            </nav>
            <div className="flex flex-row w-full max-lg:flex-col-reverse">
                <section className="feedback-section bg-[url('/images/bg-small.svg') bg-cover h-[100vh] sticky top-0 items-center justify-center">
                    {imageUrl && resumeUrl && (
                        <div className="animate-in fade-in duration-1000 gradient-border max-sm:m-0 h-[90%] max-wxl:h-fit w-fit">
                            <a
                                href={resumeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    src={imageUrl}
                                    className="w-full h-full object-contain rounded-2xl"
                                    title="resume"
                                />
                            </a>
                        </div>
                    )}
                </section>
                <section className="feedback-section">
                    <h2 className="text-4xl text-white font-bold">
                        Đánh giá tổng quan
                    </h2>
                    {/* {feedback ? ( */}
                    <div className="flex flex-col gap-8 animate-in fade-in duration-1000">
                        <Summary feedback={feedback || mockFeedback} />
                        <ATS
                            score={
                                feedback?.ats?.score ?? mockFeedback.ats.score
                            }
                            suggestions={
                                feedback?.ats?.suggestions ??
                                mockFeedback.ats.suggestions
                            }
                        />
                        <Details feedback={feedback || mockFeedback} />
                    </div>
                    {/* ) : (
                        <img
                            src="/images/resume-scan-2.gif"
                            className="w-full"
                        />
                    )} */}
                </section>
            </div>
        </main>
    );
};

export default Resume;
