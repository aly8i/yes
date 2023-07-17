import CollTableData from './CollTableData'
import CollTablehead from './CollTablehead'
import CollTablenav from "./CollTablenav"
import React, { useState,useContext,useEffect,useRef } from 'react'
import { UserContext } from '../../context/Usercontext';
import {fetchCollUsers} from '../../hooks/FirebaseHook';

const CollTable = () => {
    const [page, setpage] = useState(1);
    const [users,setUsers] = useState([]);
    const { selectUser,setDetailview,initialusers } = useContext(UserContext);
    const [usersPerPageFix, setUsersPerPageFix] = useState(0);
    const [usersPerPage, setUsersPerPage] = useState(0);
    const [startindex, setStartindex] = useState(0);
    const [finishindex, setFinishindex] = useState(0);
    const [searchedvalue, setSearchedvalue] = useState("");
    const [filteredvalue, setFilteredvalue] = useState("");
    const [tableview,setTableview] = useState("user");
    const [type,setType] = useState("internet")
    const pagestotal = useRef(0);
    fetchCollUsers();
  
    useEffect(() => {
        const calculateUsersPerPage = () => {
          const windowHeight = window.innerHeight;
          const newUsersPerPage = Math.floor((windowHeight - 413.976) / 48.89);
          setUsersPerPageFix(newUsersPerPage);        };
        calculateUsersPerPage();
        window.addEventListener('resize', calculateUsersPerPage);
    
        return () => {
          window.removeEventListener('resize', calculateUsersPerPage);
        };
      }, []);
      useEffect(()=>{
        const temp = initialusers.filter((usr)=>usr.username?.includes(searchedvalue)&&(usr.satbox?.includes(filteredvalue)||usr.intbox?.includes(filteredvalue))&&usr?.service?.includes(type));
        setUsers(temp);
      },[searchedvalue,initialusers,filteredvalue,type]);

    useEffect(()=>{
        if(usersPerPageFix>users.length){
            setUsersPerPage(users.length);
            setFinishindex(users.length-1);
        }
        else{
            setUsersPerPage(usersPerPageFix);
            setFinishindex(usersPerPageFix-1);
        }
        pagestotal.current = (Math.ceil(users.length/usersPerPageFix));

    },[usersPerPageFix,users.length])

    const togglePage = (type)=>{
        const numofpages = Math.ceil(users.length/usersPerPage);
        if(type=="inc"){
          if(page+1==numofpages){
            setpage(page+1);
            setStartindex(startindex+usersPerPageFix)
            if(users.length%usersPerPageFix!==0){
              setFinishindex(finishindex+ (users.length%usersPerPageFix))
            }else{
                setFinishindex(finishindex+usersPerPageFix)
            }
            
          }else if(page<numofpages){
            setpage(page+1);
            setStartindex(startindex+usersPerPageFix)
            setFinishindex(finishindex+usersPerPageFix)
          }
    
        }else if(type=="dec" && page>1){
          if(page==2){
            setpage(page-1);
            setStartindex(0);
            setFinishindex(usersPerPageFix-1)
          }else{
            setpage(page-1);
            setStartindex(startindex-usersPerPageFix);
            if(page==numofpages){
              setFinishindex(finishindex-(users.length%usersPerPageFix));
            }else{
              setFinishindex(finishindex-usersPerPageFix);
            } 
          }
        }
      }


  return (
    <>
      <div class="w-full sm:px-7 sm:pt-7 px-4 pt-4 flex flex-col flex-grow border-b bg-gray-900 text-gray-400 border-gray-100 sticky top-0">
        <CollTablenav tableview={tableview} setTableview={setTableview}/>
      </div>
      <div class="sm:p-7 p-4 overflow-hidden">
        <CollTablehead type={type} setType={setType} filteredvalue={filteredvalue} setFilteredvalue={setFilteredvalue} searchedvalue={searchedvalue} setSearchedvalue={setSearchedvalue} pagestotal={pagestotal.current} page={page} togglePage={togglePage}/>
        <CollTableData type={type} users={users} selectUser={selectUser} setDetailview={setDetailview} finishindex={finishindex} startindex={startindex} />
      </div>
    </>
  )
}

export default CollTable