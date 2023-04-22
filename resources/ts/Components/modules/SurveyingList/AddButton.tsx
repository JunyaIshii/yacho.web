import { RootState } from "../../../features/store";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useEffect, useRef, useState } from "react";
import React from "react";
import { createSurveyingList } from "../../../features/slice/SurveyingListSlice";
import { userInfo } from "../../../features/entity/User";

export const AddButton = () => {
    const dispatch = useAppDispatch();
    const [isOpen, setIsOpen] = useState(false);
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
        } else {
            setIsOpen(true);
        }
    };

    const insideRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            // モーダルの外側をクリックした場合
            if (
                insideRef.current &&
                !insideRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false); // モーダルを閉じるコールバック関数を呼び出す
            }
        };
        // コンポーネントがマウントされたときに、document全体に対してmousedownイベントをリッスンする関数を登録する
        document.addEventListener("mousedown", handleOutsideClick);
        // コンポーネントがアンマウントされるときに、mousedownイベントを解除する
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [setIsOpen]);
    return (
        <>
            {isOpen ? (
                <div className="relative items-center w-96 px-5 pr-0 max-w-7xl">
                    <div
                        className="p-2 border-l-4 border-red-500 rounded-r-xl bg-red-50"
                        ref={insideRef}
                    >
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg
                                    className="w-5 h-5 text-red-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            </div>
                            <div className="ml-1">
                                <div className="text-sm text-red-600">
                                    <p>現場を選択してください</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <button
                    className="flex items-center justify-center px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg w-auto hover:bg-blue-600 "
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
                    <span>測量データ</span>
                </button>
            )}
        </>
    );
};
