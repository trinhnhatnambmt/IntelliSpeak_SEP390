import React from "react";
import { useLocation } from "react-router-dom";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { logo } from "~/assets";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "~/redux/user/userSlice";

const Auth = () => {
    const location = useLocation();

    const isLogin = location.pathname === "/login";
    const isRegister = location.pathname === "/register";

    // const currentUser = useSelector(selectCurrentUser);
    // if (currentUser) {
    //     return <Navigate to="/main" replace={true} />;
    // }

    return (
        <div className="bg-black">
            {isLogin && <LoginForm />}
            {isRegister && <RegisterForm />}
        </div>
    );
};

export default Auth;
