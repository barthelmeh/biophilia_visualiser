import getInstance from "./SetAxiosHeaders";
import { apiUrl } from "@/constants";

const LogIn = (username: string, password: string, setAdmin: (admin: Administrator) => void): Promise<any> => {

    return new Promise(function (resolve, reject) {
        const axiosWithoutAuth = getInstance(null);

        axiosWithoutAuth.post(`${apiUrl}/admin/login`, {username: username, password: password})
            .then((response) => {
                const id = parseInt(response.data.id, 10);

                const admin: Administrator = {
                    id,
                    username: username,
                    token: response.data.token as string
                };
                setAdmin(admin);
                
                resolve({status: true});
            }, (error) => {
                reject({ status: false, error: error });
            });
    });
}

export default LogIn;