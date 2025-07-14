import React, { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { Upload, message } from "antd";

const { Dragger } = Upload;

const UploadCVPage = () => {
    const [uploadType, setUploadType] = useState("cv");

    const props = {
        name: "file",
        multiple: false,
        accept: ".pdf,.doc,.docx",
        action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
        onChange(info) {
            const { status } = info.file;
            if (status === "done") {
                message.success(`${info.file.name} tải lên thành công`);
            } else if (status === "error") {
                message.error(`${info.file.name} tải lên thất bại`);
            }
        },
    };

    return (
        <section className=" min-h-screen py-20 px-4 bg-gradient-to-br from-white via-neutral-100 to-white dark:from-[#0e0c15] dark:via-[#0e0c15] dark:to-[#0e0c15] transition-colors duration-300">
            <div className="max-w-4xl mx-auto bg-white dark:bg-[#1b1b1b] rounded-3xl shadow-2xl p-10 relative z-10">
                <h1 className="text-4xl font-bold text-center text-neutral-900 dark:text-white mb-10">
                    Phân tích hồ sơ ứng tuyển
                </h1>

                {/* Buttons */}
                <div className="flex justify-center gap-4 mb-8">
                    <button
                        onClick={() => setUploadType("cv")}
                        className={`px-6 py-2 rounded-full font-medium border-2 transition-all duration-300 ${
                            uploadType === "cv"
                                ? "bg-green-500 text-white border-green-500 shadow-lg"
                                : "bg-transparent dark:bg-[#2a2a2a] text-neutral-700 dark:text-white border-neutral-300 dark:border-[#444] hover:bg-neutral-100 dark:hover:bg-[#333]"
                        }`}
                    >
                        📄 Tải lên CV
                    </button>
                    <button
                        onClick={() => setUploadType("jd")}
                        className={`px-6 py-2 rounded-full font-medium border-2 transition-all duration-300 ${
                            uploadType === "jd"
                                ? "bg-blue-500 text-white border-blue-500 shadow-lg"
                                : "bg-transparent dark:bg-[#2a2a2a] text-neutral-700 dark:text-white border-neutral-300 dark:border-[#444] hover:bg-neutral-100 dark:hover:bg-[#333]"
                        }`}
                    >
                        🧾 Tải lên JD
                    </button>
                </div>

                {/* Upload area */}
                <div className="bg-neutral-50 dark:bg-[#252525] border border-dashed border-neutral-300 dark:border-neutral-600 rounded-xl px-6 py-10 text-center shadow-inner transition-all duration-300">
                    <h3 className="text-xl font-semibold mb-4 text-neutral-800 dark:text-white">
                        {uploadType === "cv"
                            ? "Chọn tệp CV để phân tích"
                            : "Chọn JD để phân tích"}
                    </h3>
                    <Dragger
                        {...props}
                        className="!bg-transparent !border-none dark:!text-white"
                    >
                        <InboxOutlined
                            style={{ fontSize: "48px", color: "#888" }}
                        />
                        <p className="mt-4 text-lg font-medium text-neutral-700 dark:text-white">
                            Kéo & thả tệp vào đây hoặc nhấn để chọn
                        </p>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400">
                            Định dạng: .pdf, .doc, .docx
                        </p>
                    </Dragger>
                </div>
            </div>
        </section>
    );
};

export default UploadCVPage;
