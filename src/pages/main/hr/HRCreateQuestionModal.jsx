import React, { useState } from "react";
import CustomModal from "../../../components/CustomModal";
import { importQuestionsFromCsv } from "~/apis/index";
import { toast } from "react-toastify";

const initialForm = {
    topic: "",
    tag: "",
    title: "",
    interviewSessionId: "",
    content: "",
    difficulty: "",
    demoAnswer: "",
    demoAnswer2: "",
};

export default function HRCreateQuestionModal({
    open,
    onClose,
    onSubmit,
    topics = [],
    tags = [],
    difficulties = [],
    mySessions = [],
    loading = false,
    onTopicChange,
    selectedTopic = "",
}) {
    const [form, setForm] = useState(initialForm);
    const [success, setSuccess] = useState(false);
    const [mode, setMode] = useState("manual"); // "manual" or "csv"
    const [csvFile, setCsvFile] = useState(null);
    const [csvLoading, setCsvLoading] = useState(false);

    // Call onTopicChange when modal opens and topic is already selected
    React.useEffect(() => {
        if (open && form.topic && onTopicChange) {
            onTopicChange(form.topic);
        }
        // eslint-disable-next-line
    }, [open]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "topic") {
            setForm((prev) => ({ ...prev, topic: value, tag: "" }));
            if (onTopicChange) onTopicChange(value);
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
    };
    // console.log(form);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (mode === "manual") {
            if (onSubmit) {
                await onSubmit(form, { setSuccess, setForm });
            }
        } else if (mode === "csv") {
            if (!csvFile) {
                toast.error("Please select a CSV file to import.");
                return;
            }
            if (!form.tag) {
                toast.error("Please select a tag before importing.");
                return;
            }
            setCsvLoading(true);
            try {
                await importQuestionsFromCsv(
                    form.tag,
                    csvFile,
                    form.interviewSessionId
                );
                toast.success("Questions imported successfully!");
                setSuccess(true);
                setCsvFile(null);
                if (onClose) onClose();
            } catch (err) {
                toast.error(
                    err?.response?.data?.message ||
                        "Failed to import questions from CSV."
                );
            } finally {
                setCsvLoading(false);
            }
        }
    };

    // Detect dark mode
    const isDark =
        typeof document !== "undefined" &&
        document.documentElement.classList.contains("dark");

    // Only show mode selection after topic and tag are selected
    const canChooseMode = form.topic && form.tag;

    return (
        <CustomModal
            open={open}
            onClose={onClose}
            title={
                <span className="text-xl font-bold text-gray-800 dark:text-white">
                    Create New Question
                </span>
            }
            backgroundColor={isDark ? "#111112" : "#fff"}
            className="hr-create-question-modal"
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 font-medium">
                        Topic <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="topic"
                        value={form.topic}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md dark:bg-neutral-800 dark:text-white"
                        required
                        disabled={loading}
                    >
                        <option value="">Select topic</option>
                        {topics.map((t) => (
                            <option
                                key={t.topicId || t.id}
                                value={t.topicId || t.id}
                            >
                                {t.title}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block mb-1 font-medium">
                        Tag <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="tag"
                        value={form.tag}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md dark:bg-neutral-800 dark:text-white"
                        required
                        disabled={loading}
                    >
                        <option value="">Select tag</option>
                        {tags.map((t) => (
                            <option
                                key={t.tagId || t.id}
                                value={t.tagId || t.id}
                            >
                                {t.title}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block mb-1 font-medium">
                        Interview Session{" "}
                        <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="interviewSessionId"
                        value={form.interviewSessionId}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md dark:bg-neutral-800 dark:text-white"
                        required
                        disabled={loading}
                    >
                        <option value="">Select interview session</option>
                        {mySessions.map((session) => (
                            <option
                                key={session.interviewSessionId}
                                value={session.interviewSessionId}
                            >
                                {session.title}
                            </option>
                        ))}
                    </select>
                </div>
                {canChooseMode && (
                    <div className="flex border-b border-gray-200 dark:border-neutral-700 mb-4">
                        <button
                            type="button"
                            className={`px-6 py-2 -mb-px font-semibold border-b-2 transition focus:outline-none ${
                                mode === "manual"
                                    ? "border-blue-500 text-blue-600 dark:text-blue-400"
                                    : "border-transparent text-gray-500 dark:text-gray-300 hover:text-blue-500"
                            }`}
                            onClick={() => setMode("manual")}
                            disabled={loading}
                        >
                            Manual Entry
                        </button>
                        <button
                            type="button"
                            className={`px-6 py-2 -mb-px font-semibold border-b-2 transition focus:outline-none ${
                                mode === "csv"
                                    ? "border-blue-500 text-blue-600 dark:text-blue-400"
                                    : "border-transparent text-gray-500 dark:text-gray-300 hover:text-blue-500"
                            }`}
                            onClick={() => setMode("csv")}
                            disabled={loading}
                        >
                            Import CSV File
                        </button>
                    </div>
                )}
                {/* Manual entry form */}
                {(!canChooseMode || mode === "manual") && (
                    <>
                        <div>
                            <label className="block mb-1 font-medium">
                                Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-md dark:bg-neutral-800 dark:text-white"
                                required
                                disabled={loading}
                                placeholder="Enter question title"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">
                                Question Content{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                name="content"
                                value={form.content}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-md dark:bg-neutral-800 dark:text-white"
                                rows={4}
                                required
                                disabled={loading}
                                placeholder="Enter detailed question content"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">
                                Difficulty{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="difficulty"
                                value={form.difficulty}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-md dark:bg-neutral-800 dark:text-white"
                                required
                                disabled={loading}
                            >
                                <option value="">Select difficulty</option>
                                {difficulties.map((d) => (
                                    <option key={d.value} value={d.value}>
                                        {d.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">
                                Sample Answer 1{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                name="demoAnswer"
                                value={form.demoAnswer}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-md dark:bg-neutral-800 dark:text-white"
                                rows={3}
                                required
                                disabled={loading}
                                placeholder="Enter sample answer 1 for the question"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">
                                Sample Answer 2
                            </label>
                            <textarea
                                name="demoAnswer2"
                                value={form.demoAnswer2}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-md dark:bg-neutral-800 dark:text-white"
                                rows={3}
                                disabled={loading}
                                placeholder="Enter sample answer 2"
                            />
                        </div>
                    </>
                )}
                {/* CSV import form */}
                {canChooseMode && mode === "csv" && (
                    <div className="flex flex-col gap-4 border rounded-md p-4 bg-gray-50 dark:bg-neutral-800">
                        {/* Download sample button */}
                        <div className="flex flex-col gap-1 mb-2">
                            <a
                                href="https://res.cloudinary.com/dp39dkdz9/raw/upload/v1756059011/Sample_Upload_Question_je37qi.csv"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-semibold text-center w-fit"
                            >
                                Download Sample CSV File
                            </a>
                            <div className="text-xs text-gray-500 dark:text-gray-300 mt-1">
                                Use this file as a template for your import.
                            </div>
                        </div>
                        {/* Upload section */}
                        <div className="flex flex-col gap-2">
                            <label className="font-medium mb-1">
                                Upload CSV file with questions
                            </label>
                            <input
                                type="file"
                                accept=".csv"
                                onChange={(e) => setCsvFile(e.target.files[0])}
                                disabled={loading || csvLoading}
                            />
                            {csvFile && (
                                <span className="text-sm text-green-600">
                                    Selected: {csvFile.name}
                                </span>
                            )}
                            <div className="text-xs text-gray-500 dark:text-gray-300 mt-1">
                                The CSV file must have columns:{" "}
                                <b>
                                    title, content, difficulty, sampleAnswer1,
                                    sampleAnswer2
                                </b>
                            </div>
                        </div>
                    </div>
                )}
                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 py-2 px-4 bg-gray-200 hover:bg-gray-300 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-black dark:text-white font-semibold rounded-md transition"
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className={`flex-1 py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md transition ${
                            loading || csvLoading
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                        }`}
                        disabled={
                            loading ||
                            csvLoading ||
                            (mode === "csv" && !csvFile)
                        }
                    >
                        {loading || csvLoading
                            ? "Processing..."
                            : mode === "csv"
                            ? "Import CSV"
                            : "Create Question"}
                    </button>
                </div>
                {success && (
                    <div className="text-green-600 text-center font-medium mt-2">
                        Question created successfully!
                    </div>
                )}
            </form>
        </CustomModal>
    );
}
