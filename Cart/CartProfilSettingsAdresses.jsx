import { useContext, useEffect, useRef, useState } from 'react'
import { ofetch } from 'ofetch'
import { getCities } from 'turkey-neighbourhoods'
import AdressBox from '../Profil/AdressBox'
import ProfilAdressAddEditComponent from '../Profil/ProfilAdressAddEditComponent'
import { SharedContext } from '../layout/AgacDataSharer'
import XmarkIcon from '../icons/XmarkIcon'
import ProfilAdressAddComponent from '../Profil/ProfilAdressAddComponent'
import ProfilAdressEditComponent from '../Profil/ProfilAdressEditComponent'

export default function CartProfilSettingsAddresses({ setShowModal,setSelectedAdress,selectedAdress }) {
  const [addAdres, setAddAdres] = useState(false)
  const [currentEditingAddressData, setCurrentEditAddressData] = useState(null)
  const {apiData,setApiData,session} = useContext(SharedContext)
  const [loading, setLoading] = useState(null)
  console.log(selectedAdress);



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
  async function handleCreateAddress({ address, city, district, neighborhood, postalCode, title, isPersonal,sirketUnvan,vergiDairesi,vergiNo }) {
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
        sirketUnvan,
        vergiDairesi,
        vergiNo
      },
    })
    closeForm()
    refreshAddresses()
  }
  async function handleUpdateAddress({ id, address, city, district, neighborhood, postalCode, title, isPersonal,sirketUnvan,vergiDairesi,vergiNo }) {
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
        sirketUnvan,
        vergiDairesi,
        vergiNo
      },
    }).then((res) => {
      console.log(res)
      refreshAddresses()
      closeForm()
    }
    )

  }
  async function deleteAddress(id) {
    if(loading !== null) return
    setLoading(id)
    await ofetch('/api/user/address', {
      method: 'DELETE',
      query: { id: id },
    })
    setLoading(null)
    refreshAddresses()
  }


  return (
        <>
        <div className='w-8  h-8 border border-gray-600 rounded-full absolute top-4 right-4 text-button-red select-none cursor-pointer' onClick={() => {
          setShowModal(false)
        }}>
          <XmarkIcon/>

        </div>
        
              
    
           
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
                      <div className={`flex w-full justify-center items-center mb-2`}>
                <button className="bg-button-green rounded-lg px-3 text-white py-2" onClick={() => {setAddAdres(true)}}>Adres Ekle</button>
            </div>
            <div className='flex flex-col gap-2'>

                     { Object.values(apiData).map((item, index) => (
                      <div className='flex gap-2 items-center' key={index}>
                      <input type='checkbox' name='address'  id='address' className='w-6 h-6 ' checked={selectedAdress.value === item.id} onChange={() => {
                        setSelectedAdress({value:item.id,label:item.title})
                      }
                      } />


                        <AdressBox key={index} adresData={item} loading={loading === item.id} setCurrentEditAddressData={setCurrentEditAddressData} deleteAddress={deleteAddress} />
                        </div>                
                        ))}
            </div>
                      </>

            }
        </>


               
                
            
        </>
  )
}
