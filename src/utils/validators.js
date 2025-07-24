export const FIELD_REQUIRED_MESSAGE = "Khu vực này là bắt buộc";
export const EMAIL_RULE = /^\S+@\S+\.\S+$/;
export const EMAIL_RULE_MESSAGE = "Email không hợp lệ. (example@haha.com)";
export const PASSWORD_RULE = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d\W]{8,256}$/;
export const PASSWORD_RULE_MESSAGE =
    "Password phải có ít nhất 8 ký tự, bao gồm chữ cái và số.";
export const PASSWORD_CONFIRMATION_MESSAGE = "Mật khẩu không trùng khớp!";

// Liên quan đến Validate File
export const LIMIT_COMMON_FILE_SIZE = 20 * 1024 * 1024; // 20MB
export const ALLOW_COMMON_FILE_TYPES = ["application/pdf"];

export const singleFileValidator = (file) => {
    if (!file || !file.name || !file.size || !file.type) {
        return { code: "file-empty", message: "File cannot be blank." };
    }
    if (file.size > LIMIT_COMMON_FILE_SIZE) {
        return {
            code: "file-too-large",
            message: "Maximum file size exceeded. (20MB)",
        };
    }
    if (!ALLOW_COMMON_FILE_TYPES.includes(file.type)) {
        return {
            code: "invalid-type",
            message: "File type is invalid. Only accept PDF files.",
        };
    }
    return null; // valid
};
