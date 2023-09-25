<script setup>
import DashboardNav from './DashboardNav.vue';
</script>

<template>
  <div id="dashboard-profile-wrapper" v-if="!loading">
    <!-- Dashboard Navbar -->
    <DashboardNav />

    <main id="dashboard-profile-main-content">
      <h1 id="dashboard-profile-heading">Profile</h1>

      <div class="dashboard-profile">
        <div class="profile">
          <img src="" alt="" class="user-profile-image" />
          <p class="profile-info storeName">Name: <span id="info">Mandla</span></p>
          <p class="profile-info storeName">Email: <span id="info">Mandla</span></p>
          <p class="profile-info storeName">Phone No.: <span id="info">Mandla</span></p>
          <p class="profile-info storeName">Location: <span id="info">Mandla</span></p>
          <p class="profile-info storeName">Calendar URL: <span id="info">Mandla</span></p>
          <p class="profile-info storeName">Merchant ID: <span id="info">Mandla</span></p>
          <p class="profile-info storeName">Calendar/Actuity ID: <span id="info">Mandla</span></p>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
#dashboard-profile-wrapper {
  height: 100%;
  display: flex;
  position: relative;
}

#dashboard-profile-main-content {
  position: absolute;
  width: 95%;
  height: 100%;
  background: #fff;
  height: 100%;
  right: 0;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  overflow-y: scroll;
}

#dashboard-profile-heading {
  margin-left: 2%;
}

.dashboard-profile{
    height: 100%;
    display: flex;
    justify-content: center;
}

.profile{
    height: 40%;
    width: 30%;
    max-width: 220px;
}

.user-profile-image{
    display: block;
    height: 30%;
    width: 30%;
    max-width: 120px;
    max-height: 120px;
}

.profile-info{
    font-weight: 550;
}

#info{
    font-weight: 400;
}
</style>
