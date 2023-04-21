import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { RootState } from "../../../features/store";
import {
    openAddUserModal,
    resetSiteEdit,
} from "../../../features/slice/SiteEditSlice";
import React from "react";
import { Link } from "react-router-dom";

export const SiteEditNavbar = () => {
    const dispatch = useAppDispatch();
    const { selectedSite } = useAppSelector((state: RootState) => state.main);
    const handleAddUserModal = () => {
        dispatch(openAddUserModal());
    };

    return (
        <>
            <nav className=" bg-white shadow">
                <div className="container flex justify-between p-6 mx-auto text-gray-600 capitalize">
                    <div className="w-1/12 flex items-center justify-around">
                        {/* Menu画面に遷移 */}
                        <Link
                            to={"Menu"}
                            onClick={() => {
                                dispatch(resetSiteEdit());
                            }}
                        >
                            <button className="text-gray-500 transition-colors duration-200 rounded-lg hover:bg-gray-100">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                                    />
                                </svg>
                            </button>
                        </Link>
                    </div>

                    <div className="w-2/3">
                        <p className="text-1xl text-center my-auto text-gray-700">
                            {selectedSite.siteName}
                        </p>
                    </div>

                    <div className="w-1/6 flex items-center justify-around">
                        {/* ユーザー追加 */}
                        <button
                            className="text-gray-500 transition-colors duration-200 rounded-lg hover:bg-gray-100"
                            onClick={handleAddUserModal}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>
        </>
    );
};
