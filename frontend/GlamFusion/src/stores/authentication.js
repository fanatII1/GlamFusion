import { defineStore } from 'pinia';
import { auth } from '../../firebase';
import { getAuth, onAuthStateChanged } from "firebase/auth";


export const useAuthStore = defineStore('authStore', {
  state : () => ({
    loginState : false,
    user: null
  }),
  actions : {
    setLoginState(loginStatus){
      if(loginStatus){
        this.loginState = true;
        console.log('stat', this.loginState)
      }
      else{
        this.loginState = false;
      }
    }
  }
})
