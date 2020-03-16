<template>
  <div>
    <Navbar />

    <div class="container">
      <h1>Login</h1>
      <div class="error error-hide">{{error}}</div>
      <div class="input-field">
        <input id="email" name="email" type="email" class="validate" v-model="email" />
        <label for="email">Email</label>
        <span class="helper-text" data-error="Write email"></span>
      </div>

      <div class="input-field">
        <input id="password" name="password" type="password" class="validate" v-model="password" />
        <label for="password">Password</label>
        <span class="helper-text" data-error="Write password"></span>
      </div>

      <button @click="login" class="btn btn-primary">Login</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Navbar from "./Navbar";

export default {
  name: "Login",
  components: {
    Navbar
  },
  data() {
    return {
      email: "",
      password: "",

      error: ""
    };
  },
  methods: {
    async login() {
      try {
        const user = {
          email: this.email,
          password: this.password
        };
        await axios.post("http://localhost:3000/login", user).then(res => {
          if (res.status === 200) {
            localStorage.setItem("token", res.data.token);
            this.$router.push(`/users/${res.data.id}`);
          }
        });
      } catch (e) {
        const error = document.querySelector(".error");
        this.error = e.response.data.error;
        error.classList.remove("error-hide");
      }
    }
  }
};
</script>


<style scoped>
.error {
  padding: 0.5rem 1rem;
  border-radius: 10px;
  text-align: center;
  margin-bottom: 1rem;
  color: red;
  background-color: rgba(255, 0, 0, 0.3);
}

.error-hide {
  display: none;
}
</style>