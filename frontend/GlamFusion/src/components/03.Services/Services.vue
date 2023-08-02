<template>
    <main id='services-container'>
        <h1 class='services-heading'>Services</h1>

        <div class='offered-services service-grid'>
            <div class='service s-1'>
                <div class='service-overlay'></div>
                <p>HAIRCUT</p>
                <button class='service-btn'>
                    <RouterLink to='/services/barbers-stores'>SEE MORE</RouterLink>
                </button>
            </div>
            <div class='service s-2'>
                <div class='service-overlay'></div>
                <p>HAIR SALON</p>
                <button class='service-btn'>
                    <RouterLink to='/services/hairsalon'>SEE MORE</RouterLink>
                </button>
            </div>
            <div class='service s-3'>
                <div class='service-overlay'></div>
                <p>MAKE-UP</p>
                <button class='service-btn'>
                    <RouterLink to='/services/makeup'>SEE MORE</RouterLink>
                </button>
            </div>
            <div class='service s-4'>
                <div class='service-overlay'></div>
                <p>NAIL SALON</p>
                <button class='service-btn'>
                    <RouterLink to='/services/nailsalon'>SEE MORE</RouterLink>
                </button>
            </div>
        </div>
    </main>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';


</script>

<style scoped>
#services-container{
    height: 100%;
    max-height: 865px;
    display: flex;
    flex-direction: column;
}

.services-heading{
    text-align: center;
}

.offered-services{
    flex-grow: 1;
}

.service-grid{
    display: grid;
    grid-template-columns: repeat(2, minmax(300px, 500px));
    justify-content: center;
    gap: 2%;
}

.service {
    margin: 0 auto;
    width: 65%;
    padding: 20px;
    border: 1px solid #000;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #fff;
    position: relative;
    overflow: hidden;
    cursor: pointer;
}

.service-overlay{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: .4s;
    background: #0000002e;
}

.service:hover{
    background-size: 220%;
}

.service p {
    font-size: 2.3rem;
    z-index: 3;
    color: #fff;
}

.service button {
    z-index: 3;
    background: #d69c4aba;
    color: #fff;
    border: 1px solid #d69c4a;
    padding: 2%;
    font-size: 1rem;
    transition: .4s;
}

.service button:hover{
    cursor: pointer;
    transform: scale(1.05);
}

.service button a {
    color: #fff;
}

.s-1{
    background: url('../../assets/img/haircut_2.webp') no-repeat center / cover;
}

.s-2{
    background: url('../../assets/img/hairstyle_2.jpg') no-repeat center / cover;
}

.s-3{
    background: url('../../assets/img/make-up_2.jpg') no-repeat center / cover;
}

.s-4{
    background: url('../../assets/img/nail_tech_2.webp') no-repeat center / cover;
}
</style>