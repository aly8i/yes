import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {db} from "../../../Firebase";
import { collection,query,where,getDocs } from 'firebase/firestore';
var username = "";
var role = "";
// var phonenumber = "";
var box = "";
var id = "";
var credit = 0;
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
          box = user.box;
          credit = user.credit;
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
      session.session.user.box = box;
      session.session.user.id = id;
      session.session.user.credit = credit;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
