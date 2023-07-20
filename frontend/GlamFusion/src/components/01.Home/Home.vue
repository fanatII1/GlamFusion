<template>
  <main id="main-content">
    <section id="intro-section">
      <div class="intro-info-lead">
        <h1 class="intro-heading">Unlock Your Glamour - Book Your Style</h1>
        <!-- <p class="intro-text">{{ mainText }}</p>
        <p class="intro-text">{{ subText }}</p> -->
        <p class="intro-text">Your all in one solution to <span id="lead-text">{{ mainText }} {{ subText }}</span></p>
        <button class="button">Book Now</button>
      </div>
      <div class="intro-slide-pics">
        <div class="gradient"></div>
        <img ref="slidImg" :src="currentImage" class="hidden-image" alt="Slide" />
      </div>
    </section>
    <About/>
  </main>
</template>

<script setup>
import { ref, onBeforeUnmount, watch } from 'vue';
import About from './About.vue';
import image1 from '@/assets/img/background-1.webp';
import image2 from '@/assets/img/background-2.webp';
import image3 from '@/assets/img/background-3.jfif';
import image4 from '@/assets/img/background-4.webp';

const images = [image1, image2, image3, image4];
const serviceDescription = [
  { service: 'Barber', mainText: 'Fresh Cuts, Fresh Style -', subText: 'Embrace Your Fresh Look!' },
  { service: 'Make-Up', mainText: 'Redefining Your Glamour -', subText: 'Unleash Your Radiance!' },
  { service: 'Hair Braid', mainText: 'Dazzling Braids -', subText: 'Elevating Your Hairstyle!' },
  { service: 'Nails', mainText: 'Polished Perfection -', subText: 'Flaunting Your Perfect Tips!' },
];

const currentIndex = ref(0);
const currentImage = ref(images[currentIndex.value]);
const slidImg = ref(null);
const show = ref(true);
const serviceItemNo = ref(0);
const mainText = ref(serviceDescription[serviceItemNo.value].mainText);
const subText = ref(serviceDescription[serviceItemNo.value].subText);

watch(show, (newValue) => {
  if (newValue) {
    serviceItemNo.value = (serviceItemNo.value + 1) % serviceDescription.length;
    mainText.value = serviceDescription[serviceItemNo.value].mainText;
    subText.value = serviceDescription[serviceItemNo.value].subText;
  }
});

// Add the reveal-animation class to trigger the transition, Remove the reveal-animation class after the animation is complete
// Same duration as the animation in the CSS, Duration between image changes (twice the animation duration)
const slideInterval = setInterval(() => {
  currentIndex.value = (currentIndex.value + 1) % images.length;
  currentImage.value = images[currentIndex.value];
  slidImg.value?.classList.add('reveal-animation');

  setTimeout(() => {
    slidImg.value?.classList.remove('reveal-animation');
  }, 2000);
}, 4000);

const slideText = setInterval(() => {
  show.value = !show.value;
}, 2000)

onBeforeUnmount(() => {
  clearInterval(slideInterval);
  clearInterval(slideText);
});
</script>

<style>
#main-content {
  height: 100%;
}

#intro-section {
  display: flex;
  height: 55%;
  justify-content: space-between;
  background: #000;
}

.intro-info-lead {
  color: #fff;
}

.intro-heading {
  font-size: 3rem;
  margin: 30% auto 0;
}

.intro-text {
  font-size: 1.1rem;
}

#lead-text{
  font-weight: bold;
  color: #d69c4a;
}

.button {
  display: inline-block;
  background-color: #d69c4a;
  color: #fff;
  padding: 12px 24px;
  font-size: 16px;
  text-decoration: none;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: box-shadow 0.3s, transform 0.2s;
}

/* Btn Animation styles */
.button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  transition: left 0.3s;
}

.button:hover::before {
  left: 0;
}

.button::after {
  content: '→';
  position: absolute;
  top: 50%;
  right: 2px;
  font-size: 15px;
  transform: translateY(-50%) scaleX(0);
  transform-origin: left;
  transition: transform 0.3s;
  font-weight: bold;
}

.button:hover::after {
  transform: translateY(-50%) scaleX(1);
}

/* Glow effect on hover */
.button:hover {
  box-shadow: 0 0 3px 3px #ffffffb0;
  transform: scale(1.05);
}

.intro-slide-pics {
  overflow: hidden;
  position: relative;
}

.hidden-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.reveal-animation {
  opacity: 0;
  animation: slid 2s ease-out infinite;
}

@keyframes slid {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.gradient {
  background: -webkit-linear-gradient(94deg, #000000 0.3%, transparent 100%);
  background: linear-gradient(94deg, #000000 0.3%, transparent 100%);
  height: 100%;
  position: absolute;
  width: 100%;
  z-index: 2;
}
</style>
