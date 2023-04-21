export type surveyingData = {
    surveyingDataId: number;
    surveyingDataName: string | null;
    surveyingId: number;
    bs: number | null;
    fs: number | null;
    gh: number | null;
};

export type surveyingDataState = {
    surveyingData: surveyingData[] | null;
    selectedSurveyingList: selectedSurveyingList | null;
    previousIh: number | null;
    loading: boolean;
    error: string | null | undefined;
};

type selectedSurveyingList = {
    surveyingListId: number;
    surveyingName: string;
};
