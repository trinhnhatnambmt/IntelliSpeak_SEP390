import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { interViewSessionQuestionForAiAPI } from "~/redux/interview/interviewSessionSlice";

const TopicDetailCard = ({
    title,
    description,
    difficulty,
    totalQuestion,
    interviewSessionId,
}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const submitInterviewSession = (data) => {
        toast
            .promise(
                dispatch(
                    interViewSessionQuestionForAiAPI({
                        interviewSessionId: interviewSessionId,
                    })
                ),
                {
                    pending: "Đang chờ để chuyển qua phỏng vấn...",
                }
            )
            .then((res) => {
                if (!res.error) {
                    navigate(`/main/interviewPage/${interviewSessionId}`);
                }
            });
    };
    return (
        <div className="w-full rounded-2xl p-[16px] flex  gap-5 bg-[#252525]">
            <img
                src="https://images.unsplash.com/photo-1667372393086-9d4001d51cf1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8amF2YXNjcmlwdHxlbnwwfHwwfHx8MA%3D%3D"
                alt=""
                width={255}
                height={144}
                className="object-cover rounded-2xl"
            />
            <div className="">
                <h3 className="font-extrabold text-2xl">{title}</h3>
                <span className="text-lg text-orange-500 mt-4">
                    Độ khó: {difficulty}
                </span>
                <p className="mt-2">Số lượng câu hỏi: {totalQuestion}</p>

                <p className="mt-2">{description}</p>
                <button
                    onClick={submitInterviewSession}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition duration-300 flex items-center cursor-pointer"
                >
                    Bắt đầu phỏng vấn
                </button>
            </div>
        </div>
    );
};

export default TopicDetailCard;
