import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { SESSION_KEY } from "../config/initialize";
import { isLogin, setUser, fetchUserInfo } from "../store/MainSlice";
import { useAppDispatch } from "../store/store-hooks";

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
