import {
    VALIDATE_MESSAGE_EMAIL_FORMAT,
    VALIDATE_MESSAGE_MAX_LENGTH,
    VALIDATE_MESSAGE_REQUIRED,
} from "@frontend/config/messages";
import { FieldErrors, FieldValues } from "react-hook-form";

export const VALIDATE_EMAIL_PATTERN = {
    required: true,
    pattern: /^\S+@\S+\.\S+$/,
    maxLength: 255,
};
export const emailErrorMessage = (errors: FieldErrors<FieldValues>) => {
    return errors?.email?.type === "required"
        ? VALIDATE_MESSAGE_REQUIRED("メールアドレス")
        : errors?.email?.type === "pattern"
        ? VALIDATE_MESSAGE_EMAIL_FORMAT
        : VALIDATE_MESSAGE_MAX_LENGTH("メールアドレス", 255);
};

export const VALIDATE_SITE_NAME_PATTERN = {
    required: true,
    maxLength: 255,
};
export const siteNameErrorMessage = (errors: FieldErrors<FieldValues>) => {
    return errors?.siteName?.type === "required"
        ? VALIDATE_MESSAGE_REQUIRED("現場名")
        : VALIDATE_MESSAGE_MAX_LENGTH("現場名", 255);
};

export const VALIDATE_PASSWORD_PATTERN = {
    required: true,
    minLength: 6,
    maxLength: 20,
};
export const passwordErrorMessage = (errors: FieldErrors<FieldValues>) => {
    return errors?.password?.type === "required"
        ? "パスワードは必須項目です"
        : "パスワードは6~20文字で入力してください";
};
export const passwordConfirmErrorMessage = (
    errors: FieldErrors<FieldValues>
) => {
    return errors?.password_confirmation?.type === "required"
        ? "パスワード確認は必須項目です"
        : "パスワードが一致しません";
};

export const VALIDATE_USER_NAME_PATTERN = {
    required: true,
    maxLength: 255,
};
export const userNameErrorMessage = (errors: FieldErrors<FieldValues>) => {
    return errors?.name?.type === "required"
        ? VALIDATE_MESSAGE_REQUIRED("お名前")
        : VALIDATE_MESSAGE_MAX_LENGTH("お名前", 255);
};
