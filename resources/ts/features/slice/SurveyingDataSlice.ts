import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { surveyingDataState } from "../entity/SurveyingData";
import { resetState } from "./ResetState";

const initialState: surveyingDataState = {
    surveyingData: null,
    selectedSurveyingList: null,
    previousIh: null,
    loading: false,
    error: null,
};

export const fetchSurveyingData = createAsyncThunk(
    "surveyingData/fetchSurveyingData",
    async (surveyingListId: number) => {
        const { data } = await axios.get(
            `/api/surveyingData/${surveyingListId}`,
            {
                params: {
                    surveying_list_id: surveyingListId,
                },
            }
        );
        return data;
    }
);

export const updateSurveyingData = createAsyncThunk(
    "surveyingData/updateSurveyingData",
    async ({
        surveyingDataId,
        surveyingDataName,
        bs,
        fs,
        gh,
    }: {
        surveyingDataId: number | null;
        surveyingDataName: string | null;
        bs: number | null;
        fs: number | null;
        gh: number | null;
    }) => {
        const { data } = await axios.post("/api/surveyingData/update", {
            id: surveyingDataId,
            surveying_data_name: surveyingDataName,
            bs,
            fs,
            gh,
        });
        return data;
    }
);

const surveyingDataSlice = createSlice({
    name: "surveyingData",
    initialState,
    reducers: {
        selectSurveyingList: (state, actions) => {
            state.selectedSurveyingList = actions.payload;
        },
        resetSurveyingData: (state) => {
            return initialState;
        },
        setPreviousIh: (state, actions) => {
            state.previousIh = actions.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(resetState, () => {
            return initialState;
        });
        builder
            //fetchSurveyingDataが成功した場合
            .addCase(fetchSurveyingData.fulfilled, (state, action) => {
                state.surveyingData = action.payload;
                state.loading = false;
                state.error = null;
            })
            //fetchSurveyingDataが失敗した場合
            .addCase(fetchSurveyingData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                console.log(state.error);
            })
            //fetchSurveyingDataが実行中の場合
            .addCase(fetchSurveyingData.pending, (state) => {
                state.loading = true;
                state.error = null;
            });
        builder
            //updateSurveyingDataが成功した場合
            .addCase(updateSurveyingData.fulfilled, (state, action) => {
                state.surveyingData = action.payload;
                state.loading = false;
                state.error = null;
            })
            //updateSurveyingDataが失敗した場合
            .addCase(updateSurveyingData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                console.log(state.error);
            })
            //updateSurveyingDataが実行中の場合
            .addCase(updateSurveyingData.pending, (state) => {
                state.loading = true;
                state.error = null;
            });
    },
});

export const { resetSurveyingData, selectSurveyingList, setPreviousIh } =
    surveyingDataSlice.actions;
export default surveyingDataSlice.reducer;
