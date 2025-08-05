import React, { useState } from "react";

const topics = ["Frontend", "Backend", "DevOps", "AI", "Mobile"];
const tags = ["React", "Node.js", "Python", "System Design", "Algorithms"];
const difficulties = ["Easy", "Medium", "Hard"];

export default function HRCreateQuestionPage() {
    const [form, setForm] = useState({
        topic: "",
        tag: "",
        title: "",
        content: "",
        difficulty: "",
        demoAnswer: "",
    });
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Call API to create question
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2000);
        setForm({ topic: "", tag: "", title: "", content: "", difficulty: "", demoAnswer: "" });
    };

    return (
        <div className="max-w-2xl mx-auto p-8 bg-white dark:bg-neutral-900 rounded-xl shadow-md mt-10 z-10 relative">
            <h2 className="text-2xl font-bold mb-6 text-center">Tạo câu hỏi phỏng vấn mới</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block mb-1 font-medium">Chủ đề</label>
                    <select
                        name="topic"
                        value={form.topic}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md dark:bg-neutral-800 dark:text-white"
                        required
                    >
                        <option value="">Chọn chủ đề</option>
                        {topics.map((t) => (
                            <option key={t} value={t}>{t}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block mb-1 font-medium">Tag</label>
                    <select
                        name="tag"
                        value={form.tag}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md dark:bg-neutral-800 dark:text-white"
                        required
                    >
                        <option value="">Chọn tag</option>
                        {tags.map((t) => (
                            <option key={t} value={t}>{t}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block mb-1 font-medium">Tiêu đề</label>
                    <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md dark:bg-neutral-800 dark:text-white"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium">Nội dung câu hỏi</label>
                    <textarea
                        name="content"
                        value={form.content}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md dark:bg-neutral-800 dark:text-white"
                        rows={4}
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium">Độ khó</label>
                    <select
                        name="difficulty"
                        value={form.difficulty}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md dark:bg-neutral-800 dark:text-white"
                        required
                    >
                        <option value="">Chọn độ khó</option>
                        {difficulties.map((d) => (
                            <option key={d} value={d}>{d}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block mb-1 font-medium">Demo đáp án</label>
                    <textarea
                        name="demoAnswer"
                        value={form.demoAnswer}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md dark:bg-neutral-800 dark:text-white"
                        rows={3}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md transition"
                >
                    Tạo câu hỏi
                </button>
                {success && (
                    <div className="text-green-600 text-center font-medium mt-2">Tạo câu hỏi thành công!</div>
                )}
            </form>
        </div>
    );
}
