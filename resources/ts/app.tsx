import "../js/bootstrap";
import "../css/app.css";
import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Welcome } from "./Pages/Welcome";
import { SiteEdit } from "./Pages/SiteEdit";
import { Surveying } from "./Pages/SurveyingData";
import { Menu } from "./Pages/Menu";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { RootState, store } from "./features/store";
import { Register } from "./Pages/Register";
import { QueryClient, QueryClientProvider } from "react-query";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { fetchUserInfo, isLogin, setUser } from "./features/slice/MainSlice";
import { CookiesProvider, useCookies } from "react-cookie";
import { PasswordResetForm } from "./Pages/PasswordResetForm";

const App = () => {
    const dispatch = useAppDispatch();
    const { authToggle, userInfo, selectedSite } = useAppSelector(
        (state: RootState) => state.main
    );

    const [isReady, setIsReady] = useState(false);

    const [cookies] = useCookies(["lrt"]);

    //クッキーに保存した値が存在する場合はそれを取得する
    useEffect(() => {
        if (cookies.lrt) {
            dispatch(isLogin());
            dispatch(setUser(cookies.lrt));
            dispatch(fetchUserInfo(cookies.lrt.id));
        }

        setIsReady(true);
    }, []);

    if (!isReady) {
        return null;
    }

    const GuardRoute = (props) => {
        if (!authToggle) {
            return <Redirect to="/" />;
        }
        return <Route {...props} />;
    };
    const LoginRoute = (props) => {
        if (authToggle) {
            return <Redirect to="/Menu" />;
        }
        return <Route {...props} />;
    };

    //現場編集画面ルート
    const authority = userInfo?.find((info) => {
        return info.siteId === selectedSite.siteId;
    })?.authority;

    const SiteEditRoute = (props) => {
        if (!authToggle) {
            return <Redirect to="/" />;
        }
        if (authority === 0 || selectedSite.siteId === null) {
            return <Redirect to="/Menu" />;
        }

        return <Route {...props} />;
    };

    return (
        <Switch>
            <Route path="/reset-password">
                <PasswordResetForm pageTitle={"パスワード再設定"} />
            </Route>
            <LoginRoute path="/Register">
                <Register pageTitle={"新規登録"} />
            </LoginRoute>
            <GuardRoute path="/Menu">
                <Menu pageTitle={"メニュー"} />
            </GuardRoute>
            <SiteEditRoute path="/SiteEdit/:siteId/:siteName">
                <SiteEdit pageTitle={"現場編集"} />
            </SiteEditRoute>
            <GuardRoute path="/SurveyingData/:surveyingListId/:surveyingName">
                <Surveying pageTitle={"測量データ"} />
            </GuardRoute>
            <LoginRoute path="/">
                <Welcome pageTitle={"野帳.web"} />
            </LoginRoute>
        </Switch>
    );
};
const container = document.getElementById("app") as HTMLInputElement;
const root = createRoot(container);
const defaultOptions = {
    queries: {
        retry: false, // クエリの再試行回数
    },
    mutations: {
        retry: false, // ミューテーションの再試行回数
    },
};
const queryClient = new QueryClient({ defaultOptions });
root.render(
    <BrowserRouter>
        <CookiesProvider>
            <QueryClientProvider client={queryClient}>
                <Provider store={store}>
                    <App />
                </Provider>
            </QueryClientProvider>
        </CookiesProvider>
    </BrowserRouter>
);
