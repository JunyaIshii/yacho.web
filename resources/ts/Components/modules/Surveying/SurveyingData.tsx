import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { surveyingData } from "../../../features/entity/SurveyingData";
import { updateSurveyingData } from "../../../features/slice/SurveyingDataSlice";

interface Props {
    data: surveyingData;
    index: number;
    authority: boolean;
    ihValue: number | null;
    onIhValuesChange: (index: number, ihValue: number | null) => void;
}

const SurveyingData: React.FC<Props> = ({
    data,
    index,
    authority,
    ihValue,
    onIhValuesChange,
}) => {
    const dispatch = useAppDispatch();

    const [surveyingDataName, setSurveyingDataName] = useState<string | null>(
        data.surveyingDataName
    );

    const GH = data.fs && ihValue ? ihValue - data.fs : data.gh;

    const [bs, setBs] = useState<number | null>(data.bs);
    const [fs, setFs] = useState<number | null>(data.fs);
    const [gh, setGh] = useState<number | null>(GH);

    useEffect(() => {
        setSurveyingDataName(data.surveyingDataName);
        setBs(data.bs);
        setFs(data.fs);
        setGh(GH);
    }, [data]);

    useEffect(() => {
        if (!bs && fs && ihValue) {
            setGh(ihValue - fs);
        }
    }, [ihValue]);

    const handleBlur = () => {
        const updatedData = {
            surveyingDataId: data.surveyingDataId,
            surveyingDataName,
            bs,
            fs,
            gh,
        };
        dispatch(updateSurveyingData(updatedData));
    };

    const handleChangeSurveyingDataName = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = e.target.value === "" ? null : e.target.value;
        setSurveyingDataName(value);
    };

    const handleChangeBs = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value === "" ? null : parseFloat(e.target.value);
        setBs(value);
        setFs(null);
        const newIhValue = value !== null && gh !== null ? value + gh : null;
        onIhValuesChange(index, newIhValue);
    };

    const handleChangeFs = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value === "" ? null : parseFloat(e.target.value);
        setFs(value);
        setBs(null);
        const newGhValue = ihValue && value ? ihValue - value : ihValue;
        setGh(newGhValue);
    };

    const handleChangeGh = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (bs) {
            const value =
                e.target.value === "" ? null : parseFloat(e.target.value);
            setGh(value);
            const newIhValue =
                bs !== null && value !== null ? bs + value : null;
            onIhValuesChange(index, newIhValue);
        } else if (!bs && !fs) {
            const value =
                e.target.value === "" ? null : parseFloat(e.target.value);
            setGh(value);
        }
    };

    return (
        <tr className="bg-white border-b">
            <th
                scope="row"
                className="px-2 py-3 w-1/3 border-r font-medium text-gray-900 whitespace-nowrap"
            >
                <input
                    type="text"
                    value={surveyingDataName === null ? "" : surveyingDataName}
                    onBlur={handleBlur}
                    onChange={handleChangeSurveyingDataName}
                    disabled={authority}
                    className="w-full h-full text-center bg-white"
                    style={{ color: "inherit" }}
                />
            </th>
            <td
                className={`px-2 py-3 w-1/6 border-r ${
                    fs !== null ? "bg-gray-100" : ""
                }`}
            >
                <input
                    type="number"
                    value={bs === null ? "" : bs}
                    onChange={handleChangeBs}
                    onBlur={handleBlur}
                    disabled={fs !== null || authority}
                    className={`w-full h-full text-center ${
                        fs !== null ? "bg-gray-100" : "bg-white"
                    }`}
                    style={{ color: "inherit" }}
                />
            </td>
            <td className="px-2 py-3 w-1/6 border-r">
                {ihValue !== null ? ihValue : ""}
            </td>
            <td
                className={`px-2 py-3 w-1/6 border-r ${
                    bs !== null ? "bg-gray-100" : ""
                }`}
            >
                <input
                    type="number"
                    value={fs === null ? "" : fs}
                    onChange={handleChangeFs}
                    onBlur={handleBlur}
                    disabled={bs !== null || authority}
                    className={`w-full h-full text-center ${
                        bs !== null ? "bg-gray-100" : "bg-white"
                    }`}
                    style={{ color: "inherit" }}
                />
            </td>
            <td className="px-2 py-3 w-1/6">
                <input
                    type="number"
                    value={gh === null ? "" : gh}
                    onBlur={handleBlur}
                    onChange={handleChangeGh}
                    disabled={fs !== null || authority}
                    className="w-full h-full text-center bg-white"
                    style={{ color: "inherit" }}
                />
            </td>
        </tr>
    );
};

export default SurveyingData;
