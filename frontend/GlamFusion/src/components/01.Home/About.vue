<template>
  <section id="About">
    <h2 class="AboutHeading">About Us</h2>
    <div class="underline"></div>

    <!-- ABOUT DESCRIPTION -->
    <div class="AboutDescription">
      <div class="about-photos">
        <div class="photo-1">
          <img src="../../assets/img/background-3.jfif" alt="" class="first-img" />
        </div>
        <div class="photo-2">
          <img src="../../assets/img/background-4.webp" alt="" class="first-img" />
        </div>
      </div>
      <div class="aboutText">
        <h3 class="AboutTextHeading">Glamorous Fusion - <span class="textHeadingSpan">Your Style, Your Way!</span></h3>
        <p class="aboutTextDescription"> {{ aboutTextDescription1 }} </p>
        <p class="aboutTextDescription"> {{ aboutTextDescription2 }} </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();

const introText = t('Homepage.intro-text');
const aboutTextDescription1 = t('Homepage.aboutTextDescription1');
const aboutTextDescription2 = t('Homepage.aboutTextDescription2');
</script>

<style scoped>
#About {
  height: 55%;
  padding-top: 2%;
}
.AboutHeading {
  color: #fff;
  text-align: center;
  font-size: 2rem;
  width: 15%;
  margin: 0.5% auto;
}

.underline {
  width: 10%;
  height: 5px;
  background-color: #d69c4a;
  margin: 0 auto;
  border-radius: 2px;
}

.AboutDescription {
  background-color: #000;
  height: 100%;
  display: flex;
  max-height: 480px;
}

.about-photos {
  display: flex;
  align-items: end;
}

.about-photos,
.aboutText {
  width: 50%;
  column-gap: 1%;
}

.photo-1 {
  width: 38%;
  height: 75%;
}
.photo-2 {
  width: 45%;
  height: 90%;
}

.photo-1 img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-top-left-radius: 45%;
  border-top-right-radius: 45%;
}

.photo-2 img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.AboutTextHeading {
  color: #fff;
  font-size: 2.5rem;
}

.textHeadingSpan {
  color: #d69c4a;
}

.aboutTextDescription {
  color: #ababab;
  font-size: 1.1rem;
}

/*Laptop 1024*/
@media screen and (max-width: 1024px) {
  .AboutHeading,
  .underline {
    width: 15%;
    font-size: 1.7rem;
  }

  .AboutTextHeading {
    color: #fff;
    font-size: 2rem !important;
  }
}

/*Tablet*/
@media screen and (max-width: 768px) {
  .AboutHeading,
  .underline {
    width: 20%;
    font-size: 1.4rem;
  }
}

/* Mobile */
@media screen and (max-width: 425px) {
  .AboutHeading,
  .underline {
    width: 25%;
    font-size: 1.4rem;
  }
}
</style>
