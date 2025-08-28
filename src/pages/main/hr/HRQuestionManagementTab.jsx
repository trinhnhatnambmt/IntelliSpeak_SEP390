import React from "react";

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
}) {
    const filteredQuestions = myQuestions.filter(question => {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch =
            question.title.toLowerCase().includes(searchLower) ||
            question.content.toLowerCase().includes(searchLower) ||
            question.tags.some(tag => tag.title.toLowerCase().includes(searchLower)) ||
            question.difficulty.toLowerCase().includes(searchLower);
        const matchesTag = !selectedTagFilter || question.tags.some(tag => String(tag.tagId) === String(selectedTagFilter));
        const matchesDifficulty = !selectedDifficulty || question.difficulty === selectedDifficulty;
        return matchesSearch && matchesTag && matchesDifficulty;
    });

    return (
        <div className="space-y-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-4">
                <h3 className="text-xl font-semibold">My Questions</h3>
                <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto items-center">
                    <input
                        type="text"
                        placeholder="Search questions..."
                        className="px-3 py-1 border rounded-md dark:bg-neutral-800 dark:border-neutral-700 flex-grow"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <select
                        className="px-3 py-1 border rounded-md dark:bg-neutral-800 dark:border-neutral-700 text-sm"
                        value={selectedTagFilter}
                        onChange={e => setSelectedTagFilter(e.target.value)}
                    >
                        <option value="">All Tags</option>
                        {tagsInMyQuestions.map(tag => (
                            <option key={tag.tagId || tag.id} value={tag.tagId || tag.id}>{tag.title}</option>
                        ))}
                    </select>
                    <select
                        className="px-3 py-1 border rounded-md dark:bg-neutral-800 dark:border-neutral-700 text-sm"
                        value={selectedDifficulty}
                        onChange={e => setSelectedDifficulty(e.target.value)}
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
                    {searchTerm ? (
                        <>
                            <p className="text-gray-500 dark:text-gray-400">No matching questions found</p>
                            <button
                                onClick={() => setSearchTerm("")}
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
                <div className="space-y-4">
                    {filteredQuestions.map((question) => (
                        <div
                            key={question.questionId}
                            className="p-4 border rounded-lg dark:border-neutral-700 hover:shadow-md transition-shadow"
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <h4 className="font-medium text-lg">
                                        {question.title}
                                    </h4>
                                    <p className="text-gray-600 dark:text-gray-300 mt-1 whitespace-pre-line">
                                        {question.content}
                                    </p>
                                    <div className="flex flex-wrap items-center gap-3 mt-3">
                                        <span className={`px-2 py-1 text-xs rounded-full ${question.difficulty === 'EASY' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                                            question.difficulty === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                                                'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                            }`}>
                                            {question.difficulty.charAt(0) + question.difficulty.slice(1).toLowerCase()}
                                        </span>
                                        {question.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-2">
                                                {question.tags.map(
                                                    (tag) => (
                                                        <span
                                                            key={
                                                                tag.tagId
                                                            }
                                                            className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs rounded-full"
                                                        >
                                                            {tag.title}
                                                        </span>
                                                    )
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
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
            )}
        </div>
    );
}
