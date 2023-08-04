<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { ref } from 'vue';
import { useAuthStore } from '../stores/authentication';
import { auth } from '../../firebase';

const activeNavItem = ref('home');
const authStore = useAuthStore;


//check authentication 
function checkAuth(){
  console.log(authStore.user)
  authStore.setLoginState();
}


function setActiveNavItem(item) {
  activeNavItem.value = item;
}
</script>

<template>
  <nav class="navbar">
    <div class="logo nav-item-1">
      <p class="logo-letter">G | <span class="logo-text">G l a m f u s i o n</span></p>
    </div>
    <div class="menu nav-item-2">
      <div :class="{ 'menu-item': true, 'active': activeNavItem === 'home' }" @click="setActiveNavItem('home')">
        <RouterLink to="/">Home</RouterLink>
      </div>
      <div :class="{ 'menu-item': true, 'active': activeNavItem === 'about' }" @click="setActiveNavItem('about')">
        <RouterLink to="/about">About</RouterLink>
      </div>
      <div :class="{ 'menu-item': true, 'active': activeNavItem === 'services' }" @click="setActiveNavItem('services')">
        <RouterLink to="/services">Services</RouterLink>
      </div>
      <div :class="{ 'menu-item': true, 'active': activeNavItem === 'blog' }" @click="setActiveNavItem('blog')">
        <RouterLink to="/blog">Blog</RouterLink>
      </div>
    </div>
    <div class="nav-item-3">
    <button @click="checkAuth" class="profile-btn">My Profile</button>
    <div class="dropdown">
      <a href="#">My Profile</a>
      <a href="#">Logout</a>
    </div>
  </div>
  </nav>
</template>

<style>
.navbar {
  position: sticky;
  top: 0;
  left: 0;
  height: 5%;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  background-color: #000;
  color: #fff;
  z-index: 3;
}

.navbar a{
  color: #fff;
}

.logo-letter{
  font-size: 1.6rem;
}

.logo-text{
  font-size: 1.3rem;
}

#logo-img{
  display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
}

@media screen and (min-width: 768px) {
  #logo-img{
    object-fit: cover;
  }
}

.logo, .user-profile {
  display: flex;
  justify-content: center;
  align-items: center;
}

.menu {
  width: 50%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.menu-item {
  margin: 0 10px;
  cursor: pointer;
  transition: 0.6s ease-in-out;
  font-weight: bold;
}

.menu-item.active a{
  color:#d69c4a;
}

.menu-item:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.user-profile{    
  font-weight: bold;
  padding: 0.4%;
  border: 1px solid #fff;
  border-radius: 55px;
  display: flex;
}

.profile-image-container, .username{
  width: 50%;
}

.profile-image{
  display: block;
  width: 100%;
  height: 40px;
  width: 40px;
  border-radius: 100%;
}

.nav-item-3 {
  position: relative;
}

.profile-btn {
  background-color: transparent;
  color: #d69c4a;
  border: none;
  border-bottom: 1px solid #d69c4a;
  padding: 10px 15px;
  cursor: pointer;
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  display: none;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  animation: fadeInDown 0.3s ease forwards;
}

.dropdown a {
  display: block;
  padding: 10px 15px;
  text-decoration: none;
  color: #333;
  transition: background-color 0.2s;
}

.dropdown a:hover {
  background-color: #f0f0f0;
}

.nav-item-3:hover .dropdown {
  display: block;
}

@keyframes fadeInDown {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
