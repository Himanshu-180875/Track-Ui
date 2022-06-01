import createDataContext from './createDataContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import trackerApi from '../api/tracker';
import { navigate } from '../navigationRef';
const authReducer = (state, action) =>{
    switch(action.type){
        case 'add_error':
            return{...state, errorMessage:action.payload}
        case 'signin':
            return{errorMessage:'', token:action.payload}
        case 'clear_error_message':
            return {...state, errorMessage:'' }
        case 'signout':
            return {token:null, errorMessage:''}
        default:
            return state;
    }
}

const clearErrorMessage = dispatch => () => {
    dispatch({type:'clear_error_message'})
}

const tryLocalSignIn = (dispatch) => async() => {
    const token = await AsyncStorage.getItem('token')
    if(token){
        dispatch({type:'signin',payload:token})
        navigate('TrackList');
        
    }
    else{
        navigate('Signup');
    }
}

const signup = (dispatch) => {
    return async({email,password}) => {
        try{
            const response= await trackerApi.post('/signup',{email,password})
            await AsyncStorage.setItem('token', response.data.token)
            
            dispatch({type:'signup', payload: response.data.token})
            
            navigate('TrackList')
        }
        catch(err){
            console.log(err)
            dispatch({type:'add_error', payload:'Something went wrong with Signup'})
        }

    };
};
const signin = (dispatch) => async({email,password}) => {
        try{
            const response= await trackerApi.post('/signin',{email,password})
            await AsyncStorage.setItem('token', response.data.token)
            dispatch({type:'signin', payload:response.data.token})
            navigate('TrackList')
        } catch(err) {
            dispatch({
                type:'add_error',
                payload:'Something Went wrong with Sign In'
            })
        }

    };
;
const signout =  (dispatch) => async() => {
    await AsyncStorage.removeItem('token');
    dispatch({type:'signout'})
    navigate('LoginFlow')

};

export const {Provider, Context}  = createDataContext(
    authReducer,
    {signup,signout,signin,clearErrorMessage,tryLocalSignIn},  //actions are empty as of now
    {token:null,errorMessage:''}
)