import Image from 'next/image'
import React, { useContext, useState } from 'react'
import { SharedContext } from './layout/AgacDataSharer'

export default function ImageContainer() {
  const { links } = useContext(SharedContext)
  const [loadingStates, setLoadingStates] = useState([true, true, true]); // One for each image
  const handleLoadingComplete = index => {
    console.log("triggered");
    
      const newLoadingStates = [...loadingStates];
      newLoadingStates[index] = false;
      setLoadingStates(newLoadingStates);
  };
  return (
    <div className='lg:px-16  w-full h-[320px] overflow-auto mt-6'>
        <div className='flex w-full justify-center h-full min-w-0 items-center'>
          {[1, 2, 3].map((num,index) => (
            <a href={links[`promotion${num}`]}>
              
              <Image src={`${process.env.NEXT_PUBLIC_CDN_URL}/photos/promotion${num}`} width={300} height={300} alt="" className={` sm:w-[450px] w-full rounded-2xl xl:mx-6 lg:mx-2 mx-1 ${num === 3 ? "hidden lg:flex" : num === 2 ? "hidden sm:flex" :"flex"}`} aria-label={`smallLink${index}`} onLoadingComplete={() => handleLoadingComplete(index)} />
            </a>
          ))}
        </div>
    </div>

  )
}
