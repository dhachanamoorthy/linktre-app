import { auth } from "../../service/firebase-config";
export const login = (user,token) => {
    localStorage.setItem('user',user)
    localStorage.setItem('auth_token',token);
}

export const isLogin = () => {
    if (localStorage.getItem('auth_token')) {
        console.log('logged in');
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