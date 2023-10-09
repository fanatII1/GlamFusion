<script setup>
import DashboardNav from './DashboardNav.vue';
import { useAuthStore } from '../../stores/authentication';

const authStore = useAuthStore();
const { displayName, photoURL, email, phoneNumber } = authStore.user;
const organisation = JSON.parse(localStorage.getItem('organisation'));
const { organisationName, StoreType, organisationId, merchant_id, StoreLink, StoreLocation, StoreId } = organisation;
</script>

<template>
  <div id="dashboard-profile-wrapper" v-if="!loading">
    <!-- Dashboard Navbar -->
    <DashboardNav />

    <main id="dashboard-profile-main-content">
      <h1 id="dashboard-profile-heading">Profile</h1>

      <div class="dashboard-profile">
        <div class="profile">
          <img :src="photoURL" alt="" class="user-profile-image" />
          <p class="profile-info storeName">Name: <span id="info">{{ organisationName }}</span></p>
          <p class="profile-info storeName">Email: <span id="info">{{ email }}</span></p>
          <p class="profile-info storeName">Phone No.: <span id="info">{{ phoneNumber ? phoneNumber : '-' }}</span></p>
          <p class="profile-info storeName">Location: <span id="info">{{ StoreLocation }}</span></p>
          <p class="profile-info storeName">Calendar URL: <span id="info">{{ StoreLink }}</span></p>
          <p class="profile-info storeName">Merchant ID: <span id="info">{{ merchant_id }}</span></p>
          <br>
          <a :href="StoreLink" id="info">Manage Members</a>
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
  width: 70%;
  max-width: 880px;
  line-height: 1.5;
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
    text-decoration: underline;
}
</style>
