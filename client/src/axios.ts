import axios, { AxiosError } from 'axios';

const axiosApiInstance=axios.create({
    baseURL:'http://localhost:8888/api/v1'
});

axiosApiInstance.interceptors.request.use((request)=>{
    if(request.url!=='/auth/register' && request.url!=='/auth/login') {
        const token=localStorage.getItem('token');
        request.headers.set('Authorization',`Bearer ${token}`)
    }
    return request;
},(err:AxiosError)=>{
    return Promise.reject(err); 
})



export default axiosApiInstance;