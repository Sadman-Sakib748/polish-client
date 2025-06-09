import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";


const axiosIntance = axios.create({
    baseURL: 'http://localhost:3000',
    // baseURL: 'http://localhost:3000',
    withCredentials: true
})

const useAxiousSecure = () => {
    const { logOut } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        axiosIntance.interceptors.response.use(response => {
            return response;
        }, error => {
            console.log('api response error status', error.status)

            if (error.status === 401 || error.status === 403) {
                console.log('need to logout')
                logOut()
                    .then(() => {
                        console.log('logout user')
                        navigate('/login')
                    })
                    .catch(error => console.log(error))
            }
            return Promise.reject(error)
        })
    }, [])


    return axiosIntance;

};

export default useAxiousSecure;