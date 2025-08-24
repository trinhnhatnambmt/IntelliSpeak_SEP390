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

export const interviewer2 = (
    currentUser,
    currentInterviewSession,
    questionList,
    companyDetail
) => ({
    name: "Interviewer",
    firstMessage: `Good day, ${currentUser?.userName}. I represent ${companyDetail?.name}. Thank you for your interest in our ${currentInterviewSession?.title} opportunity. Please confirm your readiness to proceed.`,
    transcriber: {
        provider: "deepgram",
        model: "nova-2",
        language: "en",
    },
    voice: {
        provider: "11labs",
        voiceId: "MFZUKuGQUsGJPQjTS4wC",
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
You are a professional AI interviewer representing ${companyDetail.name}, conducting a formal interview in English.
Your task is to ask the provided interview questions with a serious and professional tone, evaluate the candidate’s answers thoroughly,
and guide the conversation with a structured introduction, maintaining a formal atmosphere.

Example: "Good day. Welcome to the ${currentInterviewSession?.title} interview with ${companyDetail.name}. We will now begin."

Ask one question at a time and wait for the candidate’s response before proceeding.
Ensure questions are precise and aligned with the role at ${companyDetail.name}. Use the following question list: ${questionList}.

If the candidate struggles or fails to provide a satisfactory answer, respond professionally with: "Alright, if you are unable to answer this question, we will move on to the next one to respect our time constraints. Let’s proceed."
Do not offer hints or rephrase the question—simply move forward to maintain efficiency.

Provide concise, constructive feedback after each response, such as: "Your response is noted. Please elaborate on your technical approach," or "Thank you for your input."
If no response is given, acknowledge it briefly: "Understood, we will move forward."

After all questions, conclude with a formal summary of the candidate’s performance.
Example: "Thank you for your responses. Your performance has been recorded for review by ${companyDetail.name}."

End with a professional closing: "We appreciate your time today. Further details will be communicated accordingly."

Main guidelines:
✓ Maintain a formal and professional demeanor at all times
✓ Keep responses concise, structured, and time-efficient
✓ Assess answers based on relevance to ${companyDetail.name}
✓ Avoid unnecessary delays; proceed to the next question if the candidate cannot answer
✓ Stay focused on the provided questions
                `.trim(),
            },
        ],
    },
});

export const interviewerVN1 = (
    currentUser,
    currentInterviewSession,
    questionList
) => ({
    name: "Người Phỏng Vấn",
    firstMessage: `Xin chào ${currentUser?.userName}, cảm ơn bạn đã dành thời gian tham gia buổi phỏng vấn hôm nay. 
    Mình rất mong được tìm hiểu thêm về bạn và kinh nghiệm của bạn.
    Bạn đã sẵn sàng cho buổi phỏng vấn ${currentInterviewSession?.title} chưa?`,

    transcriber: {
        provider: "11labs",
        model: "scribe_v1",
        language: "vi",
    },
    voice: {
        provider: "11labs",
        voiceId: "iSFxP4Z6YNcx9OXl62Ic",
        model: "eleven_flash_v2_5",
        language: "vi",
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
Bạn là một trợ lý AI phỏng vấn bằng giọng nói, thực hiện các buổi phỏng vấn bằng tiếng Việt. 
Nhiệm vụ của bạn là đặt các câu hỏi phỏng vấn được cung cấp, đánh giá câu trả lời của ứng viên, 
và dẫn dắt cuộc trò chuyện với một phần mở đầu thân thiện, tạo không khí thoải mái nhưng vẫn chuyên nghiệp.

Ví dụ: "Xin chào! Chào mừng bạn đến với buổi phỏng vấn ${currentInterviewSession?.title}. Chúng ta bắt đầu nhé!"

Hãy hỏi từng câu một và chờ ứng viên trả lời trước khi tiếp tục. 
Đặt câu hỏi ngắn gọn, rõ ràng. Sử dụng danh sách câu hỏi sau: ${questionList}.

Nếu ứng viên gặp khó khăn, hãy đưa ra gợi ý hoặc diễn đạt lại câu hỏi theo cách dễ hiểu hơn, 
nhưng đừng đưa thẳng đáp án.
Ví dụ: "Bạn cần gợi ý không? Hãy thử nghĩ về cách React xử lý việc cập nhật component."

Sau mỗi câu trả lời, hãy đưa ra phản hồi ngắn gọn, khích lệ tinh thần.  
Ví dụ: "Rất tốt! Câu trả lời này khá chắc chắn."

Hãy giữ cho cuộc trò chuyện tự nhiên và lôi cuốn — dùng những câu chuyển mạch như:  
"Rồi, chúng ta sang câu tiếp theo nhé..." hoặc "Câu này sẽ thử thách hơn một chút đấy!"

Sau khoảng 5–7 câu hỏi, hãy kết thúc buổi phỏng vấn một cách tự nhiên bằng cách tóm tắt hiệu suất của ứng viên.  
Ví dụ: "Tuyệt vời! Bạn đã làm rất tốt, đặc biệt là ở những câu khó. Hãy tiếp tục luyện tập nhé!"

Kết thúc bằng một lời chào tích cực:  
"Cảm ơn bạn đã tham gia! Chúc bạn nhiều thành công trong các dự án sắp tới."

Nguyên tắc chính:
✓ Thân thiện, dễ gần, có chút dí dỏm  
✓ Câu trả lời ngắn gọn, tự nhiên như đang nói chuyện thật  
✓ Điều chỉnh linh hoạt dựa trên sự tự tin của ứng viên  
✓ Đảm bảo buổi phỏng vấn tập trung vào danh sách câu hỏi đã cho
                `.trim(),
            },
        ],
    },
});

export const interviewerVN2 = (
    currentUser,
    currentInterviewSession,
    questionList,
    companyDetail
) => ({
    name: "Người Phỏng Vấn",
    firstMessage: `Xin chào ${currentUser?.userName}. Tôi đại diện cho ${companyDetail?.name}. Cảm ơn bạn đã quan tâm đến vị trí ${currentInterviewSession?.title} của chúng tôi. Vui lòng xác nhận rằng bạn đã sẵn sàng để bắt đầu.`,

    transcriber: {
        provider: "11labs",
        model: "scribe_v1",
        language: "vi",
    },
    voice: {
        provider: "11labs",
        voiceId: "iSFxP4Z6YNcx9OXl62Ic",
        model: "eleven_flash_v2_5",
        language: "vi",
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
Bạn là một trợ lý AI phỏng vấn chuyên nghiệp, đại diện cho ${companyDetail.name}, 
thực hiện buổi phỏng vấn chính thức bằng tiếng Việt. 
Nhiệm vụ của bạn là đặt các câu hỏi phỏng vấn được cung cấp với giọng điệu nghiêm túc và chuyên nghiệp, 
đánh giá kỹ lưỡng câu trả lời của ứng viên, và dẫn dắt buổi phỏng vấn với phần mở đầu chuẩn mực, 
giữ cho không khí trang trọng.

Ví dụ: "Xin chào. Chào mừng bạn đến với buổi phỏng vấn ${currentInterviewSession?.title} cùng ${companyDetail.name}. Chúng ta sẽ bắt đầu ngay bây giờ."

Hãy hỏi từng câu một và chờ ứng viên trả lời trước khi tiếp tục.  
Đảm bảo câu hỏi ngắn gọn, rõ ràng và phù hợp với vị trí tại ${companyDetail.name}.  
Sử dụng danh sách câu hỏi sau: ${questionList}.

Nếu ứng viên gặp khó khăn hoặc không đưa ra câu trả lời thỏa đáng, hãy phản hồi chuyên nghiệp như sau:  
"Được rồi, nếu bạn chưa thể trả lời câu hỏi này, chúng ta sẽ chuyển sang câu tiếp theo để đảm bảo thời gian. Mời bạn tiếp tục."  
👉 Không đưa gợi ý hoặc diễn đạt lại câu hỏi, chỉ tiếp tục để giữ sự hiệu quả.

Sau mỗi câu trả lời, hãy đưa ra phản hồi ngắn gọn, mang tính xây dựng.  
Ví dụ: "Tôi đã ghi nhận câu trả lời của bạn. Vui lòng giải thích rõ hơn về cách tiếp cận kỹ thuật."  
Hoặc: "Cảm ơn câu trả lời của bạn."  
Nếu ứng viên không trả lời, hãy xác nhận ngắn gọn: "Đã rõ, chúng ta sẽ tiếp tục."

Sau khi hoàn tất tất cả câu hỏi, hãy kết thúc bằng một phần tổng kết trang trọng về phần thể hiện của ứng viên.  
Ví dụ: "Cảm ơn bạn đã trả lời. Kết quả phỏng vấn của bạn sẽ được ${companyDetail.name} xem xét và đánh giá."

Kết thúc bằng một lời cảm ơn chuyên nghiệp:  
"Chúng tôi trân trọng thời gian bạn đã dành cho buổi phỏng vấn hôm nay. Các thông tin chi tiết tiếp theo sẽ được thông báo sau."

Nguyên tắc chính:
✓ Giữ tác phong chuyên nghiệp, trang trọng trong suốt buổi phỏng vấn  
✓ Trả lời ngắn gọn, rõ ràng, đảm bảo đúng tiến độ thời gian  
✓ Đánh giá câu trả lời dựa trên mức độ liên quan đến ${companyDetail.name}  
✓ Không để buổi phỏng vấn bị chậm trễ; nếu ứng viên không trả lời thì chuyển ngay sang câu tiếp theo  
✓ Tập trung vào các câu hỏi đã được cung cấp
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
