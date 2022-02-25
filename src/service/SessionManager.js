import { auth } from "./firebase-config";
import {createUser} from './api.js'
export const login = (user,token) => {
    localStorage.setItem('user',user)
    localStorage.setItem('auth_token',token);
    console.log(user);
    let payload = {
      username:user?.displayName,
      email:user?.email,
      password:null
    }
    createUser(payload);
}
export const isLogin = () => {
    if (localStorage.getItem('auth_token')) {
        return true;
    }

    return false;
}

export const logout= () =>{
    console.log('logged out');
    localStorage.removeItem('user');
    localStorage.removeItem('auth_token');
    auth.signOut();
}
