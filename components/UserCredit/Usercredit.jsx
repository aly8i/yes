import React, { useContext, useState } from 'react'
import "./Usercredit.module.scss"
import { UserContext } from '../../context/Usercontext'
import {db} from "../../Firebase";
import { collection,doc,updateDoc,increment} from 'firebase/firestore';
import { toast } from 'react-toastify';

const Useredit = () => {
  const {user,setDetailview} = useContext(UserContext);
  const [buttonoptions,setButtonoptions] = useState(false);
  const [transactiontype,setTransactiontype] = useState("charge");
  const [amount,setAmount] = useState(0);
  
  async function startTransaction() {
    if(amount==0){
      toast.warning("Please enter the amount");
      return
    }
    try {
    
      const usersRef = collection(db,'users');
      const docRef = doc(usersRef, `${user?.id}`);
      var amt = amount;
      if(transactiontype=="recieve"){
        amt*=-1;
      }
      const currentDate = new Date();
      const dateObj = {
        day: currentDate.getDate(),
        month: currentDate.getMonth() + 1,
        year: currentDate.getFullYear()
      }

      const data = {
        credit: increment(amt),
        lastseen: dateObj
      }
      await updateDoc(docRef, data);
      setAmount(0);
      toast.success("User charged successfully")
    } catch (error) {
      toast.error("Error charging the user");
    }
  }
  

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
          <div onClick={()=>setDetailview("useredit")} class="option edit border-b border-gray-700 ml-auto">edit</div>
          <div onClick={()=>setDetailview("useradd")} class="option add border-b border-gray-700 ml-auto">add</div>
          <div onClick={async()=>await deleteUser()} class="option delete border-b ml-auto">delete</div>
          <div onClick={async()=>await updateUser()} class="option save ml-auto">save</div>
        </div>
      }
      <div class="flex flex-col ml-auto mt-2 mb-2 items-center w-full text-3xl text-gray-400">
        <div class="mb-2">{user?.username||"~"}</div>
        <img src={`https://robohash.org/${user?.username}`} class="s44 mr-4 rounded-full" alt="profile" />
      </div>
      <div class="sm:flex hidden m-20 w-full pt-16 items-center justif-center ml-auto">
        <div class="text-center s3">
            <div class="text-xs text-gray-400">Username</div>
            <div class=" text-lg text-gray-400">{user.username||"~"}</div>
        </div>
      </div>
      <div class="flex flex-row w-full pr-2 pl-2 m-auto mt-5">
        <div style={{borderRadius:"1.125rem 0 0 1.125rem"}} onClick={()=>setTransactiontype("charge")} class={`cursor-pointer w-50 ${transactiontype=="charge"&&"mt-1 mb-1 ml-1"} text-center shadow p-2 border border-gray-700`}>
            Charge
        </div>
        <div style={{borderRadius:"0 1.125rem 1.125rem 0"}} onClick={()=>setTransactiontype("recieve")} class={`cursor-pointer w-50 text-center border p-2 ${transactiontype=="recieve"&&"mt-1 mb-1 mr-1"} shadow border-gray-700`}>
            Recieve
        </div>
      </div>
      <div class="sm:flex hidden m-20 w-full pt-20 items-center justif-center ml-auto">
        <div class="text-center s3">
            <div class="text-xs text-gray-400">Amount</div>
            <input value={`${amount}`} onChange={(e)=>setAmount(e.target.value)} type="number" class=" text-center pl-8 h-9 shadow bg-transparent border border-gray-700 text-gray-400 w-full rounded-md text-sm"  />
        </div>
      </div>
      <div class="flex flex-row w-50 pr-2 pl-2 m-auto mt-5 align-middle items-center">
        <div style={{borderRadius:"1.125rem"}} onClick={async()=>await startTransaction()} class={`cursor-pointer w-full ${transactiontype=="charge"&&"mt-1 mb-1 ml-1"} text-center shadow p-2 border border-gray-700`}>
            Confirm
        </div>
      </div>
    </div>
  )
}

export default Useredit