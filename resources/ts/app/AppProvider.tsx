import { store } from "@frontend/store/store";
import React from "react";
import { CookiesProvider } from "react-cookie";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

type AppProvider = {
    children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProvider) => {
    const defaultOptions = {
        queries: {
            retry: false, // クエリの再試行回数
        },
        mutations: {
            retry: false, // ミューテーションの再試行回数
        },
    };
    const queryClient = new QueryClient({ defaultOptions });
    return (
        <BrowserRouter>
            <CookiesProvider>
                <QueryClientProvider client={queryClient}>
                    <Provider store={store}>{children}</Provider>
                </QueryClientProvider>
            </CookiesProvider>
        </BrowserRouter>
    );
};
