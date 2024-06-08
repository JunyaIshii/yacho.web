import { userInfo } from "@frontend/features/auth/types/User";
import { fetchSurveyingList } from "@frontend/features/menu/store/SurveyingListSlice";
import { closeDropList, selectSite } from "@frontend/store/MainSlice";
import { useAppDispatch } from "@frontend/store/store-hooks";
import React from "react";

const DropList = ({ siteName, siteId }: Partial<userInfo>) => {
    const dispatch = useAppDispatch();
    const handleClickBtn = () => {
        dispatch(closeDropList());
        if (siteId) {
            dispatch(selectSite(siteId));
            dispatch(fetchSurveyingList(siteId));
        }
    };
    return (
        <>
            <li className="relative">
                <button
                    className="py-2 px-3 w-full text-gray-900 cursor-default select-none hover:bg-indigo-500 hover:text-white"
                    onClick={handleClickBtn}
                >
                    <div className="flex items-center">
                        <span className="block ml-3 text-center font-normal truncate">
                            {siteName}
                        </span>
                    </div>
                </button>
            </li>
        </>
    );
};

export default DropList;
