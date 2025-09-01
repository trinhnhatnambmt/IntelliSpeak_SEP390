import React from "react";
import { useLocation } from "react-router-dom";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import ForgotPasswordForm from "./ForgotPasswordForm";
import ResetPassword from "./ResetPassword";

const Auth = () => {
    const location = useLocation();

    const isLogin = location.pathname === "/login";
    const isRegister = location.pathname === "/register";
    const isForgotPass = location.pathname === "/forgotPass";
    const isResetPass = location.pathname === "/reset-password";

    return (
        <div className="bg-black">
            {isLogin && <LoginForm />}
            {isRegister && <RegisterForm />}
            {isForgotPass && <ForgotPasswordForm />}
            {isResetPass && <ResetPassword />}
        </div>
    );
};

export default Auth;
