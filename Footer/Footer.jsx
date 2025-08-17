import React from 'react'
import Image from 'next/image'
import FacebookIcon from '../icons/FacebookIcon'
import TwitterIcon from '../icons/TwitterIcon'
import YoutubeIcon from '../icons/YoutubeIcon'
import InstagramIcon from '../icons/InstagramIcon'
import Link from 'next/link'

export default function Footer() {
  return (<div className='w-full lg:h-[250px] h-[375px] flex justify-center items-center bg-primary relative'>

        <div className=' bg-primary w-full h-full flex md:flex-row flex-col '>
            <div className='md:w-[40%] w-full h-full md:h-full bg-primary flex items-center justify-center'>
                <Image src='/logo.png' className="w-fit" width={400} height={200} alt="Logo"/>
            </div>
            <div className='md:w-[60%] w-full md:h-full h-[65%] bg-primary grid grid-cols-4 grid-rows-1 gap-x-4 '>
                <div className=' row-span-1 md:translate-y-1/4 md:h-[60%] md:mx-2 content-start'>
                    <ul className='flex flex-col justify-center items-start gap-3'>
                        <li className='text-white md:text-2xl text-lg font-semibold mb-2 text-ellipsis whitespace-nowrap overflow-hidden w-full text-center'>Hakkımızda</li>
                        <Link href='/hakkimizda' className='text-white text-base w-full overflow-hidden text-ellipsis'>Misyonumuz</Link>
                        <Link href='/hakkimizda'className='text-white text-base w-full overflow-hidden text-ellipsis'>Vizyonumuz</Link>
                        <Link href={"/hakkimizda"} className='text-white text-base w-full overflow-hidden text-ellipsis'>Değerlerimiz</Link>
                        <Link href={"/hakkimizda"} className='text-white text-base w-full overflow-hidden text-ellipsis'>Başkanın Mesajı</Link>

                    </ul>

                </div>
                <div className=' row-span-1 md:translate-y-1/4 md:h-[60%] md:mx-2'>
                    <ul className='flex flex-col justify-center gap-2 md:gap-4'>
                        <li className='text-white md:text-2xl text-lg font-semibold mb-2 text-ellipsis whitespace-nowrap overflow-hidden w-full text-center'>Güvenlik</li>
                        <a target='_blank' href='https://cdn.lykosis.com/sozlesmeler/Lykosis Mesafeli Satış Sözleşmesi.pdf' className='text-white text-base w-full overflow-hidden text-ellipsis'>Satış Politikası</a>
                        <a target='_blank' href='https://cdn.lykosis.com/sozlesmeler/Lykosis Çerez Politikası.pdf' className='text-white text-base w-full overflow-hidden text-ellipsis'>Çerez Politikası </a>
                        <a target='_blank' href='https://cdn.lykosis.com/sozlesmeler/Lykosis İade Sözleşmesi.pdf' className='text-white text-base w-full overflow-hidden text-ellipsis'>İade politikası</a>


                    </ul>

                </div>
                <div className=' row-span-1 md:translate-y-1/4 md:h-[60%] md:mx-2'>
                    <ul className='flex flex-col justify-center items-center gap-2 md:gap-4'>
                        <li className='text-white md:text-2xl sm:text-lg text-base  font-semibold mb-2 text-ellipsis whitespace-nowrap overflow-hidden w-full text-center'>Yardım</li>
                        <Link href='/iletisim' className='text-white text-base w-full overflow-hidden text-ellipsis'>Müşteri Hizmetleri</Link>
                        <Link href={"/iletisim"} className='text-white text-base w-full overflow-hidden text-ellipsis'>Adresimiz</Link>
                        <Link href={"/iletisim"} className='text-white text-base w-full overflow-hidden text-ellipsis'>İletişim</Link>

                    </ul>

                </div>
                <div className=' row-span-1 md:translate-y-1/4 md:h-[60%] md:mx-2'>
                    <ul className='flex flex-col justify-center items-center gap-4'>
                        <FacebookIcon/>
                        <TwitterIcon/>
                        <YoutubeIcon/>
                        <InstagramIcon/>

                    </ul>

                </div>
            </div>
           

        </div>

    </div>)
}
