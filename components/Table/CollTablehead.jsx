import React,{useState} from 'react'
import Search from '../Search/Search'
import './Tablehead.module.scss'

const CollTablehead = ({setFilteredvalue,filteredvalue,searchedvalue,setSearchedvalue,togglePage,page,pagestotal,setType,type}) => {
 
    const [showptions,setShowoptions] = useState(false);
    const [showptions2,setShowoption2] = useState(false);
    const satboxes = JSON.parse(process.env.SAT_BOXES_ARR || '[]');
    const intboxes = JSON.parse(process.env.INT_BOXES_ARR || '[]');
    return (
    <div class="flex w-full items-center mb-7">
        <button class="inline-flex mr-3 items-center h-8 pl-2.5 pr-2 rounded-md shadow text-gray-400 border-gray-800 border 0 leading-none py-0">
        <svg viewBox="0 0 24 24" class="w-4 mr-2 text-gray-600" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
        Last 30 days
        <svg viewBox="0 0 24 24" class="w-4 ml-1.5 text-gray-600" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
        </button>
        <button class="flex flex-col z-50 relative" onMouseEnter={()=>setShowoption2(true)} onMouseLeave={()=>setShowoption2(false)} >
            <div class="flex-col s11 inline-flex items-center h-8 pl-2.5 pr-2 rounded-md shadow text-gray-400 border-gray-800 border  leading-none py-0">
                <div class="flex flex-row m-auto">
                    <p>{type}</p>
                    <svg viewBox="0 0 24 24" class="w-4 ml-1.5 text-gray-600" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </div>
            </div>
            <div class="flex-col s11 m-auto hover:bg-gray-600 absolute top-100 justify-center inline-flex items-center  pl-2.5 pr-2 rounded-md shadow text-gray-400 border-gray-800 border  leading-none py-0">
                {
                    showptions2&&
                    <>     
                        <div onClick={()=>{setType("internet")}} class="flex flex-col pb-1 pt-1 m-auto">
                            internet
                        </div>
                        <div onClick={()=>{setType("satelite")}} class="flex flex-col pb-1 pt-1 m-auto">
                            satelite
                        </div>
                    </>
                            
                }
            </div>
        </button>
        {type=="satelite"?
        <button class="flex flex-col z-50 relative" onMouseEnter={()=>setShowoptions(true)} onMouseLeave={()=>setShowoptions(false)} >
            <div class="flex-col s11 inline-flex items-center h-8 pl-2.5 pr-2 rounded-md shadow text-gray-400 border-gray-800 border  leading-none py-0">
                <div class="flex flex-row m-auto">
                    <p>{filteredvalue==""?"all":filteredvalue}</p>
                    <svg viewBox="0 0 24 24" class="w-4 ml-1.5 text-gray-600" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </div>
            </div>
            <div class="flex-col s11 m-auto hover:bg-gray-600 absolute top-100 justify-center inline-flex items-center  pl-2.5 pr-2 rounded-md shadow text-gray-400 border-gray-800 border  leading-none py-0">
                {
                    showptions&&
                    <>
                        <div onClick={()=>{setFilteredvalue("")}} class="flex flex-col pb-1 pt-1 m-auto">all</div>
                        {
                            satboxes.map((option,i)=>(
                                <div key={i} onClick={()=>{setFilteredvalue(option)}} class="flex flex-col pb-1 pt-1 m-auto">
                                    {option}
                                </div>
                            ))
                        }
                    </>
                            
                }
            </div>
        </button>
        :<button class="flex flex-col z-50 relative" onMouseEnter={()=>setShowoptions(true)} onMouseLeave={()=>setShowoptions(false)} >
            <div class="flex-col s11 inline-flex items-center h-8 pl-2.5 pr-2 rounded-md shadow text-gray-400 border-gray-800 border  leading-none py-0">
                <div class="flex flex-row m-auto">
                    <p>{filteredvalue==""?"all":filteredvalue}</p>
                    <svg viewBox="0 0 24 24" class="w-4 ml-1.5 text-gray-600" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </div>
            </div>
            <div class="flex-col s11 m-auto hover:bg-gray-600 absolute top-100 justify-center inline-flex items-center  pl-2.5 pr-2 rounded-md shadow text-gray-400 border-gray-800 border  leading-none py-0">
                {
                    showptions&&
                    <>
                        <div onClick={()=>{setFilteredvalue("")}} class="flex flex-col pb-1 pt-1 m-auto">all</div>
                        {
                            intboxes.map((option,i)=>(
                                <div key={i} onClick={()=>{setFilteredvalue(option)}} class="flex flex-col pb-1 pt-1 m-auto">
                                    {option}
                                </div>
                            ))
                        }
                    </>
                            
                }
            </div>
        </button>}
        <Search searchedvalue={searchedvalue} setSearchedvalue={setSearchedvalue} />
        <div class="ml-auto text-gray-500 text-xs sm:inline-flex hidden items-center">
        
        <span class="mr-3">Page {page} of {pagestotal}</span>
        <button onClick={()=>{togglePage("dec")}} class="inline-flex mr-2 items-center h-8 w-8 justify-center text-gray-400 rounded-md shadow border border-gray-800 leading-none py-0">
            <svg class="w-4" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
        </button>
        <button onClick={()=>{togglePage("inc")}} class="inline-flex items-center h-8 w-8 justify-center text-gray-400 rounded-md shadow border border-gray-800 leading-none py-0">
            <svg class="w-4" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
        </button>
        </div>
    </div>
  )
}

export default CollTablehead