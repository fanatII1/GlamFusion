<script setup>
import { ref, watch, onMounted } from 'vue';
import BarberImg from '../../assets/img/barber.png';
import DashboardNav from './DashboardNav.vue';

const counter = ref(0);
const leftRotation = ref(0);
const rightRotation = ref(0);
const organisationBookings = ref([]);
const loading = ref(true);

watch(counter, (newValue) => {
  if (newValue === 80) {
    clearInterval(interval);
  }
});

const interval = setInterval(() => {
  if (counter.value < 80) {
    counter.value += 1;
    leftRotation.value = (counter.value / 100) * 180;
    rightRotation.value = (counter.value / 100) * 180 + 180;
  }
}, 80);

async function fetchData() {
  const baseStrapiURL = 'http://localhost:1337';
  const baseServerURL = 'http://localhost:3000';
  const service = 'barbers-stores';
  const organisationData = JSON.parse(localStorage.getItem('organisation'));
  const { organisationId } = organisationData;
  console.log(organisationId);

  try {
    const response = await fetch(
      `${baseStrapiURL}/api/${service}/${organisationId}/?populate[StoreImage]=*&populate[barber_services][populate]=*&populate[members][populate]=*&populate[services][populate]=*`
    );
    const data = await response.json();
    const { attributes } = data.data;
    const { ActuityID, ActuityKey } = attributes;
    const calendarAccessData = { key: ActuityKey, id: ActuityID };
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(calendarAccessData),
    };

    //we  fetch bookings and parse(covert) the formsText string data to read the booking, using parseFormsText function
    //we will display only latest five bookings
    const getOrganisationBookings = await fetch(`${baseServerURL}/actuity/organisationBookings`, options);
    const bookingsResults = await getOrganisationBookings.json();
    const parseBookingsFormData = parseFormsText(bookingsResults);
    const latestFiveBookings = parseBookingsFormData.filter((booking, index) => index < 5); 
    console.log(latestFiveBookings)
    organisationBookings.value = latestFiveBookings;
    loading.value = false;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function parseFormsText(formData) {
    return formData.map(item => {
        const lines = item.formsText.split('\n').filter(line => line.trim() !== ''); // Split the string into lines and remove empty lines
        const formObject = {};

        lines.forEach(line => {
            const [key, value] = line.split(':').map(str => str.trim()); // Split each line into key and value
            formObject[key] = value;
        });

        return { ...item, formsText: formObject }; // Return a new object with the modified "formsText" property
    });
}

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div id="dashboard-wrapper" v-if="!loading">
    <DashboardNav />

    <main id="dashboard-main-content">
      <div class="bookings-styles-summary">
        <div class="total-bookings">
          <p class="total-bookings-heading">Total Bookings <i class="fa-solid fa-arrow-up-right-from-square view-all"></i></p>
          <div class="stat">
            <div class="circular">
              <div class="inner"></div>
              <div class="outer"></div>
              <div class="numb">{{ counter }}%</div>
              <div class="circle">
                <div class="dot">
                  <span></span>
                </div>
                <div class="bar left">
                  <div class="progress" :style="{ transform: `rotate(${leftRotation}deg)` }"></div>
                </div>
                <div class="bar right">
                  <div class="progress" :style="{ transform: `rotate(${rightRotation}deg)` }"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="latest-styles">
          <!-- BASED ON OWNER, NG WILL CHANGE -->
          <p class="top-styles-heading">Top Styles <i class="fa-solid fa-arrow-up-right-from-square view-all"></i></p>
          <div class="barber-img-wrapper">
            <img :src="BarberImg" alt="" id="barber-img" />
          </div>
        </div>
      </div>

      <ul class="latest-bookings-summary">
        <li id="latest-bookings-heading">
          <RouterLink to="/dashboard/bookings">Latest Bookings <i class="fa-solid fa-arrow-up-right-from-square"></i></RouterLink>
        </li>
        <li class="latest-bookings" v-for="(booking, index) in organisationBookings">
          <p id="name"><span id="number">{{ index + 1 }}</span>{{ booking.formsText.Name }}</p>
          <p id="time">{{ booking.time }}</p>
          <p id="paymentStatus">{{ booking.paid }}</p>
          <p id="service">{{ booking.formsText['Which service would you like to book?'] }}</p>
        </li>
      </ul>
    </main>
  </div>
</template>

<style>
#dashboard-wrapper,
#dash-navbar,
#dashboard-main-content {
  height: 100%;
}

#dashboard-wrapper {
  display: flex;
  position: relative;
}

#dash-navbar {
  width: 30%;
  background-color: #000;
  color: #d69c4a;
}

#dashboard-main-content {
  width: 95%;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  background-color: #fff;
  position: absolute;
  right: 0;
  display: flex;
  justify-content: center;
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

.nav-item a {
  color: #d69c4a;
}

.bookings-styles-summary {
  height: 50%;
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.total-bookings,
.latest-styles {
  height: 90%;
  width: 30%;
  border-radius: 45px;
  -webkit-box-shadow: 3px 3px 10px 3px #ddd;
  -moz-box-shadow: 3px 3px 10px 3px #ddd;
  box-shadow: 3px 3px 10px 3px #ddd;
  overflow: hidden;
}

.total-bookings-heading,
.top-styles-heading,
#latest-bookings-heading {
  margin-left: 30px;
  font-size: 1.5rem;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: baseline;
  list-style: none;
  cursor: pointer;
}

#latest-bookings-heading a {
  color: #000;
}
.total-bookings-heading:hover,
.top-styles-heading:hover,
#latest-bookings-heading:hover {
  text-decoration: underline;
}

.view-all {
  margin-left: 2%;
  text-decoration: right;
}

.circular {
  height: 100px;
  width: 100px;
  position: relative;
}
.circular .inner,
.circular .outer,
.circular .circle {
  position: absolute;
  z-index: 6;
  height: 100%;
  width: 100%;
  border-radius: 100%;
  box-shadow: inset 0 1px 0 rgba(0, 0, 0, 0.2);
}
.circular .inner {
  top: 50%;
  left: 50%;
  height: 80px;
  width: 80px;
  margin: -40px 0 0 -40px;
  border-radius: 100%;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.2);
}
.circular .circle {
  z-index: 1;
  box-shadow: none;
}
.circular .numb {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  font-size: 1.4rem;
  color: #d69c4a;
  font-weight: bold;
}
.circular .bar {
  position: absolute;
  height: 100%;
  width: 100%;
  background: #fff;
  -webkit-border-radius: 100%;
  clip: rect(0px, 100px, 100px, 50px);
}
.circle .bar .progress {
  position: absolute;
  height: 100%;
  width: 100%;
  -webkit-border-radius: 100%;
  clip: rect(0px, 50px, 100px, 0px);
}
.progress,
.dot span {
  background: #000;
}

.circle .left .progress {
  z-index: 1;
  animation: left 4s linear both;
}
@keyframes left {
  100% {
    transform: rotate(180deg);
  }
}
.circle .right {
  z-index: 3;
  transform: rotate(180deg);
}
.circle .right .progress {
  animation: right 4s linear both;
  animation-delay: 4s;
}
@keyframes right {
  100% {
    transform: rotate(180deg);
  }
}
.circle .dot {
  z-index: 2;
  position: absolute;
  left: 50%;
  top: 50%;
  width: 50%;
  height: 10px;
  margin-top: -5px;
  animation: dot 8s linear both;
  transform-origin: 0% 50%;
}
.circle .dot span {
  position: absolute;
  right: 0;
  width: 10px;
  height: 10px;
  border-radius: 100%;
}
@keyframes dot {
  0% {
    transform: rotate(-90deg);
  }
  50% {
    transform: rotate(90deg);
    z-index: 4;
  }
  100% {
    transform: rotate(270deg);
    z-index: 4;
  }
}

.stat,
.barber-img-wrapper {
  height: 85%;
  display: flex;
  align-items: center;
  justify-content: center;
  scale: 1.4;
}

#barber-img {
  display: block;
  height: 100%;
  width: 100%;
  max-height: 200px;
  max-width: 200px;
}

.latest-bookings-summary {
  height: 45%;
  position: absolute;
  bottom: 0;
  width: 90%;
  max-width: 1500px;
  border-radius: 20px;
  -webkit-box-shadow: 3px 3px 10px 3px #ddd;
  -moz-box-shadow: 3px 3px 10px 3px #ddd;
  box-shadow: 3px 3px 10px 3px #ddd;
  overflow: scroll;
  padding: 0;
  padding-top: 1%;
}

.latest-bookings-summary::-webkit-scrollbar {
  width: 0;
}

.latest-bookings-summary::-webkit-scrollbar-thumb {
  background-color: transparent;
}

#name,
#time,
#paymentStatus,
#service {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.15rem;
  font-weight: 500;
}

.latest-bookings {
  list-style: none;
  display: flex;
  justify-content: space-between;
  padding: 0 5%;
}

#number {
  background: black;
  display: flex;
  width: 25px;
  height: 25px;
  color: #fff;
  justify-content: center;
  border-radius: 50%;
  align-items: center;
  padding-bottom: 2%;
  margin-right: 10%;
}
</style>
