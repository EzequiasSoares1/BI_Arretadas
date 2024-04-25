<template>
  <v-container>
    <Card :allData="cardsData"></Card>
    <h2>Pesquisar</h2>
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
import * as Reports from '../api/reports';
import Card from "./Card.vue";

export default {
  name: "numberCases",
  
  components: {
    BarChart,
    DoughnutChart,
    Form,
    Card,
    Reports
  },

  data() {
    return {
      cardsData: {
        totalUsers:0,
        totalAlerts:0,
        totalComplaints:0
      },
      AllUsers:{},
      AllAlerts:{},
      AllComplaints:{},
      imageUrl: "",
      token: "",
      city: "",
      isLoadedAlert: false,
      isLoadedComplaint: false,
      isEmpty: false,
  
    };
  },

  mounted(){
    this.getData();
  },

  methods: {
    async getData(){
      this.AllUsers = (await Reports.getAllUsersByCity()).data;
      this.AllAlerts =( await Reports.getAlertsByCity() ).data;
      this.AllComplaints = (await Reports.getComplaintsByCity()).data;

      this.mountedCards();
    },

    async mountedCards(){
      this.cardsData.totalUsers = this.AllUsers.amountUsers;
      this.cardsData.totalAlerts =  this.AllAlerts.amountAlertByCity;
      this.cardsData.totalComplaints = this.AllComplaints.amountComplaintsByCity;
    },

    async getAlerts() {
      this.token = localStorage.getItem('token')
      this.city = localStorage.getItem('city')
      
      await Reports.getAlertsByCity()
      .then((response) => {
        console.log(response.data)
      })
    },

    async getComplaints(date) {
      this.token = localStorage.getItem('token')
      this.city = localStorage.getItem('city')
      
      await Reports.getComplaintsByPeriod(date.init, date.final)
      .then((response) => {
        console.log(response.data);
      })
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