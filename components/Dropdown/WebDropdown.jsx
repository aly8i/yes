import React, { useState } from 'react'

const WebDropdown = ({setIntweb,intweb}) => {
  const [showptions,setShowoptions]=useState(false);
  const websites = JSON.parse(process.env.WEB_ARRAY || '[]');
  return (
    <div class="sm:flex hidden m-20 w-full pt-16 items-center justif-center ml-auto">
        <div class="text-center s3 flex flex-col">
            <div class="text-xs text-gray-400">Website</div>
            <div class="cursor-pointer" onMouseEnter={()=>{setShowoptions(true)}} onMouseLeave={()=>{setShowoptions(false)}}>
                <input  onChange={(e)=>{setIntweb(e.target.value)}} value={intweb} class="p-3 flex-1 m-auto flex flex-col rounded-md bg-gray-800 shadow-lg relative ring-2 ring-blue-500 focus:outline-none"/>
                {
                    showptions&&websites.filter((val)=>val.name.includes(intweb)).map((option)=>(
                        <div onClick={()=>{setIntweb(option.name)}} class="pt-10 pb-10 flex-1 w-50 justify-center items-center  m-auto flex flex-col rounded-md bg-gray-600 hover:bg-gray-100 shadow-lg relative ring-2 ring-blue-500 ">
                            {option.name}
                        </div>
                    ))
                    
                }
            </div>
            
        </div>

    </div>
  )
}

export default WebDropdown