import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../features/store";
import { AddModal } from "../Components/modules/Navbar/AddModal";
import { SiteEditNavbar } from "../Components/modules/Navbar/SiteEditNavbar";
import { SiteUserList } from "../Components/modules/SiteEdit/SiteUserList";
import { RemoveCheckModal } from "../Components/modules/SurveyingList/RemoveCheckModal";
import React, { useEffect } from "react";
import { fetchSiteMembers } from "../features/slice/SiteEditSlice";
import { Helmet } from "react-helmet";

export const SiteEdit = ({ pageTitle }) => {
    const { removeModal, addUserModal } = useAppSelector(
        (state: RootState) => state.siteEdit
    );
    const { selectedSite } = useAppSelector((state: RootState) => state.main);

    const dispatch = useAppDispatch();
    useEffect(() => {
        if (selectedSite.siteId) {
            dispatch(fetchSiteMembers(selectedSite.siteId));
        }
    }, [selectedSite.siteId]);

    return (
        <>
            <Helmet>
                <title>{pageTitle}</title>
            </Helmet>

            {addUserModal && <AddModal />}
            {removeModal.isOpen && <RemoveCheckModal />}
            <SiteEditNavbar />
            <SiteUserList />
        </>
    );
};
