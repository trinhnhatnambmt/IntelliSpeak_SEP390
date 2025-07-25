import { Clock, Eye, FileText, Upload } from "lucide-react";
import { Link } from "react-router-dom";

const JDCard = ({ jd }) => {
    return (
        <Link
            to={`/jd/${jd.jdId}`}
            className="bg-white dark:bg-[#262626] rounded-xl shadow-md p-4 mb-4 max-w-2xl w-full transition hover:shadow-lg relative z-10"
        >
            <div className="flex items-center gap-3 mb-2">
                <FileText className="text-blue-600" />
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                    {jd.jobtTitle}
                </h3>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
                <Clock className="w-4 h-4" />
                <span>Đã tải lên: {jd.createAt}</span>
            </div>

            <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4">
                {jd.summary}
            </p>

            <button
                // onClick={onView}
                className="cursor-pointer inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium transition"
            >
                <Eye className="w-4 h-4" />
                Xem chi tiết
            </button>
        </Link>
    );
};

export default JDCard;
