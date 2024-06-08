import { AddModal } from "@frontend/components/AddModal";
import { RemoveCheckModal } from "@frontend/components/RemoveCheckModal";
import MenuNavbar from "@frontend/features/menu/components/MenuNavbar";
import SurveyingList from "@frontend/features/menu/components/SurveyingList";
import { RootState } from "@frontend/store/store";
import { useAppSelector } from "@frontend/store/store-hooks";
import React from "react";
import { Helmet } from "react-helmet";

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
