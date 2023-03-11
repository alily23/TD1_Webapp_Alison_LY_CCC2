<template>
  <div class="card">
    <h1 class="card__title">Espace Perso</h1>
    <br>
    <p class="welcome_title"> Bonjour {{username}} ! </p>
    <h2 class="card__title2"> Films </h2>
    <br>
    <div class="card-cart-container">
      <div class="card-container">
        <div v-if="films.length">
          <div v-for="(film, index) in filmsData" :key="index" class="card">
            <div class="img-container">
              <img v-bind:src="film.image" alt="">
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
