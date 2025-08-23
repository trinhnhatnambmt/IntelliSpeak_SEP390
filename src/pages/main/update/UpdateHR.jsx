import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { applyForHrAPI, getAllCvAPI, uploadPDF, getAllCompaniesToReqHR } from "~/apis";
import { useDispatch } from "react-redux";
import { getUserProfileAPI } from "~/redux/user/userSlice";
import HrApplicationStatus from "~/components/HrApplicationStatus";
import FileUploader from "~/components/FileUploader";
import { SquareChartGantt, Upload, FileText, Clock, CheckCircle, XCircle, AlertCircle, Building2, Phone, Globe, Linkedin, FileText as FileTextIcon, Calendar, Eye, ChevronLeft, ChevronRight } from "lucide-react";

const UpdateHR = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        companyId: "",
        companyNameIfNotExist: "",
        email: "",
        phone: "",
        motivation: "",
        cv: null,
        cvTitle: "",
        selectedCv: null,
        experienceYears: 0,
        linkedinUrl: ""
    });

    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const res = await getAllCompaniesToReqHR();
                console.log("Fetched companies:", res);
                setCompanies(res.data || []);
            } catch (error) {
                setCompanies([]);
                console.log("Error fetching companies:", error);
            }
        };
        fetchCompanies();
    }, []);

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
            cvTitle: file.name.split('.')[0] || "New CV"
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
        if ((formData.companyId === "" || formData.companyId === undefined) && !formData.companyNameIfNotExist) {
            toast.error("Please select a company or enter a new one.");
            return false;
        }
        if (!formData.phone || !formData.cvTitle || (!formData.selectedCv && !formData.cv)) {
            toast.error("Please fill in all required information");
            return false;
        }

        const phoneRegex = /^\+84\d{9,10}$/;
        if (!phoneRegex.test(formData.phone)) {
            toast.error("Phone number must start with +84 and have 9-10 digits after");
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

                const uploadResponse = await uploadPDF(reqData);
                console.log("uploadResponse", uploadResponse);
                // Join all URLs with ';' if multiple pages exist
                if (Array.isArray(uploadResponse) && uploadResponse.length > 0) {
                    cvUrl = uploadResponse.join(';');
                } else {
                    cvUrl = '';
                }
                if (!cvUrl) {
                    throw new Error("Could not get CV URL from server response");
                }
                setIsProcessingCV(false);
            }


            const applicationData = {
                companyId: formData.companyId === "other" ? 0 : Number(formData.companyId),
                companyNameIfNotExist: formData.companyId === "other" ? formData.companyNameIfNotExist : "",
                phone: formData.phone,
                country: "Vietnam",
                experienceYears: formData.experienceYears,
                linkedinUrl: formData.linkedinUrl,
                cvUrl: cvUrl
            };
            console.log("applicationData", applicationData);

            await applyForHrAPI(applicationData);

            // Optionally, you can trigger a refresh in HrApplicationStatus via a state or context if needed

            setFormData({
                companyId: "",
                companyNameIfNotExist: "",
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
        } finally {
            // Refetch user profile to update role immediately after successful HR application
            dispatch(getUserProfileAPI());
            setIsLoading(false);
            setIsProcessingCV(false);
        }
    };

    // HR Application Status is now handled in HrApplicationStatus component

    return (
        <div className="container mx-auto px-5 py-10">
            <div className="flex flex-col lg:flex-row gap-6">
                {/* HR Application Status Panel - Left Side */}
                <div className="lg:w-1/3">
                    <HrApplicationStatus />
                </div>

                {/* Application Form - Right Side */}
                <div className="lg:w-2/3">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                        <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">
                            HR Application Form
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Company Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Company*
                                </label>
                                <select
                                    name="companyId"
                                    value={formData.companyId}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white p-2"
                                >
                                    <option value="">Select company</option>
                                    {companies.map((c) => (
                                        <option key={c.companyId} value={c.companyId}>{c.name}</option>
                                    ))}
                                    <option value="other">Other (add new company)</option>
                                </select>
                                {formData.companyId === "other" && (
                                    <input
                                        type="text"
                                        name="companyNameIfNotExist"
                                        value={formData.companyNameIfNotExist}
                                        onChange={handleChange}
                                        placeholder="Enter new company name"
                                        required
                                        className="mt-2 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white p-2"
                                    />
                                )}
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
                                    className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white p-2"
                                />
                            </div>

                            {/* Phone Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Phone Number*
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="+84..."
                                    className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white p-2"
                                />
                            </div>

                            {/* Experience Years */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Years of Experience*
                                </label>
                                <input
                                    type="number"
                                    name="experienceYears"
                                    min="0"
                                    required
                                    value={formData.experienceYears}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white p-2"
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
                                    className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white p-2"
                                />
                            </div>

                            {/* Motivation */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Why do you want to become an HR?*
                                </label>
                                <textarea
                                    name="motivation"
                                    required
                                    value={formData.motivation}
                                    onChange={handleChange}
                                    rows={4}
                                    className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white p-2"
                                ></textarea>
                            </div>

                            {/* CV Selection Section */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        CV Title*
                                    </label>
                                    <input
                                        type="text"
                                        name="cvTitle"
                                        value={formData.cvTitle}
                                        onChange={handleChange}
                                        placeholder="e.g., HR Manager CV"
                                        required
                                        className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white p-2"
                                    />
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setShowExistingCvs(!showExistingCvs)}
                                        className="flex items-center gap-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white py-2 px-4 rounded-lg"
                                    >
                                        <Upload className="w-4 h-4" />
                                        {formData.selectedCv ? "Existing CV Selected" : "Choose from Existing CVs"}
                                    </button>
                                </div>

                                {showExistingCvs && (
                                    <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 max-h-60 overflow-y-auto">
                                        <h3 className="text-sm font-medium mb-2">Your CVs</h3>
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
                                            <p className="text-sm text-gray-500">No CVs available</p>
                                        )}
                                    </div>
                                )}

                                {!formData.selectedCv && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Or upload a new CV (PDF or DOC)*
                                        </label>
                                        <FileUploader
                                            onFileSelect={handleFileSelect}
                                            file={formData.cv}
                                        />
                                        {isProcessingCV && (
                                            <p className="mt-2 text-sm text-blue-600 dark:text-blue-400">
                                                Processing your CV...
                                            </p>
                                        )}
                                    </div>
                                )}

                                {formData.selectedCv && (
                                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                                        <div className="flex items-center gap-2">
                                            <FileText className="w-4 h-4 text-green-600 dark:text-green-400" />
                                            <p className="text-sm text-green-700 dark:text-green-300">
                                                Selected: {formData.selectedCv.cvTitle}
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, selectedCv: null })}
                                            className="mt-1 text-xs text-blue-600 dark:text-blue-400 hover:underline"
                                        >
                                            Change CV
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
                                    "Submitting..."
                                ) : (
                                    <>
                                        <SquareChartGantt className="w-5 h-5" />
                                        Submit Application
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateHR;