<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const service = route.params.id;
console.log(service)
</script>

<template>
    <main id="stores-container">
        <h1 class="service">Looking for {{ service }}?</h1>
        <div class="direction-rating">
            <p class="directions">Directions</p>
        </div>
        <form id="search-form">
            <input type="text" placeholder="Store..." name="query-store" class="search-input query-store">
            <input type="text" name="location" placeholder="Location..." value="Current Location" class="search-input location">
            <input type="submit" value="Q" class="search-input submit-search">
        </form>

        <section id="stores-content">
            <div class="stores">
                <div class="store">
                    <div class="store-img-wrapper">
                        <img src="" alt="" class="store-img">
                    </div>
                    <div class="store-summary">
                        <p class="store-name">Name</p>
                        <p class="store-distance">85km</p>
                        <ul class="rating-list">
                            <li class="star"><i class="fa-solid fa-star"></i></li>
                            <li class="star"><i class="fa-solid fa-star"></i></li>
                            <li class="star"><i class="fa-solid fa-star"></i></li>
                        </ul>
                    </div>

                </div>
            </div>
            <div class="store-info">

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

.directions {
    text-decoration: underline;
    cursor: pointer;
}

.fa-solid{
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

.stores{
    height: 100%;
    width: 40%;
}

.store-info{
    height: 100%;
    width: 60%;
    /* background-color: #fff; */
}

.store{
    height: 20%;
    display: flex;
    color: #000;
    background-color: #997452;
}

.store-img-wrapper{
    display: flex;
    width: 20%;
    height: 100%;
    align-items: center;
}

.store-img{
    display: block;
    width: 100%;
    height: 100%;
    max-width: 110px;
    max-height: 110px;
    object-fit: cover;
}

.store-summary{
    flex: 1;
}

.store-name{
    font-size: 1.2rem;
    font-weight: 520;
    padding-left: 1%;
}

.store-distance{
    padding-left: 1%;
    font-weight: 100;
    font-style: italic;
}

.rating-list{
    display: flex;
    padding: 0;
    list-style: none;
}

.rating-list li {
    margin: 0 1%;
}
</style>