import React, { useContext } from 'react'
import Link from 'next/link'
import MembershipLayout from '@/components/layout/MembershipLayout'
import { SharedContext } from '@/components/layout/AgacDataSharer'
import MembershipGrafik from '@/components/Membership/MembershipGrafik'
import KanbanBoard from '@/components/Degisebilirler/KanbanBoard'

export default function Agaciniz() {
  const { allUsers } = useContext(SharedContext)
  console.log(allUsers)

  return (
        <MembershipLayout>
        <div className="w-full lg:w-[80%] h-96 lg:h-full items-center p-5 flex gap-5 flex-col bg-primary rounded-lg drop-shadow-lg">
        <div className="flex w-full gap-3 h-20 lg:h-14 flex-wrap lg:flex-nowrap justify-center">
          <Link
            href="/uye/agaciniz"
            className={`w-[48%] lg:w-full h-[50%] lg:h-full bg-white hover:bg-gray-300 transition-colors text-xl flex justify-center items-center px-5 rounded-2xl border 
              `}
          >
            Ağaç
          </Link>

          <Link
            href="/uye/agaciniz/uzun-agac"
            prefix="/uye/agaciniz/uzun-agac"
            className={'w-[48%] lg:w-full h-[50%] lg:h-full bg-white hover:bg-gray-300 transition-colors text-xl flex justify-center items-center px-5 rounded-2xl border '}
          >
            Uzun Ağaç
          </Link>

          <Link
            href="/uye/agaciniz/kisa-agac"
            className={'w-[48%] lg:w-full h-[50%] lg:h-full bg-white hover:bg-gray-300 transition-colors text-xl flex justify-center items-center px-5 rounded-2xl border '}
          >
            Kısa Ağaç
          </Link>

          <Link
            href="/uye/agaciniz/degisebilirler"
            className={'w-[48%] lg:w-full h-[50%] lg:h-full hover:bg-gray-300 transition-colors text-xl flex justify-center items-center px-5 rounded-2xl border-2 border-black bg-slate-300 '}
          >
            Değiştir
          </Link>
        </div>

        <div id="tree-infinite-scroll" className="w-full h-full bg-white drop-shadow-lg rounded-lg overflow-y-auto flex flex-col gap-5 px-5 tree-container">

       <KanbanBoard />
        </div>

      </div>
      {
        console.log(allUsers)
      }
      {
        allUsers && allUsers.tree &&  <MembershipGrafik graphData={allUsers} />
      }
   

      {/* Second Container */}

      {/* <MembershipGrafik graphData={allUyeler} startState={startState}/> */}

    </MembershipLayout>
  )
}
