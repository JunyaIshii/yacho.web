import React from "react";
import { useForm } from "react-hook-form";
import {
    closeAddUserModal,
    createSiteMember,
    setError,
} from "../features/admin/store/AdminStore";
import { closeAddSiteModal, createSite } from "../store/MainSlice";
import { RootState } from "../store/store";
import { useAppDispatch, useAppSelector } from "../store/store-hooks";
import {
    VALIDATE_EMAIL_PATTERN,
    emailErrorMessage,
    VALIDATE_SITE_NAME_PATTERN,
    siteNameErrorMessage,
} from "../config/validate-pattern";

export const AddModal = () => {
    const { addUserModal, error } = useAppSelector(
        (state: RootState) => state.admin
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

    const doneDispatch = (data: any) => {
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

                <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all w-5/6 md:w-3/5">
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
                                        {...register(
                                            "email",
                                            VALIDATE_EMAIL_PATTERN
                                        )}
                                        type="email"
                                        onChange={() => {
                                            dispatch(setError(null));
                                        }}
                                        className="block mx-auto w-4/5 px-4 py-3 text-center text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                                    />
                                    {errors.email && (
                                        <div className="text-red-600 text-sm">
                                            {emailErrorMessage(errors)}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <>
                                    <input
                                        {...register(
                                            "siteName",
                                            VALIDATE_SITE_NAME_PATTERN
                                        )}
                                        type="text"
                                        className="block mx-auto w-4/5 px-4 py-3 text-center text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                                    />{" "}
                                    {errors.siteName && (
                                        <div className="text-red-600 text-sm">
                                            {siteNameErrorMessage(errors)}
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
