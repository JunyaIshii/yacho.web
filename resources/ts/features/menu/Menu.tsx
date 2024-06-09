import React from "react";
import { Helmet } from "react-helmet";
import { AddModal } from "../../components/AddModal";
import { RemoveCheckModal } from "../../components/RemoveCheckModal";
import { RootState } from "../../store/store";
import { useAppSelector } from "../../store/store-hooks";
import MenuNavbar from "./components/MenuNavbar";
import SurveyingList from "./components/SurveyingList";

export const Menu = () => {
    const { removeModal } = useAppSelector(
        (state: RootState) => state.surveyingList
    );
    const { addSiteModal, selectedSite } = useAppSelector(
        (state: RootState) => state.main
    );

    return (
        <>
            <Helmet>
                <title>メニュー</title>
            </Helmet>
            {removeModal.isOpen && <RemoveCheckModal />}
            {addSiteModal && <AddModal />}
            <MenuNavbar />
            {selectedSite.siteId && <SurveyingList />}
        </>
    );
};
