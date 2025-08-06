import React, { useState } from "react";
import { toast } from "react-toastify";
import { applyForHrAPI, uploadResumeAPI } from "~/apis";

const UpdateHR = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        motivation: "",
        cv: null,
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "cv") {
            setFormData({ ...formData, cv: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // First upload the CV file
            let cvUrl = "";
            if (formData.cv) {
                const uploadResponse = await uploadResumeAPI(
                    formData.cv,
                    `HR_Application_${formData.fullName}_${Date.now()}`
                );
                cvUrl = uploadResponse.url; // Adjust this based on your API response structure
            }

            // Then submit the HR application
            await applyForHrAPI({
                company: formData.fullName, // Using fullName as company for now
                phone: formData.phone,
                country: "Vietnam", // You might want to add a country field
                experienceYears: 0, // You might want to add this field
                linkedinUrl: "", // You might want to add this field
                cvUrl: cvUrl,
                // Add motivation if your API supports it
            });

            toast.success("HR application submitted successfully!");
            // Reset form after successful submission
            setFormData({
                fullName: "",
                email: "",
                phone: "",
                motivation: "",
                cv: null,
            });
        } catch (error) {
            console.error("Error submitting HR application:", error);
            toast.error("Failed to submit HR application. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-5 py-10">
            <div className="bg-white dark:bg-[#1f1f1f] rounded-2xl p-6 shadow-lg max-w-2xl mx-auto relative z-10">
                <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">
                    Gửi yêu cầu trở thành HR
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Họ và tên
                        </label>
                        <input
                            type="text"
                            name="fullName"
                            required
                            value={formData.fullName}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Email
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
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Số điện thoại
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Lý do bạn muốn trở thành HR
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
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Tải lên CV của bạn (PDF hoặc DOC)
                        </label>
                        <input
                            type="file"
                            name="cv"
                            accept=".pdf,.doc,.docx"
                            required
                            onChange={handleChange}
                            className="mt-1 block w-full text-white dark:text-white file:mr-4 file:py-2 file:px-4
                            file:rounded-lg file:border-0
                            file:text-sm file:font-semibold
                            file:bg-blue-600 file:text-white
                            hover:file:bg-blue-700"
                        />
                        {formData.cv && (
                            <p className="mt-1 text-sm text-green-600 dark:text-green-400">
                                Đã chọn: {formData.cv.name}
                            </p>
                        )}
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg ${isLoading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                    >
                        {isLoading ? "Đang gửi..." : "Gửi yêu cầu"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateHR;