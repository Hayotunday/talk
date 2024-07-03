"use client"

import { auth, db } from "../config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getDoc, doc, setDoc, Timestamp, updateDoc, query, collection, where, getDocs } from "firebase/firestore";
import { userInterface } from "@/state/users";


// Authentication functions
const registerWithEmailAndPassword = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const q = query(collection(db, "users"), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size > 0) return { success: false, error: "Email in use" }

    const res = await createUserWithEmailAndPassword(auth, email, password);
    const userResponse = res.user;
    const userDbRef = doc(db, "users", userResponse.uid);
    await setDoc(userDbRef, {
      uid: userResponse.uid,
      email,
      password,
      username: name,
      image: "",
      createdAt: Timestamp.fromDate(new Date())
    });
    return {
      userInfo: {
        userid: userResponse.uid,
        email,
        username: name,
        image: null
      },
      success: true
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error,
    };
  }
};

const loginWithEmailAndPassword = async (email: string, password: string) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const userId = res.user.uid;
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);
    return {
      userInfo: {
        userid: userDoc.data()?.uid,
        email: userDoc.data()?.email,
        username: userDoc.data()?.username,
        image: userDoc.data()?.image != "" ? userDoc.data()?.image : null
      },
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      user: null,
      error,
    };
  }
};

const signinWithGoogle = async (email: string, password: string) => {

  try {
  } catch (err) {
    console.error(err);
    return {
      success: false,
      user: null,
      err,
    };
  }
};

const signout = async () => {

  await signOut(auth);
  return { success: true };
};

// Update profile functions
const updateProfile = async (userObj: userInterface) => {

  try {
    const userRef = doc(db, "users", userObj.userid!);
    await updateDoc(userRef, {
      username: "",
      image: ""
    });
    return {
      success: true,
      user: {},
    };
  } catch (error) {
    return {
      success: false,
      user: null,
      error,
    };
  }
};

// Update password functions
const updatePassword = async () => {

  try {
    // const userRef = doc(db, "users");
    // const userDoc = await getDoc(userRef);
    // return {
    //   success: true,
    //   user: userDoc.data(),
    // };
  } catch (error) {
    return {
      success: false,
      user: null,
      error,
    };
  }
};

export {
  loginWithEmailAndPassword,
  signout,
  registerWithEmailAndPassword,
  signinWithGoogle,
  updatePassword,
  updateProfile,
};

// id
// name
// email
// username
// no_of_login
