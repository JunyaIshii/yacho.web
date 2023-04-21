import React from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { createSite } from "../../../features/slice/MainSlice";
import { closeAddSiteModal } from "../../../features/slice/MainSlice";
import {
    closeAddUserModal,
    createSiteMember,
    setError,
} from "../../../features/slice/SiteEditSlice";
import { RootState } from "../../../features/store";

export const AddModal = () => {
    const { addUserModal, error } = useAppSelector(
        (state: RootState) => state.siteEdit
    );
    const { addSiteModal, selectedSite, loginUser } = useAppSelector(
        (state: RootState) => state.main
    );
    const dispatch = useAppDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const instruction = () => {
        if (addUserModal) {
            return "追加したいユーザーのメールアドレスを入力してください";
        } else {
            return "現場名を入力してください";
        }
    };

    const doneDispatch = (data) => {
        if (addUserModal) {
            if (selectedSite.siteId) {
                dispatch(
                    createSiteMember({
                        email: data.email,
                        siteId: selectedSite.siteId,
                    })
                );
            }
        } else if (addSiteModal) {
            if (loginUser.userId !== null) {
                dispatch(
                    createSite({
                        siteName: data.siteName,
                        userId: loginUser.userId,
                    })
                );
            }
            dispatch(closeAddSiteModal());
        }
    };

    const closeDispatch = () => {
        if (addUserModal) {
            dispatch(closeAddUserModal());
            dispatch(setError(null));
        } else {
            dispatch(closeAddSiteModal());
        }
    };

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
                <div className="fixed inset-0 transition-opacity">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                    <form onSubmit={handleSubmit(doneDispatch)}>
                        <div className="px-6 pt-4">
                            <p className="text-gray-700 text-base">
                                {instruction()}
                            </p>
                            {error && (
                                <div className="text-red-600 text-sm">
                                    {error}
                                </div>
                            )}
                        </div>

                        <label className="block my-3">
                            {addUserModal ? (
                                <>
                                    <input
                                        {...register("email", {
                                            required: true,
                                            pattern: /^\S+@\S+\.\S+$/,
                                            maxLength: 255,
                                        })}
                                        type="email"
                                        onChange={() => {
                                            dispatch(setError(null));
                                        }}
                                        className="block mx-auto w-4/5 px-4 py-3 text-center text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
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
                                </>
                            ) : (
                                <>
                                    <input
                                        {...register("siteName", {
                                            required: true,
                                            maxLength: 255,
                                        })}
                                        type="text"
                                        className="block mx-auto w-4/5 px-4 py-3 text-center text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                                    />{" "}
                                    {errors.siteName && (
                                        <div className="text-red-600 text-sm">
                                            {errors.siteName.type === "required"
                                                ? "現場名は必須項目です"
                                                : "現場名は最大255文字で入力してください"}
                                        </div>
                                    )}
                                </>
                            )}
                        </label>
                        <div className="px-6 py-4 bg-gray-100 flex justify-evenly">
                            <button
                                className="py-2 px-4 bg-gray-400 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
                                type="button"
                                onClick={closeDispatch}
                            >
                                キャンセル
                            </button>
                            <button
                                className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 mr-2"
                                type="submit"
                            >
                                {addUserModal ? "追加" : "作成"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
