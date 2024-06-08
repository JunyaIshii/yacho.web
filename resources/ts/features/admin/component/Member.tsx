import { useClickOutside } from "@frontend/features/admin/hooks/useClickOutSide";
import React, { useRef, useState } from "react";
import { useAppDispatch } from "../../../store/store-hooks";
import { openRemoveUserModal, updateSiteMember } from "../store/AdminStore";
import { SiteMember } from "../types/Admin";

export const Member = ({
    siteMemberId,
    userName,
    userEmail,
    authority,
}: SiteMember) => {
    const dispatch = useAppDispatch();

    const [toggle, setToggle] = useState<boolean>(authority !== 0);
    const [author, setAuthor] = useState<boolean>(false);
    const [undeletable, setUndeletable] = useState<boolean>(false);

    //画面をクリックするとポップアップが消える処理
    const insideRefAuthority = useRef<HTMLDivElement>(null);
    useClickOutside(insideRefAuthority, () => {
        if (authority === 1) {
            setAuthor(false);
        }
    });

    //画面をクリックするとポップアップが消える処理
    const insideRefRemove = useRef<HTMLButtonElement>(null);
    useClickOutside(insideRefRemove, () => {
        if (authority === 1) {
            setUndeletable(false);
        }
    });

    const handleChangeToggle = () => {
        if (authority === 1) {
            setAuthor(true);
        } else if (authority === 0) {
            const updateAuthority = 2;
            dispatch(updateSiteMember({ siteMemberId, updateAuthority }));
            setToggle(true);
        } else {
            const updateAuthority = 0;
            dispatch(updateSiteMember({ siteMemberId, updateAuthority }));
            setToggle(false);
        }
    };

    const openRemoveModal = () => {
        if (authority === 1) {
            setUndeletable(true);
        } else {
            dispatch(openRemoveUserModal(siteMemberId));
        }
    };

    return (
        <>
            <tr>
                <td className="w-2/6 py-2 sm:px-3 sm:py-4 text-sm font-medium text-center whitespace-nowrap">
                    {userName}
                </td>
                <td className="w-2/6 py-2 sm:px-3 sm:py-4 text-sm text-center whitespace-nowrap">
                    {userEmail}
                </td>
                <td className="relative w-1/6 py-2 sm:px-3 sm:py-4 text-center whitespace-nowrap">
                    {author ? (
                        <span className="absolute -top-5 text-sm right-1/3 whitespace-nowrap rounded bg-black px-2 py-1 text-white">
                            作成者の権限は外せません
                        </span>
                    ) : null}
                    <div
                        ref={insideRefAuthority}
                        className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in"
                    >
                        <input
                            type="checkbox"
                            name="toggle"
                            id={`toggle-${siteMemberId}`}
                            className={`toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer ${
                                toggle ? " transform translate-x-2/3" : ""
                            }`}
                            checked={toggle}
                            onChange={handleChangeToggle}
                        />
                        <label
                            htmlFor={`toggle-${siteMemberId}`}
                            className={`toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer ${
                                toggle ? "bg-green-400" : ""
                            }`}
                        ></label>
                    </div>
                </td>
                <td className="relative flex py-2 sm:px-4 sm:py-4 justify-evenly whitespace-nowrap">
                    {undeletable ? (
                        <span className="absolute -top-5 text-sm right-1/3  whitespace-nowrap rounded bg-black px-2 py-1 text-white">
                            作成者は削除できません
                        </span>
                    ) : null}

                    <button
                        className="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg hover:bg-gray-100"
                        onClick={openRemoveModal}
                        ref={insideRefRemove}
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
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                        </svg>
                    </button>
                </td>
            </tr>
        </>
    );
};
