import React, { useContext, useState } from 'react'
import "./Useradd.css"
import { UserContext } from '../../context/Usercontext'
import {db} from "../../Firebase";
import { collection,addDoc,doc,updateDoc,getDocs,query,where} from 'firebase/firestore';
import { toast } from 'react-toastify';
import Dropdown from '../Dropdown/Dropdown';
import WebDropdown from '../Dropdown/WebDropdown';
import {fetchUsers} from '../../hooks/FirebaseHook';
const Useradd = () => {
  const {user,setDetailview} = useContext(UserContext);
  const [buttonoptions,setButtonoptions] = useState(false);
  const [username,setUsername] = useState("");
  const [phonenumber,setPhonenumber] = useState("");
  const [password,setPassword] = useState("");
  const [intbox,setIntbox] = useState("");
  const [intchargeday,setIntchargeday] = useState(parseInt(new Date().toISOString().split('T')[0].split("-")[2])||1);
  const [intchargeamount,setIntchargeamount] = useState(process.env.INT_CHARGE||0);
  const [intweb,setIntweb] = useState("");
  const boxes = JSON.parse(process.env.INT_BOXES_ARR || '[]');
  const websites = JSON.parse(process.env.WEB_ARRAY || '[]');
  fetchUsers();
  const checkWeb = async() =>{
    var found = false;
    websites.map((web)=>{
      if(web.name==intweb){
        found=true;
      }
    })
    return found;
  }
  async function addUser() {
    const webvalid = await checkWeb();
    if(username==""||phonenumber==""||password==""||intbox==""|| intchargeamount==0||intweb==""||!boxes.includes(intbox)||!webvalid){
      toast.warning("Please fill out all the details");
      return
    }
    try {
      const usersRef = collection(db,'users');
      const usersQuery = query(usersRef, where('phonenumber', '==', phonenumber));
      const querySnapshot = await getDocs(usersQuery);
      var found=null;
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        const id = doc.id;
        const data = doc.data();
        found = { id, ...data };
      }
      if(found!=null){
        const data = {
          intchargeamount: found?.intchargeamount?found?.intchargeamount:intchargeamount,
          intchargeday:found?.intchargeday?found?.intchargeday:intchargeday,
          intbox: found?.intbox?found?.intbox:intbox,
          intcredit: found?.intcredit>0?found?.intcredit:0,
          intweb: found?.intweb?found?.intweb:intweb,
          service:["internet","satelite"],
          role:"client"
        }
        const docRef = doc(usersRef, found?.id);
        await updateDoc(docRef, data);
      }else{
        const data = {
          username,
          phonenumber,
          password,
          intcredit: 0,
          intbox,
          intweb,
          intchargeday,
          intchargeamount,
          service:["internet"],
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
      <div class="sm:flex hidden m-20 w-full pt-16 items-center justif-center ml-auto">
        <div class="text-center s3">
          <div class="text-xs text-gray-400">Day of Charge</div>
          <input type="number" min="1" max="28" onChange={(e)=>{setIntchargeday(e.target.value)}} value={intchargeday} class="p-3 flex-1  m-20 m-auto flex flex-col rounded-md bg-gray-800 shadow-lg relative ring-2 ring-blue-500 focus:outline-none"/>
        </div>
      </div>
      <div class="sm:flex hidden m-20 w-full pt-16 items-center justif-center ml-auto">
        <div class="text-center s3">
          <div class="text-xs text-gray-400">Charge Amount</div>
          <input type="number"  onChange={(e)=>{setIntchargeamount(e.target.value)}} value={intchargeamount} class="p-3 flex-1  m-20 m-auto flex flex-col rounded-md bg-gray-800 shadow-lg relative ring-2 ring-blue-500 focus:outline-none"/>
        </div>
      </div>
      <Dropdown boxes={boxes} intbox={intbox} setIntbox={setIntbox}/>
      <WebDropdown websites={websites} intweb={intweb} setIntweb={setIntweb}/>
      <div class="flex flex-row w-50 pr-2 pl-2 m-auto mt-5 align-middle items-center">
        <div style={{borderRadius:"1.125rem"}} onClick={async()=>await addUser()} class={`cursor-pointer w-full text-center shadow p-2 border border-gray-700`}>
            Save
        </div>
      </div>
    </div>
  )
}

export default Useradd