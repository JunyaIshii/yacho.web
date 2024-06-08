import { Loading } from "@frontend/components/Loading";
import useSurveyingData from "@frontend/features/data/hooks/useSurveyingData";
import { RootState } from "@frontend/store/store";
import { useAppSelector } from "@frontend/store/store-hooks";
import React from "react";
import { Helmet } from "react-helmet";
import { SurveyingDataNavbar } from "./components/SurveyingDataNavbar";
import { SurveyingDataRow } from "./components/SurveyingDataRow";
import { surveyingData } from "./types/SurveyingData";

export const Surveying = () => {
    const { loading } = useAppSelector(
        (state: RootState) => state.surveyingData
    );
    const { surveyingData, authority, ihValues, handleIhValuesChange } =
        useSurveyingData();
    return (
        <>
            <Helmet>
                <title>測量データ</title>
            </Helmet>

            <SurveyingDataNavbar />
            <section className="sm:container sm:px-4 sm:mx-auto">
                {loading ? (
                    <Loading />
                ) : (
                    <table className="mb-10 w-full text-sm text-center border-collapse border text-gray-500 shadow-md sm:rounded-lg">
                        <thead className="text-xs text-gray-700 uppercase bg-red-50">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-2 py-3 border-r min-w-1/3"
                                >
                                    測点
                                </th>
                                <th
                                    scope="col"
                                    className="px-2 py-3 border-r min-w-1/6"
                                >
                                    BS
                                </th>
                                <th
                                    scope="col"
                                    className="px-2 py-3 border-r min-w-1/6"
                                >
                                    IH
                                </th>
                                <th
                                    scope="col"
                                    className="px-2 py-3 border-r min-w-1/6"
                                >
                                    FS
                                </th>
                                <th scope="col" className="px-2 py-3 min-w-1/6">
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
                                        <SurveyingDataRow
                                            key={data.surveyingDataId}
                                            data={data}
                                            index={index}
                                            authority={authority}
                                            ihValue={ihValues[index]}
                                            onIhValuesChange={
                                                handleIhValuesChange
                                            }
                                        />
                                    );
                                }
                            )}
                        </tbody>
                    </table>
                )}
            </section>
        </>
    );
};
