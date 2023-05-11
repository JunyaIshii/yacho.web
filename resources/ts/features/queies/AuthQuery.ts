import { AxiosError } from "axios";
import { useCookies } from "react-cookie";
import { useMutation } from "react-query";
import { login, logout, register } from "../../app/api/authAPI";
import { useAppDispatch } from "../../app/hooks";
import {
    fetchUserInfo,
    isLogin,
    isLogout,
    removeUser,
    setUser,
    removeUserInfo,
    setError,
} from "../slice/MainSlice";

interface ErrorResponse {
    message: string;
}

const isErrorResponse = (obj: any): obj is ErrorResponse => {
    return obj && typeof obj.message === "string";
};

const useRegister = () => {
    const dispatch = useAppDispatch();
    const [cookies, setCookie] = useCookies(["lrt"]);
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    return useMutation(register, {
        onSuccess: (user) => {
            dispatch(isLogin());
            dispatch(setUser(user.user));
            dispatch(fetchUserInfo(user.user.id));
            setCookie("lrt", user.user, { expires });
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
    const [cookies, setCookie] = useCookies(["lrt"]);
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    return useMutation(login, {
        onSuccess: (user) => {
            dispatch(isLogin());
            dispatch(setUser(user.user));
            dispatch(fetchUserInfo(user.user.id));
            setCookie("lrt", user.user, { expires });
        },
        onError: () => {
            dispatch(
                setError(" メールアドレスまたはパスワードが間違っています")
            );
        },
    });
};

const useLogout = () => {
    const dispatch = useAppDispatch();
    const [cookies, setCookie, removeCookie] = useCookies(["lrt"]);

    return useMutation(logout, {
        onSuccess: () => {
            dispatch(isLogout());
            dispatch(removeUser());
            dispatch(removeUserInfo());
            removeCookie("lrt");
        },
    });
};

export { useRegister, useLogin, useLogout };
