"use client";
import Header from "./Header";
// import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar/Topbar";
import { SessionProvider } from "next-auth/react";
import { UserContextProvider } from "../context/Usercontext";
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from "react-toastify";

export default function RootLayout({ children }) {
  return (
    <html>
      <head />
      <body>
        <SessionProvider>
          <UserContextProvider>
            <ToastContainer
              pauseOnHover={false}
              pauseOnFocusLoss={false}
              position={"bottom-right"}
            />
            <Header />
            <div class="bg-gray-900 text-gray-400  h-screen flex overflow-hidden text-sm">
              {/* <Sidebar/> */}
              <div class="flex-grow overflow-hidden h-full flex flex-col">
                <Topbar/>
                {children}
              </div>
            </div>
          </UserContextProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
