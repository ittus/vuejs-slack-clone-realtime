// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import firebase from 'firebase';
import App from './App';
import router from './router';


Vue.config.productionTip = false;

const config = {
  apiKey: 'AIzaSyCDsjYCup7MtOf5FJHChTlfkjaa991fpNI',
  authDomain: 'slackclonevuejs.firebaseapp.com',
  databaseURL: 'https://slackclonevuejs.firebaseio.com',
  projectId: 'slackclonevuejs',
  storageBucket: '',
  messagingSenderId: '588671758176',
};
firebase.initializeApp(config);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
