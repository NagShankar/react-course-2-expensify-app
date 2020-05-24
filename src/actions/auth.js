//importing firebase
import { firebase, googleAuthProvider } from '../firebase/firebase';

export const login = (uid) => {
    return {
        type:"LOGIN",
        uid
    }
}

//we're returning function not object, we're conforming to thunk functionality here
export const startLogin = () => {
    return () => {
        return firebase.auth().signInWithPopup(googleAuthProvider); //returning a promise that's why using "return" here
    };
};

export const logout = () => {
    return {
        type:"LOGOUT"
      
    }
}

//we're returning function not object, we're conforming to thunk functionality here
export const startLogout = () => {
    return () => {
        return firebase.auth().signOut(); //returning a promise that's why using "return" here
    };
};