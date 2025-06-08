import React from "react";
import { Outlet } from "react-router-dom";
import Header from "~/sections/Header";

const MainPage = () => {
    return (
        <div>
            <Header authenticated={true} />
            <div className="mt-25">
                <div className="fixed top-0 left-0 w-full min-h-screen z-0 bg-[linear-gradient(to_right,#6262622e_1px,transparent_1px),linear-gradient(to_bottom,#6262622e_1px,transparent_1px)] bg-[size:38px_42px] [mask-image:radial-gradient(ellipse_120%_85%_at_50%_100%,#000_70%,transparent_110%)] pointer-events-none"></div>
                <Outlet />
            </div>
        </div>
    );
};

export default MainPage;
