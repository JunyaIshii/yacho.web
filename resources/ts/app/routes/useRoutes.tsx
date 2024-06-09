import React from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";
import { userInfo } from "../../features/auth/types/User";
import { RootState } from "../../store/store";
import { useAppSelector } from "../../store/store-hooks";

export const useRoutes = () => {
    const { authToggle, userInfo } = useAppSelector(
        (state: RootState) => state.main
    );
    const { siteId } = useParams<{
        siteId: string;
    }>();
    const selectedSiteId = parseInt(siteId ?? "", 10);

    const AdminRoutes = () => {
        const authority = userInfo?.find((info: userInfo) => {
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
