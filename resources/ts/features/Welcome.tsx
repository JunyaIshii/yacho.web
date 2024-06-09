import axios from "axios";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useLogin } from "./auth/api/AuthQuery";
import {
    VALIDATE_EMAIL_PATTERN,
    emailErrorMessage,
    VALIDATE_PASSWORD_PATTERN,
    passwordErrorMessage,
} from "../config/validate-pattern";
import { setError } from "../store/MainSlice";
import { RootState } from "../store/store";
import { useAppDispatch, useAppSelector } from "../store/store-hooks";
import { SendEmailModal } from "./auth/components/SendEmailModal";

export const Welcome = () => {
    const login = useLogin();
    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [sendEmailModal, setSendEmailModal] = useState<boolean>(false);

    const handleLogin = (data: any) => {
        axios
            .get("/sanctum/csrf-cookie", { withCredentials: true })
            .then(() => {
                login.mutate({ email: data.email, password: data.password });
            });
    };

    const { error } = useAppSelector((state: RootState) => state.main);
    const handleInputChange = () => {
        dispatch(setError(null));
    };

    return (
        <>
            <Helmet>
                <title>野帳.web</title>
            </Helmet>

            {sendEmailModal && (
                <SendEmailModal
                    onClose={() => {
                        setSendEmailModal(false);
                    }}
                />
            )}
            <div className="bg-green-800 flex items-center justify-center h-screen py-6 sm:py-8 lg:py-12">
                <div className="m-auto max-w-screen-2xl px-4 md:px-8 ">
                    <h2 className="mb-4 text-center text-2xl font-bold text-white md:mb-8 lg:text-3xl">
                        野帳.web
                    </h2>
                    <div className="bg-white rounded border">
                        <form
                            onSubmit={handleSubmit(handleLogin)}
                            className="mx-auto max-w-lg"
                        >
                            <div className=" flex flex-col gap-4 p-4 md:p-8">
                                <div className="text-red-600 text-sm text-center">
                                    {error && <span>{error}</span>}
                                </div>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
                                    >
                                        メールアドレス
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        {...register(
                                            "email",
                                            VALIDATE_EMAIL_PATTERN
                                        )}
                                        className={`w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring ${
                                            errors.email && "border-red-600"
                                        }`}
                                        onChange={handleInputChange}
                                    />
                                    {errors.email && (
                                        <div className="text-red-600 text-sm">
                                            {emailErrorMessage(errors)}
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="password"
                                        className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
                                    >
                                        パスワード
                                    </label>
                                    <input
                                        id="password"
                                        type="password"
                                        {...register(
                                            "password",
                                            VALIDATE_PASSWORD_PATTERN
                                        )}
                                        className={`w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring ${
                                            errors.password && "border-red-600"
                                        }`}
                                        onChange={handleInputChange}
                                    />
                                    {errors.password && (
                                        <div className="text-red-600 text-sm">
                                            {passwordErrorMessage(errors)}
                                        </div>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    className="block rounded-lg bg-gray-800 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-gray-700 focus-visible:ring active:bg-gray-600 md:text-base"
                                >
                                    ログイン
                                </button>
                            </div>
                        </form>

                        <div className="flex items-center justify-center bg-white p-2 border-t">
                            <p className="text-center text-sm text-gray-500">
                                アカウントをお持ちでない場合{" "}
                                <Link
                                    to={"Register"}
                                    onClick={() => {
                                        dispatch(setError(null));
                                    }}
                                    className="text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700"
                                >
                                    登録
                                </Link>
                            </p>
                        </div>
                        <div className="flex items-center justify-center bg-white p-2">
                            <p className="text-center text-sm text-gray-500">
                                <button
                                    onClick={() => {
                                        dispatch(setError(null));
                                        setSendEmailModal(true);
                                    }}
                                    className="text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700"
                                >
                                    パスワードを忘れた方
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
