'use client'
import React, { useContext, useRef } from 'react'
import SettingsDialog from '@/components/Profil/SettingsDialog'
import MembershipNavbar from '@/components/Membership/MembershipNavbar'
import { SharedContext } from './AgacDataSharer'

function MembershipLayout({ navbarText, children }) {
  const [settingsState, setSettingsState] = React.useState('none')
  const settingsRef = useRef(null)
  const {hissedarBonusuMoney} = useContext(SharedContext)

  const handleDialogState = (data) => {
    setSettingsState(data)

    if (settingsRef.current) {
      if (data === 'none')
        settingsRef.current.close()
      else
        settingsRef.current.showModal()
    }
  }

  return (
    <>
            <main className='flex-col w-screen h-screen bg-white text-black'>
                <MembershipNavbar navbarText={navbarText} handleDialog={handleDialogState} hissedarBonusu={hissedarBonusuMoney}/>
                <div className="w-full h-full lg:h-[calc(100vh-176px)] py-[5%] lg:py-5 px-5 lg:px-[5%] justify-center items-center gap-5 lg:gap-10 overflow-y-auto flex flex-col lg:flex-row">
                    {children}

                </div>
            </main>

            <SettingsDialog dialogRef={settingsRef} dialogState={settingsState} handleDialogState={handleDialogState}/>
    </>

  )
}
export default React.memo(MembershipLayout)
