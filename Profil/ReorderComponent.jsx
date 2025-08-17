import React from 'react'

export default function ReorderComponent() {
  return (
    <div className=' h-24 rounded-xl w-[90%] bg-white mt-3 flex justify-evenly items-center' >
      <div className=' w-20 h-[80%] rounded-xl border border-gray-400 shadow-lg flex'>
        <img
        src={'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1612885645-51nfuxdgizl-sl1000-1612885634.jpg?crop=1xw:1xh;center,top&resize=980:*'}
        className='rounded-xl h-full w-full'
        alt='Urün'
        />

      </div>
      <div className='w-[40%] flex flex-col'>

      <span className=' overflow-hidden font-serif text-lg whitespace-nowrap w-full text-ellipsis '>
          Lykosis Cilt Kremi
      </span>
      <span className='w-[70%] text-ellipsis h-8 max-h-8 whitespace-nowrap overflow-hidden text-sm'>
        Yumuşak ve hassas ciltler için ideal
      </span>

      </div>
      <div className='w-[25%] flex gap-2 justify-start items-start'>

        <div className='w-12 h-10 rounded-xl bg-amber-400 flex justify-center items-center'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" color='white' />
</svg>

        </div>
        <div className='w-12 h-10 rounded-xl bg-blue-400 flex justify-center items-center'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" color='white' />
</svg>

        </div>

      </div>

    </div>
  )
}
