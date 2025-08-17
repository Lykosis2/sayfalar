import { useContext, useEffect, useRef, useState } from 'react'
import { ofetch } from 'ofetch'
import { getCities } from 'turkey-neighbourhoods'
import { SharedContext } from '../layout/AgacDataSharer'
import AdressBox from './AdressBox'
import ProfilAdressAddEditComponent from './ProfilAdressAddEditComponent'
import ProfilAdressAddComponent from './ProfilAdressAddComponent'
import ProfilAdressEditComponent from './ProfilAdressEditComponent'

export default function ProfilSettingsAddresses({apiData,setApiData}) {
  const [addAdres, setAddAdres] = useState(false)
  const [currentEditingAddressData, setCurrentEditAddressData] = useState(null)
  const {session} = useContext(SharedContext)  
 
  function closeForm() {
    setAddAdres(false)
    setCurrentEditAddressData(null)
  }
  async function refreshAddresses() {
    ofetch(`/api/finalEndPoints/user/${session.data.user.id}`).then((res) => {
      const addresses = res.user.addressData
      setApiData(addresses)
    })
  }
  async function handleCreateAddress({ address, city, district, neighborhood, postalCode, title, isPersonal }) {
    await ofetch('/api/user/address', {
      method: 'POST',
      body: {
        address,
        city,
        district,
        neighborhood,
        postalCode,
        title,
        isPersonal,
      },
    })
    closeForm()
    refreshAddresses()
  }
  async function handleUpdateAddress({ id, address, city, district, neighborhood, postalCode, title, isPersonal }) {
    await ofetch('/api/user/address', {
      method: 'PATCH',
      body: {
        id,
        address,
        city,
        district,
        neighborhood,
        postalCode,
        title,
        isPersonal,
      },
    }).then((res) => {
      console.log(res)
      refreshAddresses()
      closeForm()
    }
    )

  }
  async function deleteAddress(id) {
    await ofetch('/api/user/address', {
      method: 'DELETE',
      query: { id: id },
    })
    refreshAddresses()
  }
  return (
        <>
            {
(addAdres || (currentEditingAddressData !== null )) ?  
          <>
          {        (addAdres
                      ? <ProfilAdressAddComponent 
                      setAddAdres={setAddAdres} 
                      handleAddAdres={handleCreateAddress}
                     />
                      : <ProfilAdressEditComponent 
                      handleUpdateAddress={handleUpdateAddress}  setCurrentEditAddressData={setCurrentEditAddressData} editingAdres={currentEditingAddressData} />)
                  }
          </>
                  : 
                      
                      <>
                      <div className={`flex w-full justify-center items-center`}>
                <button className="bg-button-green rounded-lg px-3 text-white py-2" onClick={() => {setAddAdres(true)}}>Adres Ekle</button>
            </div>
                     { Object.values(apiData).map((item, index) => (
                        <AdressBox key={index} adresData={item} setCurrentEditAddressData={setCurrentEditAddressData} deleteAddress={deleteAddress} />
                      ))}
                      </>

            }
        </>
  )
}
