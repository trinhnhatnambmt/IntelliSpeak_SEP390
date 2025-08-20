import { Eye, EyeOff } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    authThumb,
    squarelogo,
    intellispeakdark,
    intellispeak,
} from "~/assets";
import { useForm } from "react-hook-form";
import {
    EMAIL_RULE,
    EMAIL_RULE_MESSAGE,
    FIELD_REQUIRED_MESSAGE,
} from "~/utils/validators";
import FieldErrorAlert from "~/components/Form/FieldErrorAlert";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { loginUserAPI } from "~/redux/user/userSlice";

const LoginForm = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [logo, setLogo] = useState(intellispeak);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = (e) => {
            setLogo(e.matches ? intellispeakdark : intellispeak);
        };
        handleChange(mediaQuery);
        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    const submitLogin = (data) => {
        const { email, password } = data;
        toast
            .promise(
                dispatch(
                    loginUserAPI({
                        email,
                        password,
                    })
                ),
                {
                    pending: "Signing into your account...",
                }
            )
            .then((res) => {
                if (!res.error) {
                    navigate("/main");
                }
            });
    };

    return (
        <div className="relative mx-auto">
            <div className="flex justify-between">
                {/* FORM SECTION */}
                <form
                    onSubmit={handleSubmit(submitLogin)}
                    className="relative flex flex-col gap-5 justify-center items-center w-1/2 bg-gray-50 dark:bg-gray-900"
                >
                    {/* Logo */}
                    <div
                        className="absolute top-5 left-5 cursor-pointer flex items-center gap-2"
                        onClick={() => navigate("/")}
                    >
                        <img
                            src={squarelogo}
                            alt="logo"
                            className="h-10 w-auto"
                        />
                        <img
                            src={intellispeak}
                            alt="logo"
                            className="h-10 w-auto block dark:hidden"
                        />
                        <img
                            src={intellispeakdark}
                            alt="logo"
                            className="h-10 w-auto hidden dark:block"
                        />
                    </div>

                    <h1 className="font-bold text-4xl text-gray-800 dark:text-white">
                        Login
                    </h1>

                    {/* Email Field */}
                    <div className="w-96 mx-auto">
                        <label
                            htmlFor="email"
                            className="text-sm font-normal text-gray-700 dark:text-gray-300"
                        >
                            Email
                        </label>
                        <div className="relative mt-1">
                            <input
                                id="email"
                                placeholder="Enter your email"
                                className="w-full outline-none focus-within:border-blue-500 rounded-md p-2 border-[1px] border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                {...register("email", {
                                    required: FIELD_REQUIRED_MESSAGE,
                                    pattern: {
                                        value: EMAIL_RULE,
                                        message: EMAIL_RULE_MESSAGE,
                                    },
                                })}
                            />
                            <FieldErrorAlert
                                errors={errors}
                                fieldName={"email"}
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div className="w-96 mx-auto">
                        <label
                            htmlFor="pass"
                            className="text-sm font-normal text-gray-700 dark:text-gray-300"
                        >
                            Password
                        </label>
                        <div className="relative mt-1">
                            <input
                                type={isVisible ? "text" : "password"}
                                id="pass"
                                placeholder="Enter your password"
                                className="w-full outline-none focus-within:border-blue-500 rounded-md p-2 border-[1px] border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                {...register("password", {
                                    required: FIELD_REQUIRED_MESSAGE,
                                })}
                            />
                            <div
                                className="absolute top-3 right-4 text-2xl text-gray-500 dark:text-gray-400 cursor-pointer"
                                onClick={() => setIsVisible((prev) => !prev)}
                            >
                                {isVisible ? (
                                    <Eye size={22} />
                                ) : (
                                    <EyeOff size={22} />
                                )}
                            </div>
                            <FieldErrorAlert
                                errors={errors}
                                fieldName={"password"}
                            />
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="w-96 mx-auto mt-4">
                        <button
                            type="submit"
                            className="interceptor-loading w-full bg-blue-600 hover:bg-blue-700 text-white border border-blue-700 dark:border-blue-800 py-2 rounded-md font-medium transition duration-500 cursor-pointer"
                        >
                            Sign In
                        </button>
                    </div>

                    {/* OR Divider */}
                    <div className="w-96 mx-auto my-4 flex items-center">
                        <div className="flex-grow h-[0.5px] bg-gray-300 dark:bg-gray-600" />
                        <span className="px-3 text-sm text-gray-500 dark:text-gray-400">
                            or
                        </span>
                        <div className="flex-grow h-[0.5px] bg-gray-300 dark:bg-gray-600" />
                    </div>

                    {/* Register Redirect */}
                    <div className="w-96 mx-auto my-4 flex items-center">
                        <span className="px-3 text-sm text-gray-600 dark:text-gray-400">
                            Don’t have an account?{" "}
                            <Link
                                to="/register"
                                className="underline ml-1 font-bold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                            >
                                Sign Up
                            </Link>
                        </span>
                    </div>
                </form>

                {/* IMAGE SECTION */}
                <div className="w-1/2 relative">
                    <img
                        src={authThumb}
                        alt="Authentication Background"
                        className="w-full h-screen object-cover"
                    />
                    <div className="absolute bottom-10 left-10 flex flex-col text-white bg-opacity-40">
                        <h2 className="text-3xl font-bold mb-2">
                            ✨ Kickstart Your Career Journey ✨
                        </h2>
                        <p className="text-lg max-w-xl text-gray-200 ml-12">
                            Log in to enter an AI-powered virtual interview
                            space, tailored to you, and connect with global
                            recruiters.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
