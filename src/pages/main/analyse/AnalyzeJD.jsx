import { Upload } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteJdAPI, getAllJdAPI } from "~/apis";
import JDCard from "~/components/jobDescription/JDCard";

const AnalyzeJD = () => {
    const navigate = useNavigate();
    const [jobDescriptions, setJobDescriptions] = useState([]);
    useEffect(() => {
        getAllJdAPI().then((res) => {
            setJobDescriptions(res);
        });
    }, []);

    const handleDeleteJD = (id) => {
        deleteJdAPI(id).then((res) => {
            if (!res.error) {
                toast.success(res?.message);
                getAllJdAPI().then((res) => {
                    setJobDescriptions(res);
                });
            }
        });
    };

    return (
        <div className="min-h-[60vh] bg-white dark:bg-[#18182a] rounded-2xl shadow-lg p-6 sm:p-10 transition-colors duration-300">
            <section className="main-section">
                <div className="page-heading text-center mb-10">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                        Discover job descriptions that match you
                    </h1>
                    <h2 className="text-lg sm:text-xl text-gray-600 dark:text-gray-300">
                        View detailed requirements and choose your ideal job.
                    </h2>
                    <button
                        onClick={() => navigate("/main/uploadJD")}
                        className="cursor-pointer inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 mt-4"
                    >
                        <Upload className="w-5 h-5" />
                        Upload JD
                    </button>
                </div>

                <div className="resumes-section">
                    {jobDescriptions?.map((jd) => (
                        <JDCard key={jd.id} jd={jd} onDelete={handleDeleteJD} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default AnalyzeJD;
