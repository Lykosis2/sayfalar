import Link from 'next/link'
import Image from 'next/image'

export default function ProductComponent2({ product, namedToast }) {
  console.log(namedToast)
  return (
        <div className='flex flex-col h-full bg-white rounded-xl w-full '>
            <div className='h-[60%] border-b rounded-t-xl border bg-[#C6C7CB] border-black pb-2 max-h-[75%] flex justify-center py-4'>
                <Image loading="lazy" src={`${process.env.NEXT_PUBLIC_CDN_URL}/products/${product.id}`} alt={`${product.name} Image`} width={100} height={100} className='max-h-[160px] max-w-[100%]'/>
            </div>
            <div className='py-3 border border-black rounded-b-lg'>
                <div className='flex justify-between px-2 items-center '>
                    <Link href={`/products/${product.id}`} className='text-base text-center font-bold '>
                        {product.name}
                    </Link>
                    <span className='text-base font-bold'>
                        {product.price} TL
                    </span>
                </div>
                <div className='flex w-full justify-between items-center gap-2 pl-2 pr-4'>

                    <div className='flex justify-center items-center gap-1'>
                        <div className='w-3 h-3 rounded-full bg-orange-400 flex'></div>
                        <span className='text-sm text-center font-semibold'>
                            {product.point1}
                        </span>
                    </div>
                </div>
            </div>

        </div>
  )
}
