<script setup>
import { ref, watch } from 'vue';
import image1 from '../../assets/img/background-1.webp';
import image2 from '../../assets/img/background-2.webp';
import image3 from '../../assets/img/background-3.jfif';

const storeInfo = JSON.parse(localStorage.getItem('storeInfo'));
const {StoreName, StoreLocation, storeImage, StoreMembers, StoreServices} = storeInfo;

const baseUrl = ref('http://localhost:1337');
const changeImageNo = ref(0);
const dynamicStoreImage = ref(storeImage);
const bookAppointmentModal = ref(null);
const calendlyEvent = ref(null);
const isModalOpen = ref(false);
const isButtonDisabled = ref(true);
const bookingBtn = ref('booking-btn-off')

//we will use the selected member to book an appointment.
//after user clicks the member, we get their booking url from strapi. and make a calendly call using their booking url
//by that i mean insert the booking url in the parameters of the calendly sdk.

//but we need to find a way to ensure that when a team member is created in calendly,
//that user is also added onto strapi so that we can manage the content of the app and get to see the selected members.
//or else what can happen is that we can get the members of an organization from calendly directly when they are added onto the calendar.
//this will also allow us to get all members data from one single source of truth e.g get their schedules and all their images and all.
//then we can take that members name from calendly and then set the name in the db for a booking that will be used in the dashboard
function getMember(member){
  bookingBtn.value = 'booking-btn-on';
  isButtonDisabled.value = false;
  console.log('disabledSTATUS:',  isButtonDisabled.value)
  console.log(member)
}

console.log(StoreName, StoreLocation, storeImage, StoreMembers, StoreServices)

function updateDynamicImage(index, image) {
  changeImageNo.value = index;
  dynamicStoreImage.value = image;
}

// Book appointment
function bookAppointment() {
  Calendly.initPopupWidget({
    url: 'https://calendly.com/bibomarwanqana/fanatii-cutz-duplicate',
    parentElement: bookAppointmentModal.value?.id,
    prefill: {},
    utm: {},
  });
}

// Checks if it's a Calendly event
function isCalendlyEvent(e) {
  return (
    e.origin === 'https://calendly.com' &&
    e.data.event &&
    e.data.event.indexOf('calendly.') === 0
  );
}

// Listens to Calendly events and sets the event value
window.addEventListener('message', (e) => {
  if (isCalendlyEvent(e)) return e.data.event;
});

// If the user has booked, prompt them to pay
watch(calendlyEvent, (newEvent, oldEvent) => {
  if (newEvent === 'calendly.event_scheduled') {
    console.log('Booked, now you can go and pay');
  }
});

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = (event) => {
  if (event.target.id === 'bookAppointmentModal') {
    bookingBtn.value = 'booking-btn-off';
    isButtonDisabled.value = true;
    isModalOpen.value = false;
  }
};

</script>

<template>
    <main id="service-store-wrapper">
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
             @click="updateDynamicImage(index, (baseUrl + image.attributes.ServiceImage.data.attributes.url))"
             /> 
        </div>
       </section>

       <section id="customer-related-info">
        <div class="services-reviews-about-wrapper">
            <div class="services-reviews-about">
                <p class="service-heading">Services</p>
                <p class="reviews-heading">Reviews</p>
                <p class="about-heading">About</p>
            </div>

            <div v-for="(service, index) in StoreServices" :key="index"  class="services-offered">
                <div class="service-look">
                    <img :src="baseUrl + service.attributes.ServiceImage.data.attributes.url" alt="" class="service-look-img">
                </div>
                <div class="service-details">
                    <p class="service-name">{{service.attributes.ServiceName}}</p>
                    <p class="duration">Time: 30 min</p>
                    <p class="price">Price: {{service.attributes.ServicePrice}}</p>
                    <p class="more-info-modal"><span id="more-info">More Info</span></p>
                </div>
            </div>
        </div>
        <div class="booking-info-wrapper">
            <div class="booking-info">
                <div class="booking-btn-wrapper">
                    <button id="bookAppointment-btn" class="booking-btn-modal" @click.prevent="openModal">Book Now</button>
                </div>
                <p class="operating-status"><span id='status'>Closed</span> opens at <span id="operating-status-time"> 09:00</span></p>
                <a class="location" href="#">{{ location }}</a>
            </div>
        </div>
        <div  v-if="isModalOpen" id="bookAppointmentModal" ref="bookAppointmentModal" @click="closeModal">
          <div class="select-members-container">
            <p class="members-heading">SELECT MEMBERS</p>
            <div class="members">
              <div class="member" v-for="(member, index) in StoreMembers" @click="getMember(member)">
                <div class="member-image-wrapper">
                  <img :src="baseUrl + member.attributes.MemberImage.data.attributes.url" alt="" class="member-img">
                </div>
                <p class="member-name">{{ member.attributes.Name }}</p>
              </div>
            </div>
            <button id="bookAppointment-btn" :class="bookingBtn" @click.prevent="bookAppointment" :disabled="isButtonDisabled">Book Now</button>
          </div>
        </div>
       </section>
    </main>
</template>

<style scoped>
#service-store-wrapper {
  height: 100%;
}

.storeName {
  color: #fff;
}

.storeLocation {
  color: #d69c4a;
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

#store-img-service-select{
    height: 25%;
    display: flex;
    margin: 2% 0;
}

.service-img-select{
    position: relative;
    width: 25%;
    border: 3px solid #d69c4a;
    border-radius: 10px;
    overflow: hidden;
    margin: 2% 2% 0 0;
}

.service-img-select img{
    display: block;
    height: 100%;
    width: 100%;
    object-fit: cover;
    transition: .4s;
}

.service-img-select:hover img{
    transform: scale(1.05);
}

.display-image-overlay{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.247);
}

#customer-related-info{
    display: flex;
    height: 800px;
    /* max-height: 710px; */
    margin-top: 2%;
    overflow-y: scroll;
}

#customer-related-info::-webkit-scrollbar {
  width: 10px;
}

#customer-related-info::-webkit-scrollbar-thumb {
  background-color: transparent; /* Change the color of the scrollbar thumb */
}

.services-reviews-about-wrapper{
    width: 65%;
}

.services-reviews-about{
    display: flex;
    justify-content: space-between;
}

.service-heading, .reviews-heading, .about-heading{
    color: #fff;
    font-weight: bold;
    font-size: 1.05rem;
    
}

.services-offered{
    color: #fff;
    display: flex;
    border-radius: 15px;
    box-shadow: 0 4px 8px orange;
    padding: 2%;
    margin-bottom: 5%;
    max-width: 800px;
}

.service-look{
    width: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.service-look img {
    display: block;
    width: 50%;
    height: 134px;
    border-radius: 50%;
    object-fit: cover;
    border: 5px solid #d69c4a;
}

.service-details{
    width: 70%;
    color: white;
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
    padding: 1%;
    font-family: initial;
    line-height: 2;
}

.service-details p{
    margin: 0 0 1%;
}

.service-name{
    font-weight: 600;
    font-size: 1.6rem;
    border-bottom: 1px solid;
}

#more-info{
    border-bottom: 1px solid;
    display: inline-block;
}

.duration, .price, .more-info-modal{
    font-style: italic;
}

.booking-info-wrapper{
    width: 35%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.booking-btn-wrapper{
    display: flex;
    justify-content: center;
    margin: 3% 0;
    height: 20%;
}

.booking-btn-modal{
    height: 60%;
    width: 90%;
    background: #d69c4a;
    color: #fff;
    font-size: 1.2rem;
    font-weight: 600;
    border: none;
    border-radius: 10px;
}

.booking-info{
    width: 70%;
    height: 60%;
    background: #fff;
}

.operating-status{
    text-align: center;
    font-weight: 600;
    font-size: 1.05rem;
}

#bookAppointmentModal{
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

.select-members-container{
    width: 800px;
    height: 600px;
    background: #ffff;
    border-radius: 25px;
    overflow-y: scroll;
    position: relative;
}

.select-members-container::-webkit-scrollbar {
  width: 10px;
}

.select-members-container::-webkit-scrollbar-thumb {
  background-color: transparent; /* Change the color of the scrollbar thumb */
}

.members-heading{
    font-weight: 450;
    font-size: 1.3rem;
    text-align: center;
}

.members{
  display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 260px));
    grid-auto-rows: 40%;
    gap: 3%;
    padding-top: 1%;
    height: 90%;
}

.member{
  width: 80%;
  height: 80%;
  max-width: 170px;
  border-radius: 50%;
  max-height: 170px;
  margin: 10% 2% 0% 2%;
}

.member-image-wrapper{
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  /* transition: .4s; */
}
.member-img{
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  transition: .4s;
}

.member-image-wrapper:hover .member-img{
  height: 140%;
  width: 140%;
}

.member-image-wrapper:hover{
  border: 5px solid #d69c4a;
}

.member-name{
  text-align: center;
  font-weight: 450;
}

.booking-btn-off{
  position: absolute;
  left: 50%;
  bottom: 0;
  right: 50%;
  transform: translate(-50%, -50%);
  height: 8%;
  width: 50%;
  max-height: 45px;
  background: #d69c4a63;
  color: #fff;
  font-size: 1.2rem;
  font-weight: 600;
  border: none;
  border-radius: 10px;
}

.booking-btn-on{
  position: absolute;
  left: 50%;
  bottom: 0;
  right: 50%;
  transform: translate(-50%, -50%);
  height: 8%;
  width: 50%;
  max-height: 45px;
  background: #d69c4a;
  color: #fff;
  font-size: 1.2rem;
  font-weight: 600;
  border: none;
  border-radius: 10px;
}
</style>