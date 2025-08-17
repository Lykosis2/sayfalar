import React from 'react'

export default function BlueBlobNetworkPart({ title, description, placement }) {
  return (
    <div className={`sm:w-[600px] pb-4 w-[95%] h-auto ${placement === 'left' ? ' lg:translate-x-0 ' : ' 2xl:translate-x-3/4 xl:translate-x-1/2 lg:translate-x-[20%] '}  translate-x-0 rounded-xl bg-primary mt-4 block`}>
    <span className='w-full h-auto font-medium text-3xl justify-center flex pt-2 text-white '>
        {
            title
        }
    </span>
    <span className='w-[95%] h-auto text-sm lg:pl-4 px-2 overflow-hidden text-ellipsis flex lg:text-base text-white '>
        {
            description
        }

    </span>
</div>
  )
}
