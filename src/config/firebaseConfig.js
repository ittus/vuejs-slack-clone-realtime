import firebase from 'firebase'


const config = {
    apiKey: '',
    authDomain: 'slackclonevuejs.firebaseapp.com',
    databaseURL: 'https://slackclonevuejs.firebaseio.com',
    projectId: 'slackclonevuejs',
    storageBucket: 'slackclonevuejs.appspot.com',
    messagingSenderId: '588671758176'
}
firebase.initializeApp(config)

export const firebaseObj = firebase
