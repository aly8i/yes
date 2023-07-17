import React, { useContext, useState } from 'react'
import "./Userbar.css"
import { UserContext } from '../../context/Usercontext'
import { formatDate,formatMoney } from '../../utils/functions'
const CollUserbar = () => {
  const {user,setDetailview} = useContext(UserContext);
  const [buttonoptions,setButtonoptions] = useState(false);
  
  return (
    <div class="flex-col items-center border-r flex-grow s2">
      <button onMouseEnter={()=>{setButtonoptions(true)}} onClick={()=>{setButtonoptions(!buttonoptions)}} class="s4 w-8 h-8 ml-4  shadow text-gray-400 rounded-full flex items-center justify-center border  border-gray-700">
        <svg viewBox="0 0 24 24" class="w-4" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="1"></circle>
          <circle cx="19" cy="12" r="1"></circle>
          <circle cx="5" cy="12" r="1"></circle>
        </svg>
      </button>
      {buttonoptions&&
        <div onMouseLeave={()=>setButtonoptions(false)}class="text-center cursor-pointer shadow text-gray-400 message parker border border-gray-700">
          <div onClick={async()=>setDetailview("usercredit")} class="option delete ml-auto">credit</div>
        </div>
      }
      <div class="flex flex-col ml-auto mt-2 mb-2 items-center w-full text-3xl text-gray-400">
        <div class="mb-2">{user?.username||"~"}</div>
        <img src={`https://robohash.org/${user?.username}`} class="s44 mr-4 rounded-full" alt="profile" />
      </div>
      <div class="sm:flex hidden w-full pt-16 items-center justif-center ml-auto">
        <div class="text-center s3">
            <div class="text-xs text-gray-400">Username</div>
            <div class=" text-lg text-gray-400">{user?.username||"~"}</div>
        </div>
      </div>
      <div class="sm:flex hidden w-full items-center justif-center ml-auto">
        <div class="text-center s3">
            <div class="text-xs text-gray-400">Phonenumber</div>
            <div class=" text-lg text-gray-400">{user?.phonenumber||"~"}</div>
        </div>
      </div>

      <div class="sm:flex hidden w-full items-center justif-center ml-auto">
        <div class="text-center s3">
            <div class="text-xs text-gray-400">Day of Charge</div>
            <div class=" text-lg text-gray-400">{user?.intchargeday?user?.intchargeday:"~"}</div>
        </div>
      </div>
      <div class="sm:flex hidden w-full items-center justif-center ml-auto">
        <div class="text-center s3">
            <div class="text-xs text-gray-400">Charge Amount</div>
            <div class=" text-lg text-gray-400">{user?.intchargeamount?user.intchargeamount:"~"}</div>
        </div>
      </div>
      <div class="sm:flex hidden w-full items-center justif-center ml-auto">
        <div class="text-center s3">
            <div class="text-xs text-gray-400">Website</div>
            <div class=" text-lg text-gray-400">{user?.intweb?user.intweb:"~"}</div>
        </div>
      </div>
      <div class="sm:flex hidden w-full items-center justif-center ml-auto">
        <div class="text-center s3">
            <div class="text-xs text-gray-400">Last Seen</div>
            <div class=" text-lg text-gray-400">{user?.lastseen?formatDate(user?.lastseen):"~"}</div>
        </div>
      </div>
      <div class="sm:flex hidden w-full items-center justif-center ml-auto">
        <div class="text-center s3">
            <div class="text-xs text-gray-400">Box</div>
            <div class=" text-lg text-gray-400">{user?.intbox||"~"}</div>
        </div>
        <div class="text-center s3">
            <div class="text-xs text-gray-400">Credit</div>
            <div class={`text-lg ${user?.intcredit>0?`text-green-500`:`text-red-500`}`}>{user?.intcredit?formatMoney(user?.intcredit):"~"}</div>
        </div>
      </div>
    </div>
  )
}

export default CollUserbar