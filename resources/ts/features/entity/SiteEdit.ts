type siteEditState = {
    addUserModal: boolean;
    removeModal: removeModal;
    authorityModal: boolean;
    siteMembers: siteMember[] | null;
    loading: boolean;
    error: string | null | undefined;
};

type removeModal = {
    isOpen: boolean;
    removeSiteMemberId: number;
};

type siteMember = {
    siteMemberId: number;
    userName: string;
    userEmail: string;
    authority: number;
};

export type { siteMember, removeModal, siteEditState };
