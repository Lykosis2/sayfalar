import Image from 'next/image'
import Logo from '/public/whiteLogo.webp'
import { useRouter } from 'next/router'
import Link from 'next/link'
import NavbarTooltipButton from './NavbarTooltipButton'
import HomeIcon from '@/components/icons/HomeIcon'
import { QuestionMark } from '@/components/icons/QuestionMark'
import SettingsIcon from '@/components/icons/SettingsIcon'

export default function MembershipNavbar({ navbarText, handleDialog,hissedarBonusu }) {
  const router = useRouter()

  const buttonClasses = (path) => {
    return router.pathname.includes(path) ? 'bg-gray-300 hover:bg-white hover:outline' : 'bg-white hover:bg-gray-300 hover:outline'
  }

  console.log(hissedarBonusu);
  return (
        <nav className="w-screen h-44 bg-primary text-white flex flex-col md:flex-row py-2 gap-5 justify-between items-center px-[5%]">
            <Link href={'/home'}>
                <Image src={Logo} alt="Logo" width={330} height={90} className="w-[330px] h-[90px]"/>
            </Link>
            

            <div className="flex flex-col text-center gap-5">
                <h1 className="text-2xl hidden md:block">{navbarText ?? 'Üyelik'}</h1>
                <div className="flex gap-5">
                    <Link href="/uye/uyeleriniz" className={`${buttonClasses('uyeleriniz')} drop-shadow-lg text-black text-lg rounded-lg py-2 w-24 md:w-40 lg:w-60 transition-all duration-100 text-center`}>Üyeler</Link>
                    <Link href="/uye/agaciniz" className={`${buttonClasses('agaciniz')} drop-shadow-lg text-black text-lg rounded-lg py-2 w-24 md:w-40 lg:w-60 transition-all duration-100 text-center`}>Ağacınız</Link>
                    <span className="lg:flex absolute lg:relative left-1/3 top-24 lg:top-0 lg:left-0 -translate-x-6 lg:-translate-x-0 lg:translate-y-3">Hissedar Bonusu : {hissedarBonusu?.value ?? 0 }TL </span>
                </div>
            </div>

            <div className="w-[330px] flex justify-end items-end self-end h-full -translate-y-12">
                    <NavbarTooltipButton onClick={() => router.push('/home')} tooltip="Ana Sayfa" icon={<HomeIcon/>}/>
                    <NavbarTooltipButton onClick={() => router.push('/yardim')} tooltip="Yardım" icon={<QuestionMark/>}/>
                    <NavbarTooltipButton onClick={() => handleDialog('membership')} tooltip="Ayarlar" icon={<SettingsIcon/>}/>
            </div>
        </nav>
  )
}
