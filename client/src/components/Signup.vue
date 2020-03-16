<template>
  <div>
    <Navbar />

    <div class="container">
      <h1>Sign up</h1>
      <div class="error error-hide">{{error}}</div>
      <div class="input-field">
        <input id="email" name="email" type="email" class="validate" v-model="email" />
        <label for="email">Email</label>
        <span class="helper-text" data-error="Write email"></span>
      </div>

      <div class="input-field">
        <input id="username" name="username" type="text" class="validate" v-model="username" />
        <label for="username">Username</label>
        <span class="helper-text" data-error="Write email"></span>
      </div>

      <div class="input-field">
        <input id="password" name="password" type="password" class="validate" v-model="password" />
        <label for="password">Password</label>
        <span class="helper-text" data-error="Write password"></span>
      </div>

      <div class="input-field">
        <input id="bio" name="bio" type="text" class="validate" v-model="bio" />
        <label for="bio">Bio</label>
        <span class="helper-text" data-error="Write email"></span>
      </div>

      <button @click="signup" class="btn btn-primary">Sign up</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Navbar from "./Navbar";

export default {
  name: "Signup",
  components: {
    Navbar
  },
  data() {
    return {
      email: "",
      username: "",
      password: "",
      bio: "",

      error: ""
    };
  },
  methods: {
    async signup() {
      const user = {
        email: this.email,
        username: this.username,
        password: this.password,
        bio: this.bio
      };

      await axios.post("http://localhost:3000/signup", user).then(
        () => {
          this.error = "";
          this.$router.push(`/login`);
        },
        err => {
          const error = document.querySelector(".error");
          this.error = err.response.data.error;
          error.classList.remove("error-hide");
        }
      );
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

.nav-wrapper {
  padding: 0 30px;
}
</style>