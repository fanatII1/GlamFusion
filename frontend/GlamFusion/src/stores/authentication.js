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
        this.user = loginStatus;
        console.log('stat', this.loginState, loginStatus)
      }
      else{
        this.loginState = false;
        this.user = null;
      }
    }
  }
})
