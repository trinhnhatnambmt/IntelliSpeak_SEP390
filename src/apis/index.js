// ==== GET TAGS OF TOPIC ====
export const getTagsOfTopic = async (topicId) => {
    const response = await authorizedAxiosInstance.get(`${API_ROOT}/topic/${topicId}/tags`);
    return response.data;
};
// ==== CONNECT TOPIC AND TAG ====
export const connectTopicAndTag = async (topicId, tagId) => {
    const response = await authorizedAxiosInstance.put(`${API_ROOT}/topic/${topicId}/tags/${tagId}`);
    return response.data;
};
// ==== POST QUESTION ====
export const postQuestion = async (data) => {
    const response = await authorizedAxiosInstance.post(`${API_ROOT}/question`, data);
    return response.data;
};
// ==== GET MY QUESTIONS ====
export const getMyQuestionsAPI = async () => {
    const response = await authorizedAxiosInstance.get(`${API_ROOT}/question/my-questions`);
    return response.data;
};
// ==== TAGS ====
export const getAllTag = async () => {
    const response = await authorizedAxiosInstance.get(`${API_ROOT}/tag`);
    return response.data;
};
// ==== GET ALL COMMENTS FOR A POST ====
export const getForumPostRepliesAPI = async (postId) => {
    const res = await authorizedAxiosInstance.get(
        `${API_ROOT}/forum-post/${postId}/replies`
    );
    return res.data;
};
// ==== UPDATE FORUM POST ====
export const updateForumPostAPI = async (
    postId,
    { title, content, images, forumTopicTypeId }
) => {
    const res = await authorizedAxiosInstance.put(
        `${API_ROOT}/forum-post/${postId}`,
        {
            title,
            content,
            images,
            forumTopicTypeId,
        }
    );
    return res.data;
};
// ==== REPLY / COMMENT ====
export const postReplyAPI = async ({ postId, title, content }) => {
    const res = await authorizedAxiosInstance.post(`${API_ROOT}/reply`, {
        postId,
        title,
        content,
    });
    return res.data;
};
// ==== DELETE IMAGE FROM FORUM POST ====
export const deleteForumPostImageAPI = async (postId, imageId) => {
    const res = await authorizedAxiosInstance.delete(
        `${API_ROOT}/forum-post/posts/${postId}/images/${imageId}`
    );
    return res.data;
};
// ==== DELETE FORUM POST ====
export const deleteForumPostAPI = async (postId) => {
    const res = await authorizedAxiosInstance.delete(
        `${API_ROOT}/forum-post/${postId}`
    );
    return res.data;
};
// ==== MY POSTS ====
export const getMyForumPostsAPI = async () => {
    const res = await authorizedAxiosInstance.get(
        `${API_ROOT}/forum-post/my-posts`
    );
    return res.data;
};
import { toast } from "react-toastify";
import authorizedAxiosInstance from "~/utils/authorizeAxios";
import { API_ROOT } from "~/utils/constant";

// ==== AUTH / USER ====

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

// ==== TOPIC ====

export const getAllForumTopicsAPI = async () => {
    const res = await authorizedAxiosInstance.get(`${API_ROOT}/topic-type`);
    return res.data;
};

// ==== FORUM POST ====

export const postForumAPI = async ({
    title,
    content,
    images,
    forumTopicTypeId,
    tags,
}) => {
    const response = await authorizedAxiosInstance.post(
        `${API_ROOT}/forum-post`,
        {
            title,
            content,
            images,
            forumTopicTypeId,
            tags,
        }
    );
    return response.data;
};

export const getAllForumPostAPI = async () => {
    const res = await authorizedAxiosInstance.get(`${API_ROOT}/forum-post`);
    return res.data;
};

export const getForumPostByIdAPI = async (postId) => {
    const res = await authorizedAxiosInstance.get(
        `${API_ROOT}/forum-post/${postId}`
    );
    return res.data;
};

// ==== LIKE / UNLIKE ====

export const likeOrUnlikePostAPI = async ({ postId, liked }) => {
    try {
        const response = await authorizedAxiosInstance.post(
            `${API_ROOT}/forum-post/${postId}/like?liked=${liked}`
        );
        toast.success(response.data.message);
        return response.data;
    } catch (error) {
        toast.error("Thao tác thất bại");
        console.error("Lỗi like/unlike bài viết:", error);
        throw error;
    }
};

// ==== SAVE / UNSAVE ====

export const savePostAPI = async (postId) => {
    try {
        const response = await authorizedAxiosInstance.post(
            `${API_ROOT}/saved-post/${postId}`
        );
        toast.success(response.data.message || "Đã lưu bài viết");
        return response.data;
    } catch (error) {
        toast.error("Không thể lưu bài viết");
        console.error("Lỗi khi lưu bài viết:", error);
        throw error;
    }
};

export const unsavePostAPI = async (postId) => {
    try {
        const response = await authorizedAxiosInstance.delete(
            `${API_ROOT}/saved-post/${postId}`
        );
        toast.success(response.data.message || "Đã bỏ lưu bài viết");
        return response.data;
    } catch (error) {
        toast.error("Không thể bỏ lưu bài viết");
        console.error("Lỗi khi bỏ lưu bài viết:", error);
        throw error;
    }
};

export const getSavedPostsAPI = async () => {
    try {
        const response = await authorizedAxiosInstance.get(
            `${API_ROOT}/saved-post`
        );
        return response.data;
    } catch (error) {
        toast.error("Không thể lấy danh sách bài viết đã lưu");
        console.error("Lỗi khi lấy bài viết đã lưu:", error);
        throw error;
    }
};

// ==== UPLOAD IMAGE ====

export const uploadImageAPI = async (filesOrBase64Array) => {
    if (!filesOrBase64Array || filesOrBase64Array.length === 0) return [];

    const formData = new FormData();

    filesOrBase64Array.forEach((item, index) => {
        if (item instanceof File) {
            formData.append("images", item);
        } else if (typeof item === "string" && item.startsWith("data:image")) {
            const base64Data = item.split(",")[1];
            const contentType = item.substring(
                item.indexOf(":") + 1,
                item.indexOf(";")
            );

            const byteCharacters = atob(base64Data);
            const byteArrays = [];

            for (
                let offset = 0;
                offset < byteCharacters.length;
                offset += 512
            ) {
                const slice = byteCharacters.slice(offset, offset + 512);
                const byteNumbers = Array.from(slice).map((char) =>
                    char.charCodeAt(0)
                );
                byteArrays.push(new Uint8Array(byteNumbers));
            }

            const blob = new Blob(byteArrays, { type: contentType });
            const filename = `image_${Date.now()}_${index}`;
            formData.append("images", blob, filename);
        }
    });

    const res = await authorizedAxiosInstance.post(
        `${API_ROOT}/image/upload`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return res.data; // Trả về list url
};

// Upload CV
export const uploadResumeAPI = async (file, title) => {
    const response = await authorizedAxiosInstance.post(
        `${API_ROOT}/api/cv/upload/${title}`,
        file
    );
    return response.data.data;
};

export const getResumeFeedbackAPI = async (resumeId) => {
    const response = await authorizedAxiosInstance.get(
        `${API_ROOT}/api/cv/${resumeId}`
    );
    return response.data.data;
};

export const getAllCvAPI = async () => {
    const response = await authorizedAxiosInstance.get(
        `${API_ROOT}/api/cv/list`
    );
    return response.data.data;
};

// Upload JD
export const uploadJdAPI = async (file) => {
    const response = await authorizedAxiosInstance.post(
        `${API_ROOT}/api/jd/analyze`,
        file
    );
    return response.data;
};

export const getJobDescriptionDetailAPI = async (jdId) => {
    const response = await authorizedAxiosInstance.get(
        `${API_ROOT}/api/jd/${jdId}`
    );
    return response.data;
};

export const getAllJdAPI = async () => {
    const response = await authorizedAxiosInstance.get(
        `${API_ROOT}/api/jd/list`
    );
    return response.data.data;
};

export const getAllTopic = async () => {
    const response = await authorizedAxiosInstance.get(`${API_ROOT}/topic`);
    return response.data;
};

export const getAllInterviewSessionWithId = async (id) => {
    const response = await authorizedAxiosInstance.get(
        `${API_ROOT}/interview-sessions/${id}`
    );
    return response.data.data;
};

export const getAllTopicWithTheirTags = async () => {
    const response = await authorizedAxiosInstance.get(
        `${API_ROOT}/interview-sessions/topics-with-tags`
    );
    return response.data.data;
};

// ==== HR APPLICATION ====
export const applyForHrAPI = async ({
    company,
    phone,
    country,
    experienceYears,
    linkedinUrl,
    cvUrl,
}) => {
    try {
        const response = await authorizedAxiosInstance.post(
            `${API_ROOT}/hr/apply`,
            {
                company,
                phone,
                country,
                experienceYears,
                linkedinUrl,
                cvUrl,
            }
        );
        toast.success("HR application submitted successfully");
        return response.data;
    } catch (error) {
        toast.error("Failed to submit HR application");
        console.error("Error submitting HR application:", error);
        throw error;
    }
};
