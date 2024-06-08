import { SurveyingDataRowProps } from "@frontend/features/data/components/SurveyingDataRow";
import { updateSurveyingData } from "@frontend/features/data/store/SurveyingDataSlice";
import { useAppDispatch } from "@frontend/store/store-hooks";
import { useEffect, useState } from "react";

function useSurveyingDataRow(props: SurveyingDataRowProps) {
    const { data, index, authority, ihValue, onIhValuesChange } = props;
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

    //inputタグからフォーカスが外れた際にdbの更新を行う
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

    return {
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
    };
}

export default useSurveyingDataRow;
