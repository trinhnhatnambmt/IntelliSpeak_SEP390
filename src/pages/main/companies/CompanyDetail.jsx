import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCompanyDetailAPI } from "~/apis";
import InterviewTemplate from "./InterviewTemplate";

const CompanyDetail = () => {
    const { id } = useParams();
    const [companyDetail, setCompanyDetail] = useState(null);

    useEffect(() => {
        getCompanyDetailAPI(id).then((res) => {
            console.log(res);
            setCompanyDetail(res);
        });
    }, [id]);

    return (
        <div className="container mx-auto px-6 py-8 min-h-screen  text-gray-800 dark:text-gray-200 relative z-10">
            {companyDetail ? (
                <div className="max-w-4xl mx-auto">
                    {/* Header Section */}
                    <div className="flex items-center gap-6 mb-8">
                        <img
                            src={companyDetail.logoUrl}
                            alt={companyDetail.name}
                            className="w-20 h-20 object-contain rounded-lg "
                        />
                        <div>
                            <h1 className="text-3xl font-bold">
                                {companyDetail.name}
                            </h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {companyDetail.shortName}
                            </p>
                            <a
                                href={companyDetail.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline text-sm"
                            >
                                {companyDetail.website}
                            </a>
                        </div>
                    </div>

                    {/* Description Section */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-2">
                            Description
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            {companyDetail.description}
                        </p>
                    </div>

                    {/* HR List Section */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">HR Team</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {companyDetail.hrList.map((hr) => (
                                <div
                                    key={hr.hrId}
                                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-[#1e1e2f] shadow-sm hover:shadow-md transition"
                                >
                                    <p className="font-medium">
                                        Name: {hr.company}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Phone: {hr.phone}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Country: {hr.country}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Experience: {hr.experienceYears} years
                                    </p>
                                    <Link
                                        to={hr.linkedinUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 hover:underline text-sm"
                                    >
                                        LinkedIn
                                    </Link>

                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        CV:
                                        <Link
                                            to={hr.cvUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:underline text-sm ml-1"
                                        >
                                            View CV
                                        </Link>
                                    </p>

                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Submitted:{" "}
                                        {new Date(
                                            hr.submittedAt
                                        ).toLocaleDateString()}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Interview Template Section */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4">
                            Interview Templates
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {companyDetail.interviewTemplateList.map(
                                (template) => (
                                    <InterviewTemplate
                                        interviewSessionId={
                                            template.interviewSessionId
                                        }
                                        title={template.title}
                                        description={template.description}
                                        totalQuestion={template.totalQuestion}
                                    />
                                )
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <p className="text-center">Loading...</p>
            )}
        </div>
    );
};

export default CompanyDetail;
