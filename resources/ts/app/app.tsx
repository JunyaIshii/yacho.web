import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Route, Routes } from "react-router-dom";
import "../../css/app.css";
import "../../js/bootstrap";
import { Loading } from "../components/Loading";
import { Admin } from "../features/admin/admin";
import { PasswordResetForm } from "../features/auth/PasswordResetForm";
import { Register } from "../features/auth/Register";
import { Surveying } from "../features/data/SurveyingData";
import { Menu } from "../features/menu/Menu";
import { Welcome } from "../features/Welcome";
import { useCheckLogin } from "../hooks/useCheckLogin";
import { AppProvider } from "./AppProvider";
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
