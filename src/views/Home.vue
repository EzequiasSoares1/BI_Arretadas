<template>
  <v-app>
    <Header></Header>
    <div class="box">
      <br>
      <NumberCases></NumberCases>
    </div>
    <Footer></Footer>
  </v-app>
</template>

<script>
import vuetify from "../plugins/vuetify";
import Header from "../components/Header";
import NumberCases from "../components/NumberCases";
import Footer from "../components/Footer";
import { validateToken } from "@/services/validationToken";
import "@mdi/font/css/materialdesignicons.css";
import Card from "../components/Card.vue";

export default {
  name: "app",
  vuetify,
  components: {
    Header,
    Card,
    NumberCases,
    Footer,
  },

  data() {
    return {
      token: "",
    };
  },

  mounted() {
    this.token = localStorage.getItem("token");
    if (this.token) {
      this.verifyTokenUser(this.token);
    }else {
      this.logout();
    }
  },

  methods: {
    async verifyTokenUser(token) {
      await validateToken({
        oldToken: token,
      }).catch(() => this.logout());
    },

    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("city");
      this.$router.replace("/");
    },
  },
};

</script>

<style >
.box {
  margin: 0.7rem 0 auto;
}

</style>
