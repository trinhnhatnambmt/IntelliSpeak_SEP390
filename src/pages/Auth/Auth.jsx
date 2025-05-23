import React from "react";
import { useLocation } from "react-router-dom";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { logo } from "~/assets";

const Auth = () => {
    const location = useLocation();

    const isLogin = location.pathname === "/login";
    const isRegister = location.pathname === "/register";

    return (
        <div className="bg-black">
            {isLogin && <LoginForm />}
            {isRegister && <RegisterForm />}
        </div>
    );
};

export default Auth;
