import React, {useContext } from 'react'
import { fetchColl } from '../../hooks/FirebaseHook'
import { UserContext } from '../../context/Usercontext';
import { formatMoney } from '../../utils/functions';
import { db } from '../../Firebase';
import { collection, query, where, doc,getDocs,updateDoc, increment, deleteDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
const Collectors = ({typee}) => {
    const { collectors } = useContext(UserContext);
    fetchColl();
    const cashOut = async(idd) =>{
        try{
            var promises = [];
            const usersRef = collection(db, 'users');
            const onholdRef = collection(db, 'onhold');
            const onholdQuery = query(onholdRef, where('type', '==', typee),where('by','==',idd));
            const onholdSnapshot = await getDocs(onholdQuery);
            const onholdDocs = onholdSnapshot.docs.map((onholdDoc) => {
                const amt = onholdDoc.data().amount * -1;
                const userDoc = doc(usersRef, onholdDoc.data().user);
                var dataa;
                if(typee=="satelite"){
                    dataa = {
                        satcredit:increment(amt)
                    }
                }else{
                    dataa = {
                        intcredit:increment(amt)
                    }
                }
                const promise1 = updateDoc(userDoc, dataa);
                const onholdDocToDelete = doc(onholdRef,`${onholdDoc.id}`)
                const promise2 = deleteDoc(onholdDocToDelete)
                promises.push(promise1);
                promises.push(promise2);
            })
            await Promise.all(promises);
            toast.success("Operation Successfully executed")
        }catch(err){
            toast.error("Operation failed")
        }
    }
  return (
    <table class="w-full text-left z-20">
    <thead>
      <tr class="text-gray-400">
        <th class="font-normal px-3 pt-0 pb-3 border-b border-gray-800">Username</th>
        <th class="font-normal px-3 pt-0 pb-3 border-b border-gray-800">phonenumber</th>
        <th class="font-normal px-3 pt-0 pb-3 border-b border-gray-800">Internet Credit</th>
        <th class="font-normal px-3 pt-0 pb-3 border-b border-gray-800 sm:text-gray-400 text-gray-400">Satelite Credit</th>
      </tr>
    </thead>
    <tbody class="text-gray-100">
    {collectors.map((user,i)=>(
          <tr key={i}>
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
            <td class={`sm:p-3 py-2 px-1 border-b border-gray-800 ${user?.intcredit>0?`text-green-500`:`text-red-500`}`}> {user?.intcredit?formatMoney(user?.intcredit):"~"}</td>
            <td class="sm:p-3 py-2 px-1 border-b border-gray-800">
              <div class="flex items-center"> 
                <div class="sm:flex hidden flex-col">
                    {user?.satcredit?formatMoney(user?.satcredit):"~"}
                </div>
                <button onClick={async()=>{await cashOut(`${user?.id}`)}} class="w-24 h-8 items-center pr-2 pl-2 justify-center ml-auto inline-block rounded bg-primary text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                  Cash Out
                </button>
              </div>
            </td>
          </tr>
        ))}
    </tbody>
  </table>
  )
}

export default Collectors