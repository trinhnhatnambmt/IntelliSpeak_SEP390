import { Image } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCompanyJdDetail } from "~/apis";

const CompanyJdDetail = () => {
    const { id } = useParams();
    const [jobDescription, setJobDescription] = useState(null);

    useEffect(() => {
        getCompanyJdDetail(id).then((res) => {
            console.log(res);
            setJobDescription(res);
        });
    }, [id]);

    if (!jobDescription) {
        return (
            <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                Loading...
            </div>
        );
    }

    // Tách ảnh ra thành array
    const images = jobDescription.linkToJd
        ? jobDescription.linkToJd.split(";")
        : [];

    return (
        <div className="container mx-auto px-6 py-10 text-gray-800 dark:text-gray-200 relative z-10">
            {/* Title */}
            <h1 className="text-3xl font-bold mb-6 text-blue-600 dark:text-blue-400">
                {jobDescription.jobTitle}
            </h1>

            {/* Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {images.map((img, idx) => (
                    <Image
                        key={idx}
                        src={img}
                        alt={`JD page ${idx + 1}`}
                        className="w-full rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
                    />
                ))}
            </div>

            {/* Summary */}
            <div className="mb-8 p-6 rounded-xl shadow-md bg-gray-50 dark:bg-[#1e1e2f] border border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold mb-2 text-indigo-600 dark:text-indigo-400">
                    Summary
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                    {jobDescription.summary}
                </p>
            </div>

            {/* Must Have Skills */}
            <div className="mb-6 p-6 rounded-xl shadow-md bg-white dark:bg-[#2a2a3d] border-l-4 border-green-500">
                <h2 className="text-lg font-semibold mb-2 text-green-600">
                    Must Have Skills
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                    {jobDescription.mustHaveSkills}
                </p>
            </div>

            {/* Nice to Have Skills */}
            <div className="mb-6 p-6 rounded-xl shadow-md bg-white dark:bg-[#2a2a3d] border-l-4 border-yellow-500">
                <h2 className="text-lg font-semibold mb-2 text-yellow-600">
                    Nice to Have Skills
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                    {jobDescription.niceToHaveSkills}
                </p>
            </div>

            {/* Suitable Level */}
            <div className="p-6 rounded-xl shadow-md bg-white dark:bg-[#2a2a3d] border-l-4 border-purple-500">
                <h2 className="text-lg font-semibold mb-2 text-purple-600">
                    Suitable Level
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                    {jobDescription.suitableLevel}
                </p>
            </div>
        </div>
    );
};

export default CompanyJdDetail;
