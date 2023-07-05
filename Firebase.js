import {initializeApp} from "firebase/app";
import {getStorage} from "firebase/storage";
import {getAuth} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore} from "firebase/firestore"
  const firebaseConfig = {
    apiKey: `${process.env.FIREBASE_APIKEY}`,
    authDomain: `${process.env.FIREBASE_AUTHDOMAIN}`,
    databaseURL:`${process.env.FIREBASE_DATABASEURL}`,
    projectId: `${process.env.FIREBASE_PROJECTID}`,
    storageBucket: `${process.env.FIREBASE_STORAGEBUCKET}`,
    messagingSenderId: `${process.env_FIREBASE_MESSAGINGSENDERID}`,
    appId: `${process.env.FIREBASE_APPID}`,
    measurementId: `${process.env.FIREBASE_MEASURMENTID}`
  };

const app = initializeApp(firebaseConfig);


export default app;
// export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);