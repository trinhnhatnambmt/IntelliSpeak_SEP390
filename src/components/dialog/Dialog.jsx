import { useNavigate } from "react-router-dom";
import { FramerModal, ModalContent } from "./Modal";

const Dialog = ({ modalOpen, setModalOpen }) => {
    const navigate = useNavigate();

    const handleUpgrade = () => {
        setModalOpen(false);
        navigate("/upgrade-plan");
    };
    return (
        <div className=" h-full flex justify-center items-center">
            <FramerModal open={modalOpen} setOpen={setModalOpen}>
                <ModalContent>
                    <div className="flex flex-col space-y-1.5 text-center sm:text-left">
                        <h2 className="text-lg font-semibold leading-none tracking-tight">
                            Upgrade Required
                        </h2>
                        <p className="text-sm text-muted-foreground py-5">
                            This feature is available for Pro users only.
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Please upgrade your package to access this feature.
                        </p>
                    </div>

                    <div className="mt-4">
                        <button
                            onClick={handleUpgrade}
                            className="w-full p-3 bg-black dark:bg-white text-white dark:text-black rounded-md cursor-pointer"
                            type="button"
                        >
                            Upgrade Now
                        </button>
                    </div>
                </ModalContent>
            </FramerModal>
        </div>
    );
};
export default Dialog;
