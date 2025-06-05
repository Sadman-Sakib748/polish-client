import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://assignment-server-11-dun.vercel.app',
});

const useAxiosPublic = () => {
    
    return axiosInstance;
};

export { axiosInstance, useAxiosPublic };
