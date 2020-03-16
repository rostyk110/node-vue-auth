import Vue from 'vue';
import Router from 'vue-router';
import User from './components/User.vue';
import Login from './components/Login.vue';
import Signup from './components/Signup.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/users/:id',
      component: User
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/signup',
      component: Signup
    }
  ]
});
