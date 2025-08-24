import React from "react";
import { CheckCircle } from "lucide-react"; // Bạn có thể dùng bất kỳ icon library nào khác
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserProfileAPI } from "~/redux/user/userSlice";

const PaymentSuccess = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handBackToHome = () => {
        dispatch(getUserProfileAPI());
        navigate("/main");
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-[#0e0c15] text-gray-800 dark:text-white px-4">
            <CheckCircle className="text-green-500 w-20 h-20 mb-4" />
            <h1 className="text-3xl font-bold mb-2">Thanh toán thành công!</h1>
            <p className="text-lg text-center mb-6">
                Cảm ơn bạn đã nâng cấp tài khoản. Quyền lợi của bạn sẽ được kích
                hoạt ngay lập tức.
            </p>
            <button
                onClick={handBackToHome}
                className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md"
            >
                Về trang chủ
            </button>
        </div>
    );
};

export default PaymentSuccess;
