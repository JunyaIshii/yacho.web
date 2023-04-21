import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useRegister } from "../features/queies/AuthQuery";
import { setError } from "../features/slice/MainSlice";
import { RootState } from "../features/store";
import { Helmet } from "react-helmet";

export const Register = ({ pageTitle }) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const dispatch = useAppDispatch();
    const { error } = useAppSelector((state: RootState) => state.main);

    const registerMutation = useRegister();
    const onSubmit = (data) => {
        registerMutation.mutate(data);
    };

    const handleEmailInputChange = () => {
        dispatch(setError(null));
    };

    return (
        <>
            <Helmet>
                <title>{pageTitle}</title>
            </Helmet>

            <div className="bg-green-800 flex items-center justify-center h-screen py-6 sm:py-8 lg:py-12">
                <div className="m-auto max-w-screen-2xl px-4 md:px-8">
                    <h2 className="mb-4 text-center text-2xl font-bold text-white md:mb-8 lg:text-3xl">
                        野帳.web
                    </h2>
                    <div className="bg-white rounded border">
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="mx-auto max-w-lg rounded border"
                        >
                            <div className="bg-white flex flex-col gap-4 p-4 md:p-8">
                                <div>
                                    <label className="mb-2 inline-block text-sm text-gray-800 sm:text-base">
                                        お名前
                                    </label>
                                    <input
                                        {...register("name", {
                                            required: true,
                                            maxLength: 255,
                                        })}
                                        type="text"
                                        className={`w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring ${
                                            errors.name && "border-red-600"
                                        }`}
                                    />
                                    {errors.name && (
                                        <div className="text-red-600 text-sm">
                                            {errors.name.type === "required"
                                                ? "お名前は必須項目です"
                                                : "お名前は最大255文字で入力してください"}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label className="mb-2 inline-block text-sm text-gray-800 sm:text-base">
                                        メールアドレス
                                    </label>
                                    <input
                                        {...register("email", {
                                            required: true,
                                            pattern: /^\S+@\S+\.\S+$/,
                                            maxLength: 255,
                                        })}
                                        type="email"
                                        className={`w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring ${
                                            errors.email && "border-red-600"
                                        }`}
                                        onChange={handleEmailInputChange}
                                    />
                                    {errors.email && (
                                        <div className="text-red-600 text-sm">
                                            {errors.email.type === "required"
                                                ? "メールアドレスは必須項目です"
                                                : errors.email.type ===
                                                  "pattern"
                                                ? "メールアドレスの形式が正しくありません"
                                                : "メールアドレスは最大255文字で入力してください"}
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
                                        {...register("password", {
                                            required: true,
                                            minLength: 6,
                                            maxLength: 20,
                                        })}
                                        type="password"
                                        className={`w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring ${
                                            errors.password && "border-red-600"
                                        }`}
                                    />
                                    {errors.password && (
                                        <div className="text-red-600 text-sm">
                                            {errors.password.type === "required"
                                                ? "パスワードは必須項目です"
                                                : "パスワードは6~20文字で入力してください"}
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
                                            {errors.password_confirmation
                                                .type === "required"
                                                ? "パスワード確認は必須項目です"
                                                : "パスワードが一致しません"}{" "}
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
