<script setup>
import { ref, watch, onBeforeMount, onMounted } from 'vue';
import { useAuthStore } from '../../stores/authentication';
import { io } from 'socket.io-client';
import mapboxgl from 'mapbox-gl';
import { ZoomControl } from 'mapbox-gl-controls';
import { CompassControl } from 'mapbox-gl-controls';
import { useI18n } from 'vue-i18n';

//websocket
const socket = io('http://localhost:3000');
const authStore = useAuthStore();
const storeInfo = JSON.parse(localStorage.getItem('storeInfo'));
const { StoreName, StoreLocation, storeImage, StoreMembers, StoreServices, merchant_id, Longitude, Latitude } = storeInfo;

let map = null;
//translation text
const { t, locale } = useI18n();
const timeText = t('ServiceStore.time');
const priceText = t('ServiceStore.price');
const bookNowBtnText = t('ServiceStore.bookNowBtnText');

const user = ref(authStore.user);
const baseUrl = ref('http://localhost:1337');
const serverUrl = ref('http://localhost:3000');
const calendarUrl = ref('https://app.acuityscheduling.com/schedule.php?owner=')
const calendarOwnerId = ref('30044803');
const calendarParams = ref(null)
const changeImageNo = ref(0);
const dynamicStoreImage = ref(storeImage);
const bookAppointmentModal = ref(null);
const isModalOpen = ref(false);
const isButtonDisabled = ref(true);
const bookingBtn = ref('booking-btn-off');
const bookedService = ref(null);
const activeButton = ref(null);
const calendarData = ref(null);
const platformMerchantId = ref("10031040");
const platformMerchantKey = ref("7eyrpgpdvwlgc");
const amount = ref("0.00");
const passPhrase = ref('LionelMess10')
const payFastSignature = ref(null);
const splitPayment = ref(`{"split_payment": {"merchant_id": ${merchant_id}, "percentage": 10, "min": 10, "max": 100000}}`);
const paymentForm = ref(null);

//takes the formsText data from the parsedBookedCalendar(formsText object property) & converts to an object
function calendarFormToObj(parsedBookedCalendar){
  const lines = parsedBookedCalendar.formsText.split('\n');
  const extractedData = {};
  
  for (const line of lines) {
    const [key, value] = line.split(': ');
    if (key && value) {
      extractedData[key] = value;
    }
  }

  return extractedData
}

//user parameters for calendar
watch(() => authStore.user, (newUser) => {
  user.value = newUser;
});

function updateDynamicImage(index, image) {
  changeImageNo.value = index;
  dynamicStoreImage.value = image;
}

const openModal = () => {
  if(bookedService.value !== null){
    isModalOpen.value = true;
  }
  else{
    alert('You need to select a service in order to book.')
  }
  activeButton.value = null;
};

const closeModal = (event) => {
  if (event.target.id === 'bookAppointmentModal') {
    bookingBtn.value = 'booking-btn-off';
    isButtonDisabled.value = true;
    isModalOpen.value = false;
  }
};

//ability define fields(calendarParams) of calendar IF the user has booked a service(else statement)
//also able to toggle between enabling/disabling service selected btns
const selectService = (index, service) => {
  const { ServiceName, ServicePrice } = service.attributes;
  if (activeButton.value === index) {
    activeButton.value = null;
  } else {
    activeButton.value = index;
    // console.log(ServicePrice)
    bookedService.value = ServiceName;
    amount.value = ServicePrice;
    const { displayName, email } = user.value;
    calendarParams.value = {firstName: displayName, email, bookedService: bookedService.value};

    console.log(ServiceName, bookedService.value, service.attributes)
  }
};

const submitForm = async () => {
  console.log('form submit')
  try {
    const response = await fetch(`${serverUrl.value}/payments/generate-signature`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({passPhrase: passPhrase.value})
    });

    if (response.ok) {
      payFastSignature.value = await response.text();
      console.log(payFastSignature.value)
    } else {
      console.error('Error generating signature');
    }
  } catch (error) {
    console.error('Error generating signature:', error);
  }
};

onBeforeMount(() => {
  socket.on('connect', (data, id) => {
    console.log('Connected to WebSocket');
    socket.emit('calendarListen');

    socket.on('calendarData', async (data) => {
      if(data){
        calendarData.value = data;
        const { id, appointmentTypeId, calendarId, action } = calendarData.value;
        const headers = { 'Content-Type': 'application/json'};
        const options = { method: 'POST', headers, body: JSON.stringify({ id })};
        const getCalendar = await fetch(`${serverUrl.value}/actuity/appointments`, options);
        const bookedCalendar = await getCalendar.text();
        const parsedBookedCalendar = JSON.parse(bookedCalendar);
        const formData = calendarFormToObj(parsedBookedCalendar);
        
        //if user has paid, we implement a gateway
        if(formData['Would you like to pay now (online)?'] === 'yes'){
          // await submitForm();
          paymentForm.value.submit();
          console.log(bookedService.value)
          bookedService.value =  null;
        }
      }
      else{
        throw new Error('Could not get calendar webhook data');
      }
    })
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from WebSocket');
  });
});

onMounted(() => {
  // Set your Mapbox access token
  mapboxgl.accessToken = 'pk.eyJ1IjoibWFuZGxlbmtvc2kxMCIsImEiOiJjbG1yZW9ua2QwNjVmMnRtbXhha2xoajBrIn0.3asiCXAhz1w2nw90g37YNg';
  var directions = new MapboxDirections({
    accessToken: mapboxgl.accessToken
  })

  // Create a new map instance
  map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [Longitude, Latitude], // starting position...store location [lng, lat]
    zoom: 9, // starting zoom
  });

  map.addControl(new CompassControl(), 'top-right');
  map.addControl(new ZoomControl(), 'top-right');
  map.addControl(directions, 'top-left');
})
</script>

<template>
  <main id="service-store-wrapper">
    <div id="storeDetails">
      <h2 class="storeName">{{ StoreName }}</h2>
      <h3 class="storeLocation">{{ StoreLocation }}</h3>
  
      <section id="store-img-service-display">
        <transition name="image-slide" mode="out-in">
          <img :key="dynamicStoreImage" :src="dynamicStoreImage" alt="" class="store-img-service" />
        </transition>
      </section>
  
      <section id="store-img-service-select">
        <div v-for="(image, index) in StoreServices" :key="index" class="service-img-select">
          <div class="display-image-overlay"></div>
          <img
            :src="baseUrl + image.attributes.ServiceImage.data.attributes.url"
            alt=""
            class="service-img"
            @click="updateDynamicImage(index, baseUrl + image.attributes.ServiceImage.data.attributes.url)"
          />
        </div>
      </section>
  
      <section id="customer-related-info">
        <div class="services-reviews-about-wrapper">
          <div class="services-reviews-about">
            <p class="service-heading">Services</p>
            <!-- <p class="reviews-heading">Reviews</p>
                  <p class="about-heading">About</p> -->
          </div>
  
          <div v-for="(service, index) in StoreServices" :key="index" class="services-offered">
            <div class="service-look">
              <img :src="baseUrl + service.attributes.ServiceImage.data.attributes.url" alt="" class="service-look-img" />
            </div>
            <div class="service-details">
              <p class="service-name">{{ service.attributes.ServiceName }}</p>
              <p class="duration">{{ timeText }}: 30 min</p>
              <p class="price">{{ priceText }}: {{ service.attributes.ServicePrice }}</p>
              <div class="more-info-modal">
                <span id="more-info">{{ moreInfoText }}</span>
                <button
                  id="more-info-btn"
                  :class="{ infoBtnOn: activeButton === index, infoBtnOff: activeButton !== null && activeButton !== index }"
                  :disabled="activeButton !== null && activeButton !== index"
                  @click="selectService(index, service)"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="booking-info-wrapper">
          <div class="booking-info">
            <div class="booking-btn-wrapper">
              <button id="bookAppointment-btn" class="booking-btn-modal" @click.prevent="openModal">{{ bookNowBtnText }}</button>
            </div>
            <p class="operating-status"><span id="status">Closed</span> opens at <span id="operating-status-time"> 09:00</span></p>
            <a class="location" href="#">{{ location }}</a>
          </div>
        </div>
        <div v-if="isModalOpen" id="bookAppointmentModal" ref="bookAppointmentModal" @click="closeModal">
          <!-- IFRAME SHOULD BE THE ONE FROM THE STORE DATABASE -->
          <!-- WHEN THE PAGE LOADS WE WILL FETCH THE IFRAME FROM THE DB(get field id && ownerID from db) AND INSERT IT HERE -->
          <!-- WE DO THIS CAUSE WHEN WE ONBOARD, WE WILL CREATE THE ACTUITY ACCOUNT FOR THE STORE -->
          <!-- AFTER THAT WE WILL THEN STORE THE IFRAME(CALENDAR) OF THE STORE IN THE DATABSE AND ALL THE API KEYS RELATRD TO THE STORE-->
          <iframe id="bookingCalendar" 
            :src="calendarUrl + calendarOwnerId + '&' + 'firstName=' + calendarParams.firstName + '&' + 'email=' + calendarParams.email + '&' + 'field:13839855=' + calendarParams.bookedService" 
            title="Schedule Appointment" 
            width="100%" 
            height="800" 
            frameBorder="0"
          >
          </iframe>
        </div>
  
        <form v-if="bookedService" ref="paymentForm" action="https://sandbox.payfast.co.za​/eng/process" method="post" @submit="submitForm">
          <input type="hidden" name="merchant_id" :value="platformMerchantId" />
          <input type="hidden" name="merchant_key" :value="platformMerchantKey" />
          <input type="hidden" name="amount" :value="amount" />
          <input type="hidden" name="item_name" :value="bookedService" />
          <!-- <input type="hidden" name="return_url" value="https://9a7d-197-184-165-220.ngrok-free.app">
          <input type="hidden" name="cancel_url" value="https://9a7d-197-184-165-220.ngrok-free.app">
          <input type="hidden" name="notify_url" value="https://9a7d-197-184-165-220.ngrok-free.app"> -->
          <input type="hidden" name="signature" :value="payFastSignature" />
          <input type="hidden" name="setup" :value="splitPayment"/>
        </form>
      </section>
    </div>

    <!-- MAP -->
    <div id="map">

    </div>
  </main>
</template>

<style scoped>
#service-store-wrapper, #storeDetails, #map {
  height: 100%;
}

#service-store-wrapper{
  display: flex;
  column-gap: 2%;
}

#storeDetails, #map{
  width: 50%;
}

#map{
  border-radius: 10px;
  z-index: -1;
}

#storeDetails{
  overflow-y: scroll;
}

.storeName {
  color: #fff;
  font-size: 1.8rem;
}

.storeLocation {
  color: #d69c4a;
  font-size: 1.5rem;
}

#store-img-service-display {
  height: 60%;
  position: relative;
  overflow: hidden;
}

.store-img-service {
  display: block;
  height: 100%;
  width: 100%;
  object-fit: cover;
  transition: transform 0.5s ease-in-out; /* Add sliding transition effect */
  border-radius: 20px;
}

/* Custom transition class for the sliding effect */
.image-slide-enter-active,
.image-slide-leave-active {
  transition: transform 0.5s ease-in-out;
}

.image-slide-enter-from,
.image-slide-leave-to {
  transform: translateX(100%); /* Slide in from right during enter, slide out to right during leave */
}

.fa-chevron-left,
.fa-chevron-right {
  color: #d69c4a;
  font-weight: bold;
  font-size: 1.4rem;
}

#store-img-service-select {
  height: 25%;
  display: flex;
  margin: 2% 0;
}

.service-img-select {
  position: relative;
  width: 25%;
  border: 3px solid #d69c4a;
  border-radius: 10px;
  overflow: hidden;
  margin: 2% 2% 0 0;
}

.service-img-select img {
  display: block;
  height: 100%;
  width: 100%;
  object-fit: cover;
  transition: 0.4s;
}

.service-img-select:hover img {
  transform: scale(1.05);
}

.display-image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.247);
}

#customer-related-info {
  display: flex;
  height: 800px;
  /* max-height: 710px; */
  margin-top: 2%;
  overflow-y: scroll;
}

.services-reviews-about-wrapper {
  width: 65%;
  overflow: scroll;
}

#customer-related-info::-webkit-scrollbar {
  width: 10px;
}

.services-reviews-about-wrapper::-webkit-scrollbar, #storeDetails::-webkit-scrollbar {
  width: 0;
}

#customer-related-info::-webkit-scrollbar-thumb,
.services-reviews-about-wrapper::-webkit-scrollbar-thumb, 
#storeDetails::-webkit-scrollbar-thumb {
  background-color: transparent;
}

.service-heading {
  color: #fff;
  font-weight: bold;
  font-size: 2rem;
  text-align: center;
}

.services-offered {
  color: #fff;
  display: flex;
  box-shadow: 0 6px 10px #ffd78f;
  padding: 2%;
  margin: 2.5% 4% 4% 4%;
  max-width: 1000px;
  background: #d69c4a;
  cursor: pointer;
}

.service-look {
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 260px;
  max-height: 192px;
}

.service-look img {
  display: block;
  width: 50%;
  height: 134px;
  border-radius: 50%;
  object-fit: cover;
  border: 5px solid #d69c4a;
}

.service-details {
  width: 70%;
  color: white;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  padding: 1%;
  line-height: 2;
}

.service-details p {
  margin: 0 0 1%;
}

.service-name {
  font-weight: 700;
  font-size: 1.55rem;
  border-bottom: 4px double;
  color: #000;
}

#more-info {
  display: inline-block;
  background: #000;
  padding: 0.7%;
  border-radius: 3px;
  color: #fff;
  font-weight: 500;
  font-size: 0.9rem;
  border: none;
}

#more-info-btn {
  background: #000;
  padding: 0.7%;
  border-radius: 3px;
  color: #fff;
  font-weight: 400;
  font-size: 0.84rem;
  text-align: center;
  border: none;
  width: 6%;
  font-weight: bold;
  font-size: 1.2rem;
  cursor: pointer;
}

.more-info-modal {
  display: flex;
  justify-content: space-between;
}

.infoBtnOn {
  background: black;
}

.infoBtnOff {
  background-color: #000000a8!important;
}

.duration,
.price,
.more-info-modal {
  font-size: 1.03rem;
}

.booking-info-wrapper {
  width: 35%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.booking-btn-wrapper {
  display: flex;
  justify-content: center;
  margin: 3% 0;
  height: 20%;
}

.booking-btn-modal {
  height: 60%;
  width: 90%;
  background: #d69c4a;
  color: #fff;
  font-size: 1.2rem;
  font-weight: 600;
  border: none;
  border-radius: 10px;
}

.booking-info {
  width: 70%;
  height: 70%;
  background: #fff;
  border-radius: 10px;
}

.operating-status {
  text-align: center;
  font-weight: 600;
  font-size: 1.05rem;
}

#bookAppointmentModal {
  width: 100vw;
  height: 100vh;
  background: #00000078;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

#bookingCalendar{
  display: block;
  width: 50%;
}
</style>
