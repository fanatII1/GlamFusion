<script setup>
import { defineProps, ref } from 'vue';
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
const btn1 = ref(null);
const btn2 = ref(null);

//change image when buttons are clicked
function changeImage(btn) {
  const offset = btn.className.includes('btn1') ? -1 : 1;
  changeImageNo.value = (changeImageNo.value + offset + storeImages.length) % storeImages.length;
  dynamicStoreImage.value = storeImages[changeImageNo.value];
}

//change/update images when they are selected(clicked)
function updateDynamicImage(index) {
  changeImageNo.value = index;
  dynamicStoreImage.value = storeImages[index];
}
</script>

<template>
    <!-- we'll use contentful to populate everything that is on this page. use store name to get the store from contentful -->
    <main id="service-store-wrapper">
       <h2 class="storeName">{{ storeName }}</h2>
       <h3 class="storeLocation">{{ storeLocation }}</h3> 

       <div class="store-img-service-display">
        <transition name="image-slide" mode="out-in">
            <img :key="dynamicStoreImage" :src="dynamicStoreImage" alt="" class="store-img-service" />
        </transition>
        <div class="change-image-btns-wrapper">
            <div ref="btn1" class="btn1 btn" @click="changeImage(btn1)"> <i class="fa-solid fa-chevron-left"></i> </div>
            <div class="image-window"></div>
            <div ref="btn2" class="btn2 btn" @click="changeImage(btn2)"> <i class="fa-solid fa-chevron-right"></i> </div>
        </div>
       </div>

       <div class="store-img-service-select">
        <div class="service-img-select-1">
            <img :src="storeImages[0]" alt="" class="service-img" @click="updateDynamicImage(0)">
        </div>
        <div class="service-img-select-2">
            <img :src="storeImages[1]" alt="" class="service-img" @click="updateDynamicImage(1)">
        </div>
        <div class="service-img-select-3">
            <img :src="storeImages[2]" alt="" class="service-img" @click="updateDynamicImage(2)">
        </div>
       </div>
    </main>
</template>

<style scoped>
#service-store-wrapper {
  height: 100%;
  max-height: 900px;
  display: flex;
  flex-direction: column;
}

.storeName {
  color: #fff;
}

.storeLocation {
  color: #d69c4a;
}

.store-img-service-display {
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

.change-image-btns-wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 2;
  background-color: #ffffff23;
  display: flex;
  justify-content: space-between;
}

.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5%;
  background-color: #ffffff41;
}

.fa-chevron-left,
.fa-chevron-right {
  color: #d69c4a;
  font-weight: bold;
  font-size: 1.4rem;
}

.store-img-service-select{
    height: 25%;
    display: flex;
    justify-content: space-between;
    margin-top: 2%;
}

.service-img-select-1, .service-img-select-2, .service-img-select-3{
    width: 25%;
}

.service-img-select-1 img, .service-img-select-2 img, .service-img-select-3 img {
    display: block;
    height: 100%;
    width: 100%;
    object-fit: cover;
    transition: .4s;
}

.service-img-select-1:hover img, .service-img-select-2:hover, .service-img-select-3:hover img{
    transform: scale(1.05);
}
</style>