import {
    emailErrorMessage,
    VALIDATE_EMAIL_PATTERN,
} from "@frontend/config/validate-pattern";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface SendEmaiModalProps {
    onClose: () => void;
}

export const SendEmailModal: React.FC<SendEmaiModalProps> = ({ onClose }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [sendEmail, setSendEmail] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const onSubmit = async (data: any) => {
        axios
            .post("/api/password-reset", { email: data.email })
            .then(() => {
                setSendEmail(true);
            })
            .catch((error) => {
                setErrorMessage(error.response.data.message);
            });
    };

    const handleClickClose = () => {
        onClose();
    };

    return (
        <div
            className="fixed z-10 inset-0 overflow-y-auto"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
                <div
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                    aria-hidden="true"
                ></div>

                <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-md">
                    {sendEmail ? (
                        <div className="flex justify-around">
                            <p className="py-2 text-lg text-center">
                                送信しました
                            </p>
                            <button
                                type="button"
                                className="px-4 py-2 font-semibold text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                onClick={onClose}
                            >
                                閉じる
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="space-y-4">
                                <div className="text-lg text-center">
                                    パスワード再設定メールの送信
                                </div>
                                {/* Email */}
                                <div className="space-y-2">
                                    <input
                                        {...register(
                                            "email",
                                            VALIDATE_EMAIL_PATTERN
                                        )}
                                        type="email"
                                        onChange={() => {
                                            setErrorMessage(null);
                                        }}
                                        className="w-full px-3 py-2 border rounded-md bg-gray-50 text-gray-800 focus:ring-indigo-300"
                                    />
                                    {errors.email && (
                                        <div className="text-red-600 text-sm">
                                            {emailErrorMessage(errors)}
                                        </div>
                                    )}
                                    {errorMessage && (
                                        <div className="text-red-600 text-sm">
                                            {errorMessage}
                                        </div>
                                    )}

                                    {/* Buttons */}
                                    <div className="flex justify-around space-x-4">
                                        <button
                                            type="button"
                                            className="px-4 py-2 font-semibold text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            onClick={handleClickClose}
                                        >
                                            キャンセル
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 text-white bg-indigo-600 border border-transparent rounded-md font-semibold shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            送信
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};
