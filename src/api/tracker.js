import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const instance=  axios.create({
    baseURL:'http://26e5-210-16-83-82.ngrok.io'
})

instance.interceptors.request.use(
    async(config) =>{
        const token= await AsyncStorage.getItem('token')
        if(token){
            // console.log(token)
            config.headers.Authorization = `Bearer ${token}`;
        }
        // console.log('config',config)
        return config;
    },
    (err) => {
        return Promise.reject(err)
    }
)
export default instance;