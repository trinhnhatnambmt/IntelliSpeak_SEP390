import { Eye, EyeOffIcon } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authThumb2, logo } from "~/assets";
import {
    EMAIL_RULE,
    EMAIL_RULE_MESSAGE,
    FIELD_REQUIRED_MESSAGE,
    PASSWORD_CONFIRMATION_MESSAGE,
    PASSWORD_RULE,
    PASSWORD_RULE_MESSAGE,
} from "~/utils/validators";
import FieldErrorAlert from "~/components/Form/FieldErrorAlert";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { registerUserAPI } from "~/apis";

const RegisterForm = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isVisible2, setIsVisible2] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();

    const submitRegister = (data) => {
        const { email, password, password_Confirmation } = data;
        toast
            .promise(
                registerUserAPI({
                    email,
                    password,
                    confirmPassword: password_Confirmation,
                }),
                {
                    pending: "Đang đăng ký tài khoản...",
                }
            )
            .then(() => navigate("/login"));
    };

    return (
        <div className="relative mx-auto">
            <div className="flex justify-between">
                <form
                    onSubmit={handleSubmit(submitRegister)}
                    className="relative flex flex-col gap-5 justify-center items-center w-1/2"
                >
                    <img
                        src={logo}
                        alt="logo"
                        width={180}
                        onClick={() => navigate("/")}
                        className="absolute top-5 left-5 cursor-pointer"
                    />
                    <h1 className="font-bold text-4xl">Đăng Ký</h1>
                    <div className="w-96 mx-auto">
                        <label htmlFor="pass" className="text-sm font-normal">
                            Email
                        </label>
                        <div className="relative mt-1">
                            <input
                                type="email"
                                id="email"
                                placeholder="Email"
                                className="w-full outline-none focus-within:border-white rounded-md p-2 border-[1px] border-gray-400"
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
                    <div className="w-96 mx-auto">
                        <label htmlFor="pass" className="text-sm font-normal">
                            Password
                        </label>
                        <div className="relative mt-1">
                            <input
                                type={isVisible ? "text" : "password"}
                                id="pass"
                                placeholder="Password"
                                className="w-full outline-none focus-within:border-white rounded-md p-2 border-[1px] border-gray-400"
                                {...register("password", {
                                    required: FIELD_REQUIRED_MESSAGE,
                                    pattern: {
                                        value: PASSWORD_RULE,
                                        message: PASSWORD_RULE_MESSAGE,
                                    },
                                })}
                            />
                            <div
                                className="absolute top-3 right-4 text-2xl text-gray-500 cursor-pointer"
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
                        <label htmlFor="pass" className="text-sm font-normal">
                            Confirm Password
                        </label>
                        <div className="relative mt-1">
                            <input
                                type={isVisible2 ? "text" : "password"}
                                id="pass"
                                placeholder="Confirm Password"
                                className="w-full outline-none focus-within:border-white rounded-md p-2 border-[1px] border-gray-400"
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
                                className="absolute top-3 right-4 text-2xl text-gray-500 cursor-pointer"
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
                            className="interceptor-loading w-full bg-white text-black border border-gray-400 py-2 rounded-md font-medium hover:bg-zinc-300 transition duration-500 cursor-pointer"
                        >
                            Đăng Ký
                        </button>
                    </div>
                    <div className="w-96 mx-auto my-4 flex items-center">
                        <div className="flex-grow h-[0.5px] bg-gray-500" />
                        <span className="px-3 text-sm text-gray-500">hoặc</span>
                        <div className="flex-grow h-[0.5px] bg-gray-500" />
                    </div>

                    <button className="cursor-pointer w-96 text-black flex justify-center gap-2 items-center bg-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-zinc-300 transition-all ease-in duration-200">
                        <svg
                            viewBox="0 0 48 48"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6"
                        >
                            <path
                                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                                fill="#FFC107"
                            />
                            <path
                                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                                fill="#FF3D00"
                            />
                            <path
                                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                                fill="#4CAF50"
                            />
                            <path
                                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                                fill="#1976D2"
                            />
                        </svg>
                        Continue with Google
                    </button>
                    <div className="w-96 mx-auto my-4 flex items-center">
                        <span className="px-3 text-sm text-white-50">
                            Bạn đã có tài khoản trước đó rồi sao?{" "}
                            <Link
                                to="/login"
                                className="underline ml-1 font-bold"
                            >
                                Đăng nhập
                            </Link>
                        </span>
                    </div>
                </form>

                <div className="w-1/2 relative">
                    <img
                        src={authThumb2}
                        alt="Authentication Background"
                        className="w-full h-screen object-cover"
                    />
                    <div className="absolute bottom-10 left-5 flex flex-col text-white bg-n-9/40 backdrop-blur border border-n-1/10 rounded-2xl p-5">
                        <h2 className="text-3xl font-bold mb-2">
                            ✨Gia Nhập Nền Tảng Phỏng Vấn Tương Lai✨
                        </h2>
                        <p className="text-lg max-w-xl text-gray-200 ml-12">
                            Tạo tài khoản miễn phí để bắt đầu hành trình rèn
                            luyện kỹ năng phỏng vấn, nhận phản hồi từ AI và khám
                            phá cơ hội nghề nghiệp phù hợp với bạn.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
