type surveyingData = {
    surveyingDataId: number;
    surveyingDataName: string | null;
    surveyingId: number;
    bs: number | null;
    fs: number | null;
    gh: number | null;
};

type surveyingDataState = {
    surveyingData: surveyingData[] | null;
    previousIh: number | null;
    loading: boolean;
    error: string | null | undefined;
};

export type { surveyingDataState, surveyingData };
