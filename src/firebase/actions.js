import { db } from "./firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export const likePost = async (postId, userId) => {
  const likeRef = collection(doc(db, "posts", postId), "likes");
  await addDoc(likeRef, { userDetails: userId });
};

export const commentOnPost = async (postId, userId, comment) => {
  const commentRef = collection(doc(db, "posts", postId), "comments");
  await addDoc(commentRef, { userDetails: userId, comment });
};

export const dislikePost = async (postId, userId) => {
  const likeRef = collection(doc(db, "posts", postId), "likes");
  const likeQuery = query(likeRef, where("userDetails", "==", userId));
  const likeSnapshot = await getDocs(likeQuery);

  if (!likeSnapshot.empty) {
    likeSnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
  }
};
