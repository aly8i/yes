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
    SAT_BOXES_ARR: '["hfc", "baraket", "melhem"]',
    INT_BOXES_ARR: '["hfc", "nejem", "farah"]',
    CRON_KEY: 'Bearer cron-job-auth-token-123-poi',
    SAT_CHARGE: 100,
    INT_CHARGE:100,
    WEB_ARRAY:'[{"name": "connect", "value": "https://isp-conect.net:34529/login/?next=/"},{"name": "global", "value": "https://th.thglobalvision.net/login.php"},{"name": "patrick", "value": "https://misp.cloud/login/?next=/"},{"name": "sama", "value": "https://mb.samalb.net/login.php"},{"name": "same conect", "value": "http://10.10.10.101/login/?next=/"}]'
  },
};

module.exports = nextConfig;
