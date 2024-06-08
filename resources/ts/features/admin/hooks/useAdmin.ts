import { fetchSiteMembers } from "@frontend/features/admin/store/AdminStore";
import { useAppDispatch } from "@frontend/store/store-hooks";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function useAdmin() {
    const { siteId } = useParams<{
        siteId: string;
    }>();
    const selectedSiteId = parseInt(siteId ?? "", 10);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (selectedSiteId) {
            dispatch(fetchSiteMembers(selectedSiteId));
        }
    }, [selectedSiteId]);
}

export default useAdmin;
