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
        <div className="container mx-auto px-5 mt-20 relative z-10">
            <div className="bg-[#1e1e1e] rounded-2xl p-10 text-white shadow-2xl">
                <h2 className="text-3xl font-extrabold mb-8 text-center">
                    Phân tích hồ sơ ứng tuyển
                </h2>

                <div className="flex justify-center space-x-6 mb-10">
                    <button
                        onClick={() => setUploadType("cv")}
                        className={`px-6 py-3 rounded-full font-semibold transition duration-300 ${
                            uploadType === "cv"
                                ? "bg-white text-black shadow-lg"
                                : "bg-[#333] text-white hover:bg-[#444]"
                        }`}
                    >
                        📄 Tải lên CV
                    </button>
                    <button
                        onClick={() => setUploadType("jd")}
                        className={`px-6 py-3 rounded-full font-semibold transition duration-300 ${
                            uploadType === "jd"
                                ? "bg-white text-black shadow-lg"
                                : "bg-[#333] text-white hover:bg-[#444]"
                        }`}
                    >
                        🧾 Tải lên JD
                    </button>
                </div>

                <div className="max-w-2xl mx-auto">
                    <div className="bg-[#2b2b2b] rounded-xl p-8">
                        <h3 className="text-xl font-semibold mb-4 text-center">
                            {uploadType === "cv"
                                ? "Chọn tệp CV để phân tích"
                                : "Chọn JD để phân tích"}
                        </h3>

                        <Dragger
                            {...props}
                            className="!bg-[#1e1e1e] !border-dashed !border-2 !border-[#444] rounded-xl hover:!border-white transition duration-300"
                        >
                            <p className="ant-upload-drag-icon text-white">
                                <InboxOutlined style={{ fontSize: "48px" }} />
                            </p>
                            <p className="text-white text-lg font-medium">
                                Kéo & thả tệp vào đây hoặc nhấn để chọn
                            </p>
                            <p className="text-sm text-neutral-400">
                                Chấp nhận: .pdf, .doc, .docx
                            </p>
                        </Dragger>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UploadCVPage;
