import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBunk-9KDea6TKPxOaPKZravVQ_hg0EbFc",
  authDomain: "instagram-clone-vite-9757a.firebaseapp.com",
  projectId: "instagram-clone-vite-9757a",
  storageBucket: "instagram-clone-vite-9757a.appspot.com",
  messagingSenderId: "878629072616",
  appId: "1:878629072616:web:1c70ad5c0281070f34235d",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const storageRef = ref(storage);
const imagesRef = ref(storageRef, "images");

export { app, auth, db, storage, storageRef, imagesRef };
