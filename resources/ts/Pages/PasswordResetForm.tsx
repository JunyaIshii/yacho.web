import React, { useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet";

interface IFormInput {
    password: string;
    passwordConfirmation: string;
}

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export const PasswordResetForm = ({ pageTitle }) => {
    const query = useQuery();
    const token = query.get("token");
    const email = query.get("email");
    const [sentPassword, setSentPassword] = useState<boolean>(false);

    const {
        handleSubmit,
        register,
        watch,
        formState: { errors },
    } = useForm<IFormInput>({
        defaultValues: {
            password: "",
            passwordConfirmation: "",
        },
        mode: "onChange",
    });

    const onSubmit = async (data: IFormInput) => {
        try {
            await axios.post("/api/reset-password", {
                token,
                email,
                password: data.password,
            });
            setSentPassword(true);
        } catch (error) {
            // エラーメッセージを表示
        }
    };

    return (
        <>
            <Helmet>
                <title>{pageTitle}</title>
            </Helmet>

            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg w-full max-w-md">
                    <h1 className="text-2xl text-center font-semibold mb-6">
                        {sentPassword
                            ? "新しいパスワードを設定しました"
                            : "パスワード再設定"}
                    </h1>
                    {sentPassword ? (
                        <div className="flex items-center justify-center bg-white p-2">
                            <p className="text-center text-sm text-gray-500">
                                <Link
                                    to={"/"}
                                    className="text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700"
                                >
                                    トップ画面に戻る
                                </Link>
                            </p>
                        </div>
                    ) : (
                        <div className="bg-white">
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="space-y-6"
                            >
                                <input
                                    type="password"
                                    {...register("password", {
                                        required: true,
                                        minLength: 6,
                                        maxLength: 20,
                                    })}
                                    placeholder="パスワード"
                                    required
                                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-200"
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.password.type === "required"
                                            ? "パスワードは必須項目です"
                                            : "パスワードは6~20文字で入力してください"}
                                    </p>
                                )}

                                <input
                                    type="password"
                                    {...register("passwordConfirmation", {
                                        required: true,
                                        validate: (value) =>
                                            value === watch("password"),
                                    })}
                                    placeholder="パスワード確認"
                                    required
                                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-200"
                                />
                                {errors.passwordConfirmation && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.passwordConfirmation.type ===
                                        "required"
                                            ? "パスワード確認は必須項目です"
                                            : "パスワードが一致しません"}
                                    </p>
                                )}

                                <button
                                    type="submit"
                                    className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 focus:ring-4 focus:ring-green-300 focus:outline-none"
                                >
                                    送信
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};
