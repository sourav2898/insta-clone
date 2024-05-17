import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

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

export { app, auth };
