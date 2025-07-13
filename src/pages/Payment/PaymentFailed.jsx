import React from "react";
import { XCircle } from "lucide-react"; // Hoặc dùng bất kỳ icon nào bạn thích
import { useNavigate } from "react-router-dom";

const PaymentFailed = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-[#0e0c15] text-gray-800 dark:text-white px-4">
            <XCircle className="text-red-500 w-20 h-20 mb-4" />
            <h1 className="text-3xl font-bold mb-2">Thanh toán thất bại!</h1>
            <p className="text-lg text-center mb-6">
                Đã xảy ra lỗi trong quá trình thanh toán. Vui lòng kiểm tra lại
                thông tin hoặc thử lại sau.
            </p>
            <button
                onClick={() => navigate("/main/payment")}
                className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md"
            >
                Thử lại thanh toán
            </button>
        </div>
    );
};

export default PaymentFailed;
``