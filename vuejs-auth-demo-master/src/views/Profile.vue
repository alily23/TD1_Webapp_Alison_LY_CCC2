<template>
  <div class="card">
    <h1 class="card__title">Espace Perso</h1>
    <br>
    <p class="welcome_title"> Bonjour {{username}} ! </p>
    <h2 class="card__title2"> Films </h2>
    <br>
    <img src="../assets/avatar.png" alt="Avatar" style="width:100px;height:150px;">
    <img src='../assets/avengers.png' alt="Avatar" style="width:100px;height:150px;">
    <img src='../assets/bladerunner.png' alt="Avatar" style="width:100px;height:150px;">
    <img src='../assets/tunetueraspoint.png' alt="Avatar" style="width:100px;height:150px;">
    <img src='../assets/vpourvendetta.png' alt="Avatar" style="width:100px;height:150px;">

    <div class="card-cart-container">
      <div class="card-container">
        <div v-if="films.length">
          <div v-for="(film, index) in filmsData" :key="index" class="card">
            <h2> {{ film.filmName }} </h2>
            <div class="img-container">
              <img src='../assets/vpourvendetta.png' alt="Avatar" style="width:100px;height:150px;">
            </div>
            <div class="card-text">
              <h3>{{ film.filmName }}</h3>
              <span> {{ film.note }}</span>
            </div>
          </div>
        </div>
        <div v-else>
          Loading...
        </div>
      </div>
    </div>


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
      films: [],
      username: localStorage.getItem('username'),
    }
  },
  mounted() {
    this.create()
    this.films = localStorage.getItem('films')
    if (this.$store.state.user.userId == -1) {
      this.$router.push('/');
      return;
    }
    this.$store.dispatch('getUserInfos');
  },
  computed: {
    ...mapState({
      user: 'userInfos',
    }),
  filmsData() {
    if (this.films.length) {
      return JSON.parse(this.films);
    } else {
      return [];
    }
  },
  },
  methods: {
    logout: function () {
      this.$store.commit('logout');
      this.$router.push('/');
    },

    create: function () {
      return this.$store.dispatch('films')
    },

    /*searchfilm(movie): function() {
      let id;
      let film = this.films[0];
      for (film in this.films) {
        if(film.filmName == movie) {
          id == _id;
        }
      }
      return id;
    }*/
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

img
{
  margin-right:10px;
  padding:0;
}

</style>>
