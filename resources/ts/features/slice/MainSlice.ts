import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { mainState, userInfo } from "../entity/User";
import { resetState } from "./ResetState";

const initialState: mainState = {
    loginUser: {
        userId: null,
        userName: null,
    },
    authToggle: false,
    addSiteModal: false,
    checkDropList: false,
    userInfo: null,
    loading: false,
    error: null,
    selectedSite: {
        siteId: null,
        siteName: null,
    },
};

export const fetchUserInfo = createAsyncThunk(
    "main/fetchUserInfo",
    async (userId: number) => {
        const { data } = await axios.get(`/api/member/${userId}`, {
            params: { user_id: userId },
        });
        return data;
    }
);

export const createSite = createAsyncThunk(
    "main/createSite",
    async ({ siteName, userId }: { siteName: string; userId: number }) => {
        const { data } = await axios.post("/api/site/store", {
            site_name: siteName,
            user_id: userId,
        });
        return data;
    }
);

const mainSlice = createSlice({
    name: "main",
    initialState,
    reducers: {
        isLogin: (state) => {
            state.authToggle = true;
        },
        isLogout: (state) => {
            state.authToggle = false;
        },
        setUser: (state, actions) => {
            state.loginUser.userId = actions.payload.id;
            state.loginUser.userName = actions.payload.name;
        },
        removeUser: (state) => {
            state.loginUser.userId = null;
            state.loginUser.userName = null;
        },
        removeUserInfo: (state) => {
            state.userInfo = null;
        },
        selectSite: (state, actions) => {
            const siteId = actions.payload;
            if (state.userInfo) {
                const selectSite = state.userInfo.find((info: userInfo) => {
                    return info.siteId === Number(siteId);
                });
                if (
                    state.selectedSite &&
                    selectSite?.siteId &&
                    selectSite.siteName
                ) {
                    state.selectedSite.siteId = selectSite.siteId;
                    state.selectedSite.siteName = selectSite.siteName;
                }
            }
        },
        openAddSiteModal: (state) => {
            state.addSiteModal = true;
        },
        closeAddSiteModal: (state) => {
            state.addSiteModal = false;
        },
        openDropList: (state) => {
            state.checkDropList = true;
        },
        closeDropList: (state) => {
            state.checkDropList = false;
        },

        setError: (state, actions) => {
            state.error = actions.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(resetState, () => {
            return initialState;
        });
        builder
            // fetchUserInfoが成功した場合
            .addCase(fetchUserInfo.fulfilled, (state, action) => {
                state.userInfo = action.payload;
                state.loading = false;
                state.error = null;
            })
            // fetchUserInfoが失敗した場合
            .addCase(fetchUserInfo.rejected, (state, action) => {
                state.userInfo = null;
                state.loading = false;
                state.error = action.error.message;
            })
            // fetchUserInfoが実行中の場合
            .addCase(fetchUserInfo.pending, (state) => {
                state.userInfo = null;
                state.loading = true;
                state.error = null;
            });
        builder
            //createSiteが成功した場合
            .addCase(createSite.fulfilled, (state, action) => {
                if (action.payload.length > 0) {
                    let maxSiteIdUserInfo = action.payload.reduce(
                        (prev, current) => {
                            return prev.siteId > current.siteId
                                ? prev
                                : current;
                        }
                    );

                    let siteId = maxSiteIdUserInfo.siteId;
                    let siteName = maxSiteIdUserInfo.siteName;
                    state.selectedSite = { siteId, siteName };
                }
                state.userInfo = action.payload;
                state.addSiteModal = false;
                state.loading = false;
                state.error = null;
            })
            //createSiteが失敗した場合
            .addCase(createSite.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            //createSiteが実行中の場合
            .addCase(createSite.pending, (state) => {
                state.loading = true;
                state.error = null;
            });
    },
});

export const {
    isLogin,
    isLogout,
    setUser,
    removeUser,
    removeUserInfo,
    selectSite,
    openAddSiteModal,
    openDropList,
    closeDropList,
    closeAddSiteModal,
    setError,
} = mainSlice.actions;
export default mainSlice.reducer;
