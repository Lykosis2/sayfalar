import React from 'react'

export default function SidebarTooltipButton({ icon, tooltip, onClick }) {
  return (
        <div className="rounded-full w-8 h-8 relative group flex justify-center items-center">
            <div
                className="flex justify-center items-center text-white absolute -top-10 rounded-full bg-primary w-24 h-10 scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-100 origin-bottom before:w-0 before:h-0 before:border-8 before:border-b-transparent before:border-x-transparent before:border-t-primary before:absolute before:top-10 before:right-0 before:left-0 before:mx-auto">
                {tooltip}
            </div>
            <button className="z-10" onClick={onClick} >
                {icon}
            </button>
        </div>)
}
