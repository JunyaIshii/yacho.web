import React from "react";
import { Helmet } from "react-helmet";
import { AddModal } from "../../components/AddModal";
import { RemoveCheckModal } from "../../components/RemoveCheckModal";
import { RootState } from "../../store/store";
import { useAppSelector } from "../../store/store-hooks";
import { AdminNavbar } from "./component/AdminNavbar";
import { MemberList } from "./component/MemberList";
import useAdmin from "@frontend/features/admin/hooks/useAdmin";

export const Admin = () => {
    useAdmin();
    const { removeModal, addUserModal } = useAppSelector(
        (state: RootState) => state.admin
    );

    return (
        <>
            <Helmet>
                <title>現場編集</title>
            </Helmet>

            {addUserModal && <AddModal />}
            {removeModal.isOpen && <RemoveCheckModal />}
            <AdminNavbar />
            <MemberList />
        </>
    );
};
