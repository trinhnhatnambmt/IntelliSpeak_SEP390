import React, { useState, useEffect } from "react";
import { getAllTopic, getAllTag, postQuestion, connectTopicAndTag, getTagsOfTopic } from "~/apis/index";
import { toast } from "react-toastify";

const difficulties = [
    { value: "EASY", label: "Dễ" },
    { value: "MEDIUM", label: "Trung bình" },
    { value: "HARD", label: "Khó" },
];

const initialForm = {
    topic: "",
    tag: "",
    title: "",
    content: "",
    difficulty: "",
    demoAnswer: "",
};

export default function HRCreateQuestionPage() {
    const [form, setForm] = useState(initialForm);
    const [topics, setTopics] = useState([]);
    const [tags, setTags] = useState([]);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        getAllTopic().then((res) => {
            if (Array.isArray(res)) {
                setTopics(res);
            } else if (res.data) {
                setTopics(res.data);
            }
        });
        getAllTag().then((res) => {
            if (Array.isArray(res)) {
                setTags(res);
            } else if (res.data) {
                setTags(res.data);
            }
        });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const topicId = Number(form.topic);
        const tagId = Number(form.tag);

        // Check if tag is already connected to topic
        let isConnected = false;
        try {
            const tagsOfTopic = await getTagsOfTopic(topicId);
            if (Array.isArray(tagsOfTopic)) {
                isConnected = tagsOfTopic.some((t) => Number(t.tagId) === tagId);
            } else if (tagsOfTopic.data) {
                isConnected = tagsOfTopic.data.some((t) => Number(t.tagId) === tagId);
            }
        } catch {
            // If error, assume not connected and try to connect
        }

        if (!isConnected) {
            try {
                await connectTopicAndTag(topicId, tagId);
            } catch (err) {
                console.error("Error connecting topic and tag:", err);
                toast.error("Kết nối chủ đề và tag thất bại!");
                return;
            }
        }

        const payload = {
            title: form.title.trim(),
            content: form.content.trim(),
            difficulty: form.difficulty,
            suitableAnswer1: form.demoAnswer.trim(),
            suitableAnswer2: "",
            tagIds: [tagId],
            tags: [],
            deleted: false,
        };

        // Log dữ liệu trước khi gửi API
        console.log("Payload gửi lên API:", JSON.stringify(payload, null, 2));

        try {
            const res = await postQuestion(payload);
            console.log("API Response:", res);

            toast.success("Tạo câu hỏi thành công!");
            setSuccess(true);
            setTimeout(() => setSuccess(false), 2000);
            setForm(initialForm);
        } catch (err) {
            console.error("Error creating question:", err);
            toast.error("Tạo câu hỏi thất bại!");
        }
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
                            <option key={t.topicId || t.id} value={t.topicId || t.id}>
                                {t.title}
                            </option>
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
                            <option key={t.tagId || t.id} value={t.tagId || t.id}>
                                {t.title}
                            </option>
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
                            <option key={d.value} value={d.value}>
                                {d.label}
                            </option>
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
                    <div className="text-green-600 text-center font-medium mt-2">
                        Tạo câu hỏi thành công!
                    </div>
                )}
            </form>
        </div>
    );
}
