import React from 'react'

export default function NavbarTooltipButton({ icon, tooltip, onClick }) {
  return (
        <div className="rounded-full lg:w-12 lg:h-12 relative group flex justify-center items-center">
            <div
                className={'flex justify-center items-center text-black absolute -top-10 rounded-full bg-white w-24 h-10 scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-100 origin-bottom before:w-0 before:h-0 before:border-8 before:border-b-transparent before:border-x-transparent before:border-t-white before:absolute before:top-10 before:right-0 before:left-0 before:mx-auto '}>
                {tooltip}
            </div>
            <button className="z-10 [&>svg]:w-8 [&>svg]:h-8" onClick={onClick} >
                {icon}
            </button>
        </div>)
}
