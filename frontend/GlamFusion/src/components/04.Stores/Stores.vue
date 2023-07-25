<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const service = route.params.id;
console.log(service)
</script>

<template>
    <main id="stores-container">
        <h1 class="service">Looking for {{ service }}?</h1>

        <form id="search-form">
            <input type="text" placeholder="Store..." name="query-store" class="search-input query-store">
            <input type="text" name="location" placeholder="Location..." value="Current Location" class="search-input location">
            <input type="submit" value="Q" class="search-input submit-search">
        </form>

        <section id="stores">
            <div class="store">
                <div class="store-img-wrapper">
                    <img src="../../assets/img/background-2.webp" alt="" class="store-img">
                </div>
                <p class="store-name">Store Name</p>
                <p class="store-location">Greenfield <span id='distance'>1.2km</span></p>
                <ul class="rating">
                    <li class="star"><i class="fa-solid fa-star"></i></li>
                    <li class="star"><i class="fa-solid fa-star"></i></li>
                    <li class="star"><i class="fa-solid fa-star"></i></li>
                </ul>
                <ul class="top-services">
                    <li class="service">Service 1</li>
                    <li class="service">Service 2</li>
                    <li class="service">Service 3</li>
                </ul>
            </div>
            <div class="store">
                <div class="store-img-wrapper">
                    <img src="../../assets/img/background-2.webp" alt="" class="store-img">
                </div>
                <p class="store-name">Store Name</p>
                <p class="store-location">Greenfield <span id='distance'>1.2km</span></p>
                <ul class="rating">
                    <li class="star"><i class="fa-solid fa-star"></i></li>
                    <li class="star"><i class="fa-solid fa-star"></i></li>
                    <li class="star"><i class="fa-solid fa-star"></i></li>
                </ul>
                <ul class="top-services">
                    <li class="service">Service 1</li>
                    <li class="service">Service 2</li>
                    <li class="service">Service 3</li>
                </ul>
            </div>
            <div class="store">
                <div class="store-img-wrapper">
                    <img src="../../assets/img/background-2.webp" alt="" class="store-img">
                </div>
                <p class="store-name">Store Name</p>
                <p class="store-location">Greenfield <span id='distance'>1.2km</span></p>
                <ul class="rating">
                    <li class="star"><i class="fa-solid fa-star"></i></li>
                    <li class="star"><i class="fa-solid fa-star"></i></li>
                    <li class="star"><i class="fa-solid fa-star"></i></li>
                </ul>
                <ul class="top-services">
                    <li class="service">Service 1</li>
                    <li class="service">Service 2</li>
                    <li class="service">Service 3</li>
                </ul>
            </div>
            <div class="store">
                <div class="store-img-wrapper">
                    <img src="../../assets/img/background-2.webp" alt="" class="store-img">
                </div>
                <p class="store-name">Store Name</p>
                <p class="store-location">Greenfield <span id='distance'>1.2km</span></p>
                <ul class="rating">
                    <li class="star"><i class="fa-solid fa-star"></i></li>
                    <li class="star"><i class="fa-solid fa-star"></i></li>
                    <li class="star"><i class="fa-solid fa-star"></i></li>
                </ul>
                <ul class="top-services">
                    <li class="service">Service 1</li>
                    <li class="service">Service 2</li>
                    <li class="service">Service 3</li>
                </ul>
            </div>
            <div class="store">
                <div class="store-img-wrapper">
                    <img src="../../assets/img/background-2.webp" alt="" class="store-img">
                </div>
                <p class="store-name">Store Name</p>
                <p class="store-location">Greenfield <span id='distance'>1.2km</span></p>
                <ul class="rating">
                    <li class="star"><i class="fa-solid fa-star"></i></li>
                    <li class="star"><i class="fa-solid fa-star"></i></li>
                    <li class="star"><i class="fa-solid fa-star"></i></li>
                </ul>
                <ul class="top-services">
                    <li class="service">Service 1</li>
                    <li class="service">Service 2</li>
                    <li class="service">Service 3</li>
                </ul>
            </div>
            <div class="store">
                <div class="store-img-wrapper">
                    <img src="../../assets/img/background-2.webp" alt="" class="store-img">
                </div>
                <p class="store-name">Store Name</p>
                <p class="store-location">Greenfield <span id='distance'>1.2km</span></p>
                <ul class="rating">
                    <li class="star"><i class="fa-solid fa-star"></i></li>
                    <li class="star"><i class="fa-solid fa-star"></i></li>
                    <li class="star"><i class="fa-solid fa-star"></i></li>
                </ul>
                <ul class="top-services">
                    <li class="service">Service 1</li>
                    <li class="service">Service 2</li>
                    <li class="service">Service 3</li>
                </ul>
            </div>
        </section>
    </main>
</template>

<style scoped>
#stores-container{
    height: 100%;
    max-height: 900px;
    display: flex;
    flex-direction: column;
}

.direction-rating{
    display: flex;
    justify-content: space-between;
}

.service, .directions{
    color: #fff;
}

.fa-star{
    color: #d69c4a;
    font-size: 16px;
}

#search-form{
    display: flex;
    width: 50%;
}

.search-input{
    margin: 0 2% 0 0;
    padding: 1%;
    border: none;
    outline: none;
}

.search-input[type="text"]{
    background-color: #d69c4a;
    color: #fff;
    font-size: 0.85rem;
}

input::placeholder{
    color: #fff;
    font-size: 0.85rem;
}

input[type="submit"]{
    border-radius: 0;
    border: 1px solid #d68c4a;
    background-color: transparent;
    color: #d69c4a;
    font-weight: bolder;
}

#stores-content{
    flex: 1;
    display: flex;
}

#stores{
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(195px, 410px));
    grid-auto-rows: 40%;
    gap: 3%;
    flex: 1;
}

.store-img-wrapper{
    height: 40%;
}

.store-img-wrapper img{
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.store-name{
    color: #ababab;
    margin: 5px 0 0 0;
    font-size: 1.03rem;
    font-weight: bold;
}
.store-location{
    color: #ababab;
    font-style: italic;

};

.rating {
    display: flex;
}

.rating{
    display: flex;
    list-style: none;
    padding: 0;
}
.rating .star {
    margin-right: 1%;
}


.top-services{
    list-style: none;
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    padding: 0;
}

.top-services li{
    border-radius: 5px;
    border: 1px solid #fff;
    color: #fff;
    padding: 1%;
}
</style>