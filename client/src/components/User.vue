<template>
  <div class="container">
    <div v-if="notFound">
      <h1>404 Error</h1>
      <p>Page is not found!</p>
      <a @click="$router.go(-1)" class="logout">Go back</a>
    </div>
    <div v-if="!notFound">
      <div v-if="true" class="col s12 m7">
        <div class="card horizontal">
          <div class="card-image">
            <img src="https://i.gifer.com/9R9Q.gif" />
          </div>
          <div class="card-stacked">
            <div class="card-content">
              <p class="item">
                <b>EMAIL:</b>
                {{ email }}
              </p>
              <p class="item">
                <b>USERNAME:</b>
                {{ username }}
              </p>
              <p class="item">
                <b>BIO:</b>
                {{ bio }}
              </p>
            </div>
            <div class="card-action">
              <a @click="logout" class="logout">Log out</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "User",
  data() {
    return {
      email: "",
      username: "",
      bio: "",
      notFound: false
    };
  },
  created() {
    if (localStorage.getItem("token") === null) {
      this.$router.push("/login");
    }
  },
  mounted() {
    try {
      axios
        .get(`http://localhost:3000/users/${this.$route.params.id}`, {
          headers: { Authorization: localStorage.getItem("token") }
        })
        .then(res => {
          if (!res.data) {
            this.notFound = !this.notFound;
          }

          this.email = res.data.email;
          this.username = res.data.username;
          this.bio = res.data.bio;
        });
    } catch (e) {
      console.log(e);
    }
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
.container {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
}

.card,
.card-image {
  height: 500px;
}

.item {
  font-size: 2.5rem;
  text-align: left;
  color: #26a69a;
}

.card-content p:not(:first-child) {
  margin-top: 60px;
}

.card-content p:first-child {
  margin-top: 20px;
}

.logout {
  cursor: pointer;
  font-weight: bold;
}
</style>
