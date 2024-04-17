<template>
  <v-container>
    <Card :alertsComplaintsData="alertsComplaintsData"></Card>
    <h2 class="pesquisar">Pesquisar</h2>
    <Form @my-alerts="getAlerts" @my-complaints="getComplaints" @my-clean="cleanLoading"></Form>
    <div class="container-chart">
      <div class="chart-alerts" v-if="isLoadedAlert && !isEmpty">
        <h2>Por Data (dados em %)</h2>
        <div class="bar-chart">
          <bar-chart
            label="Alertas"
            :dados="alertsByDates"
            :key="alertsByDates.__ob__.dep.id"
          />
        </div>
        <h2>Por Bairro (dados em %)</h2>
        <div class="doughnu-chart">
          <doughnut-chart
            label="Por Bairro"
            :dados="alertsByDistricts"
            :key="alertsByDistricts.__ob__.dep.id"
          />
        </div>
      </div>

      <div class="chart-complaints" v-if="isLoadedComplaint && !isEmpty">
        <h2>Por Data (dados em %)</h2>
        <div class="bar-chart">
          <bar-chart
            label="Denúncias"
            :dados="complaintsByDates"
            :key="complaintsByDates.__ob__.dep.id"
          />
        </div>
        <h2>Por Bairro (dados em %)</h2>
        <div class="doughnu-chart">
          <doughnut-chart
            label="Por Bairro"
            :dados="complaintsByDistricts"
            :key="complaintsByDistricts.__ob__.dep.id"
          />
        </div>
        <h2>Por Tipo (dados em %)</h2>
        <div class="doughnu-chart">
          <doughnut-chart
            label="Por Tipo"
            :dados="complaintsByTypes"
            :key="complaintsByDistricts.__ob__.dep.id"
          />
        </div>
      </div>

      <h1 class="mensagem" v-if="isEmpty">Me desculpe, mas não foi localizado nenhum chamado proveniente dessa delimitação de tempo :(</h1>
    </div>
  </v-container>
</template>

<script>

import BarChart from "./BarChart.vue";
import DoughnutChart from "./DoughnutChart.vue";
import Form from './Form.vue';
import Card from './Card.vue'
import * as Reports from '../api/reports';

export default {
  name: "numberCases",
  
  components: {
    Card,
    BarChart,
    DoughnutChart,
    Form,
    Reports
  },

  data() {
    return {
      alertsComplaintsData: {
        totalUsers:0,
        totalAlerts:0,
        totalComplaints:0,
        fisica:0,
        Moral:0,
        Sexual:0,
        Patrimonial:0,
        Psicológica:0,
        Verbal:0,
        clear:false
      },
      imageUrl: "",
      token: "",
      city: "",
      isLoadedAlert: false,
      isLoadedComplaint: false,
      isEmpty: false,
    };
  },

  mounted(){
    this.getUsers();
    this.getAlerts();
    this.getComplaints()
  },

  methods: {
    async getUsers(){
      try{
        const response = await Reports.getAllUsers()
        this.alertsComplaintsData.totalUsers = response.data.amountUsers
      }catch(error){
        // eslint-disable-next-line no-console
        console.error("Error getting Users", error)
      }
    },
    async getAlerts(dates) {
      try{
        if(!dates){
          this.alertsComplaintsData.totalAlerts = (await Reports.getAllAlerts()).data.totalAlerts;
        }else{
          const response = await Reports.getAlertsByPeriod(dates.init, dates.final);
          if(!response) {
            this.alertsComplaintsData.totalAlerts = 0
          }
          else {
            this.alertsComplaintsData.totalAlerts = response.data.totalAlerts;
          }
        }
        this.alertsComplaintsData.clear = false;
      }catch(error){ 
        this.alertsComplaintsData.totalAlerts = 0;
        // eslint-disable-next-line no-console
        console.error("Error getting alerts", error);
      }
    },

      async getComplaints(dates) { // adicionar type, talvez ver se data é nulo direto no controller
        try{
          if(!dates){
            this.alertsComplaintsData.totalComplaints = (await Reports.getAllComplaints()).data.amountComplaints;
          }else{
            const response = await Reports.getComplaintsByPeriod(dates.init, dates.final);
            if(!response){
              this.alertsComplaintsData.totalComplaints = 0;
            }else{
            this.alertsComplaintsData.totalComplaints = response.data.totalComplaints;
            } 
        }
      }catch(error){
        this.alertsComplaintsData.totalComplaints = 0;
        // eslint-disable-next-line no-console
        console.error(error)
      }
    },

    cleanLoading(){
      this.isLoadedAlert = false;
      this.isLoadedComplaint = false;
    },

    logout() {
      localStorage.removeItem("token");
      this.$router.replace("/");
    },
  }

};
</script>

<style scoped>

.pesquisar {
  text-align: center;
  font-weight: bold;
  font-size: 25px;
  margin-top: 1em;
  margin-bottom: 1em;
}

.card
.showMap {
  display: grid;
  justify-content: center;
  padding: inherit;
}

.showChart {
  padding-top: 3em;
}

.chart-alerts {
  margin: 3em auto 3em auto;
}

.chart-complaints {
  margin: 2em auto 3em auto;
}

.bar-chart {
  margin: 2em auto 3em auto;
  border: solid 1px #555;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.6);
  -webkit-box-shadow: 0 0 10px rgba(0, 0, 0, 0.6);
}

.doughnu-chart {
  margin: 2em auto 3em auto;
  border: solid 1px #555;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.6);
  -webkit-box-shadow: 0 0 10px rgba(0, 0, 0, 0.6);
}

.mensagem {
  font-size: 1.5rem;
  text-align: center;
}
</style>