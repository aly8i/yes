import React from 'react'

import { formatMoney,formatDate } from '../../utils/functions'


const TableData = ({users,finishindex,startindex,selectUser,setDetailview}) => {


  return (
    <table class="w-full text-left z-20">
            <thead>
              <tr class="text-gray-400">
                <th class="font-normal px-3 pt-0 pb-3 border-b border-gray-800">Username</th>
                <th class="font-normal px-3 pt-0 pb-3 border-b border-gray-800">phonenumber</th>
                <th class="font-normal px-3 pt-0 pb-3 border-b border-gray-800 hidden md:table-cell">Box</th>
                <th class="font-normal px-3 pt-0 pb-3 border-b border-gray-800">Credit</th>
                <th class="font-normal px-3 pt-0 pb-3 border-b border-gray-800 sm:text-gray-400 text-gray-400">Day of Charge</th>
                <th class="font-normal px-3 pt-0 pb-3 border-b border-gray-800 sm:text-gray-400 text-gray-400">Last Seen</th>
              </tr>
            </thead>
            <tbody class="text-gray-100">
            {users.slice(startindex,finishindex+1).map((user,i)=>(
                  <tr key={i} onMouseEnter={()=>{setDetailview("userview");selectUser(user)}}>
                    <td class="sm:p-3 py-2 px-1 border-b border-gray-800">
                      <div class="flex items-center">
                      <img src={`https://robohash.org/${user?.username}`} alt="profile" class="w-7 h-7 p-1.5 mr-2.5 rounded-lg border border-gray-800"/>
                        {user?.username||"~"}
                      </div>
                    </td>
                    <td class="sm:p-3 py-2 px-1 border-b border-gray-800">
                      <div class="flex items-center">
                      {user?.phonenumber||"~"}
                      </div>
                    </td>
                    <td class="sm:p-3 py-2 px-1 border-b border-gray-800 md:table-cell hidden">{user?.intbox}</td>
                    <td class={`sm:p-3 py-2 px-1 border-b border-gray-800 ${user?.intcredit>0?`text-green-500`:`text-red-500`}`}> {user?.intcredit?formatMoney(user?.intcredit):"~"}</td>
                    <td class="sm:p-3 py-2 px-1 border-b border-gray-800" > {user?.intchargeday}</td>
                    <td class="sm:p-3 py-2 px-1 border-b border-gray-800">
                      <div class="flex items-center"> 
                        <div class="sm:flex hidden flex-col">
                        {user?.lastseen?formatDate(user?.lastseen):"~"}
                        </div>
                        <button class="w-8 h-8 inline-flex items-center justify-center text-gray-400 ml-auto">
                          <svg viewBox="0 0 24 24" class="w-5" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="1"></circle>
                            <circle cx="19" cy="12" r="1"></circle>
                            <circle cx="5" cy="12" r="1"></circle>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
  )
}

export default TableData