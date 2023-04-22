import { useEffect, useRef } from "react";
import { RootState } from "../../../features/store";
import DropList from "./DropList";
import {
    closeDropList,
    openAddSiteModal,
    openDropList,
} from "../../../features/slice/MainSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../../../features/queies/AuthQuery";
import { userInfo as userDataType } from "../../../features/entity/User";
import { useCookies } from "react-cookie";
import { resetState } from "../../../features/slice/ResetState";

const MenuNavbar = () => {
    const dispatch = useAppDispatch();

    const { checkDropList } = useAppSelector((state: RootState) => state.main);
    const { userInfo, selectedSite } = useAppSelector(
        (state: RootState) => state.main
    );

    const siteId = selectedSite.siteId;
    const siteName = String(selectedSite.siteName);

    //現場編集画面の表示・非表示
    const authority = userInfo?.find((info: userDataType) => {
        return info.siteId === siteId;
    })?.authority;

    const handleAddModal = () => {
        dispatch(openAddSiteModal());
    };

    //ドロップリストの開閉処理
    const insideRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const el = insideRef.current;
        if (!el) return;
        const hundleClickOutside = (e: MouseEvent) => {
            if (!el?.contains(e.target as Node)) {
                dispatch(closeDropList());
            } else {
                dispatch(openDropList());
            }
        };
        document.addEventListener("click", hundleClickOutside);
    }, [dispatch, insideRef]);

    //ログインログアウト処理
    const logout = useLogout();
    const [cookies, setCookie, removeCookie] = useCookies(["authUser"]);

    const handleLogout = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        logout.mutate();
        removeCookie("authUser");
        dispatch(resetState());
    };

    return (
        <>
            <nav className=" bg-white shadow">
                <div className="container flex flex-wrap justify-between p-6 mx-auto text-gray-600 capitalize">
                    <div className="w-1/4 md:w-1/12 md:order-1 flex items-center justify-around">
                        {/* ログアウトしログイン画面に遷移 */}
                        <Link
                            className="text-gray-500 transition-colors duration-200 rounded-lg hover:bg-gray-100"
                            to={"/"}
                            onClick={handleLogout}
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
                                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                                />
                            </svg>
                        </Link>
                    </div>

                    <div className="w-1/4 md:w-1/5 md:order-3 flex items-center justify-around">
                        {/* モーダルを開いて現場の追加 */}
                        <button
                            className="text-gray-500 transition-colors duration-200 rounded-lg hover:bg-gray-100"
                            onClick={handleAddModal}
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
                                    d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </button>

                        {/* 現場グループ編集、編集権限のある人のみ表示 */}
                        {(authority === 1 || authority === 2) && (
                            <Link
                                to={`SiteEdit/${siteId}/${encodeURIComponent(
                                    siteName
                                )}`}
                                className="text-gray-500 transition-colors duration-200 rounded-lg hover:bg-gray-100"
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
                                        d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                                    />
                                </svg>
                            </Link>
                        )}
                    </div>

                    <div
                        className="w-full mt-4 relative md:order-2 md:mt-0 md:w-3/5"
                        ref={insideRef}
                    >
                        <button
                            type="button"
                            className="relative w-full py-3 pl-3 pr-10 text-left bg-white rounded-md  hover:ring-indigo-500 hover:border-indigo-500 shadow-lg cursor-default focus:outline-none focus:ring-1 sm:text-sm"
                        >
                            <span className="flex items-center">
                                <span className="block ml-3 truncate text-center">
                                    {selectedSite?.siteId !== null
                                        ? selectedSite?.siteName
                                        : "現場を選択してください"}
                                </span>
                            </span>
                            <span className="absolute inset-y-0 right-0 flex items-center pr-2 ml-3 pointer-events-none">
                                <svg
                                    className="w-5 h-5 text-gray-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            </span>
                        </button>
                        <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg">
                            <ul className="overflow-auto text-base rounded-md max-h-56 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {checkDropList &&
                                    userInfo &&
                                    userInfo.map(
                                        (
                                            info: Partial<userDataType>,
                                            index: number
                                        ) => {
                                            return (
                                                <DropList
                                                    key={index}
                                                    {...info}
                                                />
                                            );
                                        }
                                    )}
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default MenuNavbar;
