import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export function formatSize(bytes) {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

    // Determine the appropriate unit by calculating the log
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    // Format with 2 decimal places and round
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

export const generateUUID = () => crypto.randomUUID();

export const detectLanguage = (text) => {
    const vietnameseChars =
        /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i;
    const vietnameseWords = ["là", "và", "trong", "có", "tôi"];

    const hasVietnameseChar = vietnameseChars.test(text);
    const hasVietnameseWord = vietnameseWords.some((word) =>
        text.toLowerCase().includes(word)
    );

    if (hasVietnameseChar || hasVietnameseWord) return "vietnamese";
    return "english";
};
