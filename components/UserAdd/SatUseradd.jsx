import React, { useContext, useState } from 'react'
import "./Useradd.css"
import { UserContext } from '../../context/Usercontext'
import {db} from "../../Firebase";
import { collection,addDoc,doc,updateDoc} from 'firebase/firestore';
import { toast } from 'react-toastify';
import SatDropdown from '../Dropdown/SatDropdown';
import {fetchSatUsers} from '../../hooks/FirebaseHook';
const Useradd = () => {
  const {user,setDetailview} = useContext(UserContext);
  const [buttonoptions,setButtonoptions] = useState(false);
  const [username,setUsername] = useState("");
  const [phonenumber,setPhonenumber] = useState("");
  const [password,setPassword] = useState("");
  const [satbox,setSatbox] = useState("");
  const { initialusers } = useContext(UserContext);

  fetchSatUsers();

 async function addUser() {
    if(username==""||phonenumber==""||password==""||satbox==""){
      toast.warning("Please fill out all the details");
      return
    }
    try {
      const usersRef = collection(db,'users');
      const exists = initialusers.filter((usr)=>usr.phonenumber==phonenumber);
      if(exists.length>0){
        const data = {
          username:exists[0]?.username,
          phonenumber,
          password:exists[0]?.password,
          satbox:exists[0]?.satbox,
          service:["internet","satelite"],
          role:"client"
        }
        const docRef =doc(usersRef, exists[0]?.id);
        await updateDoc(docRef, data);
      }else{
        const data = {
          username,
          phonenumber,
          password,
          satbox,
          service:["satelite"],
          role:"client"
        }
        await addDoc(usersRef, data);
      }
      toast.success("User added succefully");
      
    } catch (error) {
      toast.error("Error adding the user");
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
          <div onClick={()=>setDetailview("userview")} class="option border-gray-700 ml-auto">view</div>
        </div>
      } 
      <div class="flex flex-col ml-auto mt-2 mb-2 items-center w-full text-3xl text-gray-400">
        <div class="mb-2">New User</div>
        <img src={`https://robohash.org/${username?username:"1"}`} class="s44 mr-4 rounded-full" alt="profile" />
      </div>
      <div class="sm:flex hidden m-20 w-full pt-16 items-center justif-center ml-auto">
        <div class="text-center s3">
          <div class="text-xs text-gray-400">Username</div>
          <input onChange={(e)=>{setUsername(e.target.value)}} value={username} class="p-3 flex-1  m-20 m-auto flex flex-col rounded-md bg-gray-800 shadow-lg relative ring-2 ring-blue-500 focus:outline-none"/>
        </div>
      </div>
      <div class="sm:flex hidden m-20 w-full pt-16 items-center justif-center ml-auto">
        <div class="text-center s3">
          <div class="text-xs text-gray-400">Phonenumber</div>
          <input onChange={(e)=>{setPhonenumber(e.target.value)}} value={phonenumber} class="p-3 flex-1  m-20 m-auto flex flex-col rounded-md bg-gray-800 shadow-lg relative ring-2 ring-blue-500 focus:outline-none"/>
        </div>
      </div>
      <div class="sm:flex hidden m-20 w-full pt-16 items-center justif-center ml-auto">
        <div class="text-center s3">
          <div class="text-xs text-gray-400">Password</div>
          <input onChange={(e)=>{setPassword(e.target.value)}} value={password}class="p-3 flex-1  m-20 m-auto flex flex-col rounded-md bg-gray-800 shadow-lg relative ring-2 ring-blue-500 focus:outline-none"/>
        </div>
      </div>
      <SatDropdown satbox={satbox} setSatbox={setSatbox}/>
      <div class="flex flex-row w-50 pr-2 pl-2 m-auto mt-5 align-middle items-center">
        <div style={{borderRadius:"1.125rem"}} onClick={async()=>await addUser()} class={`cursor-pointer w-full text-center shadow p-2 border border-gray-700`}>
            Save
        </div>
      </div>
    </div>
  )
}

export default Useradd