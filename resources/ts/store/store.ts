import { configureStore } from "@reduxjs/toolkit";
import AdminReducer from "../features/admin/store/AdminStore";
import SurveyingDataReducer from "../features/data/store/SurveyingDataSlice";
import SurveyingListReducer from "../features/menu/store/SurveyingListSlice";
import MainReducer from "./MainSlice";

export const store = configureStore({
    reducer: {
        surveyingList: SurveyingListReducer,
        main: MainReducer,
        surveyingData: SurveyingDataReducer,
        admin: AdminReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
