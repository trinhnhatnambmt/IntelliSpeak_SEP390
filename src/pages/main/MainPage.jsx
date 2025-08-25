import { Tooltip } from "antd";
import { MessageCircleCode } from "lucide-react";
import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "~/sections/Header";
import Dialog from "./Dialog";

const MainPage = () => {
    const location = useLocation();
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <div>
            <Header authenticated={true} />
            <div className="mt-25 relative">
                <div className="fixed top-0 left-0 w-full min-h-screen z-0 bg-[linear-gradient(to_right,#6262622e_1px,transparent_1px),linear-gradient(to_bottom,#6262622e_1px,transparent_1px)] bg-[size:38px_42px] [mask-image:radial-gradient(ellipse_120%_85%_at_50%_100%,#000_70%,transparent_110%)] pointer-events-none"></div>

                <Outlet key={location.pathname} />
                <Tooltip title="Submit a Complaint" placement="left">
                    <button
                        onClick={() => setModalOpen(true)}
                        className="fixed cursor-pointer transition duration-1000 bottom-4 right-4 bg-[#46484b] text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-[#37393b] focus:outline-none z-10"
                    >
                        <MessageCircleCode />
                    </button>
                </Tooltip>
                <Dialog modalOpen={modalOpen} setModalOpen={setModalOpen} />
            </div>
        </div>
    );
};

export default MainPage;
