import React,{useContext} from 'react'
import Usercards from '../UserCards/Usercards'
import Table from '../Table/Table'
import Userbar from '../Userbar/Userbar'
import { UserContext } from '../../context/Usercontext'
import Useredit from '../UserEdit/Useredit'
import Useradd from '../UserAdd/Useradd'
import Usercredit from '../UserCredit/Usercredit'
import { useSession } from "next-auth/react";
const Dashboard = () => {
    const { detailview } = useContext(UserContext);
    const { data,status } = useSession();
    if (status === "loading") {
        return <div>Loading...</div>;
      }
    
      if (!data?.session?.user || data?.session?.user?.role !== "admin") {
        return <div>You are not authorized to access this page.</div>;
      }
  return (
   <> 
        <div class="flex-grow flex flex-row">
            {detailview=="userview"&&
                <Userbar/>
            }
            {
                detailview=="useredit"&&
                <Useredit/>
            }
            {
                detailview=="useradd"&&
                <Useradd/>
            }
            {
                detailview=="usercredit"&&
                <Usercredit/>
            }
            <div class="overflow-y-auto w-full">
                <div class="w-full sm:px-7 sm:pt-7 px-4 pt-4 flex flex-col flex-grow bg-gray-900 text-gray-400 border-gray-100 sticky top-0">
                    <Usercards/>
                </div>
                <Table/>
            </div>
        </div>
    </>
  )
}

export default Dashboard