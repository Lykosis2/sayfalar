import React, { useContext } from 'react'
import SkinCareIcon from './icons/SkinCareIcon'
import SunCareIcon from './icons/SunCareIcon'
import HairCareIcon from './icons/HairCareIcon'
import BodyCareIcon from './icons/BodyCareIcon'
import SerumIcon from './icons/SerumIcon'
import WomenIcon from './icons/WomenIcon'
import MaleIcon from './icons/MaleIcon'
import BabyCategoryIcon from './icons/BabyCategoryIcon'
import EyeCareIcon from './icons/EyeCareIcon'
import WrenchScrewdriverIcon from './icons/WrenchScrewdriverIcon'
import { NavbarTextContext } from './NavbarProvider'
import Image from 'next/image'
import FaceCareIcon from './icons/FaceCareIcon'
import PerfumeIcon from './icons/PerfumeIcon'

export default function SliderPart() {
    const {setFilter} = useContext(NavbarTextContext)
  return (
<div className='lg:w-[30%] hidden md:flex'>
    <div className='w-full flex lg:justify-end justify-start items-center align-middle'>
        <div className='flex align-middle  lg:w-[65%] lg:mr-8 h-full border rounded-xl shadow-xl justify-start' >
            <ul className=' text-lg font-roboto w-full text-center mt-7' >
            <li className='w-full hover:bg-red-200  transition-colors duration-200 ease-in px-5 py-1.5 cursor-pointer select-none' onClick={()=>setFilter(2)}>
                    <div className='flex w-full  '>
                        <MaleIcon/>
                Erkek Bakımı

                    </div>
                </li>
                <li className='w-full hover:bg-red-200  transition-colors duration-200 ease-in px-5 py-1.5 cursor-pointer select-none'  onClick={()=>setFilter(3)}>
                    <div className='flex w-full  '>

                <WomenIcon/>
                Kadın Bakımı
                    </div>
                </li>
                <li className='w-full hover:bg-red-200  transition-colors duration-200 ease-in px-5 py-1.5 cursor-pointer select-none'  onClick={()=>setFilter(4)}>
                    <div className='flex w-full  '>
                   <FaceCareIcon/>
                Yüz Bakımı
               </div>
                </li>
                <li className='w-full hover:bg-red-200  transition-colors duration-200 ease-in px-5 py-1.5 cursor-pointer select-none'  onClick={()=>setFilter(5)}>
                    <div className='flex w-full  '>

                <BodyCareIcon/>
                    Vücut Bakımı
                    </div>
                </li>
                
                <li className='w-full hover:bg-red-200  transition-colors duration-200 ease-in px-5 py-1.5 cursor-pointer select-none'  onClick={()=>setFilter(6)}>
                    <div className='flex w-full  '>

                 <HairCareIcon/>
                    Saç Bakımı
                    </div>
                </li>
                <li className='w-full hover:bg-red-200  transition-colors duration-200 ease-in px-5 py-1.5 cursor-pointer select-none'  onClick={()=>setFilter(7)}>
                    <div className='flex w-full  '>

<SerumIcon/>
                Serumlar
                    </div>
                </li>
                <li className='w-full hover:bg-red-200  transition-colors duration-200 ease-in px-5 py-1.5 cursor-pointer select-none'  onClick={()=>setFilter(8)}>
                    <div className='flex w-full  '>

                <SunCareIcon/>
                Güneş Bakımı
            </div>
                </li>
                <li className='w-full hover:bg-red-200  transition-colors duration-200 ease-in px-5 py-1.5 cursor-pointer select-none'  onClick={()=>setFilter(9)}>
                    <div className='flex w-full  '>

<PerfumeIcon/>            
                    Parfümler
                    </div>
                </li>

              
                <li className='w-full hover:bg-red-200  transition-colors duration-200 ease-in px-5 py-1.5 cursor-pointer select-none'  onClick={()=>setFilter(10)}>
                    <div className='flex w-full  '>

                <EyeCareIcon/>
                    Göz Bakımı
                    </div>
                </li>
                <li className='w-full bg-gray-400  transition-colors duration-200 ease-in px-5 py-1.5 '>
                    <div className='flex w-full text-gray-200  '>

                <WrenchScrewdriverIcon/>
                Bebek Bakımı
                    </div>
                </li>
                <li className='w-full bg-gray-400  transition-colors duration-200 ease-in px-5 py-1.5'>
                    <div className='flex w-full text-gray-200  '>

                <WrenchScrewdriverIcon/>
                Besin Takviyeleri
                    </div>
                </li>
              

            </ul>

        </div>

    </div>

</div>

  )
}
