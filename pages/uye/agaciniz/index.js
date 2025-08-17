import React, { useContext } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import Link from 'next/link'
import MembershipLayout from '@/components/layout/MembershipLayout'
import MembershipGrafik from '@/components/Membership/MembershipGrafik'
import { SharedContext } from '@/components/layout/AgacDataSharer'
import FilterIcon from '@/components/icons/FilterIcon'
import Member from '@/components/Membership/Member'

export default function Agaciniz() {
  console.log('elo')
  const { allUsers } = useContext(SharedContext)
  console.log(allUsers)

  return (
    <MembershipLayout>
        <div className="w-full lg:w-[80%] h-96 lg:h-full items-center p-5 flex gap-5 flex-col bg-primary rounded-lg drop-shadow-lg">
        <div className="flex w-full gap-3 h-20 lg:h-14 flex-wrap lg:flex-nowrap justify-center">
          <Link
            href="/uye/agaciniz"
            className={`w-[48%] lg:w-full h-[50%] lg:h-full hover:bg-gray-300 transition-colors text-xl flex justify-center items-center px-5 rounded-2xl border-2 border-black bg-slate-300 
              `}
              shallow={true}
          >
            Ağaç
          </Link>

          <Link
            href="/uye/agaciniz/uzun-agac"
            prefix="/uye/agaciniz/uzun-agac"
            className={'w-[48%] lg:w-full h-[50%] lg:h-full bg-white hover:bg-gray-300 transition-colors text-xl flex justify-center items-center px-5 rounded-2xl border '} shallow={true}

          >
            Uzun Ağaç
          </Link>

          <Link
            href="/uye/agaciniz/kisa-agac"
            className={'w-[48%] lg:w-full h-[50%] lg:h-full bg-white hover:bg-gray-300 transition-colors text-xl flex justify-center items-center px-5 rounded-2xl border '}
            shallow={true}

          >
            Kısa Ağaç
          </Link>

          <Link
            href="/uye/agaciniz/degisebilirler"
            className={'w-[48%] lg:w-full h-[50%] lg:h-full bg-white hover:bg-gray-300 transition-colors text-xl flex justify-center items-center px-5 rounded-2xl border '}
            shallow={true}

          >
            Değiştir
          </Link>
        </div>

      

        <div id="tree-infinite-scroll" className="w-full h-full bg-white drop-shadow-lg rounded-lg overflow-y-auto flex flex-col gap-5 p-5 tree-container">

       {
        Object.keys(allUsers).length <= 0
          ? <h2 className="w-full flex items-center font-semibold text-xl text-center ">
            Yükleniyor...
        </h2>
          : <InfiniteScroll

       className="w-full h-full bg-white drop-shadow-lg rounded-lg overflow-y-auto flex flex-col gap-5 p-5 tree-container"
       dataLength={Object.keys(allUsers.tree.self_tree_positions).length}

       >
        {
            console.log(allUsers)
        }
        {
            Object.values(allUsers.tree.self_tree_positions)
            .map((item, index) => {
             
              return <Member key={index} member={item} />
            })

        }
       </InfiniteScroll>
       }
        </div>

      </div>

    <MembershipGrafik graphData={allUsers} />

      {/* Second Container */}

      {/* <MembershipGrafik graphData={allUyeler} startState={startState}/> */}

    </MembershipLayout>

  )
}
