<template>
 <v-container v-if="!isLoading">  
  <Card :allData="cardsData"></Card>  
  <br>
  <Form @my-data="getDataPeriod"  @my-clean="cleanLoading"></Form>

  <div class="maps" :key="alertsKey">
    <h3>Denúncias</h3>
    <div class="map-wrapper">
      <LeaMapComplaints class="map" :localizationList="AllComplaints.locationsAndTimes"></LeaMapComplaints>
      <div class="chart">
        <DoughnutChart :dados="AllComplaints.complaintsByType"></DoughnutChart>
      </div>
    </div>
    <br>
    <LineChartComplaints :dados="AllComplaints.locationsAndTimes"></LineChartComplaints>
    <br>
    <h3>Alertas</h3>
    <div class="map-wrapper-2">
      <LeaMapAlerts :localizationList="AllAlerts.information"></LeaMapAlerts>
    </div>
    <br>
    <LineChartAlerts :dados="AllAlerts.information"></LineChartAlerts>
   </div>
  </v-container>
  <v-overlay v-else>
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </v-overlay>
</template>

<script>

import LineChartComplaints from "./LineChartComplaints.vue";
import LineChartAlerts from "./LineChartAlerts.vue";

import DoughnutChart from "./DoughnutChart.vue";
import Form from './Form.vue';
import * as Reports from '../api/reports';
import Card from "./Card.vue";
import LeaMapComplaints from "./LeaMapComplaints.vue";
import LeaMapAlerts from "./LeaMapAlerts.vue";


export default {
  name: "numberCases",
  
  components: {
    LineChartComplaints,
    DoughnutChart,
    Form,
    Card,
    LeaMapComplaints,
    LeaMapAlerts,
    LineChartAlerts
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
      isLoading: true,
      isLoadedAlert: false,
      isLoadedComplaint: false,
      isEmpty: false,
      alertsKey: 0,
    };
  },

  created() {
    this.getData();
  },

  methods: {
  
    async getData() {
      const todosDados = await Promise.all([
        Reports.getAllUsersByCity(),
        Reports.getAlertsByCity(),
        Reports.getComplaintsByCity(),
      ]);

      this.AllUsers = todosDados[0].data;
      this.AllAlerts = todosDados[1].data;
      this.AllComplaints = todosDados[2].data;

      this.mountedCards();
    },

    async getDataPeriod(datas) {
      this.isLoading = true;
      const [todasAlertas, todasReclamacoes] = await Promise.all([
        Reports.getAlertsByPeriod(datas.init, datas.final),
        Reports.getComplaintsByPeriod(datas.init, datas.final),
      ]);

      this.AllAlerts = todasAlertas.data;
      this.AllComplaints = todasReclamacoes.data;
      this.mountedCards();
    },

    async mountedCards(){
      this.cardsData.totalUsers = this.AllUsers.amountUsers;
      this.cardsData.totalAlerts =  this.AllAlerts.amountAlertByCity;
      this.cardsData.totalComplaints = this.AllComplaints.amountComplaintsByCity;
      this.isLoading = false;
      this.updateMaps();
    },

    updateMaps(){
      this.complaintsKey++;
      this.alertsKey++;
    },
    cleanLoading(){
      this.isLoadedAlert = false;
      this.isLoadedComplaint = false;
      this.getData();
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

H2 {
  text-align: center;
}

h3 {
  background-color: #343a40; 
  color: #fff;
  padding: 12px;
  border-radius: 8px;
  font-family: 'Arial', sans-serif;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.mensagem {
  font-size: 1.5rem;
  text-align: center;
}
.map-wrapper{
  display: flex;
  flex-wrap: wrap;
  flex: 1 1 50%;
}

.chart{
  height: 360px;
  padding-left: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.map{
  margin-right: 10px;
}

</style>