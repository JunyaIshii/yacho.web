import { AddModal } from "@frontend/components/AddModal";
import { RemoveCheckModal } from "@frontend/components/RemoveCheckModal";
import { AdminNavbar } from "@frontend/features/admin/component/AdminNavbar";
import { MemberList } from "@frontend/features/admin/component/MemberList";
import useAdmin from "@frontend/features/admin/hooks/useAdmin";
import { RootState } from "@frontend/store/store";
import { useAppSelector } from "@frontend/store/store-hooks";
import React from "react";
import { Helmet } from "react-helmet";

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
