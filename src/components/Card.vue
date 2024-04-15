<template>
  <ul class="cards-container">
    <div class="card-1"  >
      <img src="../assets/pessoas.png" alt="Ícone Pessoas" class="card-image">
      <div class="card-content" >
        <h4 class="card-description">{{ this.amountUsers }}</h4>
        <p class="card-title">Usuarios</p>
      </div>
    </div>
  
    <div  class="card-2">
      <img src="../assets/perigo.png" alt="Ícone Perigo" class="card-image">
      <div class="card-content">
        <h4 class="card-description">{{this.totalAlerts}}</h4>
        <p class="card-title">Alertas</p>
      </div>
    </div>
    <div  class="card-3">
      <img src="../assets/megafone.png" alt="Ícone Megafone" class="card-image">
      <div class="card-content">
        <h4 class="card-description">{{ this.amountComplaintsByCity}}</h4>
        <p class="card-title">Denuncias</p>
      </div>
    </div>
  </ul>
  </template>

<script>

import * as Reports from '../api/reports.js';

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
        const response = await Reports.getAllUsers();
        this.amountUsers = response.data.amountUsers;
        
      } catch (error) {
        console.error("Error getting users:", error);
      }
    },

    async getAlerts(dates) {
      try {
        if(dates == null){
          this.totalAlerts = (await Reports.getAllAlerts()).data.totalAlerts;
        }else{
          console.log(dates.init);
          console.log(dates.final);
          const response = await Reports.getAlertsByPeriod(dates.init, dates.final);
          this.totalAlerts = response.data.totalAlerts;
        }
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
