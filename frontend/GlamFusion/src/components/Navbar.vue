<template>
  <nav class="navbar">
    <div class="logo nav-item-1">
      <p class="logo-letter">G | <span class="logo-text">G l a m f u s i o n</span></p>
    </div>
    <div class="menu nav-item-2">
      <div :class="{ 'menu-item': true, 'active': activeNavItem === 'home' }" @click="setActiveNavItem('home')">Home</div>
      <div :class="{ 'menu-item': true, 'active': activeNavItem === 'about' }" @click="setActiveNavItem('about')">About</div>
      <div :class="{ 'menu-item': true, 'active': activeNavItem === 'bookings' }" @click="setActiveNavItem('bookings')">
        Bookings
      </div>
      <div :class="{ 'menu-item': true, 'active': activeNavItem === 'blog' }" @click="setActiveNavItem('blog')">Blog</div>
    </div>
    <div class="user-profile nav-item-3">
      <div class="profile-image-container">
        <img src="../assets/img/background-1.webp" alt="" class="profile-image">
      </div>
      <p class="username">Login</p>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';

const activeNavItem = ref('home');

function setActiveNavItem(item) {
  activeNavItem.value = item;
}
</script>

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

.menu-item.active{
  color:#d69c4a;
}

.menu-item:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.dropdown {
  position: relative;
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
</style>
