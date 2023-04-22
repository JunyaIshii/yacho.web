import React from "react";
import { useHistory } from "react-router";
import {
    createFormalSurveyingData,
    outputExcel,
} from "../../../app/funcComponents";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { resetSurveyingData } from "../../../features/slice/SurveyingDataSlice";
import { RootState } from "../../../features/store";

interface selectedSurveyingList {
    selectedSurveyingListId: number;
    selectedSurveyingListName: string;
}

export const SurveyingDataNavbar = ({
    selectedSurveyingList,
}: {
    selectedSurveyingList: selectedSurveyingList;
}) => {
    const dispatch = useAppDispatch();
    const history = useHistory();

    const { surveyingData } = useAppSelector(
        (state: RootState) => state.surveyingData
    );

    const handleGoBack = () => {
        history.goBack();
        dispatch(resetSurveyingData());
    };

    const handleOutputExcel = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        if (surveyingData && selectedSurveyingList) {
            const newArray = createFormalSurveyingData(surveyingData);
            outputExcel(
                e,
                selectedSurveyingList.selectedSurveyingListName,
                newArray
            );
        }
    };

    return (
        <>
            <nav className=" bg-white shadow">
                <div className="container flex justify-between p-6 mx-auto text-gray-600 capitalize">
                    <div className="w-1/12 flex items-center justify-around">
                        {/* Menu画面に遷移 */}
                        <button
                            className="text-gray-500 transition-colors duration-200 rounded-lg hover:bg-gray-100"
                            onClick={handleGoBack}
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
                        </button>
                    </div>

                    <div className="w-5/6">
                        <p className="text-1xl text-center my-auto text-gray-700">
                            {selectedSurveyingList.selectedSurveyingListName}
                        </p>
                    </div>

                    <div className="w-1/12 flex items-center justify-around">
                        {/* エクセルファイル出力 */}
                        <button
                            onClick={handleOutputExcel}
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
                                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>
        </>
    );
};
