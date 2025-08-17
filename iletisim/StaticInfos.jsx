import Link from 'next/link'
import React from 'react'

export default function StaticInfos() {
  return (
    <div className='w-full h-fit lg:h-full rounded-xl border border-primary bg-primary shadow-sm shadow-black flex flex-col'>
        <span className='text-3xl text-white w-full lg:h-24 h-12 flex justify-center mt-12'>
            Bize Ulaşın

        </span>
        <span className='text-white w-full h-24 lg:h-12 flex justify-start px-12 pb-2' onClick={() => {
          window.open('https://goo.gl/maps/MDvLAi61k7Nmredu6')
        }}>
            Adres: &nbsp; Kınıklı Mahallesi Çamlık Cad, 6108. Sk. 8/A, 20160 Denizli Merkez/Denizli
        </span>
        <span className='text-white w-full h-12 pb-2 flex justify-start px-12'>
            Telefon: &nbsp; <a className='text-white' href='tel:+90 258 211 29 09'>+90 258 211 29 09</a>
        </span>
        <span className='text-white w-full h-12 flex justify-start px-12 pb-2'>
            Email: &nbsp; <a className='text-white' href='mailto:info@lykosis.com'> info@lykosis.com </a>
        </span>
        <span className='text-white w-full h-12 flex justify-start px-12 pb-2'>
            Instagram: &nbsp; <a className='text-white' href='https://www.instagram.com/lykosis/'> @lykosis </a>
        </span>
        <span className='text-white w-full h-12 flex justify-start px-12 pb-2'>
            Facebook: &nbsp; <a className='text-white' href='https://www.facebook.com/lykosis'> @lykosis </a>
        </span>
        <span className='text-white w-full h-12 flex justify-start px-12 pb-2'>
            Twitter: &nbsp; <a className='text-white' href='https://twitter.com/lykosis'> @lykosis </a>
        </span>
        <span className='text-white w-full h-12 flex justify-start px-12 pb-2'>
            Youtube: &nbsp; <a className='text-white' href='https://www.youtube.com/channel/UC4QX6Z3Z6Z3Z6Z3Z6Z3Z6Z3Z'> @lykosis </a>
        </span>
        <span className=' text-white w-full h-12 flex justify-start px-12 pb-2'>
            Açılış Saati: &nbsp; 09:00 - 18:00 (Haftaiçi)
        </span>
        <Link href='/yardim'>
            <span className='w-full justify-center px-12 cursor-pointer text-2xl text-white flex m-auto h-full items-center mt-6 underline pb-2'>
                Sıkça Sorulan Sorular
            </span>
        </Link>

    </div>
  )
}
