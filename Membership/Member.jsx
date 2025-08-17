import Image from 'next/image'
import React from 'react'

export default function Member({ member }) {
  if (!member)
    return <></>
  return (
    <div className="w-full h-full max-h-fit flex flex-col lg:flex-row justify-between p-5 bg-primary rounded-xl items-center">
      

      <div className="w-full h-full gap-3 flex flex-col justify-center items-center text-white">
        <span className="font-semibold text-lg">İsim</span>
        <span>
          {member.name} {member.surname}
        </span>
      </div>

      <div className="w-full h-full gap-3 flex flex-col justify-center items-center text-white">
        <span className="font-semibold text-lg">Telefon Numarası</span>
        <span>{member.phoneNumber}</span>
      </div>

      <div className="w-full h-full gap-3 flex flex-col justify-center items-center text-white">
        <span className="font-semibold text-lg">Üyelik Türü</span>
        <span>{member.has_saleAccount ? 'Üye' : 'Müşteri'}</span>
      </div>

      <div className="w-full h-full gap-3 flex flex-col justify-center items-center text-white">
        <span className="font-semibold text-lg">Kazandırdığı Puan</span>
        {

          console.log(member.point1.toString(),
          )
        }
        <span>{`${Number.parseInt(member.point1)}.00`}</span>
      </div>

      <div className="w-full h-full gap-3 flex flex-col justify-center items-center text-white">
        <span className="font-semibold text-lg">Kazandırdığı Para</span>
        <span>{member.balance}</span>
      </div>
    </div>
  )
}
