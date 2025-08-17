import React, { useEffect } from 'react'
import Select from 'react-select'
import MembershipLayout from '@/components/layout/MembershipLayout'
import FilterIcon from '@/components/icons/FilterIcon'
import XmarkIcon from '@/components/icons/XmarkIcon'

export default function TreeLayout({ navbarText }) {
  const filterRef = React.useRef(null)
  const [uyeler, setUyeler] = React.useState([])
  const [filteredUyeler, setFilteredUyeler] = React.useState([])

  React.useEffect(() => {
    const data = []
    for (let i = 0; i < 100; i++) {
      data.push({
        id: i,
        profile_picture: '/pp.webp',
        name: 'Ahmet',
        surname: 'Kaya',
        availability: '9:00 - 17:00',
        members_gained: 10,
        points_gained: 100,
        money_gained: 1000,
      })
    }

    setUyeler((prev) => {
      setFilteredUyeler(prev => data)
      return data
    })
  }, [])

  const availabilityOptions = [
    { value: '00:00 - 24:00', label: '00:00 - 24:00' },
    { value: '9:00 - 17:00', label: '9:00 - 17:00' },
    { value: '9:00 - 17:00', label: '9:00 - 17:00' },
    { value: '9:00 - 17:00', label: '9:00 - 17:00' },
    { value: '9:00 - 17:00', label: '9:00 - 17:00' },
  ]
  const [searchedName, setSearchedName] = React.useState('')
  const [selectedAvailability, setSelectedAvailability] = React.useState(availabilityOptions[0])
  const [selectedMember, setSelectedMember] = React.useState({ min: 0, max: 9999999999 })
  const [selectedPoint, setSelectedPoint] = React.useState({ min: 0, max: 9999999999 })
  const [selectedMoney, setSelectedMoney] = React.useState({ min: 0, max: 9999999999 })

  function filterUyeler() {
    return uyeler.filter((uye) => {
      if (searchedName !== '') {
        if (!uye.name.toLowerCase().includes(searchedName.toLowerCase()) && !uye.surname.toLowerCase().includes(searchedName.toLowerCase()))
          return false
      }

      if (selectedAvailability.value !== '00:00 - 24:00') {
        if (uye.availability !== selectedAvailability.value)
          return false
      }

      if (uye.members_gained < selectedMember.min || uye.members_gained > selectedMember.max)
        return false

      if (uye.points_gained < selectedPoint.min || uye.points_gained > selectedPoint.max)
        return false

      if (uye.money_gained < selectedMoney.min || uye.money_gained > selectedMoney.max)
        return false

      return true
    })
  }

  useEffect(() => {
    if (filteredUyeler !== null && filteredUyeler.length > 0)
      setFilteredUyeler(filterUyeler())
  }, [searchedName, selectedAvailability, selectedMember, selectedPoint, selectedMoney])

  const handleMemberChange = (event, type) => {
    if (type === 'min') {
      setSelectedMember((prev) => {
        return { min: Number.parseInt(event.target.value), max: prev.max }
      })
    }
    else if (type === 'max') {
      setSelectedMember((prev) => {
        return { min: prev.min, max: Number.parseInt(event.target.value) }
      })
    }
  }

  const handlePointChange = (event, type) => {
    if (type === 'min') {
      setSelectedPoint((prev) => {
        return { min: Number.parseInt(event.target.value), max: prev.max }
      })
    }
    else if (type === 'max') {
      setSelectedPoint((prev) => {
        return { min: prev.min, max: Number.parseInt(event.target.value) }
      })
    }
  }

  const handleMoneyChange = (event, type) => {
    if (type === 'min') {
      setSelectedMoney((prev) => {
        return { min: event.target.value, max: prev.max }
      })
    }
    else if (type === 'max') {
      setSelectedMoney((prev) => {
        return { min: prev.min, max: event.target.value }
      })
    }
  }

  return (
        <>
            <MembershipLayout navbarText={navbarText}>
                {/* First Container */}
                <div
                    className="w-full lg:w-[80%] h-96 lg:h-full items-center p-5 flex gap-5 flex-col bg-primary rounded-lg drop-shadow-lg">
                    <div className="flex w-full gap-3 h-20 lg:h-14 flex-wrap lg:flex-nowrap justify-center">
                        <button
                            className="w-[48%] lg:w-full h-[50%] lg:h-full bg-white hover:bg-gray-300 transition-colors text-xl flex justify-center items-center px-5 rounded-2xl">
                            Ağaç
                        </button>

                        <button className="w-[48%] lg:w-full h-[50%] lg:h-full bg-white hover:bg-gray-300 transition-colors text-xl flex justify-center items-center px-5 rounded-2xl">
                            Kısa Dal
                        </button>

                        <button
                            className="w-[48%] lg:w-full h-[50%] lg:h-full bg-white hover:bg-gray-300 transition-colors text-xl flex justify-center items-center px-5 rounded-2xl">
                            Uzun Dal
                        </button>

                        <button
                            className="w-[48%] lg:w-full h-[50%] lg:h-full bg-white hover:bg-gray-300 transition-colors text-xl flex justify-center items-center px-5 rounded-2xl">
                            Değiştir
                        </button>
                    </div>

                    <div className="flex justify-between w-full bg-white drop-shadow-lg h-12 rounded-xl px-2 py-1">
                        <div className="flex overflow-x-auto overflow-y-hidden gap-3">
                            {/* Loop over selected filter options */}
                            <div
                                className="w-48 text-center flex items-center justify-center bg-gray-300 rounded-lg select-none font-semibold">
                                Uygunluğa Göre Sırala
                            </div>

                            <input onChange={event => setSearchedName(event.target.value)} placeholder="İsim arayın"
                                   type="text" className="border border-black rounded-lg  h-10 px-2"/>
                            <div className="flex relative w-24">

                            </div>
                        </div>

                        <button onClick={() => filterRef.current.showModal()}
                                className="w-12 flex justify-center items-center rounded-md h-full bg-primary hover:bg-blue-900 transition-colors text-white outline-0 p-1">
                            <FilterIcon/>
                        </button>
                    </div>

                    <div className="w-full h-full bg-white drop-shadow-lg rounded-lg overflow-y-auto flex flex-col gap-5 p-5 tree-container">
                       {children}
                    </div>
                </div>
                {/* Second Container */}
                <div className="w-full lg:w-[40%] h-full gap-5 bg-primary rounded-lg items-center p-5 flex flex-col">
                    <h2 className="text-3xl text-white font-semibold">Harita</h2>
                    <div className="w-full h-full bg-[#D3D3D3] rounded-xl"></div>
                </div>
            </MembershipLayout>
            <dialog ref={filterRef} className="w-[90%] h-[90%] lg:w-[50%] lg:h-[50%] bg-white rounded-xl p-10">
                <button onClick={() => filterRef.current.close()}
                        className="absolute right-3 top-3 w-8 h-8 border border-black rounded-full">
                    <XmarkIcon/>
                </button>

                <div className="flex flex-wrap gap-5 w-full h-full justify-center text-center">
                    <div className="flex flex-col gap-3">
                        <span className="text-lg font-semibold">Uygunluk Saati</span>
                        <Select options={availabilityOptions} defaultValue={availabilityOptions[0]}/>
                    </div>

                    <div className="flex flex-wrap gap-5 justify-center">
                        <div className="flex flex-col gap-3">
                            <span className="text-lg font-semibold">Kazandırdığı Üye</span>
                            <div className="flex gap-3 divide">
                                <input onChange={event => handleMemberChange(event, 'min')} placeholder="Min"
                                       type="number"
                                       className="border rounded w-24 h-10 px-2"/>
                                <input onChange={event => handleMemberChange(event, 'max')} placeholder="Max"
                                       type="number"
                                       className="border rounded w-24 h-10 px-2"/>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <span className="text-lg font-semibold">Kazandırdığı Puan</span>
                            <div className="flex gap-3 divide">
                                <input onChange={event => handlePointChange(event, 'min')} placeholder="Min"
                                       type="number"
                                       className="border rounded w-24 h-10 px-2"/>
                                <input onChange={event => handlePointChange(event, 'max')} placeholder="Max"
                                       type="number"
                                       className="border rounded w-24 h-10 px-2"/>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <span className="text-lg font-semibold">Kazandırdığı Para</span>
                            <div className="flex gap-3 divide">
                                <input onChange={event => handleMoneyChange(event, 'min')} placeholder="Min"
                                       type="number"
                                       className="border rounded w-24 h-10 px-2"/>
                                <input onChange={event => handleMoneyChange(event, 'max')} placeholder="Max"
                                       type="number"
                                       className="border rounded w-24 h-10 px-2"/>
                            </div>
                        </div>
                    </div>
                </div>

            </dialog>
        </>
  )
}
