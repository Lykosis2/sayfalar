import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import Link from 'next/link'
import Image from 'next/image'
import SmallToastButton from '../Toast/SmallToastButton'

export default function CategoryProduct({ product, category, closeAllToasters }) {
  React.useEffect(() => {
    toast.dismiss(product.id)
  }
  , [])
  const [isLoading, setLoading] = useState(true); // State to track loading of the image

  return (
    <div className="flex bg-white min-h-[233px] max-h-[250px] w-[24%] min-w-[250px]  justify-center items-center overflow-hidden border rounded-xl" >

    <div className='flex flex-col h-full items-center bg-white rounded-xl '>
        <Link href={`/products/${product?.id}`} className='h-[60%] max-h-[180px] flex justify-center mt-2'>
        
        <Image loading='lazy' width={256} height={256} src={`${process.env.NEXT_PUBLIC_CDN_URL}/products/${product?.id}`} alt="" className='min-w-[150px] w-[150px] min-h-[150px] h-[150px]'  />
        </Link>
        <div className='mt-3'>

        <Link href={`/products/${product?.id}`} className='flex justify-center px-4 mt-1'>
            <span className='text-sm font-medium text-center '>
            {
                product?.name
            }
            </span>

        </Link>
        <div className='flex min-w-[200px] max-w-[260px] w-full justify-center px-6 items-center gap-4 h-12'>

            <span className='text-base mt-[1px] flex font-semibold'>
                {
                    product?.price
                } TL

            </span>
            <span className="text-sm flex items-center justify-center font-semibold">
                    <div className="w-3 h-3 rounded-full bg-orange-400 flex mr-0.5">
                    </div>
                    <span className='mt-[1px] text-xs font-medium'>

                    {
                        product?.point1.toFixed(2)
                    }
                    </span>
                </span>
            <SmallToastButton
            name={product?.name}
            image={`${process.env.NEXT_PUBLIC_CDN_URL}/products/${product?.id}`}
            id={product?.id}
            productCount={1}
            key={product?.id + product?.name }
            refetch={null}
            closeAllToasters={closeAllToasters}
            />
        </div>
        </div>

    </div>

</div>
  )
}
