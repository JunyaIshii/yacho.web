import { RootState } from "@frontend/store/store";
import { useAppSelector } from "@frontend/store/store-hooks";
import React from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";

export const useRoutes = () => {
    const { authToggle, userInfo } = useAppSelector(
        (state: RootState) => state.main
    );
    const { siteId } = useParams<{
        siteId: string;
    }>();
    const selectedSiteId = parseInt(siteId ?? "", 10);

    const AdminRoutes = () => {
        const authority = userInfo?.find((info) => {
            return info.siteId === selectedSiteId;
        })?.authority;
        const adminAuth = authority === 0;
        return adminAuth ? <Navigate to="/Menu" replace /> : <Outlet />;
    };

    const GuardRoutes = () => {
        return authToggle ? <Outlet /> : <Navigate to="/" replace />;
    };

    const LoginRoutes = () => {
        return authToggle ? <Navigate to="/Menu" replace /> : <Outlet />;
    };

    return { GuardRoutes, LoginRoutes, AdminRoutes };
};
