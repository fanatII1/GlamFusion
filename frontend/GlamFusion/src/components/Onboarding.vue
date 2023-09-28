<script setup>
import { ref } from 'vue';
import router from '../router/index';

// Define refs for form fields
const fullName = ref('');
const emailAddress = ref('');
const phoneNumber = ref('');
const uploadPhoto = ref(null);
const location = ref('');
const merchantId = ref('');
const acuityLink = ref('');
const acuityId = ref('');
const acuityKey = ref('');

// Function to handle file input change
const handleFileChange = (event) => {
  uploadPhoto.value = event.target.files[0];
};

//upload onboard info to strapi:
//here are the docs of how strapi upload works:
//https://docs.strapi.io/dev-docs/plugins/upload#examples
const submitForm = () => {
  // Create a FormData object to send the form data
  const formData = new FormData();
  const strapi = {
    StoreName: fullName.value,
    StoreLocation: location.value,
    StoreImage: uploadPhoto.value,
    StoreEmail: emailAddress.value,
    merchant_id: merchantId.value,
    ActuityLink: acuityLink.value,
    PhoneNumber: phoneNumber.value,
    ActuityKey: acuityKey.value,
    ActuityID: acuityId.value,
  };

  formData.append('files.StoreImage', uploadPhoto.value);
  formData.append('data', JSON.stringify(strapi));

  fetch('http://localhost:1337/api/barbers-stores', {
    method: 'post',
    // headers: { 'Content-Type': 'application/json' },
    body: formData,
  })
  .then((res) => {
    if(res.status === 200){
      return res.json()
    } else {
      alert("there was an issue in the registration of the form. ")
    }
  })
  .then((data) => {
    console.log(data)
    //set the organisation id in storage so that it'll be used to retrieve organisation info on dashboard
    localStorage.setItem("organisation", JSON.stringify({organisationId: data?.data?.id, organisationName: data?.data?.attributes?.StoreName}));
    const path = '/dashboard/home';
    router.push(path);
  });
};
</script>

<template>
  <main id="onboarding-main-content">
    <section class="container">
    <header>Registration Form</header>
    <form action="#" class="form">
      <div class="input-box">
        <label>Organisation Name</label>
        <input type="text" placeholder="Enter Organisation Name" v-model="fullName" required />
      </div>
      <div class="input-box">
        <label>Organisation Email</label>
        <input type="text" placeholder="Enter Organisation Email" v-model="emailAddress" required />
      </div>
      <div class="input-box">
        <label>Organisation Number</label>
        <input type="number" placeholder="Enter organisation phone number" v-model="phoneNumber" required />
      </div>
      <!-- New Fields -->
      <div class="input-box">
        <label>Upload Photo</label>
        <input type="file" accept="image/*" @change="handleFileChange" required />
      </div>
      <div class="input-box">
        <label>Location</label>
        <input type="text" placeholder="Enter Organisation Location" v-model="location" required />
      </div>
      <div class="input-box">
        <label>Merchant ID</label>
        <input type="text" placeholder="Enter Payfast Merchant ID" v-model="merchantId" required />
      </div>
      <div class="input-box">
        <label>Acuity Link</label>
        <input type="text" placeholder="Enter Acuity Calendar Link" v-model="acuityLink" required />
      </div>
      <div class="input-box">
        <label>Acuity ID</label>
        <input type="text" placeholder="Enter Acuity ID" v-model="acuityId" required />
      </div>
      <div class="input-box">
        <label>Acuity Key</label>
        <input type="text" placeholder="Enter Acuity Key" v-model="acuityKey" required />
      </div>
      <!-- End of New Fields -->
      <button @click.prevent="submitForm">Submit</button>
    </form>
  </section>
  </main>
</template>

<style>
/* Import Google font - Poppins */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap');
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

.navbar {
  display: none !important;
}


#app {
  padding: 0 !important;
}

#onboarding-main-content {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: #fff;
}
.container {
  position: relative;
  max-width: 700px;
  width: 100%;
  background: #fff;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}
.container header {
  font-size: 1.5rem;
  color: #333;
  font-weight: 500;
  text-align: center;
}
.container .form {
  margin-top: 30px;
}
.form .input-box {
  width: 100%;
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
