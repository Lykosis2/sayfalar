import React from 'react'

export default function CategoryBox({
  name,
  img,
  price,
  id,
  addToCart,

}) {
  return (
    <div className='w-full flex gap-3 justify-center overflow-hidden'>
    <div className="flex bg-slate-50 min-h-[233px] w-[24%] min-w-[250px]  justify-center items-center overflow-hidden border rounded-xl">
        <div className='flex flex-col h-full bg-white rounded-xl'>
            <div className='h-[60%] max-h-[75%] flex justify-center'>

            <img src="https://cdn.dermogrup.net/resize/181x181/mustela-gentle-cleansing-gel-yenidogan-sampuani-500-ml-mustela-147800-16-B.jpg" alt="" className='' />
            </div>
            <div className='mt-3'>

            <div className='flex justify-center px-4'>
                <span className='text-sm text-center '>
                La Roche Posay Cicaplast Baume B5 Krem 100 ml
                </span>

            </div>
            <div className='flex translate-x-[40%] w-[65%] justify-center items-center gap-2'>

                <span className='text-2xl'>
                    99.9 TL
                </span>
                <div className='w-10 h-8 rounded-lg flex justify-center items-center bg-gray-200' onClick={() => {
                  addToCart(100001, 1)
                }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
<path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" color='green' />
</svg>

                </div>
            </div>
            </div>

        </div>

   </div>

   <div className={'flex 4 bg-slate-50 min-h-[233px] w-[24%] min-w-[250px]  row-span-1 border rounded-xl'}>
        <div className='flex flex-col h-full bg-white rounded-xl'>
            <div className='h-[60%] max-h-[75%] flex justify-center'>

            <img src="https://cdn.dermogrup.net/resize/181x181/mustela-gentle-cleansing-gel-yenidogan-sampuani-500-ml-mustela-147800-16-B.jpg" alt="" className='' />
            </div>
            <div className='mt-3'>

            <div className='flex justify-center px-4'>
                <span className='text-sm text-center '>
                La Roche Posay Cicaplast Baume B5 Krem 100 ml
                </span>

            </div>
            <div className='flex translate-x-[40%] w-[65%] justify-center items-center gap-2'>

                <span className='text-2xl'>
                    99.9 TL
                </span>
                <div className='w-10 h-8 rounded-lg flex justify-center items-center bg-gray-200' >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
<path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" color='green' />
</svg>

                </div>
            </div>
            </div>

        </div>

   </div>
   <div className="flex bg-slate-50 min-h-[233px] w-[24%] min-w-[250px]  justify-center items-center overflow-hidden border rounded-xl">
        <div className='flex flex-col h-full bg-white rounded-xl'>
            <div className='h-[60%] max-h-[75%] flex justify-center'>

            <img src="https://cdn.dermogrup.net/resize/181x181/mustela-gentle-cleansing-gel-yenidogan-sampuani-500-ml-mustela-147800-16-B.jpg" alt="" className='' />
            </div>
            <div className='mt-3'>

            <div className='flex justify-center px-4'>
                <span className='text-sm text-center '>
                La Roche Posay Cicaplast Baume B5 Krem 100 ml
                </span>

            </div>
            <div className='flex translate-x-[40%] w-[65%] justify-center items-center gap-2'>

                <span className='text-2xl'>
                    99.9 TL
                </span>
                <div className='w-10 h-8 rounded-lg flex justify-center items-center bg-gray-200'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
<path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" color='green' />
</svg>

                </div>
            </div>
            </div>

        </div>

   </div>

   <div className={'flex 4 bg-slate-50 min-h-[233px] w-[24%] min-w-[250px]  row-span-1 border rounded-xl'}>
        <div className='flex flex-col h-full bg-white rounded-xl'>
            <div className='h-[60%] max-h-[75%] flex justify-center'>

            <img src="https://cdn.dermogrup.net/resize/181x181/mustela-gentle-cleansing-gel-yenidogan-sampuani-500-ml-mustela-147800-16-B.jpg" alt="" className='' />
            </div>
            <div className='mt-3'>

            <div className='flex justify-center px-4'>
                <span className='text-sm text-center '>
                La Roche Posay Cicaplast Baume B5 Krem 100 ml
                </span>

            </div>
            <div className='flex translate-x-[40%] w-[65%] justify-center items-center gap-2'>

                <span className='text-2xl'>
                    99.9 TL
                </span>
                <div className='w-10 h-8 rounded-lg flex justify-center items-center bg-gray-200'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
<path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" color='green' />
</svg>

                </div>
            </div>
            </div>

        </div>

   </div>

        </div>
  )
}
{
    <div className='w-full flex gap-3 justify-center overflow-hidden'>

    <div className="flex 3 bg-slate-50 min-h-[233px] w-[32%] min-w-[250px]  row-span-1 border rounded-xl">
        <div className='flex flex-col h-full bg-white rounded-xl'>
            <div className='h-[60%] max-h-[75%] flex justify-center'>

            <img src="https://cdn.dermogrup.net/resize/181x181/mustela-gentle-cleansing-gel-yenidogan-sampuani-500-ml-mustela-147800-16-B.jpg" alt="" className='' />
            </div>
            <div className='mt-3'>

            <div className='flex justify-center px-4'>
                <span className='text-sm text-center '>
                La Roche Posay Cicaplast Baume B5 Krem 100 ml
                </span>

            </div>
            <div className='flex translate-x-[40%] w-[65%] justify-center items-center gap-2'>

                <span className='text-2xl'>
                    99.9 TL
                </span>
                <div className='w-10 h-8 rounded-lg flex justify-center items-center bg-gray-200'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
<path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" color='green' />
</svg>

                </div>
            </div>
            </div>

        </div>

   </div>

   <div className="flex 3 bg-slate-50 min-h-[233px] w-[32%] min-w-[250px]  row-span-1 border rounded-xl">
        <div className='flex flex-col h-full bg-white rounded-xl'>
            <div className='h-[60%] max-h-[75%] flex justify-center'>

            <img src="https://cdn.dermogrup.net/resize/181x181/mustela-gentle-cleansing-gel-yenidogan-sampuani-500-ml-mustela-147800-16-B.jpg" alt="" className='' />
            </div>
            <div className='mt-3'>

            <div className='flex justify-center px-4'>
                <span className='text-sm text-center '>
                La Roche Posay Cicaplast Baume B5 Krem 100 ml
                </span>

            </div>
            <div className='flex translate-x-[40%] w-[65%] justify-center items-center gap-2'>

                <span className='text-2xl'>
                    99.9 TL
                </span>
                <div className='w-10 h-8 rounded-lg flex justify-center items-center bg-gray-200'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
<path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" color='green' />
</svg>

                </div>
            </div>
            </div>

        </div>

   </div>
   <div className="flex 3 bg-slate-50 min-h-[233px] w-[32%] min-w-[250px]  row-span-1 border rounded-xl">
        <div className='flex flex-col h-full bg-white rounded-xl'>
            <div className='h-[60%] max-h-[75%] flex justify-center'>

            <img src="https://cdn.dermogrup.net/resize/181x181/mustela-gentle-cleansing-gel-yenidogan-sampuani-500-ml-mustela-147800-16-B.jpg" alt="" className='' />
            </div>
            <div className='mt-3'>

            <div className='flex justify-center px-4'>
                <span className='text-sm text-center '>
                La Roche Posay Cicaplast Baume B5 Krem 100 ml
                </span>

            </div>
            <div className='flex translate-x-[40%] w-[65%] justify-center items-center gap-2'>

                <span className='text-2xl'>
                    99.9 TL
                </span>
                <div className='w-10 h-8 rounded-lg flex justify-center items-center bg-gray-200'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
<path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" color='green' />
</svg>

                </div>
            </div>
            </div>

        </div>

   </div>

            </div>
}
