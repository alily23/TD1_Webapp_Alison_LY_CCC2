<template>
  <div class="card">
    <h1 class="card__title">Espace Perso</h1>
    <br>
    <p class="welcome_title"> Bonjour {{username}} ! </p>
    <h2 class="card__title2"> Films </h2>
    <br>
    <p style="margin-bottom:20px;">
    <img src='../assets/avatar.png' alt="Avatar" style="width:100px;height:150px;">
    <p style="margin-bottom:20px;">
    <img src='../assets/avengers.png' alt="Avatar" style="width:100px;height:150px;">
    <p style="margin-bottom:20px;">
    <img src='../assets/bladerunner.png' alt="Avatar" style="width:100px;height:150px;">
    <p style="margin-bottom:20px;">
    <img src='../assets/tunetueraspoint.png' alt="Avatar" style="width:100px;height:150px;">
    <p style="margin-bottom:20px;">
    <img src='../assets/vpourvendetta.png' alt="Avatar" style="width:100px;height:150px;">
    <p style="margin-bottom:20px;">

    <div class="form-row">
      <button @click="logout()" class="button">
        Déconnexion
      </button>
    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'Profile',
  data: function () {
    return {
      films:[],
      username: localStorage.getItem('username'),
    }
  },
  mounted() {
    this.create()
    this.films = localStorage.getItem('films')
    if (this.$store.state.user.userId == -1) {
      this.$router.push('/');
      return ;
    }
    this.$store.dispatch('getUserInfos');
  },
  computed: {
    ...mapState({
      user: 'userInfos',
    })
  },
  methods: {
    logout: function () {
      this.$store.commit('logout');
      this.$router.push('/');
    },

    create: function () {
      return this.$store.dispatch('films')
    },
  }
}

</script>

<style scoped>

.welcome_title {
  display: flex;
  margin: 16px 0px;
  gap:16px;
  flex-wrap: wrap;
  font-weight: 300;
  font-size: 10px;
}

</style>>
