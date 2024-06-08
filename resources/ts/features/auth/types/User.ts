type User = {
    userId: number | null;
    userName: string | null;
    email: string | null;
};

type loginUser = {
    userId: number | null;
    userName: string | null;
};

type mainState = {
    loginUser: loginUser;
    authToggle: boolean;
    addSiteModal: boolean;
    checkDropList: boolean;
    userInfo: userInfo[] | null;
    loading: boolean;
    error: string | null | undefined;
    selectedSite: selectedSite;
};

type userInfo = {
    siteId: number | null;
    siteName: string | null;
    siteMemberId: number | null;
    authority: number | null;
};

type selectedSite = {
    siteId: number | null;
    siteName: string | null;
};

export type { User, loginUser, mainState, userInfo, selectedSite };
