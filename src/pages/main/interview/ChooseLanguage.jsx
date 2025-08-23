import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Globe } from "lucide-react";
import { flagOfEn, flagOfVi } from "~/assets";
import { useDispatch } from "react-redux";
import { interViewSessionQuestionForAiAPI } from "~/redux/interview/interviewSessionSlice";
import { toast } from "react-toastify";

const ChooseLanguage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const submitInterviewSessionWithEnglish = () => {
        toast
            .promise(dispatch(interViewSessionQuestionForAiAPI(id)), {
                pending: "Preparing your interview session...",
            })
            .then((res) => {
                if (!res.error) {
                    navigate(`/main/interviewPage/${id}`);
                }
            });
    };

    return (
        <div className="container mx-auto px-5 mt-40 ">
            <div className="min-h-[60vh] flex flex-col items-center justify-center bg-white dark:bg-[#18182a] rounded-2xl shadow-lg p-6 sm:p-10 transition-colors duration-300">
                <div className="text-center mb-10 relative z-10">
                    <Globe className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                        Choose Your Interview Language
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        Please select the language you would like to use.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl">
                    <button
                        onClick={submitInterviewSessionWithEnglish}
                        className=" hover:border-blue-500 duration-300 cursor-pointer relative z-10 flex items-center gap-4 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1e1e2f] hover:shadow-md transition rounded-2xl p-6 text-left group"
                    >
                        <img
                            src={flagOfEn}
                            alt="English"
                            className="w-10 h-10 rounded-full shadow object-cover relative z-10"
                        />
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-500 transition duration-300">
                                English
                            </h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Interview in English
                            </p>
                        </div>
                    </button>
                    <button className="hover:border-green-600 duration-300 cursor-pointer relative z-10 flex items-center gap-4 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1e1e2f] hover:shadow-md transition rounded-2xl p-6 text-left group">
                        <img
                            src={flagOfVi}
                            alt="Vietnamese"
                            className="w-10 h-10 rounded-full shadow object-cover relative z-10"
                        />
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-red-600 transition duration-300 ">
                                Tiếng Việt
                            </h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Phỏng vấn bằng tiếng Việt
                            </p>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChooseLanguage;
