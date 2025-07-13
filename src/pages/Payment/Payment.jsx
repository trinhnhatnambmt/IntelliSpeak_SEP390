import React from "react";
import { useNavigate } from "react-router-dom";

const Payment = () => {
    const navigate = useNavigate();

    const handleConfirmPayment = () => {
        const isSuccess = Math.random() > 0.3;
        if (isSuccess) {
            navigate("/payment-success");
        } else {
            navigate("/payment-failed");
        }
    };

    return (
        <div className="transition-colors duration-300 bg-white dark:bg-[#0e0c15] text-gray-900 dark:text-white min-h-screen pt-10">
            <div className="container mx-auto px-5 max-w-2xl relative z-10">
                <h1 className="text-3xl font-bold mb-6 text-center">
                    Thanh Toán Nâng Cấp
                </h1>

                <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 shadow-md">
                    <p className="text-lg font-medium mb-3">
                        📌 Vui lòng chuyển khoản theo thông tin sau:
                    </p>

                    <ul className="text-base space-y-2 mb-6">
                        <li>
                            <strong>Ngân hàng:</strong> Vietcombank
                        </li>
                        <li>
                            <strong>Số tài khoản:</strong> 0123456789
                        </li>
                        <li>
                            <strong>Chủ tài khoản:</strong> Trịnh Nhật Huy
                        </li>
                        <li>
                            <strong>Số tiền:</strong> 99.000 VND
                        </li>
                        <li>
                            <strong>Nội dung chuyển khoản:</strong> VSIPP [Email
                            đăng ký]
                        </li>
                    </ul>

                    <div className="mb-6 text-center">
                        <p className="mb-2">
                            📷 Quét mã QR dưới đây để chuyển khoản nhanh:
                        </p>
                        <img
                            src="https://img.vietqr.io/image/VCB-0123456789-compact.png" // thay link QR thật vào đây
                            alt="QR Code"
                            className="mx-auto rounded-lg w-64 h-64 object-contain"
                        />
                    </div>

                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                        🔔 <strong>Lưu ý:</strong> Sau khi chuyển khoản, hệ
                        thống sẽ kiểm tra trong vòng 1–2 phút. Nếu thành công,
                        bạn sẽ được nâng cấp tự động. Nếu có vấn đề, vui lòng
                        liên hệ hỗ trợ.
                    </div>

                    <button
                        onClick={handleConfirmPayment}
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-md transition-colors"
                    >
                        ✅ Tôi đã chuyển khoản
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Payment;
