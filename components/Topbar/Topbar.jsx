import React from 'react'
import { useSession, signOut } from "next-auth/react";

import Link from 'next/link';
import Image from 'next/image';
const Topbar = () => {
  const { data } = useSession();
  return (
    <div class="h-16 lg:flex w-full border-b border-gray-800 hidden px-10">
      <div class="flex h-full  text-gray-400">
        <a href="#" class="cursor-pointer h-full border-b-2 border-transparent inline-flex items-center mr-0"><Image src="/yeslogo.png" width={120} height={50}></Image></a>
        <a href="/internet" class="cursor-pointer h-full border-b-2 text-gray-400 border-white inline-flex mr-8 items-center">Internet</a>
        <a href="/satelite" class="cursor-pointer h-full border-b-2 text-gray-400 border-white inline-flex mr-8 items-center">Satelite</a>
        <a href="/collector" class="cursor-pointer h-full border-b-2 text-gray-400 border-white inline-flex mr-8 items-center">Collector</a>
        <a href="#" class="cursor-pointer h-full border-b-2 border-transparent inline-flex items-center mr-8">Services</a>
        <a href="#" class="cursor-pointer h-full border-b-2 border-transparent inline-flex items-center mr-8">Contact</a>
        <a href="#" class="cursor-pointer h-full border-b-2 border-transparent inline-flex items-center">About Us</a>
      </div>
      <div class="ml-auto flex items-center space-x-7">
        {data?
          <>
            <button onClick={()=>{signOut()}} class="h-8 px-3 rounded-md shadow text-white bg-blue-500">Logout</button>
            <button class="flex items-center">
              <span class="relative flex-shrink-0">
                <img class="w-7 h-7 rounded-full" src={data?.session?.user?.username?`https://robohash.org/${data?.session?.user?.username}`:"https://images.unsplash.com/photo-1521587765099-8835e7201186?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"} alt="profile" />
                <span class="absolute right-0 -mb-0.5 bottom-0 w-2 h-2 rounded-full bg-green-500 border border-gray-900"></span>
              </span>
              <span class="ml-2">{data?.session?.user?.username}</span>
              <svg viewBox="0 0 24 24" class="w-4 ml-1 flex-shrink-0" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
          </>
        :<Link href="/login" passHref><button class="h-8 px-3 rounded-md shadow text-white bg-blue-500">Login</button></Link>}
      </div>
    </div>
  )
}

export default Topbar