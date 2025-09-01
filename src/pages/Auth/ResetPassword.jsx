import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { intellispeak, intellispeakdark, squarelogo } from "~/assets";
import {
    FIELD_REQUIRED_MESSAGE,
    PASSWORD_CONFIRMATION_MESSAGE,
    PASSWORD_RULE,
    PASSWORD_RULE_MESSAGE,
} from "~/utils/validators";
import { Eye, EyeOffIcon } from "lucide-react";
import FieldErrorAlert from "~/components/Form/FieldErrorAlert";
import { toast } from "react-toastify";
import { resetPassAPI } from "~/apis";

const ResetPassword = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isVisible2, setIsVisible2] = useState(false);
    const [logo, setLogo] = useState(intellispeak);
    const { search } = useLocation();
    const token = new URLSearchParams(search).get("token");
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();

    const submitResetPass = (data) => {
        const { password, password_Confirmation } = data;
        toast
            .promise(
                resetPassAPI(
                    {
                        new_password: password,
                        repeat_password: password_Confirmation,
                    },
                    token
                ),
                {
                    pending: "Please wait...",
                }
            )
            .then((res) => {
                if (!res.error) {
                    toast.success(res?.message);
                    navigate("/login");
                }
            });
    };

    return (
        <div className="relative mx-auto">
            <div className="flex justify-between">
                <form
                    onSubmit={handleSubmit(submitResetPass)}
                    className="relative flex flex-col gap-5 justify-center items-center w-1/2 bg-gray-50 dark:bg-gray-900"
                >
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
                        Reset password
                    </h1>

                    <div className="w-96 mx-auto">
                        <label
                            htmlFor="pass"
                            className="text-sm font-normal text-gray-700 dark:text-gray-300"
                        >
                            New password
                        </label>
                        <div className="relative mt-1">
                            <input
                                type={isVisible ? "text" : "password"}
                                id="pass"
                                placeholder="Password"
                                className="w-full outline-none focus-within:border-blue-500 rounded-md p-2 border-[1px] border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                {...register("password", {
                                    required: FIELD_REQUIRED_MESSAGE,
                                    pattern: {
                                        value: PASSWORD_RULE,
                                        message: PASSWORD_RULE_MESSAGE,
                                    },
                                })}
                            />
                            <div
                                className="absolute top-3 right-4 text-2xl text-gray-500 dark:text-gray-400 cursor-pointer"
                                onClick={() => setIsVisible((prev) => !prev)}
                            >
                                {isVisible ? (
                                    <Eye size={22} />
                                ) : (
                                    <EyeOffIcon size={22} />
                                )}
                            </div>
                            <FieldErrorAlert
                                errors={errors}
                                fieldName={"password"}
                            />
                        </div>
                    </div>
                    <div className="w-96 mx-auto">
                        <label
                            htmlFor="confirmPass"
                            className="text-sm font-normal text-gray-700 dark:text-gray-300"
                        >
                            Confirm new password
                        </label>
                        <div className="relative mt-1">
                            <input
                                type={isVisible2 ? "text" : "password"}
                                id="confirmPass"
                                placeholder="Confirm Password"
                                className="w-full outline-none focus-within:border-blue-500 rounded-md p-2 border-[1px] border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                {...register("password_Confirmation", {
                                    validate: (value) => {
                                        if (value === watch("password")) {
                                            return true;
                                        }
                                        return PASSWORD_CONFIRMATION_MESSAGE;
                                    },
                                })}
                            />
                            <div
                                className="absolute top-3 right-4 text-2xl text-gray-500 dark:text-gray-400 cursor-pointer"
                                onClick={() => setIsVisible2((prev) => !prev)}
                            >
                                {isVisible2 ? (
                                    <Eye size={22} />
                                ) : (
                                    <EyeOffIcon size={22} />
                                )}
                            </div>
                            <FieldErrorAlert
                                errors={errors}
                                fieldName={"password_Confirmation"}
                            />
                        </div>
                    </div>
                    <div className="w-96 mx-auto mt-4">
                        <button
                            type="submit"
                            className="interceptor-loading w-full bg-blue-600 hover:bg-blue-700 text-white border border-blue-700 dark:border-blue-800 py-2 rounded-md font-medium transition duration-500 cursor-pointer"
                        >
                            Reset password
                        </button>
                    </div>
                    <div className="w-96 mx-auto my-4 flex items-center">
                        <div className="flex-grow h-[0.5px] bg-gray-300 dark:bg-gray-600" />
                        <span className="px-3 text-sm text-gray-500 dark:text-gray-400">
                            or
                        </span>
                        <div className="flex-grow h-[0.5px] bg-gray-300 dark:bg-gray-600" />
                    </div>

                    <div className="w-96 mx-auto my-4 flex items-center">
                        <span className="px-3 text-sm text-gray-600 dark:text-gray-400">
                            Back to
                            <Link
                                to="/login"
                                className="underline ml-1 font-bold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                            >
                                Login
                            </Link>
                        </span>
                    </div>
                </form>

                <div className="w-1/2 relative">
                    <img
                        src="https://images.unsplash.com/photo-1592659762303-90081d34b277?q=80&w=1073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Authentication Background"
                        className="w-full h-screen object-cover"
                    />
                    <div className="absolute bottom-10 left-5 flex flex-col text-white bg-n-9/40 backdrop-blur border border-n-1/10 rounded-2xl p-5">
                        <h2 className="text-3xl font-bold mb-2">
                            ✨Join the Future of Interviewing✨
                        </h2>
                        <p className="text-lg max-w-xl text-gray-200 ml-12">
                            Create a free account to start practicing your
                            interview skills, receive instant AI feedback, and
                            discover career opportunities tailored to you.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
