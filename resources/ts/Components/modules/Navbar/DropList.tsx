import React from "react";
import { useAppDispatch } from "../../../app/hooks";
import { userInfo } from "../../../features/entity/User";
import { selectSite } from "../../../features/slice/MainSlice";
import { closeDropList } from "../../../features/slice/MainSlice";
import { fetchSurveyingList } from "../../../features/slice/SurveyingListSlice";

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
