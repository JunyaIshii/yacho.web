import { useAppDispatch, useAppSelector } from "@frontend/store/store-hooks";
import React from "react";
import { RootState } from "../../../store/store";
import { userInfo } from "../../auth/types/User";
import { createSurveyingList } from "../store/SurveyingListSlice";

export const AddButton = () => {
    const dispatch = useAppDispatch();
    const { userInfo, selectedSite } = useAppSelector(
        (state: RootState) => state.main
    );

    const siteMember = userInfo?.find((info: userInfo) => {
        return info.siteId === selectedSite?.siteId;
    });

    const onClickBtn = () => {
        if (selectedSite?.siteId !== null) {
            if (siteMember?.siteMemberId) {
                dispatch(createSurveyingList(siteMember.siteMemberId));
            }
        }
    };

    return (
        <>
            <button
                className="flex items-center justify-center px-5 py-2 text-sm tracking-wide text-gray-500 transition-colors duration-200 rounded-lg w-auto  bg-blue-300 hover:bg-blue-500 hover:text-white "
                onClick={() => {
                    onClickBtn();
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
                <span>追加</span>
            </button>
        </>
    );
};
