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
    const response = await authorizedAxiosInstance.get(
        `${API_ROOT}/auth/profile`
    );
    return response.data;
};

export const getAllForumTopicsAPI = async () => {
  const res = await authorizedAxiosInstance.get(`${API_ROOT}/topic-type`);
  return res.data; 
};

export const postForumAPI = async ({ title, content, images, forumTopicTypeId, tags }) => {
    try {
        const response = await authorizedAxiosInstance.post(`${API_ROOT}/forum-post`, {
            title,
            content,
            images, 
            forumTopicTypeId,
        });
        toast.success("Đăng bài viết thành công!");
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const uploadImageAPI = async (filesOrBase64Array) => {
    if (!filesOrBase64Array || filesOrBase64Array.length === 0) return [];

    const formData = new FormData();

    filesOrBase64Array.forEach((item, index) => {
        if (item instanceof File) {
            formData.append("images", item);
        } else if (typeof item === "string" && item.startsWith("data:image")) {
            const base64Data = item.split(",")[1];
            const contentType = item.substring(
                item.indexOf(":"),
                item.indexOf(";")
            ).replace(":", "");

            const byteCharacters = atob(base64Data);
            const byteArrays = [];

            for (let offset = 0; offset < byteCharacters.length; offset += 512) {
                const slice = byteCharacters.slice(offset, offset + 512);

                const byteNumbers = new Array(slice.length);
                for (let i = 0; i < slice.length; i++) {
                    byteNumbers[i] = slice.charCodeAt(i);
                }

                const byteArray = new Uint8Array(byteNumbers);
                byteArrays.push(byteArray);
            }

            const blob = new Blob(byteArrays, { type: contentType });
            const filename = `image_${Date.now()}_${index}`;
            formData.append("images", blob, filename);
        }
    });

    const res = await authorizedAxiosInstance.post(`${API_ROOT}/image/upload`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return res.data; // => list url
};
