<script setup>
import DashboardNav from './DashboardNav.vue';
import { ref, onMounted } from 'vue';


const storeBookings = ref([]);
const loading = ref(true);
const strapiBaseURL = ref('http://localhost:1337');
const serverUrl = ref('http://localhost:3000');

// async function fetchContentData() {
//   const baseURL = 'http://localhost:1337';
//   const booking = 'barbers-stores';
//   const storeId = 1

//   try {
//     const response = await fetch(`${baseURL}/api/${booking}/${storeId}/?populate[StoreImage]=*&populate[barber_bookings][populate]=*&populate[members][populate]=*&populate[bookings][populate]=*`);
//     const data = await response.json();
//     const { attributes } = data.data;
//     const { barber_bookings } = attributes
//     console.log(barber_bookings.data)

//     storebookings.value = barber_bookings.data;
//     loading.value = false;
//   } catch (error) {
//     console.error('Error fetching data:', error);
//   }
// }

async function fetchBooking(){
        const getCalendar = await fetch(`${serverUrl.value}/actuity/appointments`);
        const bookedCalendars = await getCalendar.json();
        const parseFormData = parseFormsText(bookedCalendars);
        storeBookings.value = parseFormData;
        loading.value = false;
        // console.log('MOERRRRRRRRRRSKONT', parseFormData)
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
    // fetchContentData()
    fetchBooking()
})
</script>

<template>
  <div id="dashboard-bookings-wrapper" v-if="!loading">
    <!-- Dashboard Navbar -->
    <DashboardNav />

    <main id="dashboard-bookings-main-content">
      <h1 id="dashboard-bookings-heading">Bookings</h1>

      <div class="bookings">
        <div class="booking" v-for="booking in storeBookings">
          <p class="booking-service">{{ booking.formsText['Which service would you like to book?'] }}</p>
          <p class="booking-name">
            {{booking.firstName}}
            <div class="payStatus"><span id="paid">.</span> <span id="not-paid">.</span></div>
         </p>
          <p class="booking-price">{{booking.calendar}}</p>
          <div class="booking-display-edit">
            <!-- <img :src="strapiBaseURL + booking.attributes?.bookingImage?.data?.attributes?.url" alt="" class="booking-img-display" /> -->
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
#dashboard-bookings-wrapper {
  height: 100%;
  display: flex;
  position: relative;
}

#dashboard-bookings-main-content {
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

#dashboard-bookings-heading{
    margin-left: 2%;
}

#dashboard-bookings-main-content::-webkit-scrollbar{
  width: 0;
}

#dashboard-bookings-main-content::-webkit-scrollbar-thumb {
  background-color: transparent;
  
}

.bookings{
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(195px, 330px));
    grid-auto-rows: 25%;
    grid-gap: 3%;
    height: 100%;
}

.booking{
    border-radius: 45px;
    -webkit-box-shadow: 3px 3px 10px 3px #d69c4a;
    -moz-box-shadow: 3px 3px 10px 3px #d69c4a;
    box-shadow: 3px 3px 10px 3px #d69c4a;
    height: fit-content;
    padding: 4%;
    margin-left: 5%;
    cursor: pointer;
    transition: .4s;
}

.booking:hover{
    transform: scale(1.02);
}
.booking-service{
    font-size: 1.8rem;
    font-weight: 600;
    margin: 1.5% 0 0 0;
}

.booking-price, .booking-name{
    font-size: 1.2rem;
}

.booking-name{
    font-weight: 500;
    display: flex;
    align-items: baseline;
    justify-content: space-between;
}

.booking-display-edit{
    display: flex;
    justify-content: space-between;
    align-items: center;
}

#paid, #not-paid{
    font-size: 4rem;
    transform: scale(4);
}

#paid{
    color: green;
}

#not-paid{
    color: red;
}
</style>
