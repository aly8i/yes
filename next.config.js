/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  env: {
    BASE_URL: "https://yesnet.vercel.app",
    NEXTAUTH_SECRET: "codingwithabbas",
    FIREBASE_APIKEY: "AIzaSyCFofsxX5gGiTuYRs_l0cQX8c1wTu2Z7jE",
    FIREBASE_AUTHDOMAIN:"yesnet961.firebaseapp.com",
    FIREBASE_DATABASEURL: "https://yesnet961-default-rtdb.europe-west1.firebasedatabase.app",
    FIREBASE_PROJECTID: "yesnet961",
    FIREBASE_STORAGEBUCKET: "yesnet961.appspot.com",
    FIREBASE_MESSAGINGSENDERID: "241145331033",
    FIREBASE_APPID: "1:241145331033:web:5372e8dd623b61d5736048",
    FIREBASE_MEASURMENTID: "G-FXN5BVG0LX",
    BOXES_ARR: '["hfc", "baraket", "melhem"]'
  },
};

module.exports = nextConfig;
