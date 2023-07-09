import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {db} from "../../../Firebase";
import { collection,query,where,getDocs } from 'firebase/firestore';
var username = "";
var role = "";
var satbox = "";
var intbox = "";
var satchargeday = 0;
var intchargeday = 0;
var intchargeamount = 0;
var satchargeamount = 0;
var id = "";
var intcredit = 0;
var satcredit = 0;
var service = [];
export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const usersRef = collection(db, "users");
        const { phonenumber, password } = credentials;
        try {
          const usersQuery = query(usersRef, where("phonenumber", "==", phonenumber), where("password", "==", password));
          const querySnapshot = await getDocs(usersQuery);
          if (querySnapshot.docs.length === 0) {
            throw new Error("Invalid Credentials!");
          }
          const userData = querySnapshot.docs[0].data();
          const user = {
            ...userData 
          };
          id = querySnapshot.docs[0].id;
          username = user.username;
          role = user.role;
          service = user.service;
          intbox = user.int;
          satbox = user.satbox;
          intcredit = user.intcredit;
          satcredit = user.satcredit;
          intchargeday = user.intchargeday;
          satchargeday = user.satchargeday;
          intchargeamount = user.intchargeamount;
          satchargeamount = user.satchargeamount;
          return user; 
        } catch (error) {
          console.log("Error:", error);
          throw new Error("Something went wrong!");
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session(session, user) {
      session.session.user.username = username;
      session.session.user.role = role;
      session.session.user.satbox = satbox;
      session.session.user.intbox = intbox;
      session.session.user.id = id;
      session.session.user.service = service;
      session.session.user.satcredit = satcredit;
      session.session.user.intcredit = intcredit;
      session.session.user.intchargeday = intchargeday;
      session.session.user.satchargeday = satchargeday;
      session.session.user.intchargeamount = intchargeamount;
      session.session.user.satchargeamount = satchargeamount;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
