import React from 'react'
import Image from 'next/image'

export default function OrderComponent({ date, summary, reciever, total, details, status, images, products, productCount, imageCount }) {
  return (
    <div className='w-[95%] mx-[2.5%] h-60 bg-orange-50 flex flex-col rounded-xl'>
                  <div className='h-[30%] w-full border-b-[1.5px] border-[#E3E2E3] shadow-sm bg-[#ebebeb94] rounded-t-xl justify-center flex items-center'>
                    <div className=' grid grid-cols-5 grid-rows-2 bg-red-500 h-[70%] w-[95%]'>
                      <span className=' text-center sm:text-xxs overflow-hidden md:text-xs xl:text-base text-xxs '>
                        Sipariş Tarihi
                      </span>
                      <span className='text-center sm:text-xxs overflow-hidden md:text-xs xl:text-base text-xxs'>
                        Sipariş Özeti
                      </span>
                      <span className='text-center sm:text-xxs overflow-hidden md:text-xs xl:text-base text-xxs'>
                        Alıcı
                      </span>
                      <span className='text-center sm:text-xxs overflow-hidden md:text-xs xl:text-base text-xxs'>
                        Tutar
                      </span>
                      <button className=' border border-black bg-orange-400 rounded-xl row-span-2  text-xxs xl:text-base md:text-xs sm:text-xxs'>
                        Sipariş Detayları
                      </button>
                      <span className='text-center text-xxs xl:text-base overflow-hidden md:text-xs sm:text-xxs'>
                      {date}
                      </span>
                      <span className='text-center text-xxs xl:text-base overflow-hidden md:text-xs sm:text-xxs'>
                      {summary}
                      </span>
                      <span className='text-center text-xxs xl:text-base overflow-hidden md:text-xs sm:text-xxs   '>
                      {reciever}

                      </span>
                      <span className='text-center text-[#7e4e29] text-xxs xl:text-base overflow-hidden md:text-xs sm:text-xxs'>
                       {total } TL

                      </span>

                    </div>
                  </div>
                  <div className='h-[70%] w-full flex justify-around items-center'>
<div className='flex flex-col'>

<div className='flex items-center'>

    {
        status === 1
          ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" color='green' />
        </svg>

          : status === 0
            ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" color='red'/>
</svg>
            : status === -1
              ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" color='red'/>
</svg>
              : status === 2
                ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" color='blue' />
</svg>
                : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" color='blue' />
</svg>

    }

  <span className={`${status === 1 ? 'text-green-500' : status === 2 ? 'text-blue-600' : 'text-red-600'} font-serif md:text-lg text-base`}>
    {status === 1 ? 'Teslim Edildi' : status === 0 ? 'Iptal Edildi' : status === -1 ? 'Iade Edildi' : status === 2 ? 'Hazırlanıyor' : 'Sipariş Alındı'}
  </span>
</div>
<span className='text-xxs font-bold font-serif md:text-sm sm:text-xs'>
    {date.slice(0, 12)}
 &apos;de {status === 1 ? 'teslim edildi.' : status === 0 ? 'iptal edildi.' : status === -1 ? 'iade edildi.' : status === 2 ? 'hazırlanıyor.' : 'sipariş aldındı.'}
</span>
</div>

<div className='flex justify-evenly gap-6'>
  {
    images.map((image, index) => {
      if (index >= imageCount)
        return null

      return (
            <Image
            key={index}
            src={image}
            alt='product-1'
        width={52}
        height={50}
        className='border-2 border-gray-400 p-1'
            />
      )
    },
    )
  }

  <span className='flex justify-center items-center'>
    {
        productCount > 3
          ? `... ${productCount - 3} ürün daha var.`
          : null
    }
  </span>

</div>

                  </div>

                </div>
  )
}
