import React, { useContext, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { SharedContext } from '../layout/AgacDataSharer'
import Logo from '@/public/logo.png'
import SidebarButton from '@/components/Profil/SidebarButton'
import ShoppingBagIcon from '@/components/icons/ShoppingBagIcon'
import LightBulbIcon from '@/components/icons/LightBulbIcon'
import PP from '@/public/pp.webp'
import SidebarTooltipButton from '@/components/Profil/SidebarTooltipButton'
import HomeIcon from '@/components/icons/HomeIcon'
import { QuestionMark } from '@/components/icons/QuestionMark'
import SettingsIcon from '@/components/icons/SettingsIcon'
import ExitIcon from '@/components/icons/ExitIcon'
import ChevronDoubleLeftIcon from '@/components/icons/ChevronDoubleLeftIcon'
import { signOut } from 'next-auth/react'

export default function Sidebar({ isSidebarActive, setIsSidebarActive, setDialogState }) {
  const { fullUserData: data } = useContext(SharedContext)
  console.log(data)
  const sidebarRef = useRef(true)

  const handleChange = () => {
    setIsSidebarActive(value => !value)
    sidebarRef.current = true
  }

  const handleDialog = (dialog) => {
    dialog = 'settings'
    setDialogState(dialog)
  }

  const router = useRouter()

  useEffect(() => {
    console.log(sidebarRef.current)
    sidebarRef.current = false
    console.log(sidebarRef.current)
  }, [])

  return (
        <div className={`flex w-[350px] h-screen bg-white drop-shadow-lg border-r-4 border-r-primary rounded-br-2xl flex-col justify-between py-5 absolute z-50 ${!sidebarRef.current && !isSidebarActive ? '-left-[350px]' : (isSidebarActive) ? 'animate-openSidebar left-0' : '-left-[350px] animate-closeSidebar'}`}>

            {/* Toggle Button */}
            <div className='flex flex-col items-center gap-10'>
                <Link href='/home'>
                    <Image loading="lazy" width='275px' height='75px' className="w-[275px] h-[75px]" src={Logo} alt='Lykosis'/>
                </Link>

                <div className="flex flex-col gap-5">
                    <Link href={'/profile/siparisler'}>
                        <SidebarButton title="Siparişlerim"
                                       type={router.pathname === '/profile/siparisler' ? 'primary' : ''}
                                       icon={<ShoppingBagIcon/>}/>
                    </Link>
                    <Link href={'/profile/oneriler'}>
                        <SidebarButton title="Önerilen Ürünler"
                                       type={router.pathname === '/profile/oneriler' ? 'primary' : ''}
                                       icon={<LightBulbIcon/>}/>
                    </Link>
                    <SidebarButton title="Cilt Tipi Testi" type="disabled"/>
                    <SidebarButton title="Network Dersleri" type="disabled"/>
                </div>
            </div>

            {/* Logo and Page Buttons */}
            <button onClick={handleChange}
                    className={`${isSidebarActive ? '' : 'rotate-180 left-[350px] z-50'} z-50 w-10 visible absolute right-0 rounded-l-full top-0 bottom-0 translate-y-[50%] bg-white drop-shadow-lg border h-fit pl-2 py-2 my-auto transition-transform duration-300`}>
                <ChevronDoubleLeftIcon/>
            </button>

            {/* Profile Section */}
            <div className="flex w-full pt-5 border-t border-t-primary justify-center px-5">

                <div className="flex flex-col justify-center items-center">
                    <span className="text-lg text-black">{data?.name || '' } {' '} {data?.surname || ''}</span>
                    <span className="text-sm text-gray-400 overflow-hidden">{data?.email}</span>
                    <div className="flex justify-center self-center">
                        <SidebarTooltipButton onClick={() => router.push('/home')} tooltip="Ana Sayfa" icon={<HomeIcon/>}/>
                        <SidebarTooltipButton onClick={() => router.push('/yardim')} tooltip="Yardım" icon={<QuestionMark/>}/>
                        <SidebarTooltipButton onClick={handleDialog} tooltip="Ayarlar" icon={<SettingsIcon/>}/>
                        <SidebarTooltipButton onClick={async () => {await signOut();
                        window.location.pathname ="/login"
                        }} tooltip="Çıkış Yap" icon={<ExitIcon/>}/>
                    </div>
                </div>
            </div>
        </div>
  )
}