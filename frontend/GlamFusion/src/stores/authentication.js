import { defineStore } from 'pinia';

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
