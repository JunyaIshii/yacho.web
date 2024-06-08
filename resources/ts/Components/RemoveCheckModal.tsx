import React from "react";
import {
    closeRemoveUserModal,
    removeSiteMember,
} from "../features/admin/store/AdminStore";
import {
    closeRemoveModal,
    removeSurveyingList,
} from "../features/menu/store/SurveyingListSlice";
import { RootState } from "../store/store";
import { useAppDispatch, useAppSelector } from "../store/store-hooks";

export const RemoveCheckModal = () => {
    const { siteId } = useAppSelector(
        (state: RootState) => state.main.selectedSite
    );
    const { isOpen: removeSurveyingListOpen, removeSurveyingListId } =
        useAppSelector((state: RootState) => state.surveyingList.removeModal);
    const { isOpen: removeSiteMemberOpen, removeSiteMemberId } = useAppSelector(
        (state: RootState) => state.admin.removeModal
    );

    const removeDispatchDone = () => {
        if (removeSurveyingListOpen && siteId) {
            dispatch(removeSurveyingList({ removeSurveyingListId, siteId }));
            dispatch(closeRemoveModal());
        }
        if (removeSiteMemberOpen && siteId) {
            dispatch(removeSiteMember({ removeSiteMemberId, siteId }));
            dispatch(closeRemoveUserModal());
        }
    };

    const handleCloseModal = () => {
        if (removeSurveyingListOpen) {
            dispatch(closeRemoveModal());
        }
        if (removeSiteMemberOpen) {
            dispatch(closeRemoveUserModal());
        }
    };

    const dispatch = useAppDispatch();
    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
                <div className="fixed inset-0 transition-opacity">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                    <div className="px-6 py-4">
                        {removeSiteMemberOpen && (
                            <div className="text-red-600 text-base text-center">
                                このユーザーが作成した測量データも削除されます
                            </div>
                        )}
                        <p className="text-red-600 text-base">
                            本当に削除しますか？
                        </p>
                    </div>
                    <div className="px-6 py-4 bg-gray-100 flex justify-evenly">
                        <button
                            className="py-2 px-4 bg-gray-400 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
                            onClick={handleCloseModal}
                        >
                            NO
                        </button>
                        <button
                            className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 mr-2"
                            onClick={removeDispatchDone}
                        >
                            YES
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
