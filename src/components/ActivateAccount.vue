<template>
  <div class="image">
    <b-row>
      <b-col>
        <b-button class="text-center button" variant="success" @click="activate">Activate account</b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from "axios";
const baseUrl = "https://localhost:8083/user-service/request";

export default {
  name: "ActivateAccount",
  data() {
    return {};
  },
  methods: {
    activate: function() {
      const requestId = this.$route.query.id;
      if (requestId) {
        axios.put(baseUrl + "/" + requestId + "/activate/account").then(() => {
          this.$router.push({ name: "Login" });
        });
      }
    }
  }
};
</script>

<style scoped>
.image {
  background-image: url("../assets/login.jpg");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  height: 100vh;
}

.button {
  width: 190px;
  text-align: center;
  margin-top: 25%;
  margin-left: 45%;
}
</style>