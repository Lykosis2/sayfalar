import { useContext, useEffect, useState } from 'react'
import XmarkIcon from '../icons/XmarkIcon'
import { SharedContext } from '../layout/AgacDataSharer'
import DialogSidebarButton from '@/components/Profil/DialogSidebarButton'
import ProfilSettingsProfile from '@/components/Profil/ProfilSettingsProfile'
import ProfilSettingsMembership from '@/components/Profil/ProfilSettingsMembership'
import ProfilSettingsAddresses from '@/components/Profil/ProfilSettingsAddresses'
import ProfilSettingsCards from '@/components/Profil/ProfilSettingsCards'
import ProfilSettingsNotifications from '@/components/Profil/ProfilSettingsNotifications'

export default function SettingsDialog({ dialogState, handleDialogState, dialogRef}) {
  const { apiData,fullUserData,session,setApiData } = useContext(SharedContext)

  return (<dialog
        className={`${dialogState === 'none' ? 'hidden' : ''}  absolute top-0 left-0 right-0 bottom-0 p-5 bg-white flex drop-shadow-lg rounded-xl w-full h-full max-w-[1200px] max-h-[700px] `}
        ref={dialogRef}>
             <button onClick={() => handleDialogState('none')}
                        className="absolute right-3 top-3 w-8 h-8 border border-black rounded-full">
                    <XmarkIcon/>
                </button>
        <div className="flex flex-col gap-5 pr-4 sticky">
            <DialogSidebarButton title="Profil" type={dialogState === 'settings' ? 'primary' : ''}
                                 onClick={() => handleDialogState('settings')}/>
            <DialogSidebarButton title="Üyelik" type={dialogState === 'membership' ? 'primary' : ''}
                                 onClick={() => handleDialogState('membership')}/>
            <DialogSidebarButton title="Adresler" type={dialogState === 'addresses' ? 'primary' : ''}
                                 onClick={() => handleDialogState('addresses')}/>
            {/* <DialogSidebarButton title="Kartlar" type={dialogState === 'cards' ? 'primary' : ''}
                                 onClick={() => handleDialogState('cards')}/> */}
            <DialogSidebarButton title="Bildirim" type={dialogState === 'notification' ? 'primary' : ''}
                                 onClick={() => handleDialogState('notification')}/>
        </div>

        <div className="flex flex-col w-full h-full gap-5 p-0 sm:p-3 lg:p-10 justify-between">
            <div className="flex flex-wrap justify-start md:justify-center w-full h-fit pb-5 relative gap-5">

                {dialogState === 'settings' ? <ProfilSettingsProfile  generalData={fullUserData}/> : <></>}
                {dialogState === 'membership' ? <ProfilSettingsMembership session={session}/> : <></>}
                {dialogState === 'addresses' ? <ProfilSettingsAddresses apiData={apiData} setApiData={setApiData}/> : <></>}
                {/* {dialogState === 'cards' ? <ProfilSettingsCards cards={cards} setCards={setCards} /> : <></>} */}
                {dialogState === 'notification'
                  ? <ProfilSettingsNotifications />
                  : <></>}

            </div>
            
        </div>
    </dialog>)
}