import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getResumeFeedbackAPI } from "~/apis";
import ATS from "~/components/Resume/ATS";
import Details from "~/components/Resume/Detail";
import Summary from "~/components/Resume/Summary";
import mockFeedback from "~/constants/mockdata";

const Resume = () => {
    const { id } = useParams();
    const [feedback, setFeedback] = useState(null);

    useEffect(() => {
        getResumeFeedbackAPI(id).then((res) => {
            console.log("🚀 ~ Resume ~ res:", res);
            setFeedback(res);
        });
    }, [id]);

    const atsScore = feedback?.categories?.find(
        (cat) => cat.categoryName === "ATS"
    )?.score;

    const atsSuggestions = feedback?.categories?.find(
        (cat) => cat.categoryName === "ATS"
    )?.tips;

    return (
        <main className="!pt-0">
            <nav className="resume-nav">
                <Link to="/main/analyze/CV" className="back-button bg-white">
                    <img
                        src="/icons/back.svg"
                        alt="logo"
                        className="w-2.5 h-2.5"
                    />
                    <span className="text-gray-800 text-sm font-semibold">
                        Back to Home
                    </span>
                </Link>
            </nav>
            <div className="flex flex-row w-full max-lg:flex-col-reverse">
                <section className="feedback-section bg-[url('/images/bg-small.svg') bg-cover h-[100vh] sticky top-0 items-center justify-center">
                    <div className="animate-in fade-in duration-1000  max-sm:m-0 h-[90%] max-wxl:h-fit w-fit">
                        {feedback?.imageURL
                            ?.split(";")
                            .filter((url) => url.trim() !== "")
                            .map((url, index) => (
                                <div
                                    key={index}
                                    className="mb-4 animate-in fade-in duration-700 gradient-border"
                                >
                                    <a
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img
                                            src={url}
                                            alt={`resume-page-${index + 1}`}
                                            className="w-full h-auto object-contain rounded-2xl"
                                        />
                                    </a>
                                </div>
                            ))}
                    </div>
                </section>
                <section className="feedback-section">
                    <h2 className="text-4xl text-white font-bold">Overview</h2>
                    {feedback ? (
                        <div className="flex flex-col gap-8 animate-in fade-in duration-1000">
                            <Summary feedback={feedback || mockFeedback} />
                            <ATS
                                score={atsScore ?? mockFeedback.ats.score}
                                suggestions={
                                    atsSuggestions ??
                                    mockFeedback.ats.suggestions
                                }
                            />
                            <Details feedback={feedback || mockFeedback} />
                        </div>
                    ) : (
                        <img
                            src="/images/resume-scan-2.gif"
                            className="w-full"
                        />
                    )}
                </section>
            </div>
        </main>
    );
};

export default Resume;
