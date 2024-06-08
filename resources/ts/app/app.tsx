import { AppProvider } from "@frontend/app/AppProvider";
import { Loading } from "@frontend/components/Loading";
import { Admin } from "@frontend/features/admin/admin";
import { PasswordResetForm } from "@frontend/features/auth/PasswordResetForm";
import { Register } from "@frontend/features/auth/Register";
import { Surveying } from "@frontend/features/data/SurveyingData";
import { Menu } from "@frontend/features/menu/Menu";
import { Welcome } from "@frontend/features/Welcome";
import { useCheckLogin } from "@frontend/hooks/useCheckLogin";
import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Route, Routes } from "react-router-dom";
import "../../css/app.css";
import "../../js/bootstrap";
import { useRoutes } from "./routes/useRoutes";

const App = () => {
    const { GuardRoutes, LoginRoutes, AdminRoutes } = useRoutes();
    const isPending = useCheckLogin();
    if (isPending) {
        return <Loading />;
    }
    return (
        <Suspense fallback={<Loading />}>
            <Routes>
                <Route element={<LoginRoutes />}>
                    <Route path="/" element={<Welcome />} />
                    <Route path="/Register" element={<Register />} />
                </Route>
                <Route element={<GuardRoutes />}>
                    <Route path="/Menu" element={<Menu />} />
                    <Route
                        path="/SurveyingData/:surveyingListId/:surveyingListName"
                        element={<Surveying />}
                    />
                </Route>
                <Route element={<AdminRoutes />}>
                    <Route
                        path="/Admin/:siteId/:siteName"
                        element={<Admin />}
                    />
                </Route>
                <Route path="/reset-password" element={<PasswordResetForm />} />
            </Routes>
        </Suspense>
    );
};

const container = document.getElementById("app") as HTMLInputElement;
const root = createRoot(container);
root.render(
    <AppProvider>
        <App />
    </AppProvider>
);
