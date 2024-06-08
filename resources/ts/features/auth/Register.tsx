import {
    emailErrorMessage,
    passwordConfirmErrorMessage,
    passwordErrorMessage,
    userNameErrorMessage,
    VALIDATE_EMAIL_PATTERN,
    VALIDATE_PASSWORD_PATTERN,
    VALIDATE_USER_NAME_PATTERN,
} from "@frontend/config/validate-pattern";
import axios from "axios";
import React from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { setError } from "../../store/MainSlice";
import { RootState } from "../../store/store";
import { useAppDispatch, useAppSelector } from "../../store/store-hooks";
import { useRegister } from "../auth/api/AuthQuery";

export const Register = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const dispatch = useAppDispatch();
    const { error } = useAppSelector((state: RootState) => state.main);

    const registerMutation = useRegister();

    const handleRegister = (data: any) => {
        axios
            .get("/sanctum/csrf-cookie", { withCredentials: true })
            .then(() => {
                registerMutation.mutate(data);
            });
    };

    const handleEmailInputChange = () => {
        dispatch(setError(null));
    };

    return (
        <>
            <Helmet>
                <title>新規登録</title>
            </Helmet>

            <div className="bg-green-800 flex items-center justify-center h-screen py-6 sm:py-8 lg:py-12">
                <div className="m-auto max-w-screen-2xl px-4 md:px-8">
                    <h2 className="mb-4 text-center text-2xl font-bold text-white md:mb-8 lg:text-3xl">
                        野帳.web
                    </h2>
                    <div className="bg-white rounded border">
                        <form
                            onSubmit={handleSubmit(handleRegister)}
                            className="mx-auto max-w-lg rounded border"
                        >
                            <div className="bg-white flex flex-col gap-4 p-4 md:p-8">
                                <div>
                                    <label className="mb-2 inline-block text-sm text-gray-800 sm:text-base">
                                        お名前
                                    </label>
                                    <input
                                        {...register(
                                            "name",
                                            VALIDATE_USER_NAME_PATTERN
                                        )}
                                        type="text"
                                        className={`w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring ${
                                            errors.name && "border-red-600"
                                        }`}
                                    />
                                    {errors.name && (
                                        <div className="text-red-600 text-sm">
                                            {userNameErrorMessage(errors)}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label className="mb-2 inline-block text-sm text-gray-800 sm:text-base">
                                        メールアドレス
                                    </label>
                                    <input
                                        {...register(
                                            "email",
                                            VALIDATE_EMAIL_PATTERN
                                        )}
                                        type="email"
                                        className={`w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring ${
                                            errors.email && "border-red-600"
                                        }`}
                                        onChange={handleEmailInputChange}
                                    />
                                    {errors.email && (
                                        <div className="text-red-600 text-sm">
                                            {emailErrorMessage(errors)}
                                        </div>
                                    )}
                                    {error && (
                                        <div className="text-red-600 text-sm">
                                            {error}
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-2 inline-block text-sm text-gray-800 sm:text-base">
                                        パスワード
                                    </label>
                                    <input
                                        {...register(
                                            "password",
                                            VALIDATE_PASSWORD_PATTERN
                                        )}
                                        type="password"
                                        className={`w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring ${
                                            errors.password && "border-red-600"
                                        }`}
                                    />
                                    {errors.password && (
                                        <div className="text-red-600 text-sm">
                                            {passwordErrorMessage(errors)}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label className="mb-2 inline-block text-sm text-gray-800 sm:text-base">
                                        パスワード確認
                                    </label>
                                    <input
                                        {...register("password_confirmation", {
                                            required: true,
                                            validate: (value) =>
                                                value === watch("password"),
                                        })}
                                        type="password"
                                        className={`w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring ${
                                            errors.password_confirmation &&
                                            "border-red-600"
                                        }`}
                                    />
                                    {errors.password_confirmation && (
                                        <div className="text-red-600 text-sm">
                                            {passwordConfirmErrorMessage(
                                                errors
                                            )}{" "}
                                        </div>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    className="block rounded-lg bg-gray-800 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-gray-700 focus-visible:ring active:bg-gray-600 md:text-base"
                                >
                                    登録
                                </button>
                            </div>
                        </form>
                        <div className="flex items-center justify-center bg-white p-2 border-t">
                            <p className="text-center text-sm text-gray-500">
                                <Link
                                    to={"/"}
                                    className="text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700"
                                >
                                    トップ画面に戻る
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
