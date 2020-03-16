<template>
  <nav>
    <div class="nav-wrapper">
      <span class="brand-logo">Test application</span>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li>
          <router-link to="/login">Login</router-link>
        </li>
        <li>
          <router-link to="/signup">Signup</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>


<script>
export default {
  name: "Navbar"
};
</script>

<style scoped>
.nav-wrapper {
  padding: 0 30px;
}
</style>