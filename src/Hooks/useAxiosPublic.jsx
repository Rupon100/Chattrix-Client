import axios from 'axios'

export const axiosPublic = axios.create({
    baseURL: 'https://chattrix-beige.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;