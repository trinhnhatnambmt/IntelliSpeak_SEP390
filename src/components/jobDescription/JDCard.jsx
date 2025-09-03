import { Popconfirm } from "antd";
import { Clock, Eye, FileText, FileCheck, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const JDCard = ({ jd, onDelete }) => {
    const navigate = useNavigate();
    return (
        <div className="relative bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-indigo-800 shadow-lg p-5 mb-6 max-w-2xl w-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-100/50 dark:from-indigo-900/50 dark:to-blue-900/50 rounded-2xl opacity-50 z-0"></div>
            <div className="relative z-10">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 mb-3">
                        <FileText className="w-6 h-6 text-indigo-500 dark:text-indigo-300" />
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white truncate">
                            {jd.jobtTitle}
                        </h3>
                    </div>
                    <Popconfirm
                        title="Delete JD"
                        description="Are you sure to delete this JD?"
                        onConfirm={() => onDelete(jd?.jdId)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <button
                            className="mt-[-20px] cursor-pointer text-gray-500 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200"
                            aria-label="Delete JD"
                        >
                            <X />
                        </button>
                    </Popconfirm>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <Clock className="w-4 h-4" />
                    <span>Created: {jd.createAt}</span>
                </div>

                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base line-clamp-3 mb-4 leading-relaxed">
                    {jd.summary}
                </p>

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate(`/jd/${jd.jdId}`)}
                        className="inline-flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-600 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                    >
                        <Eye className="w-4 h-4" />
                        <span className="text-sm font-semibold">
                            View Detail
                        </span>
                    </button>
                    <button
                        onClick={() => navigate(`/jd/${jd.jdId}/compare`)}
                        className="inline-flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg shadow-md hover:from-green-600 hover:to-teal-600 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                    >
                        <FileCheck className="w-4 h-4" />
                        <span className="text-sm font-semibold">
                            Compare with CV
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JDCard;
