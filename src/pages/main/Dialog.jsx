import { useState } from "react";
import { toast } from "react-toastify";
import { createWebsiteFeedbackAPI } from "~/apis";
import { FramerModal, ModalContent } from "~/components/dialog/Modal";

const Dialog = ({ modalOpen, setModalOpen }) => {
    const [values, setValues] = useState("");
    const handleComplaint = () => {
        createWebsiteFeedbackAPI({ description: values }).then((res) =>
            toast.success(res?.message)
        );
        setModalOpen(false);
        setValues("");
    };

    return (
        <div className="h-full flex justify-center items-center">
            <FramerModal open={modalOpen} setOpen={setModalOpen}>
                <ModalContent>
                    <div className="flex flex-col space-y-1.5 text-center sm:text-left">
                        <h2 className="text-lg font-semibold leading-none tracking-tight">
                            Complaint Submission
                        </h2>
                        <p className="text-sm text-muted-foreground py-5">
                            This feature allows users to submit complaints or
                            feedback about the application. Please provide
                            details about your issue or suggestion below.
                        </p>
                    </div>
                    <div className="mt-4">
                        <textarea
                            value={values}
                            onChange={(e) => setValues(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md mb-4"
                            rows="4"
                            placeholder="Enter your complaint here..."
                        ></textarea>
                        <button
                            onClick={handleComplaint}
                            className="w-full p-3 bg-black dark:bg-white text-white dark:text-black rounded-md cursor-pointer"
                            type="button"
                        >
                            Complaint Now!
                        </button>
                    </div>
                </ModalContent>
            </FramerModal>
        </div>
    );
};
export default Dialog;
