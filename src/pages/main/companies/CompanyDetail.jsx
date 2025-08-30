import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import InterviewTemplate from "./InterviewTemplate";
import { useDispatch, useSelector } from "react-redux";
import {
    getCompanyDetailAPI,
    selectCurrentCompany,
} from "~/redux/company/companySlice";
import { selectCurrentUser } from "~/redux/user/userSlice";
import { getAllJdOfCompany, userApplyCvForCompany } from "~/apis";
import { Upload } from "lucide-react";
import { toast } from "react-toastify";
import { Form, Modal, Select } from "antd";

const CompanyDetail = () => {
    const { id } = useParams();
    const companyDetail = useSelector(selectCurrentCompany);
    const currentUser = useSelector(selectCurrentUser);
    const [jobDescriptions, setJobDescriptions] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const packageId = currentUser?.packageId;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form] = Form.useForm();

    useEffect(() => {
        dispatch(getCompanyDetailAPI(id));
    }, [id, dispatch]);

    useEffect(() => {
        getAllJdOfCompany(id).then((res) => {
            setJobDescriptions(res);
        });
    }, [id]);

    const handleUploadCV = async () => {
        try {
            const values = await form.validateFields();
            toast
                .promise(userApplyCvForCompany(id, values.job), {
                    pending: "Uploading your CV to Company...",
                })
                .then((res) => {
                    if (!res.error) {
                        console.log(res);
                        toast.success(res?.message);
                    } else if (res.error) {
                        toast.error(
                            "Something wrong!! Please upload your CV again"
                        );
                    }
                });

            setIsModalOpen(false);
            form.resetFields();
        } catch (error) {
            console.error("Validation failed:", error);
        }
    };

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
                        <div className="flex-1">
                            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white animate-fade-in">
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
                        <div className="flex flex-col items-center sm:items-end gap-2">
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg shadow-lg hover:from-green-600 hover:to-teal-600 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-sm font-semibold ${
                                    isUploading
                                        ? "opacity-50 cursor-not-allowed"
                                        : ""
                                }`}
                            >
                                {isUploading ? (
                                    <svg
                                        className="animate-spin h-5 w-5 text-white"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                            fill="none"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                        />
                                    </svg>
                                ) : (
                                    <Upload className="w-5 h-5" />
                                )}
                                <span>Upload CV</span>
                            </button>
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

                    {/* JD List Section */}
                    {jobDescriptions.length > 0 && (
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold mb-4">
                                Job Descriptions
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {jobDescriptions.map((jd) => {
                                    const firstImage =
                                        jd.linkToJd?.split(";")[0];
                                    return (
                                        <div
                                            key={jd.companyJdId}
                                            className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-[#1e1e2f] shadow-sm hover:shadow-md transition"
                                        >
                                            {firstImage && (
                                                <img
                                                    src={firstImage}
                                                    alt={jd.jobTitle}
                                                    className="w-full h-40 object-cover rounded-lg mb-3"
                                                />
                                            )}
                                            <h3
                                                className="text-lg font-medium cursor-pointer"
                                                onClick={() =>
                                                    navigate(
                                                        `/main/companyJdDetail/${jd?.companyJdId}`
                                                    )
                                                }
                                            >
                                                {jd.jobTitle}
                                            </h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3">
                                                {jd.summary}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

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
                                        Name: {hr.name}
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
                                        packageId={packageId}
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

            <Modal
                title="Upload your CV"
                closable={{ "aria-label": "Custom Close Button" }}
                open={isModalOpen}
                onOk={handleUploadCV}
                onCancel={() => setIsModalOpen(false)}
            >
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    initialValues={{ remember: true }}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Which job are you focusing on?"
                        name="job"
                        rules={[
                            {
                                required: true,
                                message: "Please select a job!",
                            },
                        ]}
                    >
                        <Select
                            placeholder="Select job"
                            style={{ width: "100%" }}
                            options={jobDescriptions.map((jd) => ({
                                value: jd.companyJdId,
                                label: jd.jobTitle,
                            }))}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default CompanyDetail;
