import SurveyingData from "../Components/modules/Surveying/SurveyingData";
import { SurveyingDataNavbar } from "../Components/modules/Navbar/SurveyingDataNavbar";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../features/store";
import { userInfo } from "../features/entity/User";
import { surveyingData } from "../features/entity/SurveyingData";
import { surveyingList } from "../features/entity/SurveyingList";
import { Helmet } from "react-helmet";
import { fetchSurveyingData } from "../features/slice/SurveyingDataSlice";

export const Surveying = ({ pageTitle }) => {
    const dispatch = useAppDispatch();

    const { surveyingData, selectedSurveyingList } = useAppSelector(
        (state: RootState) => state.surveyingData
    );
    const [ihValues, setIhValues] = useState<(number | null)[]>([]);

    useEffect(() => {
        if (selectedSurveyingList) {
            dispatch(fetchSurveyingData(selectedSurveyingList.surveyingListId));
        }
    }, []);

    useEffect(() => {
        const newIhValues: (number | null)[] = [];
        let previousIh: number | null = null;

        surveyingData?.forEach((row, index) => {
            if (row.bs !== null && row.gh !== null) {
                newIhValues[index] = row.bs + row.gh;
                previousIh = newIhValues[index];
            } else if (row.fs !== null && previousIh !== null) {
                newIhValues[index] = previousIh;
            } else {
                newIhValues[index] = null;
            }
        });
        setIhValues(newIhValues);
    }, [surveyingData]);

    const handleIhValuesChange = (index: number, ihValue: number | null) => {
        if (surveyingData) {
            setIhValues((prevIhValues) => {
                const newIhValues = [...prevIhValues];
                newIhValues[index] = ihValue;
                for (let i = index + 1; i < surveyingData.length; i++) {
                    if (
                        surveyingData[i].fs !== null &&
                        newIhValues[i - 1] !== null
                    ) {
                        newIhValues[i] = newIhValues[i - 1];
                    } else {
                        break;
                    }
                }
                return newIhValues;
            });
        }
    };

    //編集権限の可否
    const { surveyingList } = useAppSelector(
        (state: RootState) => state.surveyingList
    );
    const { selectedSite } = useAppSelector((state: RootState) => state.main);
    const { userInfo } = useAppSelector((state: RootState) => state.main);
    const selectedSiteMember = userInfo?.find((info: userInfo) => {
        return info.siteId === selectedSite?.siteId;
    });

    const author = surveyingList?.find((surveying: surveyingList) => {
        return (
            surveying.surveyingListId === selectedSurveyingList?.surveyingListId
        );
    })?.author;

    const authority = author !== selectedSiteMember?.siteMemberId;

    return (
        <>
            <Helmet>
                <title>{pageTitle}</title>
            </Helmet>

            <SurveyingDataNavbar />
            <section className="sm:container sm:px-4 sm:mx-auto">
                <table className="mx-auto text-sm text-center border-collapse border text-gray-500 shadow-md sm:rounded-lg">
                    <thead className="text-xs text-gray-700 uppercase bg-red-50">
                        <tr>
                            <th
                                scope="col"
                                className="px-2 py-3 border-r w-1/3"
                            >
                                測点
                            </th>
                            <th
                                scope="col"
                                className="px-2 py-3 border-r w-1/6"
                            >
                                BS
                            </th>
                            <th
                                scope="col"
                                className="px-2 py-3 border-r w-1/6"
                            >
                                IH
                            </th>
                            <th
                                scope="col"
                                className="px-2 py-3 border-r w-1/6"
                            >
                                FS
                            </th>
                            <th scope="col" className="px-2 py-3 w-1/6">
                                GH
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {surveyingData?.map(
                            (data: surveyingData, index: number) => {
                                if (data === null) {
                                    return null;
                                }
                                return (
                                    <SurveyingData
                                        key={data.surveyingDataId}
                                        data={data}
                                        index={index}
                                        authority={authority}
                                        ihValue={ihValues[index]}
                                        onIhValuesChange={handleIhValuesChange}
                                    />
                                );
                            }
                        )}
                    </tbody>
                </table>
            </section>
        </>
    );
};
