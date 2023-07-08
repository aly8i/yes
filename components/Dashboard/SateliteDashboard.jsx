import React,{useContext} from 'react'
import SatUsercards from '../UserCards/SatUsercards'
import SatTable from '../Table/SatTable'
import SatUserbar from '../Userbar/SatUserbar'
import { UserContext } from '../../context/Usercontext'
import SatUseredit from '../UserEdit/SatUseredit'
import SatUseradd from '../UserAdd/SatUseradd'
import SatUsercredit from '../UserCredit/SatUsercredit'
import { useSession } from "next-auth/react";
const InternetDashboard = () => {
    const { detailview } = useContext(UserContext);
    const { data,status } = useSession();
    if (status === "loading") {
        return <div>Loading...</div>;
      }
    
      if (!data?.session?.user || data?.session?.user?.role !== "satelite") {
        return <div>You are not authorized to access this page.</div>;
      }
  return (
   <> 
        <div class="flex-grow flex flex-row">
            {detailview=="userview"&&
                <SatUserbar/>
            }
            {
                detailview=="useredit"&&
                <SatUseredit/>
            }
            {
                detailview=="useradd"&&
                <SatUseradd/>
            }
            {
                detailview=="usercredit"&&
                <SatUsercredit/>
            }
            <div class="overflow-y-auto w-full">
                <div class="w-full sm:px-7 sm:pt-7 px-4 pt-4 flex flex-col flex-grow bg-gray-900 text-gray-400 border-gray-100 sticky top-0">
                    <SatUsercards/>
                </div>
                <SatTable/>
            </div>
        </div>
    </>
  )
}

export default InternetDashboard