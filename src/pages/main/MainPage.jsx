import React from "react";
import { Outlet } from "react-router-dom";
import Header from "~/sections/Header";

const MainPage = () => {
    return (
        <div>
            <Header authenticated={true} />
            <div className="mt-25">
                <Outlet />
            </div>
        </div>
    );
};

export default MainPage;
