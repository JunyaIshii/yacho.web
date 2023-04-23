import SLRecord from "./SLRecord";
import { RootState } from "../../../features/store";
import { useAppSelector } from "../../../app/hooks";
import { SearchBox } from "./SearchBox";
import { AddButton } from "./AddButton";
import React from "react";
import { surveyingList } from "../../../features/entity/SurveyingList";
import { Loading } from "../../Loading";

const SurveyingList = () => {
    const { sortSurveyingList } = useAppSelector(
        (state: RootState) => state.surveyingList
    );
    const { loading } = useAppSelector(
        (state: RootState) => state.surveyingList
    );

    return (
        <>
            <section className="container px-4 mx-auto">
                <div className="mt-6 flex items-center justify-between">
                    <SearchBox />
                    <AddButton />
                </div>
                <div className="flex-col mt-6">
                    <div className="overflow-hidden border mb-10 border-gray-200  rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200 ">
                            <thead className="bg-green-100 ">
                                <tr>
                                    <th
                                        scope="col"
                                        className="py-2 md:px-12 md:py-3.5 text-sm font-normal text-center text-gray-500"
                                    >
                                        測量データ
                                    </th>

                                    <th
                                        scope="col"
                                        className="py-2 md:px-4 md:py-3.5 text-sm font-normal text-center text-gray-500"
                                    >
                                        日付
                                    </th>

                                    <th
                                        scope="col"
                                        className="py-2 md:px-4 md:py-3.5 text-sm font-normal text-center text-gray-500"
                                    >
                                        天気
                                    </th>

                                    <th
                                        scope="col"
                                        className="py-2 md:px-4 md:py-3.5 text-sm font-normal text-center text-gray-500"
                                    >
                                        作成者
                                    </th>

                                    <th
                                        scope="col"
                                        className="py-2 md:px-4 md:py-3.5 text-sm font-normal text-center text-gray-500"
                                    >
                                        編集
                                    </th>
                                </tr>
                            </thead>
                            {!loading && (
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {sortSurveyingList?.map(
                                        (surveying: surveyingList) => {
                                            if (surveying !== null) {
                                                return (
                                                    <SLRecord
                                                        key={
                                                            surveying.surveyingListId
                                                        }
                                                        {...surveying}
                                                    />
                                                );
                                            } else {
                                                return null;
                                            }
                                        }
                                    )}
                                </tbody>
                            )}
                        </table>
                    </div>
                    {loading && <Loading />}
                </div>
            </section>
        </>
    );
};

export default SurveyingList;
