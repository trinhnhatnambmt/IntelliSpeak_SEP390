import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { applyForHrAPI, uploadResumeAPI, getAllCvAPI } from "~/apis";
import FileUploader from "~/components/FileUploader";
import { SquareChartGantt, Upload, FileText } from "lucide-react";

const UpdateHR = () => {
    const [formData, setFormData] = useState({
        company: "",
        email: "",
        phone: "",
        motivation: "",
        cv: null,
        cvTitle: "",
        selectedCv: null,
        experienceYears: 0,
        linkedinUrl: ""
    });

    const [isLoading, setIsLoading] = useState(false);
    const [isProcessingCV, setIsProcessingCV] = useState(false);
    const [existingCvs, setExistingCvs] = useState([]);
    const [showExistingCvs, setShowExistingCvs] = useState(false);

    useEffect(() => {
        const loadExistingCvs = async () => {
            try {
                const response = await getAllCvAPI();
                setExistingCvs(response || []);
            } catch (error) {
                console.error("Error loading existing CVs:", error);
                toast.error("Không thể tải danh sách CV");
            }
        };
        loadExistingCvs();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "phone" && value && !value.startsWith("+84")) {
            const formattedPhone = value.replace(/^0/, "+84");
            setFormData({ ...formData, [name]: formattedPhone });
            return;
        }

        setFormData({ ...formData, [name]: value });
    };

    const handleFileSelect = (file) => {
        setFormData({
            ...formData,
            cv: file,
            selectedCv: null,
            cvTitle: file.name.split('.')[0] || "CV mới"
        });
    };

    const handleSelectExistingCv = (cv) => {
        setFormData({
            ...formData,
            selectedCv: cv,
            cv: null,
            cvTitle: cv.cvTitle
        });
        setShowExistingCvs(false);
    };

    const validateForm = () => {
        if (!formData.company || !formData.phone || !formData.cvTitle || (!formData.selectedCv && !formData.cv)) {
            toast.error("Vui lòng điền đầy đủ thông tin bắt buộc");
            return false;
        }

        const phoneRegex = /^\+84\d{9,10}$/;
        if (!phoneRegex.test(formData.phone)) {
            toast.error("Số điện thoại phải bắt đầu bằng +84 và có 9-10 số sau đó");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            let cvUrl = "";

            if (formData.selectedCv) {
                cvUrl = formData.selectedCv.imageUrls;
            } else if (formData.cv) {
                setIsProcessingCV(true);
                const reqData = new FormData();
                reqData.append("file", formData.cv);

                const uploadResponse = await uploadResumeAPI(
                    reqData,
                    formData.cvTitle || `HR_Application_${formData.company}_${Date.now()}`
                );

                console.log("uploadResponse", uploadResponse);
                console.log("uploadResponse?.evaluation?.imageURL", uploadResponse?.evaluation?.imageURL);

                // cvUrl = uploadResponse?.imageUrls || "";
                cvUrl = uploadResponse?.evaluation?.imageURL ||
                    uploadResponse?.extractedInfo?.memberCV?.linkToCv || "";

                if (!cvUrl) {
                    throw new Error("Không thể lấy URL CV từ phản hồi của server");
                }
                setIsProcessingCV(false);
            }

            const applicationData = {
                company: formData.company,
                phone: formData.phone,
                country: "Vietnam",
                experienceYears: formData.experienceYears,
                linkedinUrl: formData.linkedinUrl,
                cvUrl: cvUrl
            };
            console.log("applicationData", applicationData);

            await applyForHrAPI(applicationData);

            toast.success("Đã gửi yêu cầu trở thành HR thành công!");
            setFormData({
                company: "",
                email: "",
                phone: "",
                motivation: "",
                cv: null,
                cvTitle: "",
                selectedCv: null,
                experienceYears: 0,
                linkedinUrl: ""
            });

        } catch (error) {
            console.error("Error details:", error.response?.data);
            toast.error(error.response?.data?.message || "Gửi yêu cầu thất bại. Vui lòng thử lại.");
        } finally {
            setIsLoading(false);
            setIsProcessingCV(false);
        }
    };

    return (
        <div className="container mx-auto px-5 py-10">
            <div className="bg-white dark:bg-[#1f1f1f] rounded-2xl p-6 shadow-lg max-w-2xl mx-auto relative z-10">
                <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">
                    Gửi yêu cầu trở thành HR
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Company Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Tên công ty/Cá nhân*
                        </label>
                        <input
                            type="text"
                            name="company"
                            required
                            value={formData.company}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white p-2"
                        />
                    </div>

                    {/* Email Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Email*
                        </label>
                        <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white p-2"
                        />
                    </div>

                    {/* Phone Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Số điện thoại*
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+84..."
                            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white p-2"
                        />
                    </div>

                    {/* Experience Years */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Số năm kinh nghiệm*
                        </label>
                        <input
                            type="number"
                            name="experienceYears"
                            min="0"
                            required
                            value={formData.experienceYears}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white p-2"
                        />
                    </div>

                    {/* LinkedIn */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            LinkedIn Profile
                        </label>
                        <input
                            type="url"
                            name="linkedinUrl"
                            value={formData.linkedinUrl}
                            onChange={handleChange}
                            placeholder="https://linkedin.com/in/your-profile"
                            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white p-2"
                        />
                    </div>

                    {/* Motivation */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Lý do bạn muốn trở thành HR*
                        </label>
                        <textarea
                            name="motivation"
                            required
                            value={formData.motivation}
                            onChange={handleChange}
                            rows={4}
                            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white p-2"
                        ></textarea>
                    </div>

                    {/* CV Selection Section */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Tiêu đề CV*
                            </label>
                            <input
                                type="text"
                                name="cvTitle"
                                value={formData.cvTitle}
                                onChange={handleChange}
                                placeholder="VD: CV HR Manager"
                                required
                                className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white p-2"
                            />
                        </div>

                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => setShowExistingCvs(!showExistingCvs)}
                                className="flex items-center gap-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white py-2 px-4 rounded-lg"
                            >
                                <Upload className="w-4 h-4" />
                                {formData.selectedCv ? "Đã chọn CV có sẵn" : "Chọn từ CV có sẵn"}
                            </button>
                        </div>

                        {showExistingCvs && (
                            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 max-h-60 overflow-y-auto">
                                <h3 className="text-sm font-medium mb-2">CV của bạn</h3>
                                {existingCvs.length > 0 ? (
                                    <ul className="space-y-2">
                                        {existingCvs.map((cv) => (
                                            <li
                                                key={cv.id}
                                                onClick={() => handleSelectExistingCv(cv)}
                                                className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer ${formData.selectedCv?.id === cv.id
                                                    ? 'bg-blue-100 dark:bg-blue-900'
                                                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                                                    }`}
                                            >
                                                <FileText className="w-4 h-4 text-gray-500" />
                                                <span>{cv.cvTitle}</span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-sm text-gray-500">Không có CV nào</p>
                                )}
                            </div>
                        )}

                        {!formData.selectedCv && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Hoặc tải lên CV mới (PDF hoặc DOC)*
                                </label>
                                <FileUploader
                                    onFileSelect={handleFileSelect}
                                    file={formData.cv}
                                />
                                {isProcessingCV && (
                                    <p className="mt-2 text-sm text-blue-600 dark:text-blue-400">
                                        Đang xử lý CV của bạn...
                                    </p>
                                )}
                            </div>
                        )}

                        {formData.selectedCv && (
                            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                                <div className="flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-green-600 dark:text-green-400" />
                                    <p className="text-sm text-green-700 dark:text-green-300">
                                        Đã chọn: {formData.selectedCv.cvTitle}
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, selectedCv: null })}
                                    className="mt-1 text-xs text-blue-600 dark:text-blue-400 hover:underline"
                                >
                                    Thay đổi CV
                                </button>
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading || isProcessingCV}
                        className={`flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg ${isLoading || isProcessingCV ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                    >
                        {isLoading || isProcessingCV ? (
                            "Đang gửi..."
                        ) : (
                            <>
                                <SquareChartGantt className="w-5 h-5" />
                                Gửi yêu cầu
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateHR;