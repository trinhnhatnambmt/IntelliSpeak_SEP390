import { Upload } from "lucide-react";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { formatSize } from "~/lib/utils";
import { singleFileValidator } from "~/utils/validators";

const FileUploader = ({ onFileSelect, file }) => {
    const onDrop = useCallback(
        (acceptedFiles) => {
            const file = acceptedFiles[0] || null;
            onFileSelect?.(file);
        },
        [onFileSelect]
    );

    const maxFileSize = 20 * 1024 * 1024;

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: false,
        onDropRejected: (fileRejections) => {
            fileRejections.forEach(({ file, errors }) => {
                errors.forEach((e) => {
                    toast.error(e.message); // hoặc alert, hoặc hiển thị dưới UI
                });
            });
        },
        accept: { "application/pdf": [".pdf"] },
        maxSize: maxFileSize,
        validator: singleFileValidator,
    });

    // const file = acceptedFiles[0] || null;

    return (
        <div className="w-full border-2  border-gray-300 rounded-2xl px-30 py-15 bg-[#0e0c15] shadow-md hover:shadow-lg transition-all duration-300 relative z-10">
            <div {...getRootProps()} className="cursor-pointer">
                <input {...getInputProps()} />
                {file ? (
                    <div
                        className="flex items-center justify-between bg-gray-100 p-4 rounded-lg"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center gap-4">
                            <img
                                src="/images/pdf.png"
                                alt="pdf"
                                className="w-12 h-12"
                            />
                            <div className="max-w-xs">
                                <p className="text-base font-semibold text-gray-800 truncate">
                                    {file.name}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {formatSize(file.size)}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onFileSelect?.(null);
                            }}
                            className="p-2 hover:bg-red-100 rounded-full transition ml-10 cursor-pointer"
                        >
                            <img
                                src="/icons/cross.svg"
                                alt="remove"
                                className="w-5 h-5"
                            />
                        </button>
                    </div>
                ) : (
                    <div className="text-center space-y-3">
                        <div className="flex justify-center">
                            <Upload className="w-15 h-15 text-gray-400" />
                        </div>
                        <p className="text-lg text-white font-medium">
                            Click để{" "}
                            <span className="text-blue-600 font-bold">
                                tải lên
                            </span>{" "}
                            hoặc kéo thả tệp PDF vào đây
                        </p>
                        <p className="text-sm text-white">
                            Chỉ những file PDF (giới hạn{" "}
                            {formatSize(maxFileSize)})
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FileUploader;
