import { configureStore } from "@reduxjs/toolkit";
import SurveyingListReducer from "./slice/SurveyingListSlice";
import SurveyingDataReducer from "./slice/SurveyingDataSlice";
import siteEditReducer from "./slice/SiteEditSlice";
import MainReducer from "./slice/MainSlice";

export const store = configureStore({
    reducer: {
        surveyingList: SurveyingListReducer,
        main: MainReducer,
        surveyingData: SurveyingDataReducer,
        siteEdit: siteEditReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
