<script setup>
import { useRoute } from 'vue-router';
import router from '../../router';
import { ref, onMounted } from 'vue';

const route = useRoute();
const service = route.params.id;
const stores = ref([]);
const loading = ref(true);
const baseURL = ref('http://localhost:1337');

function viewStore(store) {
  const { id, attributes } = store;
  const { StoreName, StoreLocation, StoreImage, members, services, merchant_id } = attributes;
  console.log(attributes)
  const storeImage = baseURL.value + StoreImage.data.attributes.url;
  const StoreMembers = members.data;
  const StoreServices = services.data;

  //all store information that wll be accessed in the ServiceStore.vue(the specific store that was clicked)
  //the merchant_id is used to identify the payfast account that will will split payments
  const storeInfo = {
    StoreName,
    StoreLocation,
    storeImage,
    StoreMembers,
    StoreServices,
    merchant_id
  };

  localStorage.setItem('storeInfo', JSON.stringify(storeInfo));

  const path = `/services/${service}/${StoreName}`;
  router.push({ path });
}


// Fetch Stores and remove specified properties(attributes) from barberShop data
//the querying of strapi's deeply populated data and media e.g files can be found here:
//https://docs.strapi.io/dev-docs/api/rest/populate-select#relations--media-fields 
//https://stackoverflow.com/a/70251184/17908449
//https://stackoverflow.com/questions/76905893/image-url-not-showing-in-strapinested-data/76922008#76922008
async function fetchData() {
  const baseURL = 'http://localhost:1337';
  const service = 'barbers-stores';

  try {
    const response = await fetch(`${baseURL}/api/${service}?populate[StoreImage]=*&populate[barber_services][populate]=*&populate[members][populate]=*&populate[services][populate]=*`);
    const data = await response.json();
    const barberShops = data.data;

    const cleanedBarberShops = barberShops.map(({ id, attributes }) => {
      const {
        createdAt, updatedAt, publishedAt,
        barber_services, nail_tech_services, make_up_services, braiding_services,
        ...cleanedAttributes
      } = attributes;

      const services = barber_services || nail_tech_services || make_up_services || braiding_services;

      return { id, attributes: { ...cleanedAttributes, services }};
    });
    console.log(cleanedBarberShops)
    stores.value = cleanedBarberShops;
    loading.value = false;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}



onMounted(() => {
  fetchData();
});

</script>

<template>
    <main id='stores-container'>
        <h1 class='service'>Looking for {{ service }}?</h1>

        <form id='search-form'>
            <input type='text' placeholder='Store...' name='query-store' class='search-input query-store'>
            <input type='text' name='location' placeholder='Location...' value='Current Location' class='search-input location'>
            <input type='submit' value='Q' class='search-input submit-search'>
        </form>

        <section id='stores' v-if="!loading">
            <div class='store' v-for="store in stores" @click='viewStore(store)'>
                <div class='store-img-wrapper'>
                    <img :src="baseURL + store.attributes?.StoreImage?.data?.attributes?.url" alt='' class='store-img'>
                </div>
                <p ref='storeName' class='store-name'>{{ store?.attributes?.StoreName }}</p>
                <p ref='storeLocation' class='store-location'>{{ store?.attributes?.StoreLocation }} <span id='distance'>1.2km</span></p>
                <ul class='rating'>
                    <li class='star'><i class='fa-solid fa-star'></i></li>
                    <li class='star'><i class='fa-solid fa-star'></i></li>
                    <li class='star'><i class='fa-solid fa-star'></i></li>
                </ul>
                <ul class='top-services'>
                    <li v-for="service in store.attributes.services.data" class='service'>{{service.attributes.ServiceName}}</li>
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

.search-input[type='text']{
    background-color: #d69c4a;
    color: #fff;
    font-size: 0.85rem;
}

input::placeholder{
    color: #fff;
    font-size: 0.85rem;
}

input[type='submit']{
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
    padding-top: 1%;
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
    overflow: hidden;
    padding: 0;
}

.top-services li{
    border-radius: 5px;
    border: 1px solid #fff;
    color: #fff;
    padding: 1%;
    margin-right: 4%;
    min-width: 65px;
    text-align: center;
}
</style>