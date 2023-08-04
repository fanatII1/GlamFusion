<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import { onMounted } from 'vue';
import { auth } from '../firebase';
import { useAuthStore } from './stores/authentication';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const authStore = useAuthStore();
onMounted(() => {
  //when app opens, always check if user is logged in or not.
  //if logged in, set them to state.
  //if not logged in, they are simply not logged in, and we cannot do anything about it until they choose to login themselves.
  onAuthStateChanged(auth, (user)=>{
    if(user){
      console.log('logged in')
      authStore.setLoginState()
    }
    else{
      console.log('not logged in')
    }
  })
})
</script>

<template>
  <Navbar/>
  <RouterView />
</template>
