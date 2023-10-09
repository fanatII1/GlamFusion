<script setup>
import DashboardNav from './DashboardNav.vue';
import { ref, onMounted } from 'vue';

const storeBookings = ref([]);
const loading = ref(true);
const strapiUrl = import.meta.env.VITE_STRAPI_URL;
const baseServerURL = import.meta.env.VITE_SERVER_URL;

const questions = ref([
  {
    title: 'do you accept all major credit cards?',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est dolore illo dolores quia nemo doloribus quaerat, magni numquam repellat reprehenderit.',
    isOpen: false,
  },
  {
    title: 'do you suppport local farmers?',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est dolore illo dolores quia nemo doloribus quaerat, magni numquam repellat reprehenderit.',
    isOpen: false,
  },
  {
    title: 'do you use organic ingredients?',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est dolore illo dolores quia nemo doloribus quaerat, magni numquam repellat reprehenderit.',
    isOpen: false,
  },
]);

const selectedBooking = ref(null);

const toggleQuestion = (index) => {
  // Check if the selected booking is different from the clicked booking
  if (selectedBooking.value !== index) {
    // Close the previously selected booking if any
    if (selectedBooking.value !== null) {
      storeBookings.value[selectedBooking.value].isOpen = false;
    }
    // Open the clicked booking
    storeBookings.value[index].isOpen = true;
    selectedBooking.value = index;
  } else {
    // Toggle the clicked booking if it's the same as the selected one
    storeBookings.value[index].isOpen = !storeBookings.value[index].isOpen;
  }
};

async function fetchBooking() {
  const organisationData = JSON.parse(localStorage.getItem('organisation'));
  const { organisationId, StoreType } = organisationData;
  console.log(organisationId);
  const baseStrapiURL = `${strapiUrl}/api/${StoreType}/${organisationId}/`;

  try {
    const response = await fetch(
      `${baseStrapiURL}?populate[StoreImage]=*&populate[services][populate]=*&populate[members][populate]=*&populate[services][populate]=*`
    );
    const data = await response.json();
    const { attributes } = data.data;
    const { ActuityID, ActuityKey } = attributes;
    const calendarAccessData = { key: ActuityKey, id: ActuityID };
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(calendarAccessData),
    };

    //we  fetch bookings and parse(covert) the formsText string data to read the booking, using parseFormsText function
    //we will display only latest five bookings
    const getOrganisationBookings = await fetch(`${baseServerURL}/actuity/organisationBookings`, options);
    const bookingsResults = await getOrganisationBookings.json();
    const parseBookingsFormData = parseFormsText(bookingsResults);

    storeBookings.value = parseBookingsFormData;
    loading.value = false;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function parseFormsText(formData) {
  return formData.map((item) => {
    const lines = item.formsText.split('\n').filter((line) => line.trim() !== ''); // Split the string into lines and remove empty lines
    const formObject = {};

    lines.forEach((line) => {
      const [key, value] = line.split(':').map((str) => str.trim()); // Split each line into key and value
      formObject[key] = value;
    });

    return { ...item, formsText: formObject }; // Return a new object with the modified "formsText" property
  });
}

onMounted(() => {
  // fetchContentData()
  fetchBooking();
});
</script>

<template>
  <div id="dashboard-bookings-wrapper" v-if="!loading">
    <!-- Dashboard Navbar -->
    <DashboardNav />

    <main id="dashboard-bookings-main-content">
      <h1 id="dashboard-bookings-heading">Bookings</h1>

      <!-- <div class="bookings">
        <div class="booking" v-for="booking in storeBookings">
          <p class="booking-service">{{ booking.formsText['Which service would you like to book?'] }}</p>
          <p class="booking-name">
            {{booking.firstName}}
            <div class="payStatus"><span id="paid">.</span> <span id="not-paid">.</span></div>
         </p>
          <p class="booking-price">{{booking.calendar}}</p>
          <div class="booking-display-edit">
          </div>
        </div>
      </div> -->

      <section class="questions">
        <!-- questions -->
        <div class="section-center">
          <!-- single question -->
          <article class="question" v-for="(booking, index) in storeBookings" :key="index" :class="{ selected: selectedBooking === index }">
            <!-- question title -->
            <div class="question-title">
              <p>{{ booking.formsText['Which service would you like to book?'] }}</p>
              <button type="button" class="question-btn" @click="toggleQuestion(index)">
                <span class="plus-icon" v-if="!booking.isOpen"><i class="far fa-plus-square"></i></span>
                <span class="minus-icon" v-if="booking.isOpen"><i class="far fa-minus-square"></i></span>
              </button>
            </div>
            <!-- question text -->
            <div :class="{ 'show-text': booking.isOpen, 'question-text': !booking.isOpen }">
              <p>Client: {{ booking.firstName }}</p>
              <p>Staff: {{ booking.calendar }}</p>
            </div>
          </article>
          <!-- end of single question -->
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
:root {
  /* dark shades of primary color*/
  --clr-primary-1: hsl(205, 86%, 17%);
  --clr-primary-2: hsl(205, 77%, 27%);
  --clr-primary-3: hsl(205, 72%, 37%);
  --clr-primary-4: hsl(205, 63%, 48%);
  /* primary/main color */
  --clr-primary-5: #49a6e9;
  /* lighter shades of primary color */
  --clr-primary-6: hsl(205, 89%, 70%);
  --clr-primary-7: hsl(205, 90%, 76%);
  --clr-primary-8: hsl(205, 86%, 81%);
  --clr-primary-9: hsl(205, 90%, 88%);
  --clr-primary-10: hsl(205, 100%, 96%);
  /* darkest grey - used for headings */
  --clr-grey-1: hsl(209, 61%, 16%);
  --clr-grey-2: hsl(211, 39%, 23%);
  --clr-grey-3: hsl(209, 34%, 30%);
  --clr-grey-4: hsl(209, 28%, 39%);
  /* grey used for paragraphs */
  --clr-grey-5: hsl(210, 22%, 49%);
  --clr-grey-6: hsl(209, 23%, 60%);
  --clr-grey-7: hsl(211, 27%, 70%);
  --clr-grey-8: hsl(210, 31%, 80%);
  --clr-grey-9: hsl(212, 33%, 89%);
  --clr-grey-10: hsl(210, 36%, 96%);
  --clr-white: #fff;
  --clr-red-dark: hsl(360, 67%, 44%);
  --clr-red-light: hsl(360, 71%, 66%);
  --clr-green-dark: hsl(125, 67%, 44%);
  --clr-green-light: hsl(125, 71%, 66%);
  --clr-gold: #c59d5f;
  --clr-black: #222;
  --ff-primary: 'Roboto', sans-serif;
  --ff-secondary: 'Open Sans', sans-serif;
  --transition: all 0.3s linear;
  --spacing: 0.25rem;
  --radius: 0.5rem;
  --light-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  --dark-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  --max-width: 1170px;
  --fixed-width: 620px;
}

#dashboard-bookings-wrapper {
  height: 100%;
  display: flex;
  position: relative;
}

#dashboard-bookings-main-content {
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

#dashboard-bookings-heading {
  margin-left: 2%;
}

#dashboard-bookings-main-content::-webkit-scrollbar {
  width: 0;
}

#dashboard-bookings-main-content::-webkit-scrollbar-thumb {
  background-color: transparent;
}


#paid,
#not-paid {
  font-size: 4rem;
  transform: scale(4);
}

#paid {
  color: green;
}

#not-paid {
  color: red;
}

/* section */
.section {
  padding: 5rem 0;
}

.section-center {
  width: 90vw;
  margin: 0 auto;
  max-width: 1170px;
}
@media screen and (min-width: 992px) {
  .section-center {
    width: 95vw;
  }
}

/*
=============== 
Questions
===============
*/
.title {
  margin-top: 15vh;
  margin-bottom: 4rem;
}
.title h2 {
  color: #d69c4a;
  font-family: 'Great Vibes', cursive;
  text-align: center;
}
.section-center {
  max-width: var(--fixed-width);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.question {
  background: var(--clr-white);
  border-radius: var(--radius);
  box-shadow: var(--light-shadow);
  padding: 1.5rem 1.5rem 0 1.5rem;
  margin-bottom: 2rem;
  max-width: 1000px;
  width: 100%;
}
.question-title {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  text-transform: capitalize;
  padding-bottom: 1rem;
}

.question-title p {
  margin-bottom: 0;
  letter-spacing: 0.25rem;
  color: black;
  font-size: 1.3rem;
  font-weight: 600;
}
.question-btn {
  font-size: 1.5rem;
  background: transparent;
  border-color: transparent;
  cursor: pointer;
  color: #d69c4a;
  transition: var(--transition);
}
.question-btn:hover {
  transform: rotate(90deg);
}
.question-text {
  padding: 1rem 0 1.5rem 0;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
}
.question-text p {
  margin-bottom: 0;
}
/* hide text */
.question-text {
  display: none;
}
.show-text .question-text {
  display: block;
}

.show-text p {
  font-size: 1.05rem;
}

.show-text .minus-icon {
  display: inline;
}
.show-text .plus-icon {
  display: none;
}

.question.selected {
  background: black; /* Black background color for selected booking */
  color: #d69c4a; /* Text color for selected booking */
  border-color: #d69c4a; /* Border color for selected booking */
}

.question.selected .plus-icon {
  color: #d69c4a; /* Color of the plus icon for selected booking */
}

.question {
  background: var(--clr-white); /* Background color for deselected bookings */
  border-radius: var(--radius);
  box-shadow: var(--light-shadow);
  padding: 0.7rem;
  margin-bottom: 2rem;
  margin-left: 2rem;
  transition: background 0.3s ease; /* Add a smooth transition effect */
  border-radius: 10px;
  -webkit-box-shadow: 3px 3px 10px 3px #27272712;
  -moz-box-shadow: 3px 3px 10px 3px #27272712;
  box-shadow: 3px 3px 10px 3px #27272712;
}

.question-title p {
  margin-bottom: 0;
  letter-spacing: var(--spacing);
  color: var(--clr-grey-1); /* Text color for deselected bookings */
}

.question-btn {
  font-size: 1.5rem;
  background: transparent;
  border-color: transparent;
  cursor: pointer;
  color: var(--clr-gold);
  transition: var(--transition);
}

.question-btn:hover {
  transform: rotate(90deg);
}

.question-text {
  padding: 1rem 0 1.5rem 0;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
}

.question-text p {
  margin-bottom: 0;
}

.show-text .question-text {
  display: block;
}

.show-text .minus-icon {
  display: inline;
}

.show-text .plus-icon {
  display: none;
}
</style>
