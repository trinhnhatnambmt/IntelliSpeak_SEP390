export const FIELD_REQUIRED_MESSAGE = "This field is required";
export const EMAIL_RULE = /^\S+@\S+\.\S+$/;
export const EMAIL_RULE_MESSAGE = "Invalid email address. (example@haha.com)";
export const PASSWORD_RULE = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d\W]{8,256}$/;
export const PASSWORD_RULE_MESSAGE =
    "Password must be at least 8 characters long and include both letters and numbers.";
export const PASSWORD_CONFIRMATION_MESSAGE = "Passwords do not match!";

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
