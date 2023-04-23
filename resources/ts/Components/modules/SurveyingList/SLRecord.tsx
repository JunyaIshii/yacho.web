import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { convertDateFormat } from "../../../app/funcComponents";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { surveyingList } from "../../../features/entity/SurveyingList";
import { userInfo } from "../../../features/entity/User";
import {
    openRemoveModal,
    updateSurveyingList,
} from "../../../features/slice/SurveyingListSlice";
import { RootState } from "../../../features/store";

const SLRecord = ({
    surveyingListId,
    surveyingName,
    weather,
    author,
    authorName,
    createdAt,
}: surveyingList) => {
    const dispatch = useAppDispatch();
    const { selectedSite } = useAppSelector((state: RootState) => state.main);
    const { userInfo } = useAppSelector((state: RootState) => state.main);
    const history = useHistory();

    const [editSurveyingList, setEditSurveyingList] = useState<boolean>(false);
    const [editSurveyingName, setEditSurveyingName] = useState(surveyingName);
    const [editWeather, setEditWeather] = useState(weather);
    const [isSmallScreen, setIsSmallScreen] = useState(
        window.innerWidth <= 640
    );

    const selectedSiteMember = userInfo?.find((info: userInfo) => {
        return info.siteId === selectedSite?.siteId;
    });

    //画面サイズの判定
    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 640);
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const convertDate = convertDateFormat(createdAt);

    const handleEditSurveyingNameChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setEditSurveyingName(event.target.value);
    };

    const handleEditWeatherChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setEditWeather(parseInt(event.target.value, 10));
    };

    const handleClickLink = () => {
        history.push(
            `/SurveyingData/${surveyingListId}/${encodeURIComponent(
                surveyingName
            )}`
        );
    };

    const onSubmit = () => {
        setEditSurveyingList(false);

        if (surveyingListId) {
            dispatch(
                updateSurveyingList({
                    surveyingListId,
                    editSurveyingName,
                    editWeather,
                })
            );
        }
    };

    const getWeather = (weather: number) => {
        switch (weather) {
            case 1:
                return "晴";
            case 2:
                return "曇";
            case 3:
                return "雨";
            case 4:
                return "雪";
            default:
                return "その他";
        }
    };

    if (editSurveyingList) {
        return (
            <tr className="bg-green-50 h-12">
                <td className="py-2 md:px-12 md:py-4 text-sm font-medium text-center whitespace-nowrap">
                    <input
                        type="text"
                        className="text-center bg-green-50 w-full"
                        value={editSurveyingName}
                        onChange={handleEditSurveyingNameChange}
                    />
                </td>
                <td className="py-2 md:px-4 md:py-4 text-sm text-center whitespace-nowrap">
                    {isSmallScreen ? convertDate : createdAt}
                </td>
                <td className="py-2 md:px-4 md:py-4 text-sm text-center whitespace-nowrap">
                    <select
                        className="md:px-3 md:py-2 text-center text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm w-16 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        onChange={handleEditWeatherChange}
                        value={editWeather}
                    >
                        <option value="1">晴</option>
                        <option value="2">曇</option>
                        <option value="3">雨</option>
                        <option value="4">雪</option>
                        <option value="5">その他</option>
                    </select>
                </td>
                <td className="py-2 md:px-4 md:py-4 text-sm text-center whitespace-nowrap">
                    {authorName}
                </td>
                <td className="flex py-2 md:px-4 md:py-4 justify-evenly whitespace-nowrap">
                    <button
                        className="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg hover:bg-gray-100"
                        onClick={onSubmit}
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
                                d="M4.5 12.75l6 6 9-13.5"
                            />
                        </svg>
                    </button>
                    <button
                        className="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg hover:bg-gray-100"
                        onClick={() => setEditSurveyingList(false)}
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
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </td>
            </tr>
        );
    } else {
        return (
            <tr
                className="hover:bg-green-50 h-12 md:h-16"
                onClick={handleClickLink}
            >
                <td className="py-2 md:px-12 md:py-4 text-sm font-medium text-center whitespace-nowrap">
                    {surveyingName}
                </td>
                <td className="py-2 md:px-4 md:py-4 text-sm text-center whitespace-nowrap">
                    {isSmallScreen ? convertDate : createdAt}
                </td>
                <td className="py-2 md:px-4 md:py-4 text-sm text-center whitespace-nowrap">
                    {weather !== null && getWeather(weather)}
                </td>
                <td className="py-2 md:px-4 md:py-4 text-sm text-center whitespace-nowrap">
                    {authorName}
                </td>
                {author === selectedSiteMember?.siteMemberId ? (
                    <td className="flex py-2 md:px-4 md:py-4 justify-evenly whitespace-nowrap">
                        <button
                            className="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg hover:bg-gray-100"
                            onClick={(event) => {
                                event.stopPropagation();
                                setEditSurveyingList(true);
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
                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                />
                            </svg>
                        </button>
                        <button
                            className="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg hover:bg-gray-100"
                            onClick={(event) => {
                                event.stopPropagation();
                                dispatch(openRemoveModal(surveyingListId));
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
                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                            </svg>
                        </button>
                    </td>
                ) : (
                    <td className="text-center py-2 md:px-4 md:py-4 justify-evenly whitespace-nowrap">
                        作成者のみ
                    </td>
                )}
            </tr>
        );
    }
};

export default SLRecord;
