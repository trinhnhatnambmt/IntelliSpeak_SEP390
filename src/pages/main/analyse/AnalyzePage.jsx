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
            <div className="bg-[#252525] rounded-2xl p-8 text-white shadow-lg">
                <h2 className="text-2xl font-bold mb-6">Phân tích hồ sơ</h2>

                <div className="flex space-x-4 mb-8">
                    <button
                        onClick={() => setUploadType("cv")}
                        className={`px-6 py-2 rounded-xl font-semibold transition ${
                            uploadType === "cv"
                                ? "bg-white text-black"
                                : "bg-[#333] text-white hover:bg-[#444]"
                        }`}
                    >
                        Tải lên CV
                    </button>
                    <button
                        onClick={() => setUploadType("jd")}
                        className={`px-6 py-2 rounded-xl font-semibold transition ${
                            uploadType === "jd"
                                ? "bg-white text-black"
                                : "bg-[#333] text-white hover:bg-[#444]"
                        }`}
                    >
                        Tải lên JD
                    </button>
                </div>

                <div>
                    {uploadType === "cv" ? (
                        <div>
                            <h3 className="text-lg font-semibold mb-3">
                                Chọn tệp CV của bạn
                            </h3>
                            <Dragger {...props}>
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                </p>
                                <p className="text-white">
                                    Kéo thả tệp vào đây hoặc nhấn để chọn
                                </p>
                                <p className="text-sm text-neutral-400">
                                    Chấp nhận: .pdf, .doc, .docx
                                </p>
                            </Dragger>
                        </div>
                    ) : (
                        <div>
                            <h3 className="text-lg font-semibold mb-3">
                                Chọn JD bạn muốn phân tích
                            </h3>
                            <Dragger {...props}>
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                </p>
                                <p className="text-white">
                                    Kéo thả tệp vào đây hoặc nhấn để chọn
                                </p>
                                <p className="text-sm text-neutral-400">
                                    Chấp nhận: .pdf, .doc, .docx
                                </p>
                            </Dragger>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UploadCVPage;
