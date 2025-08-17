import React from 'react'
import WrenchScrewdriverIcon from '@/components/icons/WrenchScrewdriverIcon'

export default function SidebarButton({ title, type, icon }) {
  let classes
  switch (type) {
    case 'primary':
      classes = 'bg-primary hover:bg-blue-700 text-white'
      break
    case 'disabled':
      classes = 'bg-gray-400 text-gray-700 cursor-not-allowed'
      break
    default:
      classes = 'bg-white hover:bg-gray-100 text-black'
      break
  }
  return (
        <button
            className={`${classes} rounded-lg whitespace-nowrap flex justify-start px-5 items-center gap-2 text-lg cursor-pointer drop-shadow-lg py-3 w-[260px]`}>
            {icon || <WrenchScrewdriverIcon/>}
            {title || 'undefined title'}
        </button>
  )
}
