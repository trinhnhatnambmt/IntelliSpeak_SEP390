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
    { text: "Đổi mới", imgPath: "/images/ideas.svg" },
    { text: "Phân Tích", imgPath: "/images/concepts.svg" },
    { text: "Góp ý", imgPath: "/images/designs.svg" },
    { text: "Cải thiện", imgPath: "/images/code.svg" },
    { text: "Đổi mới", imgPath: "/images/ideas.svg" },
    { text: "Phân Tích", imgPath: "/images/concepts.svg" },
    { text: "Góp ý", imgPath: "/images/designs.svg" },
    { text: "Cải thiện", imgPath: "/images/code.svg" },
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
        title: "Phỏng vấn ảo như thật, kết quả chi tiết",
        text: "Trải nghiệm buổi phỏng vấn ảo, lưu lịch sử, nhận đánh giá chi tiết và đề xuất cải thiện kỹ năng.",
        date: "02 / 05 / 2025",
        status: "done",
        imageUrl: roadmap1,
        colorful: true,
    },
    {
        id: "1",
        title: "Phân tích & chỉnh sửa CV bằng AI",
        text: "Tải lên CV của bạn và nhận ngay gợi ý chỉnh sửa từ AI giúp bạn tối ưu nội dung và hình thức.",
        date: "02 / 05 / 2025",
        status: "progress",
        imageUrl: roadmap2,
    },
    {
        id: "2",
        title: "Phân tích JD thông minh",
        text: "Tải lên mô tả công việc (JD) để hệ thống AI phân tích và tạo ra bộ câu hỏi phỏng vấn sát với vị trí bạn đang ứng tuyển.",
        date: "02 / 05 / 2025",
        status: "done",
        imageUrl: roadmap3,
    },
    {
        id: "3",
        title: "Kết nối nhà tuyển dụng & ứng viên",
        text: "Nhà tuyển dụng có thể đăng câu hỏi phỏng vấn và xem thông tin các ứng viên tiềm năng.",
        date: "02 / 05 / 2025",
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

export {
    words,
    heroIcons,
    notificationImages,
    logoIconsList,
    roadmap,
    pricing,
    resumes,
};
