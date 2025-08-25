import React from "react";
import ReactDOM from "react-dom";

export default function CustomModal({
    open,
    onClose,
    title,
    children,
    backgroundColor = "#fff",
    className = "",
    overlayClass = "",
    centered = true,
    showClose = true,
    style = {},
    bodyStyle = {},
}) {
    if (!open) return null;

    return ReactDOM.createPortal(
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-200 ${overlayClass}`}
            style={{ background: "rgba(0,0,0,0.35)" }}
        >
            <div
                className={`relative shadow-2xl rounded-2xl border border-gray-100 dark:border-neutral-800 ${className}`}
                style={{
                    background: backgroundColor,
                    minWidth: 320,
                    maxWidth: 480,
                    width: "100%",
                    maxHeight: '90vh',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 0,
                    ...style,
                }}
            >
                {showClose && (
                    <button
                        className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-white text-2xl z-10"
                        onClick={onClose}
                        aria-label="Close"
                        type="button"
                    >
                        &times;
                    </button>
                )}
                {title && (
                    <div className="px-6 pt-6 pb-2 text-xl font-bold text-gray-800 dark:text-white text-center">
                        {title}
                    </div>
                )}
                <div className="px-6 pb-6 pt-2 flex-1 overflow-y-auto" style={bodyStyle}>{children}</div>
            </div>
        </div>,
        document.body
    );
}
