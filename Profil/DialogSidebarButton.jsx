import React from 'react'

export default function DialogSidebarButton({ title, type, onClick }) {
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
            onClick={onClick}
            className={`${classes} outline-0 border rounded-full whitespace-nowrap flex justify-center text-center px-5 items-center gap-2 text-lg cursor-pointer drop-shadow-lg py-3 w-[150px]`}>
            {title || 'undefined title'}
        </button>
  )
}
