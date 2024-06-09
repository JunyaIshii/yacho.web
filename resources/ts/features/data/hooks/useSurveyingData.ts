import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RootState } from "../../../store/store";
import { useAppDispatch, useAppSelector } from "../../../store/store-hooks";
import { userInfo } from "../../auth/types/User";
import { surveyingList } from "../../menu/types/SurveyingList";
import { fetchSurveyingData } from "../store/SurveyingDataSlice";

function useSurveyingData() {
    const dispatch = useAppDispatch();

    const { surveyingListId } = useParams<{
        surveyingListId: string;
    }>();
    const selectedSurveyingListId = parseInt(surveyingListId ?? "", 10);

    const { surveyingData } = useAppSelector(
        (state: RootState) => state.surveyingData
    );
    const { surveyingList } = useAppSelector(
        (state: RootState) => state.surveyingList
    );

    const [ihValues, setIhValues] = useState<(number | null)[]>([]);

    useEffect(() => {
        dispatch(fetchSurveyingData(selectedSurveyingListId));
    }, []);

    //surveyingDataの更新があった場合にihの値を再計算し、反映させる
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

    //編集権限の可否を確認
    const { selectedSite } = useAppSelector((state: RootState) => state.main);
    const { userInfo } = useAppSelector((state: RootState) => state.main);
    const selectedSiteMember = userInfo?.find((info: userInfo) => {
        return info.siteId === selectedSite?.siteId;
    });
    const author = surveyingList?.find((surveying: surveyingList) => {
        return surveying.surveyingListId === selectedSurveyingListId;
    })?.author;

    const authority = author !== selectedSiteMember?.siteMemberId;

    return { surveyingData, authority, ihValues, handleIhValuesChange };
}

export default useSurveyingData;
