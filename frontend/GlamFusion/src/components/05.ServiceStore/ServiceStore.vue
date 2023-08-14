<script setup>
import { ref, onMounted } from 'vue';
import image1 from '../../assets/img/background-1.webp';
import image2 from '../../assets/img/background-2.webp';
import image3 from '../../assets/img/background-3.jfif';

const props = defineProps(['store', 'location']);
const {store, location} = props;
const storeName = store;
const storeLocation = location;

const storeImages = [image1, image2, image3];
const changeImageNo = ref(0);
const dynamicStoreImage = ref(storeImages[0]);
const bookAppointmentModal = ref(null);

//change or update images when they are selected(clicked)
function updateDynamicImage(index) {
  changeImageNo.value = index;
  dynamicStoreImage.value = storeImages[index];
}

//book appointment
function bookAppointment(){
    // console.log(bookAppointmentModal.value?.id)
    Calendly.initPopupWidget({
        url: 'https://calendly.com/bibomarwanqana/fanatii-cutz',
        parentElement: bookAppointmentModal.value?.id,
        prefill: {},
        utm: {}
});
}
</script>

<template>
    <!-- we'll use contentful to populate everything that is on this page. use store name to get the store from contentful -->
    <main id="service-store-wrapper">
       <h2 class="storeName">{{ storeName }}</h2>
       <h3 class="storeLocation">{{ storeLocation }}</h3> 

       <section id="store-img-service-display">
        <transition name="image-slide" mode="out-in">
            <img :key="dynamicStoreImage" :src="dynamicStoreImage" alt="" class="store-img-service" />
        </transition>
       </section>

       <section id="store-img-service-select">
        <div class="service-img-select-1">
            <div class="display-image-overlay"></div>
            <img :src="storeImages[0]" alt="" class="service-img" @click="updateDynamicImage(0)">
        </div>
        <div class="service-img-select-2">
            <div class="display-image-overlay"></div>
            <img :src="storeImages[1]" alt="" class="service-img" @click="updateDynamicImage(1)">
        </div>
        <div class="service-img-select-3">
            <div class="display-image-overlay"></div>
            <img :src="storeImages[2]" alt="" class="service-img" @click="updateDynamicImage(2)">
        </div>
       </section>

       <section id="customer-related-info">
        <div class="services-reviews-about-wrapper">
            <div class="services-reviews-about">
                <p class="service-heading">Services</p>
                <p class="reviews-heading">Reviews</p>
                <p class="about-heading">About</p>
            </div>

            <div class="services-offered">
                <div class="service-look">
                    <img src="../../assets/img/hairstyle_2.jpg" alt="" class="service-look-img">
                </div>
                <div class="service-details">
                    <p class="service-name">Service Offered</p>
                    <p class="duration">Time: 30 min</p>
                    <p class="price">Price: R50</p>
                    <p class="more-info-modal"><span id="more-info">More Info</span></p>
                </div>
            </div>
            <div class="services-offered">
                <div class="service-look">
                    <img src="../../assets/img/hairstyle_2.jpg" alt="" class="service-look-img">
                </div>
                <div class="service-details">
                    <p class="service-name">Service Offered</p>
                    <p class="duration">Time: 30 min</p>
                    <p class="price">Price: R50</p>
                    <p class="more-info-modal"><span id="more-info">More Info</span></p>
                </div>
            </div>
            <div class="services-offered">
                <div class="service-look">
                    <img src="../../assets/img/hairstyle_2.jpg" alt="" class="service-look-img">
                </div>
                <div class="service-details">
                    <p class="service-name">Service Offered</p>
                    <p class="duration">Time: 30 min</p>
                    <p class="price">Price: R50</p>
                    <p class="more-info-modal"><span id="more-info">More Info</span></p>
                </div>
            </div>
            <div class="services-offered">
                <div class="service-look">
                    <img src="../../assets/img/hairstyle_2.jpg" alt="" class="service-look-img">
                </div>
                <div class="service-details">
                    <p class="service-name">Service Offered</p>
                    <p class="duration">Time: 30 min</p>
                    <p class="price">Price: R50</p>
                    <p class="more-info-modal"><span id="more-info">More Info</span></p>
                </div>
            </div>
            <div class="services-offered">
                <div class="service-look">
                    <img src="../../assets/img/hairstyle_2.jpg" alt="" class="service-look-img">
                </div>
                <div class="service-details">
                    <p class="service-name">Service Offered</p>
                    <p class="duration">Time: 30 min</p>
                    <p class="price">Price: R50</p>
                    <p class="more-info-modal"><span id="more-info">More Info</span></p>
                </div>
            </div>
            <div class="services-offered">
                <div class="service-look">
                    <img src="../../assets/img/hairstyle_2.jpg" alt="" class="service-look-img">
                </div>
                <div class="service-details">
                    <p class="service-name">Service Offered</p>
                    <p class="duration">Time: 30 min</p>
                    <p class="price">Price: R50</p>
                    <p class="more-info-modal"><span id="more-info">More Info</span></p>
                </div>
            </div>
        </div>
        <div class="booking-info-wrapper">
            <div class="booking-info">
                <div class="booking-btn-wrapper">
                    <button id="bookAppointment-btn" class="booking-btn" @click.prevent="bookAppointment">Book Now</button>
                </div>
                <p class="operating-status"><span id='status'>Closed</span> opens at <span id="operating-status-time"> 09:00</span></p>
                <a class="location" href="#">{{ location }}</a>
            </div>
        </div>
        <div id="bookAppointmentModal" ref="bookAppointmentModal"></div>
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
    justify-content: space-between;
    margin-top: 2%;
}

.service-img-select-1, .service-img-select-2, .service-img-select-3{
    position: relative;
    width: 25%;
    border: 3px solid #d69c4a;
    border-radius: 10px;
    overflow: hidden;
}

.service-img-select-1 img, .service-img-select-2 img, .service-img-select-3 img {
    display: block;
    height: 100%;
    width: 100%;
    object-fit: cover;
    transition: .4s;
}

.service-img-select-1:hover img, .service-img-select-2:hover img, .service-img-select-3:hover img{
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
}

.booking-info{
    width: 70%;
    height: 60%;
    background: #fff;
}

/* #bookAppointmentModal{
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: red;
    left: 0;
    top: 0;
} */
</style>