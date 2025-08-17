import React, { useContext,useState } from 'react'
import Image from 'next/image'
import { SharedContext } from '../layout/AgacDataSharer'

export default function PromotionsComponent() {
  const { links } = useContext(SharedContext)

  return (
    <div className='lg:px-16 px-0 flex w-full lg:h-[600px] h-[450px] overflow-hidden mt-12  '>

      <div className='flex w-full justify-center h-full min-w-0 items-center'>
        <a target="_blank" href={links?.bigPromotion1}className='lg:w-1/2 w-full lg:min-w-[500px] lg:min-h-[400px] h-auto rounded-xl lg:px-0 px-4'>
          
          <Image src={`${process.env.NEXT_PUBLIC_CDN_URL}/photos/bigPromotion1`} width={500} height={400} alt="" className='lg:w-1/2 w-full lg:min-w-[500px] lg:min-h-[400px] h-auto aspect-[5/4] inline-flex rounded-xl'  />
          
        </a>

        <div className='gap-3 justify-center lg:flex hidden'>
          <div className='flex flex-col gap-3 '>

            <div className=' h-auto aspect-auto inline-flex  '>
              <a target="_blank" href={links?.bigPromotion2}>

                <Image src={`${process.env.NEXT_PUBLIC_CDN_URL}/photos/bigPromotion2`} width={450} height={450} alt="" className='max-w-[450px] w-full md:min-w-[300px] rounded-xl '   />

              </a>

            </div>
            <div className='h-auto aspect-auto inline-flex  '>
              <a target="_blank" href={links?.bigPromotion3}>
                
                <Image src={`${process.env.NEXT_PUBLIC_CDN_URL}/photos/bigPromotion3`} width={450} height={450} alt="" className='max-w-[450px] w-full md:min-w-[300px] rounded-xl '  />
                
              </a>

            </div>
          </div>
          <div className='flex flex-col gap-3'>

            <div className=' h-auto aspect-auto inline-flex '>
              <a target="_blank" href={links?.bigPromotion4}>
                
                <Image src={`${process.env.NEXT_PUBLIC_CDN_URL}/photos/bigPromotion4`} width={450} height={450} alt="" className='max-w-[450px] w-full md:min-w-[300px] rounded-xl '  />
                
              </a>

            </div>
            <div className='h-auto aspect-auto inline-flex '>
              <a target="_blank" href={links?.bigPromotion5}>
                <Image src={`${process.env.NEXT_PUBLIC_CDN_URL}/photos/bigPromotion5`} width={450} height={450} alt="" className='max-w-[450px] w-full md:min-w-[300px] rounded-xl '  />
              </a>

            </div>
          </div>

        </div>

      </div>
    </div>
  )
}
