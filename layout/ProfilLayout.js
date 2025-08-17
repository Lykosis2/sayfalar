'use client'
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import Sidebar from '@/components/Profil/Sidebar'
import Navbar from '@/components/Profil/Navbar'
import SettingsDialog from '@/components/Profil/SettingsDialog'
import useWindowSize from '@/components/hooks/useWindowDimension'
import { SharedContext } from './AgacDataSharer'

export default function ProfilLayout({ navbarTitle, children }) {
  const [isSidebarActive, setIsSidebarActive] = useState(null)
  const [isInputChanged, setIsInputChanged] = useState(false)
  const {apiData} = useContext(SharedContext)
  const size = useWindowSize()
  const [dialogState, setDialogState] = useState('none')
  const dialogRef = useRef(null)

  const handleDialogState = (data) => {
    setDialogState(data)
    setIsInputChanged(false)

    if (dialogRef.current) {
      if (data === 'none')
        dialogRef.current.close()
      else
        dialogRef.current.showModal()
    }
  }


  useEffect(() => {
    if (!size)
      setIsSidebarActive(null)
    if (size.width > 1024)
      setIsSidebarActive(true)
    else
      setIsSidebarActive(false)
  }, [size.width])

  const sideBar = useMemo(() => {
    return <Sidebar setDialogState={handleDialogState} isSidebarActive={isSidebarActive}
                        setIsSidebarActive={setIsSidebarActive}/>
  }, [isSidebarActive])

  const navbar = useMemo(() => {
    return <Navbar title={navbarTitle} />
  }, [navbarTitle])

  const settingsDialog = useMemo(() => {
    return <SettingsDialog isInputChanged={isInputChanged} setIsInputChanged={setIsInputChanged} apiData={apiData}
                               dialogRef={dialogRef}
                               dialogState={dialogState} handleDialogState={handleDialogState}/>
  }, [isInputChanged, dialogState])

  return (
        <>
            <main className='flex w-screen h-screen bg-white text-black'>
                {sideBar}
                <div
                    className={`${isSidebarActive ? 'lg:ml-[350px] lg:max-w-[calc(100vw-350px)]' : ''} w-full h-full flex flex-col transition-all duration-300 ease-out`}>
                    {navbar}
                    <div className="w-full h-full p-5 overflow-auto">
                        {children}
                    </div>
                </div>
            </main>

            {settingsDialog}
        </>
  )
}