import axios from "axios";
import useAuth from "./useAuth";
const axiousIntance = axios.create({
    baseURL: 'http://localhost:3000'
})

const useAxiousSecure = () => {
    const { user, signOutUser } = useAuth();
    axiousIntance.interceptors.request.use(config => {
        config.headers.authorization = `Bearer ${user.accessToken}`
        return config;
    })

    // response interceptor
    axiousIntance.interceptors.response.use(response => {
        return response;
    }, error => {
        if (error.status === 401 || error.status === 403) {
            signOutUser()
                .then(res => {
                    console.log('signout user  for 401 status code')
                })
                .catch(err => {
                    console.log(err)
                })
        }
        return Promise.reject(error)
    })


    return axiousIntance;
};

export default useAxiousSecure;