import React, { useState } from 'react'
import WomenIcon from '../icons/WomenIcon'
import MaleIcon from '../icons/MaleIcon'
import SkinCareIcon from '../icons/SkinCareIcon'
import BodyCareIcon from '../icons/BodyCareIcon'
import SunCareIcon from '../icons/SunCareIcon'
import HairCareIcon from '../icons/HairCareIcon'
import SerumIcon from '../icons/SerumIcon'
import EyeCareIcon from '../icons/EyeCareIcon'
import BabyCategoryIcon from '../icons/BabyCategoryIcon'
import WrenchScrewdriverIcon from '../icons/WrenchScrewdriverIcon'
import ShoppingBagIcon from '../icons/LightBulbIcon'
import AllCategoryIcon from '../icons/AllCategoryIcon'
import Image from 'next/image'
import FaceCareIcon from '../icons/FaceCareIcon'
import PerfumeIcon from '../icons/PerfumeIcon'

export default function Categories({ passToParent }) {
  const [selected, setSelected] = useState(0)
  function handleChange(input) {
    setSelected(input)
    passToParent(input)
  }
  return (
    <div className='w-full h-[calc(97.5%)] flex flex-col justify-start items-start rounded-xl border bg-white min-w-[70px] '>
        <span className='w-[calc(100%-2rem)] translate-x-4 mt-3 h-[5%] items-center text-center  text-button-red bg-white sm:ml-2 justify-center text-xs sm:flex hidden md:text-lg lg:text-xl '>
            Kategoriler
        </span>
        <div className={`w-full mt-3 h-[5%] flex items-center ${selected !== 0 ? 'hover:text-white text-button-red bg-white hover:bg-red-400 ' : 'bg-red-400 text-white '} cursor-pointer`} onClick={() => handleChange(0)}>
            <span className='w-full flex sm:ml-2 sm:justify-start justify-center '>
                <AllCategoryIcon/>
    <span className='ml-2 text-xs md:text-base sm:flex hidden'>
    Tüm Kategoriler
    </span>
            </span>
        </div>
        <div className={`w-full mt-3 h-[5%] flex items-center ${selected !== 1 ? 'hover:text-white text-button-red bg-white hover:bg-red-400 ' : 'bg-red-400 text-white '} cursor-pointer`} onClick={() => handleChange(1)}>
            <span className='w-full flex sm:ml-2 sm:justify-start justify-center'>
            <MaleIcon/>

    <span className='ml-2 text-xs md:text-base sm:flex hidden'>
    Erkek Bakımı
    </span>
            </span>
        </div>
        <div className={`w-full mt-3 h-[5%] flex items-center ${selected !== 2 ? 'hover:text-white text-button-red bg-white hover:bg-red-400 ' : 'bg-red-400 text-white '} cursor-pointer`} onClick={() => handleChange(2)}>
            <span className='w-full flex sm:ml-2 sm:justify-start justify-center '>
            <WomenIcon/>

    <span className='ml-2 text-xs md:text-base sm:flex hidden'>
    Kadın Bakımı
    </span>
            </span>
        </div>
        
        <div className={`w-full mt-3 h-[5%] flex items-center ${selected !== 3 ? 'hover:text-white text-button-red bg-white hover:bg-red-400 ' : 'bg-red-400 text-white '} cursor-pointer`} onClick={() => handleChange(3)}>
            <span className='w-full flex sm:ml-2 sm:justify-start justify-center'>
          <FaceCareIcon/> 
    <span className='ml-2 text-xs md:text-base sm:flex hidden'>
    Yüz Bakımı
    </span>
            </span>
        </div>
        <div className={`w-full mt-3 h-[5%] flex items-center ${selected !== 4 ? 'hover:text-white text-button-red bg-white hover:bg-red-400 ' : 'bg-red-400 text-white '} cursor-pointer`} onClick={() => handleChange(4)}>
            <span className='w-full flex sm:ml-2 sm:justify-start justify-center'>
            <BodyCareIcon/>

    <span className='ml-2 text-xs md:text-base sm:flex hidden'>
    Vücut Bakımı
    </span>
            </span>
        </div>
        
        <div className={`w-full mt-3 h-[5%] flex items-center ${selected !== 5 ? 'hover:text-white text-button-red bg-white hover:bg-red-400 ' : 'bg-red-400 text-white '} cursor-pointer`} onClick={() => handleChange(5)}>
            <span className='w-full flex sm:ml-2 sm:justify-start justify-center'>
            <HairCareIcon/>

    <span className='ml-2 text-xs md:text-base sm:flex hidden'>
    Saç Bakımı
    </span>
            </span>
        </div>
        <div className={`w-full mt-3 h-[5%] flex items-center ${selected !== 6 ? 'hover:text-white text-button-red bg-white hover:bg-red-400 ' : 'bg-red-400 text-white '} cursor-pointer`} onClick={() => handleChange(6)}>
            <span className='w-full flex sm:ml-2 sm:justify-start justify-center'>
            <SerumIcon/>

    <span className='ml-2 text-xs md:text-base sm:flex hidden'>
    Serumlar
    </span>
            </span>
        </div>
        <div className={`w-full mt-3 h-[5%] flex items-center ${selected !== 7 ? 'hover:text-white text-button-red bg-white hover:bg-red-400 ' : 'bg-red-400 text-white '} cursor-pointer`} onClick={() => handleChange(7)}>
            <span className='w-full flex sm:ml-2 sm:justify-start justify-center'>
            <SunCareIcon/>

    <span className='ml-2 text-xs md:text-base sm:flex hidden'>
    Güneş Bakımı
    </span>
            </span>
        </div>
        
        <div className={`w-full mt-3 h-[5%] flex items-center ${selected !== 8 ? 'hover:text-white text-button-red bg-white hover:bg-red-400 ' : 'bg-red-400 text-white '} cursor-pointer`} onClick={() => handleChange(8)}>
            <span className='w-full flex sm:ml-2 sm:justify-start justify-center'>
            <EyeCareIcon/>
    <span className='ml-2 text-xs md:text-base sm:flex hidden'>
    Göz Bakımı
    </span>
            </span>
        </div>
        <div className={`w-full mt-3 h-[5%] flex items-center ${selected !== 9 ? 'hover:text-white text-button-red bg-white hover:bg-red-400 ' : 'bg-red-400 text-white '} cursor-pointer`} onClick={() => handleChange(9)}>
            <span className='w-full flex sm:ml-2 sm:justify-start justify-center' onClick={() => handleChange(9)}>
           <PerfumeIcon/>


    <span className='ml-2 text-xs md:text-base sm:flex hidden'>
    Parfümler
    </span>
            </span>
        </div>
        <div className={`w-full mt-3 h-[5%] flex items-center ${selected !== 9 ? 'hover:text-white text-button-red bg-white hover:bg-red-400 ' : 'bg-red-400 text-white '} cursor-pointer`} >
            <span className='w-full flex sm:ml-2 sm:justify-start justify-center'>
            <BabyCategoryIcon/>

    <span className='ml-2 text-xs md:text-base sm:flex hidden'>
    Bebek Bakımı
    </span>
            </span>
        </div>
       
        <div className='w-full mt-3 h-[5%] flex items-center hover:text-white text-button-red bg-white hover:bg-red-400 cursor-pointer '>
            <span className='w-full flex sm:ml-2 sm:justify-start justify-center'>
            <WrenchScrewdriverIcon/>

    <span className='ml-2 text-xs md:text-base sm:flex hidden'>
    Yeni Ürünler
    </span>
            </span>
        </div>
        <div className='w-full mt-3 h-[5%] flex items-center hover:text-white text-button-red bg-white hover:bg-red-400 cursor-pointer '>
            <span className='w-full flex sm:ml-2 sm:justify-start justify-center'>
            <ShoppingBagIcon/>

    <span className='ml-2 text-xs md:text-base sm:flex hidden'>
    Çok satanlar
    </span>
            </span>
        </div>

    </div>
  )
}
