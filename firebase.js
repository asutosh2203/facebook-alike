import firebase from 'firebase'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyBunx3IIo31DZly1HYok_B9-NpAimvJWko',
  authDomain: 'nextjs-fbclone.firebaseapp.com',
  projectId: 'nextjs-fbclone',
  storageBucket: 'nextjs-fbclone.appspot.com',
  messagingSenderId: '710057838404',
  appId: '1:710057838404:web:f8f15dc39f67e4fdafb911',
}

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app()

const db = app.firestore()

const storage = firebase.storage()

export { db, storage }
