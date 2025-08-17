import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { getCities, getDistrictsByCityCode, getNeighbourhoodsByCityCodeAndDistrict } from 'turkey-neighbourhoods'

export default function ProfilAdressEditComponent({ 
  editingAdres, 
  setCurrentEditAddressData,
  handleUpdateAddress }) {
    console.log(editingAdres);

  const [postaKodu, setPostaKodu] = useState(editingAdres?.postalCode ?? '')
  const [selectedIl, setSelectedIl] = useState({value:getIlValue(editingAdres?.city),label:editingAdres?.city }?? { value: -1, label: 'Seçiniz' })
  console.log(selectedIl);
  const [selectedIlce, setSelectedIlce] = useState({value:0,label:editingAdres?.district} ?? { value: -1, label: 'Seçiniz' })
  const [selectedMahalle, setSelectedMahalle] = useState({value:0,label:editingAdres?.neighborhood} ?? { value: -1, label: 'Seçiniz' })
  const [adresType, setAdresType] = useState(editingAdres?.isPersonal ? { value: 1, label: 'Bireysel' } : { value: 2, label: 'Kurumsal' })
  const [ilceOptions, setIlceOptions] = useState([])
  const [mahalleOptions, setMahalleOptions] = useState([])
  const [allCites, setAllCites] = useState([])
  const [errors, setErrors] = useState({})
  const [adresTitle, setAdresTitle] = useState(editingAdres?.title ?? '')
  const [adresTarif, setAdresTarif] = useState(editingAdres?.address ?? '')
  const[ sirketUnvan ,setSirketUnvan] = useState(editingAdres?.sirketUnvan ?? '')
  const [vergiNo,setVergiNo] = useState(editingAdres?.vergiNo ?? '')
  const [ vergiDairesi , setVergiDairesi] = useState(editingAdres?.vergiDairesi ?? '')
  const [loading,setLoading] = useState(false)
  const errorMessageRef = React.useRef(null)

  const validateForm = () => {
    const newErrors = {}
    console.log(newErrors);

    console.log(selectedIl.value)
    if (adresTitle.replace(/\s/g, '').length < 1)
      newErrors.adresTitle = 'Adres Title is required'

    if (adresType.value === -1)
      newErrors.adresType = 'Adres Type is required'

    if (selectedIl.value === -1)
      newErrors.selectedIl = 'Il is required'

      console.log(selectedIlce);
    if (selectedIlce.value === -1)
      newErrors.selectedIlce = 'Ilce is required'

    if (selectedMahalle.value === -1)
      newErrors.selectedMahalle = 'Mahalle is required'

    if (adresTarif.replace(/\s/g, '').length < 1)
      newErrors.adresTarif = 'Adres Tarif is required'

    if (postaKodu.replace(/\s/g, '').length < 1)
      newErrors.postaKodu = 'Posta Kodu is required'

    if (adresType.value === 2) {
      if (sirketUnvan.replace(/\s/g, '').length < 1)
        newErrors.sirketUnvan = 'Şirket Ünvanı is required'

      if (vergiNo.replace(/\s/g, '').length < 1)
        newErrors.vergiNo = 'Vergi No is required'

      if (vergiDairesi.replace(/\s/g, '').length < 1)
        newErrors.vergiDairesi = 'Vergi Dairesi is required'
    }

    console.log(newErrors)

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    if (validateForm() && !loading) {
      setLoading(true)
      console.log(sirketUnvan,vergiNo,vergiDairesi);
      if(adresType.value === 1) {
        await handleUpdateAddress({
          id: editingAdres?.id ?? null,
          address: adresTarif,
          city: selectedIl.label,
          district: selectedIlce.label,
          neighborhood: selectedMahalle.label,
          postalCode: postaKodu,
          title: adresTitle,
          isPersonal: true
        })
    }
    else if (adresType.value === 2) {
      await handleUpdateAddress({
        id: editingAdres?.id ?? null,
        address: adresTarif,
        city: selectedIl.label,
        district: selectedIlce.label,
        neighborhood: selectedMahalle.label,
        postalCode: postaKodu,
        title: adresTitle,
        isPersonal: false,
        sirketUnvan,
        vergiDairesi,
        vergiNo
      })
    }
      setLoading(false)
      setCurrentEditAddressData(null)
    }
    else {
      if (errorMessageRef.current) {
        errorMessageRef.current.style.display = 'block' // Show the error message
        errorMessageRef.current.classList.add('shake-animation-error-message-of-adress-component') // Apply the shake animation

        const interval = setTimeout(() => {
          if (errorMessageRef.current) {
            errorMessageRef.current.style.display = 'none'
            // Hide the error message after 5 seconds
            errorMessageRef.current.classList.remove('shake-animation-error-message-of-adress-component')
          }
        }, 5000)
      }
    }
  }
  function getIlValue(il) {
    const a = getCities()
    const b = a.find((element) => element.name === il)
    return b.code
  }

  // Change to useMemo
  useEffect(() => {
    const tempArray = []
    const a = getCities()
    a.forEach((element) => {
      tempArray.push({ value: element.code, label: element.name })
    })
    setAllCites(tempArray)
  }, [])

  useEffect(() => {
    const a = getDistrictsByCityCode(selectedIl.value)
    console.log(a);
    const tempArray = []
    a.forEach((element, index) => {
      tempArray.push({ value: index, label: element })
    })
    console.log(tempArray)
    setIlceOptions((e)=>{
      if(e.length > 0) setSelectedIlce({ value: -1, label: 'Seçiniz' })
      return tempArray
    }
    )
  }, [selectedIl])
  
  useEffect(() => {
    console.log(selectedIlce, 'selilce')
    const a = getNeighbourhoodsByCityCodeAndDistrict(selectedIl.value, selectedIlce.label)
    const tempArray = []
    a.forEach((element, index) => {
      tempArray.push({ value: index, label: element })
    })

    console.log(tempArray)

    setMahalleOptions((e)=>{
      if(e.length > 0) setSelectedMahalle({ value: -1, label: 'Seçiniz' })
      return tempArray
    })
  }, [selectedIlce])


  return (
    <form
      onSubmit={handleSubmit}
    >

<div>
        <label className='text-center flex justify-center mt-4'>
          Adres Başlığı
        </label>
        <div className='w-full flex justify-center mt-1'>

          <input type="text" onChange={e => setAdresTitle(e.target.value)} defaultValue={adresTitle} className="w-48 rounded-xl border-2 border-gray-300 p-2  outline-none focus:border-primary" />
        </div>
      </div>
      <div className='w-full md:h-[35%] flex mt-4 z-50 h-[75%] md:flex-row flex-col '>

        <div className="w-full h-full flex flex-col">
          <span className='text-lg text-black w-full flex text-center justify-center font-bold bg-white'>
            İl
          </span>
          <div className='flex w-full h-full items-center justify-center'>

          <Select options={
            allCites
          }
            onChange={(e) => {
              setSelectedIl(JSON.parse(JSON.stringify(e)))
              console.log(e)
            }}
            value={selectedIl}
            searchable defaultValue={selectedIl} styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                'borderColor': 'grey',
                'position': 'relative',
                'boxShadow': 'none',
                '&:hover': { borderColor: 'grey' },
                'margin': '0.5rem',
                'borderRadius': '0.5rem',
                'paddingTop': '0.25rem',
                'paddingBottom': '0.25rem',
                'marginLeft': '1rem',
                'marginRight': '1rem',
                'width': '10rem',
              }),
              menu: (baseStyles, state) => ({
                ...baseStyles,
                top: '50px',
                borderRadius: '0.5rem',
                margin: '0.5rem',
                paddingTop: '0.25rem',
                paddingBottom: '0.25rem',
                marginLeft: '1.5rem',
                width: 'calc(100% - 3rem)',
                zIndex: '1000',
              }),

            }}
            components={{
              IndicatorSeparator: () => null,
            }}
            placeholder={
              <div>
                Seçiniz
              </div>
            }
          />
          </div>
          <span className='text-lg text-black w-full flex text-center justify-center font-bold bg-white'>
            İlçe
          </span>
          <div className='flex w-full h-full items-center justify-center'>

          <Select options={
            ilceOptions
          } onChange={e => setSelectedIlce(e)} value={selectedIlce} searchable defaultValue={selectedIlce} styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              'borderColor': 'grey',
              'position': 'relative',
              'boxShadow': 'none',
              '&:hover': { borderColor: 'grey' },
              'margin': '0.5rem',
              'borderRadius': '0.5rem',
              'paddingTop': '0.25rem',
              'paddingBottom': '0.25rem',
              'marginLeft': '1rem',
              'marginRight': '1rem',
              'width': '10rem',
            }),
            menu: (baseStyles, state) => ({
              ...baseStyles,
              top: '50px',
              borderRadius: '0.5rem',
              margin: '0.5rem',
              paddingTop: '0.25rem',
              paddingBottom: '0.25rem',
              marginLeft: '1.5rem',
              width: 'calc(100% - 3rem)',
              zIndex: '1000',
            }),

          }}
            components={{
              IndicatorSeparator: () => null,
            }}
            placeholder={
              <div>
                Seçiniz
              </div>
            }
          />
</div>
        </div>

        <div className="w-full h-full flex flex-col md:border-r border-black ">
          <div className='flex w-full h-full items-center justify-center flex-col'>
          <span className='text-lg text-black w-full flex text-center justify-center font-bold bg-white'>
            Mahalle
          </span>

          <Select options={
            mahalleOptions
          } value={selectedMahalle} onChange={e => setSelectedMahalle(e)} searchable defaultValue={selectedMahalle} styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              'borderColor': 'grey',
              'position': 'relative',
              'boxShadow': 'none',
              '&:hover': { borderColor: 'grey' },
              'margin': '0.5rem',
              'borderRadius': '0.5rem',
              'paddingTop': '0.25rem',
              'paddingBottom': '0.25rem',
              'marginLeft': '1rem',
              'marginRight': '1rem',
              'width': '10rem',
            }),
            menu: (baseStyles, state) => ({
              ...baseStyles,
              top: '50px',
              borderRadius: '0.5rem',
              margin: '0.5rem',
              paddingTop: '0.25rem',
              paddingBottom: '0.25rem',
              marginLeft: '1.5rem',
              width: 'calc(100% - 3rem)',
              zIndex: '1000',
            }),

          }}
            components={{
              IndicatorSeparator: () => null,
            }}
            placeholder={
              <div>
                Seçiniz
              </div>
            }
          />
          </div>
          <div className='flex w-full h-full items-center justify-center flex-col'>
            <span className='text-lg text-black w-full flex text-center justify-center font-bold bg-white'>
              Posta Kodu
            </span>

            <input type='text' className="w-40 mt-2 h-[46px] border border-gray-500 rounded-lg px-2" onChange={e => setPostaKodu(e.target.value)} defaultValue={postaKodu}/>
</div>

        </div>
       

        <div className="w-full h-full flex flex-col flex-grow">
          <div className='flex w-full h-full items-center justify-center flex-col'>
          <span className='text-lg text-black w-full flex text-center justify-center font-bold bg-white '>
            Adres Tipi
          </span>

          <Select options={
            [
              { value: 1, label: 'Bireysel' },
              { value: 2, label: 'Kurumsal' },
            ]
          } onChange={e => setAdresType(e)} searchable value={adresType} defaultValue={adresType} styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              'borderColor': 'grey',
              'position': 'relative',
              'boxShadow': 'none',
              '&:hover': { borderColor: 'grey' },
              'margin': '0.5rem',
              'borderRadius': '0.5rem',
              'paddingTop': '0.25rem',
              'paddingBottom': '0.25rem',
              'marginLeft': '1rem',
              'marginRight': '1rem',
              'width': '10rem',
            }),
            menu: (baseStyles, state) => ({
              ...baseStyles,
              top: '50px',
              borderRadius: '0.5rem',
              margin: '0.5rem',
              paddingTop: '0.25rem',
              paddingBottom: '0.25rem',
              marginLeft: '1.5rem',
              width: 'calc(100% - 3rem)',
              zIndex: '1000',
            }),

          }}
            components={{
              IndicatorSeparator: () => null,
            }}
            placeholder={
              <div>
                Seçiniz
              </div>
            }
          />
          </div>
          <div className={`flex w-full h-full items-center justify-center flex-col ${adresType?.value === 2 ? "" : "hidden"}`}>
            <span className='text-lg text-black w-full flex text-center justify-center font-bold bg-white'>
              Şirket Ünvanı
            </span>

            <input type='text' className="w-40 mt-2 h-[46px] border border-gray-500 rounded-lg px-2" onChange={e => setSirketUnvan(e.target.value)} defaultValue={sirketUnvan} />
</div>


        </div>
        <div className={`w-full h-full flex flex-col flex-grow ${adresType?.value === 2 ? "hidden": ""}`}>
          <div className='flex w-full h-full items-center justify-center flex-col'>
          <div className='w-40'>
          </div>
          </div>
        </div>
        <div className={`w-full h-full flex flex-col flex-grow ${adresType?.value === 2 ? "": "hidden"}`}>
        <div className={`flex w-full h-full items-center justify-center flex-col ${adresType?.value === 2 ? "" : "hidden"}`}>
            <span className='text-lg text-black w-full flex text-center justify-center font-bold bg-white'>
              Vergi No
            </span>

            <input type='text' className="w-40 mt-2 h-[46px] border border-gray-500 rounded-lg px-2" onChange={e => setVergiNo(e.target.value)} defaultValue={vergiNo} value={vergiNo} />
</div>
<div className={`flex w-full h-full items-center justify-center flex-col ${adresType?.value === 2 ? "" : "hidden"}`}>
            <span className='text-lg text-black w-full flex text-center justify-center font-bold bg-white'>
              Vergi Dairesi
            </span>

            <input type='text' className="w-40 mt-2 h-[46px] border border-gray-500 rounded-lg px-2" onChange={e => setVergiDairesi(e.target.value)} defaultValue={vergiDairesi} value={vergiDairesi} />
</div>

        </div>
       
        

      </div>

      <textarea name="" id="" cols="30" rows="10" placeholder="Açıklama bina ve daire no'larınızı buraya ekleyiniz" className=' inline-flex w-[95%] h-[30%] m-auto rounded-xl border border-black shadow-sm shadow-gray-400 resize-none mt-4 p-1 -z-50' defaultValue={adresTarif} onChange={e => setAdresTarif(e.target.value)}></textarea>
      <div className='w-full h-[7.5%] -translate-x-8 translate-y-2 flex items-center justify-end gap-4'>
        <span className=' text-button-red font-bold hidden' ref={errorMessageRef}>
          Lütfen zorunlu alanları doldurunuz
        </span>

      <button type='submit' className='w-24 h-8 rounded-full bg-green-500  hover:bg-button-green text-white' disabled={loading}>
          {
            loading ? "Yükleniyor..." : "Kaydet"
          }
        </button>
        <button type='button' onClick={() => {
          setCurrentEditAddressData(null)
        }
        } className='w-24 h-8 rounded-full bg-button-red  hover:bg-red-400 text-white'>
          İptal
        </button>

      </div>
    </form>
  )
}
