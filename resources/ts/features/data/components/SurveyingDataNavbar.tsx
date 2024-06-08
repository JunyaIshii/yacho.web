import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../../store/store";
import { useAppDispatch, useAppSelector } from "../../../store/store-hooks";
import { useData } from "../hooks/useData";
import { resetSurveyingData } from "../store/SurveyingDataSlice";

export const SurveyingDataNavbar = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { createFormalSurveyingData, outputExcel } = useData();

    const { surveyingData } = useAppSelector(
        (state: RootState) => state.surveyingData
    );
    const { surveyingListName } = useParams<{
        surveyingListId: string;
        surveyingListName: string;
    }>();

    const handleGoBack = () => {
        navigate(-1);
        dispatch(resetSurveyingData());
    };

    const handleOutputExcel = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        if (surveyingData && surveyingListName) {
            const newArray = createFormalSurveyingData(surveyingData);
            outputExcel(e, surveyingListName, newArray);
        }
    };

    return (
        <>
            <nav className=" bg-white shadow">
                <div className="container flex justify-between p-6 mx-auto text-gray-600 capitalize">
                    <div className="w-1/12 flex items-center justify-around">
                        {/* Menu画面に遷移 */}
                        <button
                            className="w-full lg:w-3/5 flex items-center justify-center tracking-wide text-gray-500 transition-colors duration-200 rounded-lg bg-gray-300 hover:bg-gray-500 hover:text-white"
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
                            {surveyingListName}
                        </p>
                    </div>

                    <div className="w-1/5 lg:w-1/12 flex items-center justify-around">
                        {/* エクセルファイル出力 */}
                        <button
                            onClick={handleOutputExcel}
                            className="w-full flex items-center justify-center text-gray-500 transition-colors duration-200 rounded-lg bg-green-400 hover:bg-green-600 hover:text-white"
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
                            <span>Excel</span>
                        </button>
                    </div>
                </div>
            </nav>
        </>
    );
};
