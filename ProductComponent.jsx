import Link from 'next/link'
import Image from 'next/image'
import FilterPartToast from './Toast/FilterPartToast'

export default function ProductComponent({ product, namedToast }) {
  console.log(namedToast)
  console.log(product)
  if (!product)
    return
  return (
        <div className='flex flex-col h-full bg-white rounded-xl w-full '>
            <div className='h-full rounded-t-xl border-x border-t bg-white border-black pb-2 max-h-[75%] flex justify-center py-4'>
                <Image loading="lazy" src={`${process.env.NEXT_PUBLIC_CDN_URL}/products/${product.id}`} alt={`${product.name} Image`} width={256} height={256} className='max-h-[256px] h-[256px] w-[256px] max-w-[256px]' layout='responsive' quality={100}/>
            </div>
            <div className='py-3 border-b border-x border-black rounded-b-lg'>
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

                    <FilterPartToast id={product.id} name={product.name} productCount={1} namedToast={namedToast}/>

                </div>
            </div>

        </div>
  )
}
