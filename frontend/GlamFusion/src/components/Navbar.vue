<template>
  <nav class="navbar">
    <div class="logo nav-item-1">
      <p class="logo-letter">G | <span class="logo-text">G l a m f u s i o n</span></p>
    </div>
    <div class="menu nav-item-2">
      <div class="menu-item">Home</div>
      <div class="menu-item">About</div>
      <div class="dropdown menu-item">
        Bookings
        <div class="dropdown-content">
          <a href="#">Salon</a>
          <a href="#">Haircut</a>
        </div>
      </div>
      <div class="menu-item">Blog</div>
    </div>
    <div class="user-profile nav-item-3">User Profile</div>
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
  transition: box-shadow 0.2s ease-in-out;
  font-weight: bold;
}

.menu-item:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.dropdown {
  position: relative;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  min-width: 120px;
  z-index: 1;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown-item {
  padding: 10px;
  color: #333;
  text-decoration: none;
  display: block;
}

.dropdown-item:hover {
  background-color: #ddd;
}

.user-profile{
  font-weight: bold;
}
</style>
