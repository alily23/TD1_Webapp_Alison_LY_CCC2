<template>
  <div class="card">
    <h1 class="card__title"> Film </h1>
    <h2> {{this.film.filmName}}</h2>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Film',
  data: function () {
    return {
      film: {},
      username: localStorage.getItem('username'),
    }
  },
  mounted() {

  },
  computed: {
    ...mapState({
      user: 'userInfos',
    }),
    filmsData() {
      if (this.films.length) {
        return JSON.parse(localStorage.getItem('films'));
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

    display: function() {
      this.film = localStorage.getItem('film')
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

