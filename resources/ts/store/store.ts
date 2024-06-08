import AdminReducer from "@frontend/features/admin/store/AdminStore";
import SurveyingDataReducer from "@frontend/features/data/store/SurveyingDataSlice";
import SurveyingListReducer from "@frontend/features/menu/store/SurveyingListSlice";
import { configureStore } from "@reduxjs/toolkit";
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
