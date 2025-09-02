import { Image, Popconfirm, Progress } from "antd";
import { Delete, SquareChartGantt, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
    addJDForCompanyAPI,
    deleteJdFromHrAPI,
    getJdCompanyOfHR,
} from "~/apis";
import FileUploader from "~/components/FileUploader";

export default function HRJDUploadTab() {
    const [isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState("");
    const [file, setFile] = useState(null);
    const [jobDescriptions, setJobDescriptions] = useState([]);
    const [progress, setProgress] = useState(0);
    const [previewOpen, setPreviewOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        fetchJobDescriptions();
    }, []);

    const fetchJobDescriptions = () => {
        getJdCompanyOfHR().then((res) => {
            setJobDescriptions(res);
        });
    };

    const handleFileSelect = (file) => {
        setFile(file);
    };

    const handleAnalyze = async ({ file }) => {
        setIsProcessing(true);
        setStatusText("Uploading your JD...");

        const reqData = new FormData();
        reqData.append("file", file);

        let fakeProgress = 0;
        const interval = setInterval(() => {
            fakeProgress += Math.floor(Math.random() * 15) + 5;
            if (fakeProgress >= 95) {
                fakeProgress = 95;
                clearInterval(interval);
            }
            setProgress(fakeProgress);
        }, 500);

        addJDForCompanyAPI(reqData)
            .then((res) => {
                if (!res.error) {
                    toast.success("Uploading JD successfully!");
                    setIsProcessing(false);
                    setStatusText("");
                    setFile(null);
                    fetchJobDescriptions();
                } else {
                    setIsProcessing(false);
                    setStatusText("");
                    toast.error("Failed to upload JD.");
                }
            })
            .catch((error) => {
                clearInterval(interval);
                setProgress(0);
                navigate("/main/hr/create-question");
                window.location.reload();
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!file) return;
        handleAnalyze({ file });
    };

    const handleDeleteJD = (id) => {
        deleteJdFromHrAPI(id).then((res) => {
            toast.success(res?.message);
            fetchJobDescriptions();
        });
    };

    return (
        <div className="space-y-6">
            {isProcessing ? (
                <div className="mt-10">
                    <div className="flex flex-col items-center mt-6">
                        <Progress
                            percent={progress}
                            percentPosition={{
                                align: "center",
                                type: "inner",
                            }}
                            size={[800, 15]}
                            strokeColor={{
                                "0%": "#108ee9",
                                "100%": "#87d068",
                            }}
                            style={{ marginLeft: "80px" }}
                        />
                    </div>
                    <img
                        src="/images/resume-scan.gif"
                        className="mt-[-100px] w-[500px] ml-[180px] relative z-10"
                    />
                </div>
            ) : (
                <>
                    <h2 className="text-2xl font-medium text-shadow-gray-50">
                        Upload a Job Description (JD)
                    </h2>
                    <form
                        id="upload-form"
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-4 mt-8"
                    >
                        <div className="form-div">
                            <FileUploader
                                onFileSelect={handleFileSelect}
                                file={file}
                            />
                        </div>

                        <button
                            type="submit"
                            className="relative z-10 cursor-pointer flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
                        >
                            <SquareChartGantt className="w-5 h-5" />
                            Analyze JD
                        </button>
                    </form>

                    <div className="mt-10">
                        <h2 className="text-2xl font-medium mb-4">
                            Your Job Descriptions
                        </h2>
                        {jobDescriptions.length === 0 ? (
                            <p>No job descriptions available.</p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {jobDescriptions.map((jd) => {
                                    const firstImageLink = jd.linkToJd
                                        .split(";")[0]
                                        .trim();

                                    return (
                                        <div
                                            key={jd.companyJdId}
                                            className="relative border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-200"
                                        >
                                            <Popconfirm
                                                title="Delete JD"
                                                description="Are you sure to delete this job description?"
                                                onConfirm={() =>
                                                    handleDeleteJD(
                                                        jd.companyJdId
                                                    )
                                                }
                                                okText="Yes"
                                                cancelText="No"
                                            >
                                                <button className="absolute cursor-pointer top-2 right-2 bg-red-500 hover:bg-red-600 text-white text-sm px-1  rounded-full shadow-md transition">
                                                    <X className="w-[15px]" />
                                                </button>
                                            </Popconfirm>

                                            <div>
                                                <Image
                                                    src={firstImageLink}
                                                    alt={jd.jobTitle}
                                                    style={{ display: "none" }}
                                                    preview={{
                                                        visible: previewOpen,
                                                        onVisibleChange: (
                                                            visible
                                                        ) =>
                                                            setPreviewOpen(
                                                                visible
                                                            ),
                                                    }}
                                                />

                                                <img
                                                    src={firstImageLink}
                                                    alt={jd.jobTitle}
                                                    className="w-full h-48 object-cover"
                                                />

                                                <div className="p-4">
                                                    <p
                                                        className="text-lg font-semibold text-white cursor-pointer hover:underline"
                                                        onClick={() =>
                                                            setPreviewOpen(true)
                                                        }
                                                    >
                                                        {jd.jobTitle}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
