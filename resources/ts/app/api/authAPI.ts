import axios from "axios";

// export const http = axios.create({
//     baseURL: "http://localhost",
//     withCredentials: true,
// });

const register = async ({
    name,
    email,
    password,
}: {
    name: string;
    email: string;
    password: string;
}) => {
    const { data } = await axios.post("register", {
        name,
        email,
        password,
    });
    return data;
};
const login = async ({
    email,
    password,
}: {
    email: string;
    password: string;
}) => {
    const { data } = await axios.post("login", { email, password });
    return data;
};

const logout = async () => {
    const { data } = await axios.post("logout");
    return data;
};

export { register, login, logout };
