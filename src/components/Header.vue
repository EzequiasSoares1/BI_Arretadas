<template>
  <header class="header">
    <img src="../assets/logo.png" alt="Logo arretadas" />
    <h2>Relatorios</h2>
    <v-btn v-show="showBtn" title="Sair" color="#00d1b2" depressed @click="logout">
      <v-icon color="#fff">mdi-logout</v-icon>
    </v-btn>
  </header>
</template>

<script>

import { mdiLogout } from "@mdi/js";
import "@mdi/font/css/materialdesignicons.css";

export default {
  name: "Header",
  mdiLogout,
  icons: {
    iconFont: "mdi-logout",
  },

  data() {
    return {
      showBtn: false
    }
  },

  mounted() {
    this.token = localStorage.getItem("token");
    this.showBtn = this.token ? true : false;
  },

  methods: {
    logout(){
      localStorage.removeItem("token");
      this.$router.replace("/");
    }
  }
};
</script>

<style scoped>


.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #00d1b2;
  padding: 1rem 1rem;
  width: 100%;
}

h2{
  font-size: 25px;
  color: #fff;
}

img {
  height: 50px;
}

@media only screen and (max-width: 800px) {
  .header {
    padding: 1em 1em;
  }

  img {
    height: 50px;
  }
}
</style>