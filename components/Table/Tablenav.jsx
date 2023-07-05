import React from 'react'

const Tablenav = () => {
  return (
    <div class="flex items-center space-x-3 sm:mt-7 mt-4">
        <a href="#" class="px-3 border-b-2  text-gray-400 border-white pb-1.5">Users</a>
        <a href="#" class="px-3 border-b-2 border-transparent text-gray-400 pb-1.5">Invoices</a>
        <a href="#" class="px-3 border-b-2 border-transparent text-gray-400 pb-1.5 sm:block hidden">Budgets</a>
        <a href="#" class="px-3 border-b-2 border-transparent text-gray-400 pb-1.5 sm:block hidden">Notifications</a>
        <a href="#" class="px-3 border-b-2 border-transparent text-gray-400 pb-1.5 sm:block hidden">Cards</a>
    </div>
  )
}

export default Tablenav