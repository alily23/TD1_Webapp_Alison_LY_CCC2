import { createStore } from 'vuex'

const axios = require('axios');

const instance = axios.create({
  baseURL: 'https://alison-ly-ccc.onrender.com/users/'
});
const instance2 = axios.create({
  baseURL: 'https://alison-ly-ccc.onrender.com/recommandations/'
});

let user = localStorage.getItem('user');
if (!user) {
 user = {
    userId: -1,
    token: '',
  }; 
} else {
  try {
    user = JSON.parse(user);
  } catch (ex) {
    user = {
      userId: -1,
      token: '',
    };
  }
}

// Create a new store instance.
const store = createStore({
  state: {
    status: '',
    user: user,
    userInfos: {
      username: '',
      password: '',
    },
  },
  mutations: {
    setStatus: function (state, status) {
      state.status = status;
    },
    logUser: function (state, user) {
      localStorage.setItem('user', user);
      state.user = user;
    },
    userInfos: function (state, userInfos) {
      state.userInfos = userInfos;
    },
    logout: function (state) {
      state.user = {
        userId: -1,
        token: '',
      }
      localStorage.removeItem('user');
      localStorage.removeItem('username');
      localStorage.removeItem('token');
    }
  },
  actions: {

    films: () => {
      return new Promise((resolve, reject) => {
        instance2.get('/', {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          }
        },).then(function (response) {
          localStorage.setItem('films', response.data.json)
          resolve(response)
        }).catch(function (error) {
          reject(error)
        })
      })
    },

    login: ({commit}, userInfos) => {
      commit('setStatus', 'loading');
      return new Promise((resolve, reject) => {
        instance.post('/login', userInfos)
        .then(function (response) {
          localStorage.setItem('token', response.data.jwt);
          localStorage.setItem('username', userInfos.username);
          commit('setStatus', '');
          commit('logUser', userInfos);
          resolve(response);
        })
        .catch(function (error) {
          commit('setStatus', 'error_login');
          reject(error);
        });
      });
    },
    createAccount: ({commit}, userInfos) => {
      commit('setStatus', 'loading');
      return new Promise((resolve, reject) => {
        commit;
        instance.post('/createAccount', userInfos)
        .then(function (response) {
          commit('setStatus', 'created');
          resolve(response);
        })
        .catch(function (error) {
          commit('setStatus', 'error_create');
          reject(error);
        });
      });
    },
    getUserInfos: ({commit}) => {
      instance.get('/me', {
        headers: {
          'Authorization' : 'Bearer ' + localStorage.getItem('token'),
        }
      },)
      .then(function (response) {
        commit('userInfos', response.data);
      })
      .catch(function () {
      });
    }
  }
})

export default store;