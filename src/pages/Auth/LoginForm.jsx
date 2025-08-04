import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authThumb, squarelogo, intellispeakdark } from "~/assets";
import { useForm } from "react-hook-form";
import {
    EMAIL_RULE,
    EMAIL_RULE_MESSAGE,
    FIELD_REQUIRED_MESSAGE,
    PASSWORD_RULE,
    PASSWORD_RULE_MESSAGE,
} from "~/utils/validators";
import FieldErrorAlert from "~/components/Form/FieldErrorAlert";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { loginUserAPI } from "~/redux/user/userSlice";

const LoginForm = () => {
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

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
                    pending: "Đang đăng nhập tài khoản...",
                }
            )
            .then((res) => {
                console.log(res);
                if (!res.error) {
                    navigate("/main");
                }
            });
    };

    return (
        <div className="relative mx-auto">
            <div className="flex justify-between">
                <form
                    onSubmit={handleSubmit(submitLogin)}
                    className="relative flex flex-col gap-5 justify-center items-center w-1/2"
                >
                    <div className="absolute top-5 left-5 cursor-pointer flex items-center gap-2" onClick={() => navigate("/")}>
                        <img src={squarelogo} alt="logo" className="h-10 w-auto" />
                        <img src={intellispeakdark} alt="logo" className="h-10 w-auto" />
                    </div>
                    <h1 className="font-bold text-4xl">Đăng Nhập</h1>
                    <div className="w-96 mx-auto">
                        <label htmlFor="pass" className="text-sm font-normal">
                            Email
                        </label>
                        <div className="relative mt-1">
                            <input
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
                                placeholder="password"
                                className="w-full outline-none focus-within:border-white rounded-md p-2 border-[1px] border-gray-400"
                                {...register("password", {
                                    required: FIELD_REQUIRED_MESSAGE,
                                })}
                            />
                            <div
                                className="absolute top-3 right-4 text-2xl text-gray-500 cursor-pointer"
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
                    <div className="w-96 mx-auto mt-4">
                        <button
                            type="submit"
                            className="interceptor-loading w-full bg-white text-black border border-gray-400 py-2 rounded-md font-medium hover:bg-zinc-300 transition duration-500 cursor-pointer"
                        >
                            Đăng Nhập
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
                            Bạn chưa có tài khoản trước đó sao?{" "}
                            <Link
                                to="/register"
                                className="underline ml-1 font-bold"
                            >
                                Đăng Ký
                            </Link>
                        </span>
                    </div>
                </form>
                <div className="w-1/2 relative">
                    <img
                        src={authThumb}
                        alt="Authentication Background"
                        className="w-full h-screen object-cover"
                    />
                    <div className="absolute bottom-10 left-10 flex flex-col text-white  bg-opacity-40">
                        <h2 className="text-3xl font-bold mb-2">
                            ✨ Khởi Đầu Hành Trình Sự Nghiệp Của Bạn ✨
                        </h2>
                        <p className="text-lg max-w-xl text-gray-200 ml-12">
                            Đăng nhập để bước vào không gian phỏng vấn ảo hiện
                            đại, được cá nhân hóa bởi AI và kết nối với nhà
                            tuyển dụng toàn cầu.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;