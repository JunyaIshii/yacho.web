import { resetState } from "@frontend/store/ResetState";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { surveyingList, surveyingListState } from "../types/SurveyingList";

const initialState: surveyingListState = {
    surveyingList: null,
    removeModal: {
        isOpen: false,
        removeSurveyingListId: -1,
    },
    searchValue: "",
    sortSurveyingList: null,
    loading: false,
    error: null,
};

export const createSurveyingList = createAsyncThunk(
    "surveyingList/createSurveyingList",
    async (siteMemberId: number) => {
        const { data } = await axios.post("/api/surveyingList/store", {
            site_member_id: siteMemberId,
        });
        return data;
    }
);

export const fetchSurveyingList = createAsyncThunk(
    "surveyingList/fetchSurveyingList",
    async (siteId: number) => {
        const { data } = await axios.get(`/api/surveyingList/${siteId}`, {
            params: {
                site_id: siteId,
            },
        });
        return data;
    }
);

export const updateSurveyingList = createAsyncThunk(
    "surveyingList/updateSurveyingList",
    async ({
        surveyingListId,
        editSurveyingName,
        editWeather,
    }: {
        surveyingListId: number;
        editSurveyingName: string;
        editWeather: number;
    }) => {
        const { data } = await axios.post("/api/surveyingList/update", {
            id: surveyingListId,
            surveying_name: editSurveyingName,
            weather: editWeather,
        });
        return data;
    }
);

export const removeSurveyingList = createAsyncThunk(
    "surveyingList/removeSurveyingList",
    async ({
        removeSurveyingListId,
        siteId,
    }: {
        removeSurveyingListId: number;
        siteId: number;
    }) => {
        const { data } = await axios.post("/api/surveyingList/destroy", {
            id: removeSurveyingListId,
            site_id: siteId,
        });
        return data;
    }
);

const surveyingListSlice = createSlice({
    name: "surveyingList",
    initialState,
    reducers: {
        openRemoveModal: (state, actions) => {
            state.removeModal.isOpen = true;
            state.removeModal.removeSurveyingListId = actions.payload;
        },
        closeRemoveModal: (state) => {
            state.removeModal.isOpen = false;
            state.removeModal.removeSurveyingListId = -1;
        },
        setSearchValue: (state, actions) => {
            state.searchValue = actions.payload;
            if (actions.payload === "" && state.surveyingList) {
                state.sortSurveyingList = state.surveyingList;
            }
        },
        searchDone: (state) => {
            state.searchValue = state.searchValue.trim();
            const searchedSL = state.surveyingList?.filter(
                (surveying: surveyingList) => {
                    if (surveying !== null) {
                        return surveying.surveyingName?.includes(
                            state.searchValue
                        );
                    }
                }
            );

            if (typeof searchedSL !== "undefined") {
                state.sortSurveyingList = searchedSL;
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(resetState, () => {
            return initialState;
        });

        builder
            //createSurveyingListが成功した場合
            .addCase(createSurveyingList.fulfilled, (state, action) => {
                state.surveyingList = action.payload;
                state.sortSurveyingList = action.payload;
                state.loading = false;
                state.error = null;
            })
            //createSurveyingListが失敗した場合
            .addCase(createSurveyingList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            //createSurveyingListが実行中の場合
            .addCase(createSurveyingList.pending, (state) => {
                state.error = null;
            });
        builder
            //fetchSurveyingListが成功した場合
            .addCase(fetchSurveyingList.fulfilled, (state, action) => {
                state.surveyingList = action.payload;
                state.sortSurveyingList = action.payload;
                state.loading = false;
                state.error = null;
            })
            //fetchSurveyingListが失敗した場合
            .addCase(fetchSurveyingList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            //fetchSurveyingListが実行中の場合
            .addCase(fetchSurveyingList.pending, (state) => {
                state.error = null;
            });
        builder
            //updateSurveyingListが成功した場合
            .addCase(updateSurveyingList.fulfilled, (state, action) => {
                state.surveyingList = action.payload;
                state.sortSurveyingList = action.payload;
                state.loading = false;
                state.error = null;
            })
            //updateSurveyingListが失敗した場合
            .addCase(updateSurveyingList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            //updateSurveyingListが実行中の場合
            .addCase(updateSurveyingList.pending, (state) => {
                state.loading = true;
                state.error = null;
            });
        builder
            //removeSurveyingListが成功した場合
            .addCase(removeSurveyingList.fulfilled, (state, action) => {
                state.surveyingList = action.payload;
                state.sortSurveyingList = action.payload;
                state.loading = false;
                state.error = null;
            })
            //removeSurveyingListが失敗した場合
            .addCase(removeSurveyingList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            //removeSurveyingListが実行中の場合
            .addCase(removeSurveyingList.pending, (state) => {
                state.error = null;
            });
    },
});

export const { openRemoveModal, closeRemoveModal, setSearchValue, searchDone } =
    surveyingListSlice.actions;
export default surveyingListSlice.reducer;
