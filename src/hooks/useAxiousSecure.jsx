import axios from "axios";
import useAuth from "./useAuth";


const axiosIntance = axios.create({
    baseURL: 'http://localhost:3000'

})

const useAxiousSecure = () => {
    const { user, logOut } = useAuth();
    const accessToken= user.accessToken;
    axiosIntance.interceptors.request.use(config => {
        config.headers.authorization = `Bearer ${user.accessToken}`
        return config;
    });
    axiosIntance.interceptors.response.use(response => {
        return response;
    }, error => {
        if (error.status === 401) {
            logOut()
                .then(() => {
                    console.log('sign out user for 401 status code ')
                })
                .catch(err => {
                    console.log(err)
                })
        }
        return Promise.reject(error)
    })


    return axiosIntance;

};

export default useAxiousSecure;