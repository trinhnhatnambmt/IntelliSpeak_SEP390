import React, { useState, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import ReactDOM from "react-dom";
import { getHrApplicationStatusAPI, updateQuestionAPI, deleteQuestionAPI } from "~/apis";

export default function HRQuestionManagementTab({
    myQuestions,
    searchTerm,
    setSearchTerm,
    selectedTagFilter,
    setSelectedTagFilter,
    selectedDifficulty,
    setSelectedDifficulty,
    tagsInMyQuestions,
    setShowCreateQuestionModal,
    fetchMyQuestions,
}) {
    const [showEditModal, setShowEditModal] = useState({ open: false, question: null });
    const [showEditConfirmModal, setShowEditConfirmModal] = useState({ open: false, question: null });
    const [showDeleteModal, setShowDeleteModal] = useState({ open: false, question: null });
    const [companyName, setCompanyName] = useState("");
    const [formValues, setFormValues] = useState({});
    const [isFormChanged, setIsFormChanged] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const isDark = document.documentElement.classList.contains("dark");

    // Fetch HR application status to get company name
    useEffect(() => {
        const fetchCompanyName = async () => {
            const response = await getHrApplicationStatusAPI();
            setCompanyName(response.data.company || "");
        };
        fetchCompanyName();
    }, []);

    // Initialize form values when edit modal opens
    useEffect(() => {
        if (showEditModal.open && showEditModal.question) {
            setFormValues({
                title: showEditModal.question.title || "",
                content: showEditModal.question.content || "",
                difficulty: showEditModal.question.difficulty || "EASY",
                suitableAnswer1: showEditModal.question.suitableAnswer1 || "",
                suitableAnswer2: showEditModal.question.suitableAnswer2 || "",
                source: showEditModal.question.source || companyName || "",
            });
            setIsFormChanged(false);
        }
    }, [showEditModal, companyName]);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Check if form values differ from original question
        const original = showEditModal.question;
        const isChanged =
            formValues.title !== (original.title || "") ||
            formValues.content !== (original.content || "") ||
            formValues.difficulty !== (original.difficulty || "EASY") ||
            formValues.suitableAnswer1 !== (original.suitableAnswer1 || "") ||
            formValues.suitableAnswer2 !== (original.suitableAnswer2 || "") ||
            formValues.source !== (original.source || companyName || "");
        setIsFormChanged(isChanged);
    };

    // Handle form submission for edit modal
    const handleEditSubmit = (e) => {
        e.preventDefault();
        setShowEditConfirmModal({ open: true, question: showEditModal.question });
    };

    // Handle confirm edit
    const handleConfirmEdit = async () => {
        await updateQuestionAPI(showEditConfirmModal.question.questionId, formValues);
        setShowEditConfirmModal({ open: false, question: null });
        setShowEditModal({ open: false, question: null });
        await fetchMyQuestions();
    };

    // Handle confirm delete
    const handleConfirmDelete = async () => {
        await deleteQuestionAPI(showDeleteModal.question.questionId);
        setShowDeleteModal({ open: false, question: null });
        await fetchMyQuestions();
        // Reset to first page if current page is empty after deletion
        if (filteredQuestions.length <= (currentPage - 1) * itemsPerPage) {
            setCurrentPage(1);
        }
    };

    const filteredQuestions = myQuestions.filter((question) => {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch =
            question.title.toLowerCase().includes(searchLower) ||
            question.content.toLowerCase().includes(searchLower) ||
            question.tags.some((tag) =>
                tag.title.toLowerCase().includes(searchLower)
            ) ||
            question.difficulty.toLowerCase().includes(searchLower) ||
            (question.interviewSessionName || "").toLowerCase().includes(searchLower);
        const matchesTag =
            !selectedTagFilter ||
            question.tags.some(
                (tag) => String(tag.tagId) === String(selectedTagFilter)
            );
        const matchesDifficulty =
            !selectedDifficulty || question.difficulty === selectedDifficulty;
        return matchesSearch && matchesTag && matchesDifficulty;
    });

    // Pagination logic
    const totalPages = Math.ceil(filteredQuestions.length / itemsPerPage);
    const paginatedQuestions = filteredQuestions.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Handle page change
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // Generate page numbers for display
    const getPageNumbers = () => {
        const maxPagesToShow = 5;
        const pages = [];
        let startPage, endPage;

        if (totalPages <= maxPagesToShow) {
            startPage = 1;
            endPage = totalPages;
        } else {
            const halfPagesToShow = Math.floor(maxPagesToShow / 2);
            startPage = Math.max(1, currentPage - halfPagesToShow);
            endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
            if (endPage - startPage + 1 < maxPagesToShow) {
                startPage = Math.max(1, endPage - maxPagesToShow + 1);
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        if (startPage > 1) {
            pages.unshift("...");
            pages.unshift(1);
        }
        if (endPage < totalPages) {
            pages.push("...");
            pages.push(totalPages);
        }

        return pages;
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-4">
                <h3 className="text-xl font-semibold">Company's Questions</h3>
                <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto items-center">
                    <input
                        type="text"
                        placeholder="Search questions or session name..."
                        className="px-3 py-1 border rounded-md dark:bg-neutral-800 dark:border-neutral-700 flex-grow"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                    />
                    <select
                        className="px-3 py-1 border rounded-md dark:bg-neutral-800 dark:border-neutral-700 text-sm"
                        value={selectedTagFilter}
                        onChange={(e) => {
                            setSelectedTagFilter(e.target.value);
                            setCurrentPage(1);
                        }}
                    >
                        <option value="">All Tags</option>
                        {tagsInMyQuestions.map((tag) => (
                            <option key={tag.tagId || tag.id} value={tag.tagId || tag.id}>
                                {tag.title}
                            </option>
                        ))}
                    </select>
                    <select
                        className="px-3 py-1 border rounded-md dark:bg-neutral-800 dark:border-neutral-700 text-sm"
                        value={selectedDifficulty}
                        onChange={(e) => {
                            setSelectedDifficulty(e.target.value);
                            setCurrentPage(1);
                        }}
                    >
                        <option value="">All Difficulties</option>
                        <option value="EASY">Easy</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="HARD">Hard</option>
                    </select>
                    <button
                        onClick={() => setShowCreateQuestionModal(true)}
                        className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600"
                    >
                        Add New
                    </button>
                </div>
            </div>
            {filteredQuestions.length === 0 ? (
                <div className="text-center py-10">
                    {searchTerm || selectedTagFilter || selectedDifficulty ? (
                        <>
                            <p className="text-gray-500 dark:text-gray-400">No matching questions found</p>
                            <button
                                onClick={() => {
                                    setSearchTerm("");
                                    setSelectedTagFilter("");
                                    setSelectedDifficulty("");
                                    setCurrentPage(1);
                                }}
                                className="mt-4 px-4 py-2 bg-gray-100 dark:bg-neutral-700 rounded-md hover:bg-gray-200 dark:hover:bg-neutral-600"
                            >
                                Clear Filter
                            </button>
                        </>
                    ) : (
                        <>
                            <p className="text-gray-500 dark:text-gray-400">You have not created any questions yet</p>
                            <button
                                onClick={() => setShowCreateQuestionModal(true)}
                                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                                Create your first question
                            </button>
                        </>
                    )}
                </div>
            ) : (
                <>
                    <div className="space-y-4">
                        {paginatedQuestions.map((question) => (
                            <div
                                key={question.questionId}
                                className="p-4 border rounded-lg dark:border-neutral-700 hover:shadow-md transition-shadow relative"
                            >
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <h4 className="font-medium text-lg">{question.title}</h4>
                                        <p className="text-gray-600 dark:text-gray-300 mt-1 whitespace-pre-line">
                                            {question.content}
                                        </p>
                                        <div className="flex flex-wrap items-center gap-3 mt-3">
                                            <span
                                                className={`px-2 py-1 text-xs rounded-full ${question.difficulty === "EASY"
                                                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                                    : question.difficulty === "MEDIUM"
                                                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                                        : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                                    }`}
                                            >
                                                {question.difficulty.charAt(0) + question.difficulty.slice(1).toLowerCase()}
                                            </span>
                                            {question.tags.length > 0 && (
                                                <div className="flex flex-wrap gap-2">
                                                    {question.tags.map((tag) => (
                                                        <span
                                                            key={tag.tagId}
                                                            className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs rounded-full"
                                                        >
                                                            {tag.title}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                            <span
                                                className="px-2 py-1 bg-gray-100 text-gray-600 dark:bg-neutral-800 dark:text-gray-300 text-xs rounded-full"
                                                aria-label={`Interview Session: ${question.interviewSessionName || "Not assigned"}`}
                                            >
                                                {question.interviewSessionName
                                                    ? `${question.interviewSessionName} (ID: ${question.interviewSessionId})`
                                                    : "Not assigned to a session"}
                                            </span>
                                        </div>
                                    </div>
                                    <Menu as="div" className="relative">
                                        <Menu.Button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-700">
                                            <span className="text-gray-500 dark:text-gray-400 text-lg font-medium">⋮</span>
                                        </Menu.Button>
                                        <Transition
                                            as={React.Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className="absolute right-0 mt-2 w-32 origin-top-right bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-md shadow-lg z-10">
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <button
                                                            className={`w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 ${active ? "bg-gray-100 dark:bg-neutral-700" : ""
                                                                }`}
                                                            onClick={() => setShowEditModal({ open: true, question })}
                                                        >
                                                            Edit
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <button
                                                            className={`w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 ${active ? "bg-gray-100 dark:bg-neutral-700" : ""
                                                                }`}
                                                            onClick={() => setShowDeleteModal({ open: true, question })}
                                                        >
                                                            Delete
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </div>
                                {(question.suitableAnswer1 || question.suitableAnswer2) && (
                                    <div className="mt-3 p-3 bg-gray-50 dark:bg-neutral-800 rounded">
                                        <p className="font-medium">Sample Answer 1:</p>
                                        <p className="mt-1 whitespace-pre-line">{question.suitableAnswer1}</p>
                                        {question.suitableAnswer2 && (
                                            <>
                                                <p className="font-medium mt-3">Sample Answer 2:</p>
                                                <p className="mt-1 whitespace-pre-line">{question.suitableAnswer2}</p>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center mt-6 gap-2">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${currentPage === 1
                                    ? "bg-gray-200 text-gray-400 dark:bg-neutral-700 dark:text-neutral-400 cursor-not-allowed"
                                    : "bg-blue-500 text-white hover:bg-blue-600 dark:hover:bg-blue-700"
                                    }`}
                                aria-label="Previous page"
                            >
                                ← Previous
                            </button>
                            <div className="flex gap-1">
                                {getPageNumbers().map((page, index) => (
                                    <button
                                        key={index}
                                        onClick={() => typeof page === "number" && handlePageChange(page)}
                                        className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${page === currentPage
                                            ? "bg-blue-500 text-white dark:bg-blue-600"
                                            : typeof page === "number"
                                                ? "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-neutral-800 dark:text-gray-200 dark:hover:bg-neutral-700"
                                                : "text-gray-500 dark:text-gray-400 cursor-default"
                                            }`}
                                        disabled={typeof page !== "number"}
                                        aria-label={typeof page === "number" ? `Page ${page}` : undefined}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${currentPage === totalPages
                                    ? "bg-gray-200 text-gray-400 dark:bg-neutral-700 dark:text-neutral-400 cursor-not-allowed"
                                    : "bg-blue-500 text-white hover:bg-blue-600 dark:hover:bg-blue-700"
                                    }`}
                                aria-label="Next page"
                            >
                                Next →
                            </button>
                        </div>
                    )}
                </>
            )}
            {showEditModal.open && showEditModal.question && (
                <CustomModal
                    open={showEditModal.open}
                    onClose={() => setShowEditModal({ open: false, question: null })}
                    title={
                        <span className="text-xl font-bold text-gray-800 dark:text-white">
                            Edit Question
                        </span>
                    }
                    backgroundColor={isDark ? "#111112" : "#fff"}
                    className="dark:bg-neutral-900"
                    showClose={true}
                >
                    <form className="space-y-4" onSubmit={handleEditSubmit}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formValues.title || ""}
                                onChange={handleInputChange}
                                className="mt-1 w-full px-3 py-2 border rounded-md dark:bg-neutral-800 dark:border-neutral-700"
                                placeholder="Enter question title"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Content</label>
                            <textarea
                                name="content"
                                value={formValues.content || ""}
                                onChange={handleInputChange}
                                className="mt-1 w-full px-3 py-2 border rounded-md dark:bg-neutral-800 dark:border-neutral-700"
                                rows="4"
                                placeholder="Enter question content"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Difficulty</label>
                            <select
                                name="difficulty"
                                value={formValues.difficulty || "EASY"}
                                onChange={handleInputChange}
                                className="mt-1 w-full px-3 py-2 border rounded-md dark:bg-neutral-800 dark:border-neutral-700"
                            >
                                <option value="EASY">Easy</option>
                                <option value="MEDIUM">Medium</option>
                                <option value="HARD">Hard</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Sample Answer 1</label>
                            <textarea
                                name="suitableAnswer1"
                                value={formValues.suitableAnswer1 || ""}
                                onChange={handleInputChange}
                                className="mt-1 w-full px-3 py-2 border rounded-md dark:bg-neutral-800 dark:border-neutral-700"
                                rows="3"
                                placeholder="Enter sample answer 1"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Sample Answer 2 (Optional)</label>
                            <textarea
                                name="suitableAnswer2"
                                value={formValues.suitableAnswer2 || ""}
                                onChange={handleInputChange}
                                className="mt-1 w-full px-3 py-2 border rounded-md dark:bg-neutral-800 dark:border-neutral-700"
                                rows="3"
                                placeholder="Enter sample answer 2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Source</label>
                            <input
                                type="text"
                                name="source"
                                value={formValues.source || ""}
                                onChange={handleInputChange}
                                className="mt-1 w-full px-3 py-2 border rounded-md dark:bg-neutral-800 dark:border-neutral-700"
                                placeholder="Enter question source"
                            />
                        </div>
                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => setShowEditModal({ open: false, question: null })}
                                className="px-4 py-2 bg-gray-200 dark:bg-neutral-700 rounded-md hover:bg-gray-300 dark:hover:bg-neutral-600"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={!isFormChanged}
                                className={`px-4 py-2 rounded-md ${isFormChanged
                                    ? "bg-blue-500 text-white hover:bg-blue-600"
                                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    }`}
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </CustomModal>
            )}
            {showEditConfirmModal.open && showEditConfirmModal.question && (
                <CustomModal
                    open={showEditConfirmModal.open}
                    onClose={() => setShowEditConfirmModal({ open: false, question: null })}
                    title={
                        <span className="text-xl font-bold text-gray-800 dark:text-white">
                            Confirm Edit
                        </span>
                    }
                    backgroundColor={isDark ? "#111112" : "#fff"}
                    className="dark:bg-neutral-900"
                    showClose={true}
                >
                    <div className="space-y-4">
                        <p className="text-gray-600 dark:text-gray-300">
                            If you edit, this question will be updated in all Interviews containing it, are you sure?
                        </p>
                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => setShowEditConfirmModal({ open: false, question: null })}
                                className="px-4 py-2 bg-gray-200 dark:bg-neutral-700 rounded-md hover:bg-gray-300 dark:hover:bg-neutral-600"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleConfirmEdit}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </CustomModal>
            )}
            {showDeleteModal.open && showDeleteModal.question && (
                <CustomModal
                    open={showDeleteModal.open}
                    onClose={() => setShowDeleteModal({ open: false, question: null })}
                    title={
                        <span className="text-xl font-bold text-gray-800 dark:text-white">
                            Delete Question
                        </span>
                    }
                    backgroundColor={isDark ? "#111112" : "#fff"}
                    className="dark:bg-neutral-900"
                    showClose={true}
                >
                    <div className="space-y-4">
                        <p className="text-gray-600 dark:text-gray-300">
                            If you delete, this question will be removed from all Interviews containing it, are you sure?
                        </p>
                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => setShowDeleteModal({ open: false, question: null })}
                                className="px-4 py-2 bg-gray-200 dark:bg-neutral-700 rounded-md hover:bg-gray-300 dark:hover:bg-neutral-600"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleConfirmDelete}
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </CustomModal>
            )}
        </div>
    );
}

// CustomModal component (unchanged, included for completeness)
function CustomModal({
    open,
    onClose,
    title,
    children,
    backgroundColor = "#fff",
    className = "",
    overlayClass = "",
    centered = true,
    showClose = true,
    style = {},
    bodyStyle = {},
}) {
    if (!open) return null;

    return ReactDOM.createPortal(
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-200 ${overlayClass}`}
            style={{ background: "rgba(0,0,0,0.35)" }}
        >
            <div
                className={`relative shadow-2xl rounded-2xl border border-gray-100 dark:border-neutral-800 ${className}`}
                style={{
                    background: backgroundColor,
                    minWidth: 320,
                    maxWidth: 480,
                    width: "100%",
                    maxHeight: "90vh",
                    display: "flex",
                    flexDirection: "column",
                    padding: 0,
                    ...style,
                }}
            >
                {showClose && (
                    <button
                        className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-white text-2xl z-10"
                        onClick={onClose}
                        aria-label="Close"
                        type="button"
                    >
                        &times;
                    </button>
                )}
                {title && (
                    <div className="px-6 pt-6 pb-2 text-xl font-bold text-gray-800 dark:text-white text-center">
                        {title}
                    </div>
                )}
                <div className="px-6 pb-6 pt-2 flex-1 overflow-y-auto" style={bodyStyle}>
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
}