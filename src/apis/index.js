import { toast } from "react-toastify";
import authorizedAxiosInstance from "~/utils/authorizeAxios";
import { API_ROOT } from "~/utils/constant";

// Users
export const registerUserAPI = async (data) => {
    const response = await authorizedAxiosInstance.post(
        `${API_ROOT}/auth/register`,
        data
    );
    toast.success(
        "Đăng ký thành công! Vui lòng check email để kích hoạt tài khoản."
    );
    return response.data;
};

export const getUserProfileAPI = async () => {
    const response = await authorizedAxiosInstance.get(`${API_ROOT}/profile`);
    return response.data;
};
