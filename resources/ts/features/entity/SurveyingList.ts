export type surveyingListState = {
    surveyingList: surveyingList[] | null;
    removeModal: removeModal;
    searchValue: string;
    sortSurveyingList: surveyingList[] | null;
    loading: boolean;
    error: string | null | undefined;
};

export type surveyingList = {
    surveyingListId: number;
    surveyingName: string;
    weather: number;
    author: number; //作成者、site_member_id
    authorName: string;
    createdAt: string;
};

type removeModal = {
    isOpen: boolean;
    removeSurveyingListId: number;
};
