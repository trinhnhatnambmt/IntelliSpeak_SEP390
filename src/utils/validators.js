export const FIELD_REQUIRED_MESSAGE = "Khu vực này là bắt buộc";
export const EMAIL_RULE = /^\S+@\S+\.\S+$/;
export const EMAIL_RULE_MESSAGE = "Email không hợp lệ. (example@haha.com)";
export const PASSWORD_RULE = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d\W]{8,256}$/;
export const PASSWORD_RULE_MESSAGE =
    "Password phải có ít nhất 8 ký tự, bao gồm chữ cái và số.";
export const PASSWORD_CONFIRMATION_MESSAGE = "Mật khẩu không trùng khớp!";

// Liên quan đến Validate File
export const LIMIT_COMMON_FILE_SIZE = 10485760; // byte = 10 MB
export const ALLOW_COMMON_FILE_TYPES = ["image/jpg", "image/jpeg", "image/png"];
export const singleFileValidator = (file) => {
    if (!file || !file.name || !file.size || !file.type) {
        return "File cannot be blank.";
    }
    if (file.size > LIMIT_COMMON_FILE_SIZE) {
        return "Maximum file size exceeded. (10MB)";
    }
    if (!ALLOW_COMMON_FILE_TYPES.includes(file.type)) {
        return "File type is invalid. Only accept jpg, jpeg and png";
    }
    return null;
};
