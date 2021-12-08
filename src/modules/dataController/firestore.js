import firebase from "firebase/compat";
import {useCollection} from "react-firebase-hooks/firestore";

// lab 3 work:

// stuff for the firebase config

const firebaseConfig = {
    apiKey: "AIzaSyD8bEScFINGaDttxHPcnMbjIPmW64m-4SI",
    authDomain: "rmitchellpitzer-hmc-tasks.firebaseapp.com",
    projectId: "rmitchellpitzer-hmc-tasks",
    storageBucket: "rmitchellpitzer-hmc-tasks.appspot.com",
    messagingSenderId: "670939286123",
    appId: "1:670939286123:web:3dd28bb7e5badcce873f2e"
};

firebase.initializeApp(firebaseConfig);

export const database = firebase.firestore();
export const collectionName = "rmitchellPitzer-hmc-tasks-sectionList";

