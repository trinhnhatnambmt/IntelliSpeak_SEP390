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

const heroIcons = [homeSmile, file02, searchMd, plusSquare];
const notificationImages = [notification4, notification3, notification2];

export { words, heroIcons, notificationImages, logoIconsList, roadmap };
