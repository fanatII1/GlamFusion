import { defineStore } from 'pinia';
import { auth } from '../../firebase';
import { getAuth, onAuthStateChanged } from "firebase/auth";


export const useAuthStore = defineStore('authStore', {
  state : () => ({
    loginState : null,
    user: null
  }),
  actions : {
    setLoginState(){
      onAuthStateChanged(auth, (user) => {
        if(user){
          console.log(user)
          this.loginState = true;
        } else{
          console.log('nothing')
          this.loginState = false;
        }
      })
    }
  }
})
