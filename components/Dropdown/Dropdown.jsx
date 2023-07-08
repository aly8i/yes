import React, { useState } from 'react'

const Dropdown = ({setIntbox,intbox}) => {
  const [showptions,setShowoptions]=useState(false);
  const boxes = JSON.parse(process.env.INT_BOXES_ARR || '[]');
  
  return (
    <div class="sm:flex hidden m-20 w-full pt-16 items-center justif-center ml-auto">
        <div class="text-center s3 flex flex-col">
            <div class="text-xs text-gray-400">Box</div>
            <div class="cursor-pointer" onMouseEnter={()=>{setShowoptions(true)}} onMouseLeave={()=>{setShowoptions(false)}}>
                <input  onChange={(e)=>{setBox(e.target.value)}} value={intbox} class="p-3 flex-1 m-auto flex flex-col rounded-md bg-gray-800 shadow-lg relative ring-2 ring-blue-500 focus:outline-none"/>
                {
                    showptions&&boxes.filter((val)=>val.includes(intbox)).map((option)=>(
                        <div onClick={()=>{setIntbox(option)}} class="pt-10 pb-10 flex-1 w-50 justify-center items-center  m-auto flex flex-col rounded-md bg-gray-600 hover:bg-gray-100 shadow-lg relative ring-2 ring-blue-500 ">
                            {option}
                        </div>
                    ))
                    
                }
            </div>
            
        </div>

    </div>
  )
}

export default Dropdown