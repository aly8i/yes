import React from 'react'

const CollTablenav = ({tableview,setTableview}) => {
  return (
    <div class="flex items-center space-x-3 sm:mt-7 mt-4">
      <div onClick={()=>setTableview("user")} class="px-3 border-b-2  text-gray-400 border-white pb-1.5">Users</div>
      <div onClick={()=>setTableview("onhold")} class="px-3 border-b-2 border-transparent text-gray-400 pb-1.5 sm:block hidden">On Hold</div>
      <div class="px-3 border-b-2 border-transparent text-gray-400 pb-1.5 sm:block hidden">Notifications</div>
      <div class="px-3 border-b-2 border-transparent text-gray-400 pb-1.5 sm:block hidden">Cards</div>
    </div>
  )
}

export default CollTablenav