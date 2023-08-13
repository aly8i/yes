/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  env: {
    BASE_URL: "http://localhost:3000",
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
    ADMIN_KEY: '123121',
    SAT_CHARGE: 100,
    INT_CHARGE:100,
    AUTOMATION_SERVER:"http://127.0.0.1:5000",
    MAP_BOX_API_KEY:"pk.eyJ1IjoiYWx5OGkiLCJhIjoiY2w1enZnYm5iMGlxbTNibmFsYjg4czg5NyJ9.U3wzTlct7RKu1FcGihfDeg",
    WEB_ARRAY_2:'[{"name": "connect", "value": "https://isp-conect.net:34529/login/?next=/"},{"name": "global", "value": "https://th.thglobalvision.net/login.php"},{"name": "patrick", "value": "https://misp.cloud/login/?next=/"},{"name": "sama", "value": "https://mb.samalb.net/login.php"},{"name": "same conect", "value": "http://10.10.10.101/login/?next=/"}]',
    WEB_ARRAY:'[{"name": "connect", "value": "http://127.0.0.1:5000/connect"},{"name": "global", "value": "http://127.0.0.1:5000/global"},{"name": "misp", "value": "http://127.0.0.1:5000/misp"},{"name": "sama", "value": "http://127.0.0.1:5000/sama"},{"name": "same connect", "value": "http://127.0.0.1:5000/sameconnect"}]'
  },
};

module.exports = nextConfig;
