import React from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch } from "../../../store/store-hooks";
import { openAddUserModal, resetSiteEdit } from "../store/AdminStore";

export const AdminNavbar = () => {
    const { siteName } = useParams<{
        siteName: string;
    }>();
    const dispatch = useAppDispatch();
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
                            className="w-full lg:w-3/5 flex items-center justify-center tracking-wide text-gray-500 transition-colors duration-200 rounded-lg bg-gray-300 hover:bg-gray-500 hover:text-white"
                            to={"/Menu"}
                            onClick={() => {
                                dispatch(resetSiteEdit());
                            }}
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
                                    d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                                />
                            </svg>
                        </Link>
                    </div>

                    <div className="w-2/3">
                        <p className="text-1xl text-center my-auto text-gray-700">
                            {siteName}
                        </p>
                    </div>

                    <div className="w-1/5 md:w-1/6 lg:w-1/12 flex items-center justify-around">
                        {/* ユーザー追加 */}
                        <button
                            className="w-full flex items-center justify-center  text-gray-500 transition-colors duration-200 rounded-lg bg-blue-300 hover:bg-blue-500 hover:text-white"
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
                            <span>追加</span>
                        </button>
                    </div>
                </div>
            </nav>
        </>
    );
};
