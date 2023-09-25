<script setup>
import DashboardNav from './DashboardNav.vue';
import { ref, onMounted } from 'vue';


const storeServices = ref([]);
const loading = ref(true);
const strapiBaseURL = ref('http://localhost:1337');

async function fetchData() {
  const baseURL = 'http://localhost:1337';
  const service = 'barbers-stores';
  const storeId = 1

  try {
    const response = await fetch(`${baseURL}/api/${service}/${storeId}/?populate[StoreImage]=*&populate[barber_services][populate]=*&populate[members][populate]=*&populate[services][populate]=*`);
    const data = await response.json();
    const { attributes } = data.data;
    const { barber_services } = attributes
    console.log(barber_services.data)

    storeServices.value = barber_services.data;
    loading.value = false;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

onMounted(() => {
    fetchData()
})
</script>

<template>
  <div id="dashboard-services-wrapper" v-if="!loading">
    <!-- Dashboard Navbar -->
    <DashboardNav />

    <main id="dashboard-services-main-content">
      <h1 id="dashboard-services-heading">Services</h1>

      <div class="services">
        <div class="service" v-for="service in storeServices">
          <p class="service-name">{{service.attributes?.ServiceName}}</p>
          <p class="service-price">Price: R{{service.attributes?.ServicePrice}}</p>
          <div class="service-display-edit">
            <img :src="strapiBaseURL + service.attributes?.ServiceImage?.data?.attributes?.url" alt="" class="service-img-display" />
            <div class="manage-service">
                <i class="fa-solid fa-pen"></i>
                <i class="fa-solid fa-trash"></i>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
#dashboard-services-wrapper {
  height: 100%;
  display: flex;
  position: relative;
}

#dashboard-services-main-content {
  position: absolute;
  width: 95%;
  height: 100%;
  background: #fff;
  height: 100%;
  right: 0;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  overflow-y: scroll;
}

#dashboard-services-heading{
    margin-left: 2%;
}

#dashboard-services-main-content::-webkit-scrollbar{
  width: 0;
}

#dashboard-services-main-content::-webkit-scrollbar-thumb {
  background-color: transparent;
  
}

.services{
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(195px, 330px));
    grid-auto-rows: 25%;
    grid-gap: 3%;
    height: 100%;
}

.service{
    border-radius: 45px;
    -webkit-box-shadow: 3px 3px 10px 3px #d69c4a;
    -moz-box-shadow: 3px 3px 10px 3px #d69c4a;
    box-shadow: 3px 3px 10px 3px #d69c4a;
    height: fit-content;
    padding: 4%;
    margin-left: 5%;
    cursor: pointer;
    transition: .4s;
}

.service:hover{
    transform: scale(1.02);
}
.service-name{
    font-size: 1.8rem;
    font-weight: 600;
    margin-top: 1.5%;
}

.service-price{
    font-size: 1.2rem;
}

.service-img-display{
    display: block;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
}

.service-display-edit{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.fa-pen{
    margin-right: 1%;
    transition: .4s;
    color: #d69c4a;
}
.fa-pen:hover, .fa-trash:hover{
    transform: scale(1.25);
}
</style>
