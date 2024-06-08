import React from "react";
import { surveyingData } from "../types/SurveyingData";
import useSurveyingDataRow from "@frontend/features/data/hooks/useSurveyingDataRow";

export interface SurveyingDataRowProps {
    data: surveyingData;
    index: number;
    authority: boolean;
    ihValue: number | null;
    onIhValuesChange: (index: number, ihValue: number | null) => void;
}

export const SurveyingDataRow: React.FC<SurveyingDataRowProps> = (props) => {
    const {
        handleBlur,
        handleChangeSurveyingDataName,
        handleChangeBs,
        handleChangeFs,
        handleChangeGh,
        surveyingDataName,
        authority,
        ihValue,
        bs,
        fs,
        gh,
    } = useSurveyingDataRow(props);

    return (
        <tr className="bg-white border-b">
            <th
                scope="row"
                className="px-2 py-3 w-1/3 border-r text-black font-medium whitespace-nowrap"
            >
                <input
                    type="text"
                    value={surveyingDataName ?? ""}
                    onBlur={handleBlur}
                    onChange={handleChangeSurveyingDataName}
                    disabled={authority}
                    className="w-full h-full text-center bg-white border-none outline-none disabled:text-black-important disabled:opacity-100-important"
                />
            </th>
            <td
                className={`px-2 py-3 w-1/6 border-r text-black ${
                    fs !== null ? "bg-gray-100" : ""
                }`}
            >
                <input
                    type="number"
                    value={bs ?? ""}
                    onChange={handleChangeBs}
                    onBlur={handleBlur}
                    disabled={fs !== null || authority}
                    className={`w-full h-full text-center border-none outline-none disabled:text-black-important disabled:opacity-100-important ${
                        fs !== null ? "bg-gray-100" : "bg-white"
                    }`}
                />
            </td>
            <td className="px-2 py-3 w-1/6 text-black border-r">
                {ihValue ?? ""}
            </td>
            <td
                className={`px-2 py-3 w-1/6 border-r text-black ${
                    bs !== null ? "bg-gray-100" : ""
                }`}
            >
                <input
                    type="number"
                    value={fs ?? ""}
                    onChange={handleChangeFs}
                    onBlur={handleBlur}
                    disabled={bs !== null || authority}
                    className={`w-full h-full text-center border-none outline-none disabled:text-black-important disabled:opacity-100-important ${
                        bs !== null ? "bg-gray-100" : "bg-white"
                    }`}
                />
            </td>
            <td className="px-2 py-3 w-1/6 text-black">
                <input
                    type="number"
                    value={gh ?? ""}
                    onBlur={handleBlur}
                    onChange={handleChangeGh}
                    disabled={fs !== null || authority}
                    className="w-full h-full text-center bg-white border-none outline-none disabled:text-black-important disabled:opacity-100-important"
                />
            </td>
        </tr>
    );
};
