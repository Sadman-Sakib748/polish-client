import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://b11a11-server-side-sadman-sakib748.vercel.app',
});

const useAxiosPublic = () => {

    return axiosInstance;
};

export { axiosInstance, useAxiosPublic };
