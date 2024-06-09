import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../../store/store-hooks";
import { fetchSiteMembers } from "../store/AdminStore";

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
