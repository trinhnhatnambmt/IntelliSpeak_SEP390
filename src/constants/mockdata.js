const mockFeedback = {
    toneAndStyle: {
        score: 80,
        tips: [
            {
                type: "good",
                tip: "Professional tone",
                explanation:
                    "The resume maintains a professional and consistent tone throughout.",
            },
            {
                type: "improve",
                tip: "Avoid jargon",
                explanation:
                    "Replace company-specific jargon with industry-recognized terms.",
            },
        ],
    },
    content: {
        score: 70,
        tips: [
            {
                type: "good",
                tip: "Relevant experience",
                explanation:
                    "You highlighted experience directly related to the job you're applying for.",
            },
            {
                type: "improve",
                tip: "Add more achievements",
                explanation:
                    "Use measurable results to showcase the impact of your past roles.",
            },
        ],
    },
    structure: {
        score: 60,
        tips: [
            {
                type: "improve",
                tip: "Better section headings",
                explanation:
                    "Use clearer section titles to help recruiters find information faster.",
            },
            {
                type: "improve",
                tip: "Consistent layout",
                explanation:
                    "Ensure consistent spacing and alignment between sections.",
            },
        ],
    },
    skills: {
        score: 85,
        tips: [
            {
                type: "good",
                tip: "Strong technical skills",
                explanation:
                    "Your technical skills match the job requirements well.",
            },
            {
                type: "good",
                tip: "Soft skills included",
                explanation:
                    "You mentioned communication and teamwork effectively.",
            },
        ],
    },
    ats: {
        score: 75,
        suggestions: [
            {
                type: "good",
                tip: "Includes relevant keywords from job description.",
            },
            {
                type: "good",
                tip: "Standard formatting ensures ATS readability.",
            },
            {
                type: "improve",
                tip: "Consider adding more industry-specific terminology.",
            },
            {
                type: "improve",
                tip: "Avoid using images or charts that ATS cannot read.",
            },
        ],
    },
};

export default mockFeedback;
