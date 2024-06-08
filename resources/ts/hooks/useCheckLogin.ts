import { SESSION_KEY } from "@frontend/config/initialize";
import { fetchUserInfo, isLogin, setUser } from "@frontend/store/MainSlice";
import { useAppDispatch } from "@frontend/store/store-hooks";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export const useCheckLogin = () => {
    const dispatch = useAppDispatch();
    const [isPending, setIsPending] = useState(true);
    const [cookies] = useCookies([SESSION_KEY]);

    //クッキーに保存した値が存在する場合はそれを取得する
    useEffect(() => {
        if (cookies[SESSION_KEY]) {
            dispatch(isLogin());
            dispatch(setUser(cookies[SESSION_KEY]));
            dispatch(fetchUserInfo(cookies[SESSION_KEY].id));
        }
        setIsPending(false);
    }, []);
    return isPending;
};
