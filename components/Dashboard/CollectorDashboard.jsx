import React,{useContext} from 'react'
import CollUsercards from '../UserCards/CollUsercards'
import CollTable from '../Table/CollTable'
import CollUserbar from '../Userbar/CollUserbar'
import { UserContext } from '../../context/Usercontext'
import CollUsercredit from '../UserCredit/CollUsercredit'
import { useSession } from "next-auth/react";
const CollectorDashboard = () => {
    const { detailview } = useContext(UserContext);
    const { data,status } = useSession();
    if (status === "loading") {
        return <div>Loading...</div>;
    }
    
      if (!data?.session?.user || data?.session?.user?.role !== "collector") {
        return <div>You are not authorized to access this page.</div>;
      }
  return (
   <> 
        <div class="flex-grow flex flex-row">
            {detailview=="userview"&&
                <CollUserbar/>
            }
            {
                detailview=="usercredit"&&
                <CollUsercredit/>
            }
            <div class="overflow-y-auto w-full">
                <div class="w-full sm:px-7 sm:pt-7 px-4 pt-4 flex flex-col flex-grow bg-gray-900 text-gray-400 border-gray-100 sticky top-0">
                    <CollUsercards/>
                </div>
                <CollTable/>
            </div>
        </div>
    </>
  )
}

export default CollectorDashboard