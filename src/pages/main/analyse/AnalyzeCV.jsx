import { Upload } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCvAPI } from "~/apis";
import ResumeCard from "~/components/ResumeCard";
// import { resumes } from "~/constants";

const AnalyzeCV = () => {
    const navigate = useNavigate();
    const [resumes, setResumes] = useState();
    useEffect(() => {
        getAllCvAPI().then((res) => {
            setResumes(res);
        });
    }, []);
    return (
        <div className="min-h-[60vh] bg-white dark:bg-[#18182a] rounded-2xl shadow-lg p-6 sm:p-10 transition-colors duration-300 ">
            <section className="main-section">
                <div className="page-heading text-center mb-10">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                        Theo dõi hồ sơ & điểm đánh giá CV của bạn
                    </h1>
                    <h2 className="text-lg sm:text-xl text-gray-600 dark:text-gray-300">
                        Xem lại các đơn ứng tuyển và nhận phản hồi từ AI.
                    </h2>
                    <button
                        onClick={() => navigate("/main/upload")}
                        className="cursor-pointer inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 mt-4"
                    >
                        <Upload className="w-5 h-5" />
                        Tải CV lên
                    </button>
                </div>

                <div className="resumes-section">
                    {resumes?.map((resume) => (
                        <ResumeCard key={resume.id} resume={resume} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default AnalyzeCV;
