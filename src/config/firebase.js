import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import { getFirestore ,getDocs ,query ,collection ,addDoc, serverTimestamp } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { getStorage } from "firebase/storage";



const firebaseConfig = {
  apiKey: "AIzaSyDvmrHM2TYeqj4IHhEcjBIiZXEbUI7ILds",
  authDomain: "iraj-zahid.firebaseapp.com",
  projectId: "iraj-zahid",
  storageBucket: "iraj-zahid.appspot.com",
  messagingSenderId: "689335392101",
  appId: "1:689335392101:web:b9ba2244c8a6714b68738c"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export async function getAllUsersData() {
  try {
    const q = query(collection(db, "users2"));
    const querySnapshot = await getDocs(q);
    let arr = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      arr.push(doc.data());
    });
    console.log(arr);
    return {
      status: "success",
      data: arr,
    };
  } catch (error) {
    console.log(error.message);
    return {
      status: "error",
      error: error.message,
    };
  }
}
export async function getAllchats() {
  try {
  //   const q = query(collection(db, "chats"));
  //   const querySnapshot = await getDocs(q);
    

  //   let arr = [];
  //   querySnapshot.forEach((doc) => {
  //     // console.log(doc.id, " => ", doc.data());
  //     arr.push(doc.data());
  //   });
  //   console.log(arr);
  //   return {
  //     status: "success",
  //     data: arr,
  //   };
  } 
  catch (error) {
  //   console.log(error.message);
  //   return {
  //     status: "error",
  //     error: error.message,
    };
  }
// }
export async function logout() {
  try {
    await signOut(auth);
    return {
      status: "success",
      
    };
  } catch (error) {
    console.log(error.message);
    return {
      status: "error",
      error: error.message,
    };
  }
}
export const getUserData = async () => {
  try{
      const q = query(collection(db, "users2"));
  const querySnapshot = await getDocs(q);
  let arr = [];
  querySnapshot.forEach((doc) => {
    arr.push(doc.data());
    console.log(arr)
  });
  return {
    status: "success",
    data: arr,
  };
  }
  catch (error) {
      console.log(error.message);
      return {
        status: "error",
        error: error.message,
      };
    }
}
export const chatData = async (chat,personId, user) => {
  const collectionRef = collection(db, "AllChatData");
  await addDoc(collectionRef, {
    message:chat,
    personId:personId,
    id:user,
    timestamp: serverTimestamp(),

  });

}