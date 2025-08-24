import React, { createContext, useContext, useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
const ModalContext = createContext(undefined);
const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("useModal must be used within a ModalProvider");
    }
    return context;
};
export function FramerModal({
    children,
    open: controlledOpen,
    setOpen: controlledSetOpen,
}) {
    const [internalOpen, setInternalOpen] = useState(false);
    const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
    const setOpen =
        controlledSetOpen !== undefined ? controlledSetOpen : setInternalOpen;
    useEffect(() => {
        if (open) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setOpen(false);
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [open]);
    return (
        <ModalContext.Provider value={{ open, setOpen }}>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-20 top-0 left-0 right-0 bottom-0 flex flex-col items-center w-full h-screen justify-center dark:bg-black/90 bg-white/90 backdrop-blur-sm cursor-zoom-out border"
                        onClick={() => setOpen(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            onClick={(e) => e.stopPropagation()}
                            className=" w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl border"
                        >
                            <button
                                className="absolute top-2 right-2"
                                onClick={() => setOpen(false)}
                            >
                                <X />
                            </button>
                            {children}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </ModalContext.Provider>
    );
}
export function ModalContent({ children }) {
    return <>{children}</>;
}
