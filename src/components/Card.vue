<template>
  <ul class="cards-container">
    <div class="card-1"  >
      <img src="../assets/pessoas.png" alt="altText" class="card-image">
      <div class="card-content" >
        <h4 class="card-description">{{ this.amountUsers }}</h4>
        <p class="card-title">Usuarios</p>
      </div>
    </div>
  
    <div  class="card-2">
      <img src="../assets/perigo.png" alt="altText" class="card-image">
      <div class="card-content">
        <h4 class="card-description">{{this.totalAlerts}}</h4>
        <p class="card-title">Alertas</p>
      </div>
    </div>
    <div  class="card-3">
      <img src="../assets/megafone.png" alt="altText" class="card-image">
      <div class="card-content">
        <h4 class="card-description">{{ this.amountComplaintsByCity}}</h4>
        <p class="card-title">Denuncias</p>
      </div>
    </div>
  </ul>
  </template>

<script>

import * as Reports from '../api/reports';

export default {
  name: 'Card',
  data() {
    return {
      amountUsers: 0,
      totalAlerts: 0,
      amountComplaintsByCity: 0,
    };
  },

  mounted() {
    this.getUsers();
    this.getAlerts();
    this.getComplaints();

  },

 
  methods: {
    async getUsers() {
      try {
        let city = localStorage.getItem('city');
        city = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase()
        const response = await Reports.getAllUsers();
        const usersByCity = response.data.usersByCity;

        if (city.toLowerCase() === "cidade n/d") { city = "undefined";}

        if (usersByCity.hasOwnProperty(city) ) {
          this.amountUsers = usersByCity[city];
        } else {
          this.amountUsers = 0;
        }
      } catch (error) {
        console.error("Error getting users:", error);
      }
    },

    async getAlerts() {
      try {
        const city = localStorage.getItem('city'); 
        const response = await Reports.getAllAlerts();
        const alertsByCityAndLocation = response.data.alertsByCityAndLocation;

        let totalAlerts = 0;
        for (const alert of alertsByCityAndLocation) {
          if (alert.city === city || city.toLowerCase() === "cidade n/d") {
            totalAlerts += alert.locations.length; 
          }
        }
        this.totalAlerts = totalAlerts;
      } catch (error) {
        console.error("Error getting alerts:", error);
      }
    },

    async getComplaints() {
      try {
        const city = localStorage.getItem('city').toLowerCase(); 
        const response = await Reports.getAllComplaints();
        const complaintsByCity = response.data.complaintsByCity;

        if (complaintsByCity.hasOwnProperty(city)) {
          this.amountComplaintsByCity = complaintsByCity[city];
        } else {
          this.amountComplaintsByCity = 0;
        }
      } catch (error) {
        console.error("Error getting complaints:", error);
      }
   }, 
  }
}
</script>

<style scoped>
.cards-container {
  display: flex;
  justify-content: center; 
  gap: 30px;
}
.card-1, .card-2, .card-3 {
  display: grid;
  grid-template-columns: auto 1fr;
  
  border-radius: 8px;
  width: 250px; 
  height: 80px; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease;
}

.card-1:hover, .card-2:hover, .card-3:hover {
  transform: translateY(-4px);
}

.card-image {
  width: 60px; 
  height: auto; 
  padding-left: 14px;
  padding-top: 15px
}

.card-content {
  padding: 1rem 1rem  0 2rem;
}


.card-title {
  margin-bottom: 0;
  font-size: 0,7rem;
  font-weight: bold;
  color: #555;
}

.card-description {
  color: #000;
  margin-top: 0;
  font-size: 1.3rem;
}

.card-1{
  background-color:rgb(115, 179, 227)
}
.card-2{
  background-color: rgb(247, 134, 126)
}
.card-3{
  background-color:rgb(255, 219, 104)
}
@media only screen and (max-width: 800px) {
  .cards-container {
    flex-direction: column;
    align-items: center; 
  }
}
</style>
