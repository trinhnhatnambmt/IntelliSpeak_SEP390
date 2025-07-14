import React, { useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const NewPostPage = () => {
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState("");
    const [content, setContent] = useState("");
    const [coverImage, setCoverImage] = useState(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCoverImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handlePublish = () => {
        console.log({ title, tags, content, coverImage });
        alert("haha!");
    };

    return (
        <div className="container mx-auto px-4 py-7">
            <div className="bg-white p-8 rounded-2xl shadow-xl relative z-10">
                <h1 className="text-3xl font-bold mb-8 text-gray-800">
                    ✍️ Tạo bài viết mới
                </h1>

                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                        Ảnh bìa
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
                    />
                    {coverImage && (
                        <img
                            src={coverImage}
                            alt="Preview"
                            className="mt-4 rounded-lg max-h-64 object-cover w-full border border-gray-300"
                        />
                    )}
                </div>

                <input
                    type="text"
                    placeholder="📝 Tiêu đề bài viết..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-4 mb-5 text-xl font-semibold rounded-md border border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
                />

                <input
                    type="text"
                    placeholder="🏷️ Thêm tag, phân cách bằng dấu phẩy..."
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="w-full p-3 mb-6 rounded-md border border-gray-300 bg-white text-gray-700 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />

                <ReactQuill
                    theme="snow"
                    value={content}
                    onChange={setContent}
                    placeholder="✍️ Viết nội dung bài viết ở đây..."
                    className="mb-6 bg-white text-black border-none "
                    modules={{
                        toolbar: [
                            [{ header: [1, 2, 3, false] }],
                            ["bold", "italic", "underline"],
                            ["blockquote", "code-block"],
                            [{ list: "ordered" }, { list: "bullet" }],
                            ["link", "image"],
                            ["clean"],
                        ],
                    }}
                />

                <div className="flex justify-between items-center mt-10">
                    <button
                        onClick={handlePublish}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-all"
                    >
                        🚀 Đăng bài
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewPostPage;
