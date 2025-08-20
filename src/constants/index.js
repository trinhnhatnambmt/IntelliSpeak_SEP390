import {
    file02,
    homeSmile,
    notification2,
    notification3,
    notification4,
    plusSquare,
    roadmap1,
    roadmap2,
    roadmap3,
    roadmap4,
    searchMd,
} from "~/assets";

const words = [
    { text: "Innovation", imgPath: "/images/ideas.svg" },
    { text: "Analysis", imgPath: "/images/concepts.svg" },
    { text: "Feedback", imgPath: "/images/designs.svg" },
    { text: "Enhancement", imgPath: "/images/code.svg" },
    { text: "Innovation", imgPath: "/images/ideas.svg" },
    { text: "Analysis", imgPath: "/images/concepts.svg" },
    { text: "Feedback", imgPath: "/images/designs.svg" },
    { text: "Enhancement", imgPath: "/images/code.svg" },
];

const logoIconsList = [
    {
        imgPath: "/images/logos/company-logo-1.png",
    },
    {
        imgPath: "/images/logos/company-logo-2.png",
    },
    {
        imgPath: "/images/logos/company-logo-3.png",
    },
    {
        imgPath: "/images/logos/company-logo-4.png",
    },
    {
        imgPath: "/images/logos/company-logo-5.png",
    },
    {
        imgPath: "/images/logos/company-logo-6.png",
    },
    {
        imgPath: "/images/logos/company-logo-7.png",
    },
    {
        imgPath: "/images/logos/company-logo-8.png",
    },
    {
        imgPath: "/images/logos/company-logo-9.png",
    },
    {
        imgPath: "/images/logos/company-logo-10.png",
    },
    {
        imgPath: "/images/logos/company-logo-11.png",
    },
];
const roadmap = [
    {
        id: "0",
        title: "Realistic Mock Interviews with Detailed Feedback",
        text: "Experience lifelike mock interviews, track your history, and receive in-depth evaluations with personalized improvement tips.",
        date: "05 / 02 / 2025",
        status: "done",
        imageUrl: roadmap1,
        colorful: true,
    },
    {
        id: "1",
        title: "AI-Powered Resume Analysis & Editing",
        text: "Upload your resume and instantly get AI suggestions to optimize both content and presentation.",
        date: "05 / 02 / 2025",
        status: "progress",
        imageUrl: roadmap2,
    },
    {
        id: "2",
        title: "Smart Job Description Analysis",
        text: "Upload a job description and let AI generate tailored interview questions for the exact role you’re applying for.",
        date: "05 / 02 / 2025",
        status: "done",
        imageUrl: roadmap3,
    },
    {
        id: "3",
        title: "Connecting Recruiters & Candidates",
        text: "Recruiters can post interview questions and explore profiles of potential candidates.",
        date: "05 / 02 / 2025",
        status: "progress",
        imageUrl: roadmap4,
        colorful: true,
    },
];

const pricing = [
    {
        id: "0",
        title: "Cơ bản",
        description:
            "Trải nghiệm phỏng vấn ảo miễn phí và cải thiện CV ban đầu",
        price: "0",
        features: [
            "Phỏng vấn ảo mẫu với câu hỏi giới hạn",
            "Phân tích CV cơ bản & góp ý sơ bộ",
            "Tài khoản miễn phí, không cần thẻ thanh toán",
        ],
    },
    {
        id: "1",
        title: "Chuyên nghiệp",
        description:
            "Toàn quyền truy cập AI phỏng vấn và gợi ý cải thiện kỹ năng",
        price: "9.99",
        features: [
            "Phỏng vấn ảo không giới hạn với đánh giá AI chi tiết",
            "Phân tích CV nâng cao với gợi ý cải thiện cụ thể",
            "Lưu lại lịch sử phỏng vấn & so sánh theo thời gian",
            "Ưu tiên hỗ trợ người dùng",
        ],
    },
    {
        id: "2",
        title: "Doanh nghiệp",
        description:
            "Công cụ tuyển dụng dành riêng cho nhà tuyển dụng & tổ chức",
        price: null, // "Liên hệ"
        features: [
            "Tạo & quản lý bộ câu hỏi phỏng vấn riêng",
            "Xem thông tin ứng viên tiềm năng từ hệ thống",
            "Phân tích hiệu quả tuyển dụng qua dashboard",
            "Hỗ trợ triển khai riêng cho doanh nghiệp",
        ],
    },
];

const resumes = [
    {
        id: "1",
        companyName: "Google",
        jobTitle: "Frontend Developer",
        imagePath: "/images/resume_01.png",
        resumePath: "/resumes/resume-1.pdf",
        feedback: {
            overallScore: 85,
            ATS: {
                score: 90,
                tips: [],
            },
            toneAndStyle: {
                score: 90,
                tips: [],
            },
            content: {
                score: 90,
                tips: [],
            },
            structure: {
                score: 90,
                tips: [],
            },
            skills: {
                score: 90,
                tips: [],
            },
        },
    },
    {
        id: "2",
        companyName: "Microsoft",
        jobTitle: "Cloud Engineer",
        imagePath: "/images/resume_02.png",
        resumePath: "/resumes/resume-2.pdf",
        feedback: {
            overallScore: 55,
            ATS: {
                score: 90,
                tips: [],
            },
            toneAndStyle: {
                score: 90,
                tips: [],
            },
            content: {
                score: 90,
                tips: [],
            },
            structure: {
                score: 90,
                tips: [],
            },
            skills: {
                score: 90,
                tips: [],
            },
        },
    },
    {
        id: "3",
        companyName: "Apple",
        jobTitle: "iOS Developer",
        imagePath: "/images/resume_03.png",
        resumePath: "/resumes/resume-3.pdf",
        feedback: {
            overallScore: 75,
            ATS: {
                score: 90,
                tips: [],
            },
            toneAndStyle: {
                score: 90,
                tips: [],
            },
            content: {
                score: 90,
                tips: [],
            },
            structure: {
                score: 90,
                tips: [],
            },
            skills: {
                score: 90,
                tips: [],
            },
        },
    },
    {
        id: "4",
        companyName: "Google",
        jobTitle: "Frontend Developer",
        imagePath: "/images/resume_01.png",
        resumePath: "/resumes/resume-1.pdf",
        feedback: {
            overallScore: 85,
            ATS: {
                score: 90,
                tips: [],
            },
            toneAndStyle: {
                score: 90,
                tips: [],
            },
            content: {
                score: 90,
                tips: [],
            },
            structure: {
                score: 90,
                tips: [],
            },
            skills: {
                score: 90,
                tips: [],
            },
        },
    },
    {
        id: "5",
        companyName: "Microsoft",
        jobTitle: "Cloud Engineer",
        imagePath: "/images/resume_02.png",
        resumePath: "/resumes/resume-2.pdf",
        feedback: {
            overallScore: 55,
            ATS: {
                score: 90,
                tips: [],
            },
            toneAndStyle: {
                score: 90,
                tips: [],
            },
            content: {
                score: 90,
                tips: [],
            },
            structure: {
                score: 90,
                tips: [],
            },
            skills: {
                score: 90,
                tips: [],
            },
        },
    },
    {
        id: "6",
        companyName: "Apple",
        jobTitle: "iOS Developer",
        imagePath: "/images/resume_03.png",
        resumePath: "/resumes/resume-3.pdf",
        feedback: {
            overallScore: 75,
            ATS: {
                score: 90,
                tips: [],
            },
            toneAndStyle: {
                score: 90,
                tips: [],
            },
            content: {
                score: 90,
                tips: [],
            },
            structure: {
                score: 90,
                tips: [],
            },
            skills: {
                score: 90,
                tips: [],
            },
        },
    },
];

const heroIcons = [homeSmile, file02, searchMd, plusSquare];
const notificationImages = [notification4, notification3, notification2];

export const interviewer = (
    currentUser,
    currentInterviewSession,
    questionList
) => ({
    name: "Interviewer",
    firstMessage: `Hello ${currentUser?.userName},Thank you for taking the time to speak with me today. I'm excited to learn more about you and your experience.
    Are you ready for the ${currentInterviewSession?.title}?`,

    transcriber: {
        provider: "deepgram",
        model: "nova-2",
        language: "en",
    },
    // voice: {
    //     provider: "11labs",
    //     voiceId: "iSFxP4Z6YNcx9OXl62Ic",
    //     model: "eleven_flash_v2_5",
    //     language: "vi",
    // },
    voice: {
        provider: "11labs",
        voiceId: "sarah",
        stability: 0.4,
        similarityBoost: 0.8,
        speed: 0.9,
        style: 0.5,
        useSpeakerBoost: true,
    },
    model: {
        provider: "openai",
        model: "gpt-5",
        messages: [
            {
                role: "system",
                content: `
You are a voice-based AI assistant conducting interviews in English.
Your task is to ask the provided interview questions, evaluate the candidate’s answers,
and guide the conversation with a friendly introduction, keeping the atmosphere relaxed yet professional.

Example: "Hello! Welcome to the ${currentInterviewSession?.title} interview. Let’s get started!"

Ask one question at a time and wait for the candidate’s response before continuing.
Make your questions clear and concise. Use the following question list: ${questionList}.

If the candidate seems stuck, provide hints or rephrase the question without giving away the answer.
Example: "Need a hint? Think about how React handles component updates."

After each response, give short, encouraging feedback.
Example: "Great! That was a strong answer."

Keep the conversation natural and engaging—use phrases like "Alright, let’s move to the next one..." or "This one’s a bit more challenging!"

After 5–7 questions, close the interview naturally by summarizing the candidate’s performance.
Example: "Excellent! You did really well, especially on the tougher questions. Keep practicing!"

End with a positive closing remark: "Thank you for joining! I wish you great success in your future projects."

Main guidelines:
✓ Be friendly, approachable, and slightly witty
✓ Keep your responses short and natural, like in a real conversation
✓ Adjust based on the candidate’s confidence level
✓ Ensure the interview stays focused on the provided questions
                `.trim(),
            },
        ],
    },
});

export {
    words,
    heroIcons,
    notificationImages,
    logoIconsList,
    roadmap,
    pricing,
    resumes,
};
