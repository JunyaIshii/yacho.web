export const VALIDATE_MESSAGE_REQUIRED = (name: string) => {
    return name + "は必須項目です。";
};

export const VALIDATE_MESSAGE_MAX_LENGTH = (name: string, max: number) => {
    return name + "は最大" + max + "で入力してください。";
};

export const VALIDATE_MESSAGE_PASSWORD_LINGTH =
    "パスワードは6~20文字で入力してください";

export const VALIDATE_MESSAGE_EMAIL_FORMAT =
    "メールアドレスの形式が正しくありません。";

export const VALIDATE_MESSAGE_LOGIN_FAILED =
    "メールアドレスまたはパスワードが間違っています。";

export const VALIDATE_MESSAGE_PASSWORD_NO_MATCH = "パスワードが一致しません";

export const UPDATE_NEW_PASSWORD = "新しいパスワードを設定しました";
