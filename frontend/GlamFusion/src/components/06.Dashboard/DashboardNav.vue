<template>
    <nav id="dash-navbar">
      <div class="nav-item nav-logo">G | F</div>
      <div class="nav-item"><RouterLink to="/dashboard/home"><i class="fa-solid fa-house"></i></RouterLink></div>
      <div class="nav-item"><RouterLink to="/dashboard/services"><i class="fa-solid fa-briefcase"></i></RouterLink></div>
      <div class="nav-item"><RouterLink to="/dashboard/bookings"><i class="fa-solid fa-calendar-days"></i></RouterLink></div>
      <div class="nav-item"><RouterLink to="/dashboard/profile"><i class="fa-regular fa-user"></i></RouterLink></div>
      <div class="nav-item"><i class="fa-solid fa-right-to-bracket"></i></div>
    </nav>
</template>

<script setup>

</script>

<style>
/* Force Hiding The Global Navbar */
.navbar {
    display: none !important;
}

body {
    background-color: #fff !important;
}

#app {
    padding: 0 !important;
}

#dash-navbar {
  height: 100%
}

#dashboard-wrapper{
  display: flex;
  position: relative;
}

#dash-navbar{
  width: 30%;
  background-color: #000;
  color: #d69c4a;
}

.nav-item {
  height: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 50px;
  cursor: pointer;
  list-style-type: none;
}

.nav-item a{
color: #d69c4a;
}
</style>