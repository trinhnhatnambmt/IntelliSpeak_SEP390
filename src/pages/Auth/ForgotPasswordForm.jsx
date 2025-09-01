import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { forgotPassAPI } from "~/apis";
import {
    authThumb,
    intellispeak,
    intellispeakdark,
    squarelogo,
} from "~/assets";
import FieldErrorAlert from "~/components/Form/FieldErrorAlert";
import {
    EMAIL_RULE,
    EMAIL_RULE_MESSAGE,
    FIELD_REQUIRED_MESSAGE,
} from "~/utils/validators";


const ForgotPasswordForm = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const submitForgotPass = (data) => {
        const { email } = data;
        toast
            .promise(
                forgotPassAPI({
                    email,
                }),
                {
                    pending: "Please wait...",
                }
            )
            .then((res) => {
                if (!res.error) {
                    toast.success(res?.message);
                }
            });
    };

    return (
        <div>
            <div className="relative mx-auto">
                <div className="flex justify-between">
                    {/* FORM SECTION */}
                    <form
                        onSubmit={handleSubmit(submitForgotPass)}
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
                            Forgot password?
                        </h1>
                        <p className="font-bold text-sm text-gray-800 dark:text-gray-400">
                            No worries, I'll send you reset instruction
                        </p>

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

                        {/* Submit */}
                        <div className="w-96 mx-auto mt-4">
                            <button
                                type="submit"
                                className="interceptor-loading w-full bg-blue-600 hover:bg-blue-700 text-white border border-blue-700 dark:border-blue-800 py-2 rounded-md font-medium transition duration-500 cursor-pointer"
                            >
                                Reset password
                            </button>
                        </div>

                        {/* Register Redirect */}
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
        </div>
    );
};

export default ForgotPasswordForm;
