import SurveyingList from "../Components/modules/SurveyingList/SurveyingList";
import { RemoveCheckModal } from "../Components/modules/SurveyingList/RemoveCheckModal";
import { RootState } from "../features/store";
import MenuNavbar from "../Components/modules/Navbar/MenuNavbar";
import { AddModal } from "../Components/modules/Navbar/AddModal";
import { useAppSelector } from "../app/hooks";
import React from "react";
import { Helmet } from "react-helmet";

export const Menu = ({ pageTitle }) => {
    const { removeModal } = useAppSelector(
        (state: RootState) => state.surveyingList
    );
    const { addSiteModal, selectedSite } = useAppSelector(
        (state: RootState) => state.main
    );

    return (
        <>
            <Helmet>
                <title>{pageTitle}</title>
            </Helmet>
            {removeModal.isOpen && <RemoveCheckModal />}
            {addSiteModal && <AddModal />}
            <MenuNavbar />
            {selectedSite.siteId && <SurveyingList />}
        </>
    );
};
