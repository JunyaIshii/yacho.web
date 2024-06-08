type AdminState = {
    addUserModal: boolean;
    removeModal: RemoveModal;
    authorityModal: boolean;
    siteMembers: SiteMember[] | null;
    loading: boolean;
    error: string | null | undefined;
};

type RemoveModal = {
    isOpen: boolean;
    removeSiteMemberId: number;
};

type SiteMember = {
    siteMemberId: number;
    userName: string;
    userEmail: string;
    authority: number;
};

export type { AdminState, RemoveModal, SiteMember };
