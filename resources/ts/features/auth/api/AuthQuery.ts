import { AxiosError } from "axios";
import { useCookies } from "react-cookie";
import { useMutation } from "react-query";
import {
    fetchUserInfo,
    isLogin,
    isLogout,
    removeUser,
    removeUserInfo,
    setError,
    setUser,
} from "../../../store/MainSlice";
import { useAppDispatch } from "../../../store/store-hooks";
import { login, logout, register } from "./authAPI";
import { SESSION_KEY } from "../../../config/initialize";
import { VALIDATE_MESSAGE_LOGIN_FAILED } from "../../../config/messages";

interface ErrorResponse {
    message: string;
}

const isErrorResponse = (obj: any): obj is ErrorResponse => {
    return obj && typeof obj.message === "string";
};

const useRegister = () => {
    const dispatch = useAppDispatch();
    const [cookies, setCookie] = useCookies([SESSION_KEY]);
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    return useMutation(register, {
        onSuccess: (user: any) => {
            dispatch(isLogin());
            dispatch(setUser(user.user));
            dispatch(fetchUserInfo(user.user.id));
            setCookie(SESSION_KEY, user.user, { expires });
        },
        onError: (error: AxiosError) => {
            if (isErrorResponse(error.response?.data)) {
                dispatch(setError(error.response?.data.message));
            } else {
                dispatch(setError("ネットワークエラー"));
            }
            throw error.response;
        },
    });
};

const useLogin = () => {
    const dispatch = useAppDispatch();
    const [cookies, setCookie] = useCookies([SESSION_KEY]);
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    return useMutation(login, {
        onSuccess: (user) => {
            dispatch(isLogin());
            dispatch(setUser(user.user));
            dispatch(fetchUserInfo(user.user.id));
            setCookie(SESSION_KEY, user.user, { expires });
        },
        onError: () => {
            dispatch(setError(VALIDATE_MESSAGE_LOGIN_FAILED));
        },
    });
};

const useLogout = () => {
    const dispatch = useAppDispatch();
    const [cookies, setCookie, removeCookie] = useCookies([SESSION_KEY]);

    return useMutation(logout, {
        onSuccess: () => {
            dispatch(isLogout());
            dispatch(removeUser());
            dispatch(removeUserInfo());
            removeCookie(SESSION_KEY);
        },
    });
};

export { useLogin, useLogout, useRegister };
