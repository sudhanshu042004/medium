import axios from 'axios';
import { useState } from 'react'
const url = import.meta.env.VITE_API_URL;

const useUserData = (endpoint: string) => {
    const [userData, setUserData] = useState({});
    const [err, setErr] = useState({});
    const [userLoading, setUserLoading] = useState<boolean>(true);

    const postData = (data:any) => {
        axios({
            method: "Post",
            url: `${url}/${endpoint}`,
            data: JSON.stringify(data)
        })
            .then(function (response) {
                setUserData(response.data);
            })
            .catch((e) => {
                setErr(e.response.data)
            })
            .finally(() => {
                setUserLoading(false);
            })
    }


    return { userData, userLoading, err, postData };
}

export default useUserData