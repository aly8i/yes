import React, { useContext } from 'react'
import { formatMoney } from '../../utils/functions'
import { UserContext } from '../../context/Usercontext';
import {fetchCollUsers} from '../../hooks/FirebaseHook';
const CollUsercards = () => {
  const { initialusers } = useContext(UserContext);

  fetchCollUsers();


  return (
    <div class="w-full flex-shrink-0 h-100 overflow-x-auto lg:block hidden flex-col bg-blue-200">
        <div class="text-xs stext-gray-400 tracking-wider mb-3">Highest Credit Users</div>
        <div class="gap-4 flex flex-row flex-wrap">
          {initialusers.sort((a, b) => (b.intcredit+b.satcredit) - (a.intcredit+a.satcredit)).slice(0,5).map((usr,i)=>(
            <button key={i} class="p-3 flex-1 m-auto flex flex-col rounded-md bg-gray-800 shadow-lg relative ring-2 ring-blue-500 focus:outline-none">
              <div class="flex xl:flex-row flex-col items-center font-medium:text-gray-400 pb-2 mb-2 xl:border-b border-opacity-75 border-gray-700 w-full">
                <img src={`https://robohash.org/${usr?.username}`} class="w-7 h-7 mr-2 rounded-full" alt="profile" />
                {usr.username}
              </div>
              <div class="flex items-center w-full">
                <div class="text-xs py-1 px-2 leading-none bg-gray-900  text-green-600 rounded-md">Internet Credit</div>
                <div class={`ml-auto text-xs ${usr?.intcredit>0?`text-green-500`:`text-red-500`}`}>{formatMoney(usr.intcredit)}</div>
              </div>
              <div class="flex items-center w-full">
                <div class="text-xs py-1 px-2 leading-none bg-gray-900  text-green-600 rounded-md">Satelite Credit</div>
                <div class={`ml-auto text-xs ${usr?.satcredit>0?`text-green-500`:`text-red-500`}`}>{formatMoney(usr.satcredit)}</div>
              </div>
            </button>
          ))}
          
          
        </div>
      </div>
  )
}

export default CollUsercards