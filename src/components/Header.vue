<template>
  <header class="header">
    <img src="../assets/logo.png" alt="Logo arretadas" />
    <h2>Relatorios</h2>
    <ul>
      <v-btn v-show="showBtn" class="notification" color="#00d1b2" title="Notification" depressed @click="toggleNotification">
        <v-badge v-if="notificationCount > 0" color="error" :content="notificationCount">
          <v-icon color="#fff">mdi-bell-outline</v-icon>
        </v-badge>
        <v-icon v-else color="#fff">mdi-bell-outline</v-icon>
      </v-btn>
      <v-btn v-show="showBtn" title="Sair" color="#00d1b2" depressed @click="logout">
        <v-icon color="#fff">mdi-logout</v-icon>
      </v-btn>
  </ul>
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
      showBtn: false,
      notificationCount: 0, 
      notificationVisible: false
    }
  },

  mounted() {
    this.token = localStorage.getItem("token");
    this.showBtn = this.token ? true : false;
  },

  methods: {
    toggleNotification() {
      if (this.notificationVisible) {
        this.updateNotificationContent();
      } else {
        this.clearNotificationContent();
      }
    },
    addNotification() {
      this.notificationCount++;
    },

    removeNotification() {
      if (this.notificationCount > 0) {
        this.notificationCount--;
      }
    },

    clearNotifications() {
      this.notificationCount = 0;
    },

    updateNotificationContent() {
      this.addNotification();
    },

    clearNotificationContent() {
      this.removeNotification();
    },

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
  align-self: center;
  font-size: 25px;
  padding-left: 55px;
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

