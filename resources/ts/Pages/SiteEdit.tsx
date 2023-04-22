import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../features/store";
import { AddModal } from "../Components/modules/Navbar/AddModal";
import { SiteEditNavbar } from "../Components/modules/Navbar/SiteEditNavbar";
import { SiteUserList } from "../Components/modules/SiteEdit/SiteUserList";
import { RemoveCheckModal } from "../Components/modules/SurveyingList/RemoveCheckModal";
import React, { useEffect } from "react";
import { fetchSiteMembers } from "../features/slice/SiteEditSlice";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

export const SiteEdit = ({ pageTitle }) => {
    const { siteId, siteName } = useParams<{
        siteId: string;
        siteName: string;
    }>();
    const selectedSiteId = parseInt(siteId, 10);
    const selectedSiteName = decodeURIComponent(siteName);

    const { removeModal, addUserModal } = useAppSelector(
        (state: RootState) => state.siteEdit
    );

    const dispatch = useAppDispatch();
    useEffect(() => {
        if (selectedSiteId) {
            dispatch(fetchSiteMembers(selectedSiteId));
        }
    }, []);

    return (
        <>
            <Helmet>
                <title>{pageTitle}</title>
            </Helmet>

            {addUserModal && <AddModal />}
            {removeModal.isOpen && <RemoveCheckModal />}
            <SiteEditNavbar selectedSiteName={selectedSiteName} />
            <SiteUserList />
        </>
    );
};
