<script setup>
import DashboardNav from './DashboardNav.vue';
import { ref, onMounted } from 'vue';

const storeServices = ref([]);
const loading = ref(true);
const strapiBaseURL = ref(import.meta.env.VITE_STRAPI_URL);
const showModal = ref(false);
const serviceName = ref('');
const servicePrice = ref('');
const servicePhoto = ref(null);
const requestMethod = ref('');
const service = ref('');
const organisationData = JSON.parse(localStorage.getItem('organisation'));

const toggleModal = (method, serviceId) => {
  showModal.value = !showModal.value;
  console.log(method)
  requestMethod.value = method;
  service.value = serviceId;
};

const handleFileChange = (event) => {
  servicePhoto.value = event.target.files[0];
};

//we will create a new servie here.
//in order to create entries with files and relations read the docs here:
// https://docs.strapi.io/dev-docs/api/rest#requests  https://docs.strapi.io/dev-docs/api/rest/relations
const submitForm = () => {
  // Create a FormData object to send the form data
  const formData = new FormData();
  
  const organisationData = JSON.parse(localStorage.getItem('organisation'));
  const { organisationId, StoreType } = organisationData;
  const storeType = StoreType === "barbers-stores" ? 'store-services': StoreType === 'braiding-stores' ? 'braiding-services' : StoreType === 'nail-tech-stores' ? 'nail-tech-services' : StoreType === 'make-up-stores' ? 'make-up-services' : '';
  // console.log(organisationId);

  const createServiceUrl = `${strapiBaseURL.value}/api/${storeType}?populate[owner][populate]=*&populate[ServiceImage]=*`;
  const updateServiceUrl = `${strapiBaseURL.value}/api/${storeType}/${service.value}?populate[owner][populate]=*&populate[ServiceImage]=*`
  const requestUrl = requestMethod.value === 'POST' ? createServiceUrl : updateServiceUrl;

  const strapiServiceData = {
    ServiceName: serviceName.value,
    ServicePrice: servicePrice.value,
    ServiceImage: servicePhoto.value,
    owner: {
      connect: [organisationId],
    },
  };
  formData.append('files.ServiceImage', servicePhoto.value);
  formData.append('data', JSON.stringify(strapiServiceData));

  //create/updates a new service
  fetch(requestUrl, {
    method: requestMethod.value,
    body: formData,
  })
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        console.log(res.json());
        alert('there was an issue in the creation of a new service. Contact Support ');
      }
    })
    .then(async (serviceData) => {
      console.log(serviceData.data)
      //adds the latest service to the storeServices array or if a service exists we update it
      if(requestMethod.value === 'POST'){
        storeServices.value.push(serviceData.data)
      }
      else{
        const updateItemById = (serviceId, updatedData) => {
          return storeServices.value.map((item) => (item.id === serviceId ? { ...item, ...updatedData } : item));
        }
        storeServices.value = updateItemById(serviceData.data.id, serviceData.data);
      }
      console.log(storeServices.value)
    });
};

//deletes a service
const deleteService = async (serviceId) => {
  const options = { method: 'DELETE' };
  const response = await fetch(`${strapiBaseURL.value}/api/store-services/${serviceId}`, options);
  const deletedService = await response.json();

  storeServices.value = storeServices.value.filter((service) => service.id !== deletedService.data.id )
  console.log(deletedService, storeServices.value)
}

async function fetchData() {
  const organisationData = JSON.parse(localStorage.getItem('organisation'));
  const { organisationId, StoreType } = organisationData;
  console.log(organisationId);
  const baseStrapiURL = `${strapiBaseURL.value}/api/${StoreType}/${organisationId}/`;

  try {
    const response = await fetch(`${baseStrapiURL}?populate[StoreImage]=*&populate[services][populate]=*&populate[members][populate]=*&populate[services][ServiceImage][populate]=*&populate=*`);

    const data = await response.json();
    console.log(data)
    const { attributes } = data.data;
    const { services } = attributes;
    storeServices.value = services.data;
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
  <div id="dashboard-services-wrapper" v-if="!loading">
    <!-- Dashboard Navbar -->
    <DashboardNav />

    <main id="dashboard-services-main-content">
      <button class="toggle-modal-button" @click="toggleModal('POST')">{{ showModal ? '-' : '+' }}</button>
      <h1 id="dashboard-services-heading">Services</h1>

      <div class="services">
        <div class="service" v-for="service in storeServices">
          <p class="service-name">{{ service.attributes?.ServiceName || service.data.attributes?.ServiceName}} {{ service.id || service.data.id }}</p>
          <p class="service-price">Price: R{{ service.attributes?.ServicePrice|| service.data.attributes?.ServiceName }}</p>
          <div class="service-display-edit">
            <img :src="strapiBaseURL + service.attributes?.ServiceImage?.data?.attributes?.url ||  service.data?.attributes?.ServiceImage?.data?.attributes?.url " alt="" class="service-img-display" />
            <div class="manage-service">
              <i class="fa-solid fa-pen" @click="toggleModal('PUT', service.id || service.data.id)"></i>
              <i class="fa-solid fa-trash" @click="deleteService(service.id || service.data.id)"></i>
            </div>
          </div>
        </div>
      </div>

      <div id="services-modal" v-show="showModal" @click.stop>
        <section class="services-container">
          <header>Create Service</header>
          <form action="#" class="form">
            <!-- New Fields -->
            <div class="input-box">
              <label>Service Name</label>
              <input type="text" placeholder="Enter Service Name" v-model="serviceName" required />
            </div>
            <div class="input-box">
              <label>Service Price</label>
              <input type="number" placeholder="Enter Service Price" v-model="servicePrice" required />
            </div>
            <div class="input-box">
              <label>Service Photo</label>
              <input type="file" accept="image" @change="handleFileChange" required />
            </div>
            <!-- End of New Fields -->
            <button @click.prevent="submitForm">Submit</button>
          </form>
        </section>
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

#dashboard-services-heading {
  margin-left: 2%;
}

.toggle-modal-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #d69c4a;
  color: #fff;
  font-size: 24px;
  width: 40px;
  height: 40px;
  border-radius: 5%;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

#dashboard-services-main-content::-webkit-scrollbar {
  width: 0;
}

#dashboard-services-main-content::-webkit-scrollbar-thumb {
  background-color: transparent;
}

.services {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(195px, 330px));
  grid-auto-rows: 25%;
  grid-gap: 3%;
  height: 100%;
}

.service {
  border-radius: 45px;
  -webkit-box-shadow: 3px 3px 10px 3px #d69c4a;
  -moz-box-shadow: 3px 3px 10px 3px #d69c4a;
  box-shadow: 3px 3px 10px 3px #d69c4a;
  height: fit-content;
  padding: 4%;
  margin-left: 5%;
  cursor: pointer;
  transition: 0.4s;
}

.service:hover {
  transform: scale(1.02);
}
.service-name {
  font-size: 1.8rem;
  font-weight: 600;
  margin-top: 1.5%;
}

.service-price {
  font-size: 1.2rem;
}

.service-img-display {
  display: block;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
}

.service-display-edit {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.fa-pen {
  margin-right: 1%;
  transition: 0.4s;
  color: #d69c4a;
}
.fa-pen:hover,
.fa-trash:hover {
  transform: scale(1.25);
}

#services-modal {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: #0000003a;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}
.services-container {
  position: relative;
  max-width: 700px;
  width: 100%;
  background: #fff;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}
.services-container header {
  font-size: 1.5rem;
  color: #333;
  font-weight: 500;
  text-align: center;
}
.services-container .form {
  margin-top: 30px;
}
.form .input-box {
  width: 95%;
  margin-top: 20px;
}
.input-box label {
  color: #333;
}
.form :where(.input-box input, .select-box) {
  position: relative;
  height: 50px;
  width: 100%;
  outline: none;
  font-size: 1rem;
  color: #707070;
  margin-top: 8px;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 0 15px;
}
.input-box input:focus {
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
}
.form button {
  height: 55px;
  width: 100%;
  color: #fff;
  font-size: 1rem;
  font-weight: 400;
  margin-top: 30px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  background: rgb(130, 106, 251);
}
.form button:hover {
  background: rgb(88, 56, 250);
}
/*Responsive*/
@media screen and (max-width: 500px) {
  .form .column {
    flex-wrap: wrap;
  }
  .form :where(.gender-option, .gender) {
    row-gap: 15px;
  }
}
</style>
