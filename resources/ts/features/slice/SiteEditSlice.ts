import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { siteEditState } from "../entity/SiteEdit";
import { resetState } from "./ResetState";

const initialState: siteEditState = {
    addUserModal: false,
    removeModal: {
        isOpen: false,
        removeSiteMemberId: -1,
    },
    authorityModal: false,
    siteMembers: null,
    loading: false,
    error: null,
};

export const fetchSiteMembers = createAsyncThunk(
    "siteEdit/fetchSiteMembers",
    async (siteId: number) => {
        const { data } = await axios.get(`/api/siteMembers/${siteId}`, {
            params: { site_id: siteId },
        });
        return data;
    }
);

export const createSiteMember = createAsyncThunk(
    "siteEdit/createSiteMember",
    async ({ email, siteId }: { email: string; siteId: number }, thunkAPI) => {
        try {
            const { data } = await axios.post("/api/siteMember/store", {
                email: email,
                site_id: siteId,
            });
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
);
export const updateSiteMember = createAsyncThunk(
    "siteEdit/updateSiteMember",
    async ({
        siteMemberId,
        updateAuthority,
    }: {
        siteMemberId: number;
        updateAuthority: number;
    }) => {
        const { data } = await axios.post("/api/siteMember/update", {
            id: siteMemberId,
            authority: updateAuthority,
        });
        return data;
    }
);

export const removeSiteMember = createAsyncThunk(
    "siteEdit/removeSiteMember",
    async ({
        removeSiteMemberId,
        siteId,
    }: {
        removeSiteMemberId: number;
        siteId: number;
    }) => {
        const { data } = await axios.post("/api/siteMember/destroy", {
            site_member_id: removeSiteMemberId,
            site_id: siteId,
        });
        return data;
    }
);

const SiteEditSlice = createSlice({
    name: "siteEdit",
    initialState,
    reducers: {
        setError: (state, actions) => {
            state.error = actions.payload;
        },
        resetSiteEdit: () => {
            return initialState;
        },
        openAddUserModal: (state) => {
            state.addUserModal = true;
        },
        closeAddUserModal: (state) => {
            state.addUserModal = false;
        },
        openRemoveUserModal: (state, actions) => {
            state.removeModal.isOpen = true;
            state.removeModal.removeSiteMemberId = actions.payload;
        },
        closeRemoveUserModal: (state) => {
            state.removeModal.isOpen = false;
            state.removeModal.removeSiteMemberId = -1;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(resetState, () => {
            return initialState;
        });
        builder
            // fetchSiteMembersが成功した場合
            .addCase(fetchSiteMembers.fulfilled, (state, action) => {
                state.siteMembers = action.payload;
                state.loading = false;
                state.error = null;
            })
            // fetchSiteMembersが失敗した場合
            .addCase(fetchSiteMembers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // fetchSiteMembersが実行中の場合
            .addCase(fetchSiteMembers.pending, (state) => {
                state.loading = true;
                state.error = null;
            });
        builder
            // createSiteMemberが成功した場合
            .addCase(createSiteMember.fulfilled, (state, action) => {
                state.siteMembers = action.payload;
                state.addUserModal = false;
                state.loading = false;
                state.error = null;
            })
            // createSiteMemberが失敗した場合
            .addCase(createSiteMember.rejected, (state, action) => {
                state.loading = false;
                if (action.payload) {
                    const payload = action.payload as string;
                    state.error = payload;
                } else {
                    state.error = action.error.message;
                }
            })
            // createSiteMemberが実行中の場合
            .addCase(createSiteMember.pending, (state) => {
                state.loading = true;
                state.error = null;
            });
        builder
            // updateSiteMemberが成功した場合
            .addCase(updateSiteMember.fulfilled, (state, action) => {
                state.siteMembers = action.payload;
                state.loading = false;
                state.error = null;
            })
            // updateSiteMemberが失敗した場合
            .addCase(updateSiteMember.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // updateSiteMemberが実行中の場合
            .addCase(updateSiteMember.pending, (state) => {
                state.loading = true;
                state.error = null;
            });
        builder
            // removeSiteMemberが成功した場合
            .addCase(removeSiteMember.fulfilled, (state, action) => {
                state.siteMembers = action.payload;
                state.loading = false;
                state.error = null;
            })
            // removeSiteMemberが失敗した場合
            .addCase(removeSiteMember.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // removeSiteMemberが実行中の場合
            .addCase(removeSiteMember.pending, (state) => {
                state.loading = true;
                state.error = null;
            });
    },
});

export const {
    setError,
    resetSiteEdit,
    openAddUserModal,
    closeAddUserModal,
    openRemoveUserModal,
    closeRemoveUserModal,
} = SiteEditSlice.actions;
export default SiteEditSlice.reducer;
