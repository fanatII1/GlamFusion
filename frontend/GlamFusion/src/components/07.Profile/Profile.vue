<script setup>
import { useAuthStore } from '../../stores/authentication';

const authStore = useAuthStore();
const { displayName, photoURL, email, phoneNumber } = authStore.user;
console.log(photoURL)
</script>

<template>
  <div id="dashboard-profile-wrapper">
    <main id="dashboard-profile-main-content">
      <h1 id="dashboard-profile-heading">Profile</h1>

      <div class="dashboard-profile">
        <div class="profile">
          <img :src="photoURL" alt="" class="user-profile-image" />
          <p class="profile-info storeName">
            Name: <span id="info">{{ displayName }}</span>
          </p>
          <p class="profile-info storeName">
            Email: <span id="info">{{ email }}</span>
          </p>
          <p class="profile-info storeName">
            Phone No.: <span id="info">{{ phoneNumber ? phoneNumber : '-' }}</span>
          </p>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
#dashboard-profile-wrapper {
  height: 100%;
}

#dashboard-profile-main-content {
  height: 100%;
  color: #fff;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  overflow-y: scroll;
}

#dashboard-profile-main-content::-webkit-scrollbar-thumb {
  background-color: none;
}

#dashboard-profile-main-content::-webkit-scrollbar {
  width: 0;
}

#dashboard-profile-heading {
  margin-left: 2%;
}

.dashboard-profile {
  height: 100%;
  display: flex;
  justify-content: center;
}

.profile {
  height: 40%;
  width: 30%;
  max-width: 220px;
}

.user-profile-image {
  display: block;
  max-width: 120px;
  max-height: 120px;
  border-radius: 100%;
}

.profile-info {
  font-weight: 550;
}

#info {
  font-weight: 400;
}
</style>
