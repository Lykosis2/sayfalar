import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { getCities, getDistrictsByCityCode, getNeighbourhoodsByCityCodeAndDistrict } from 'turkey-neighbourhoods'

export default function ProfilAdressAddEditComponent({ setAddAdres, addAdres, setEditAdres, editingAdres, adresDetails, handleUpdateAddress }) {
  console.log(adresDetails, 'adresDetails')

  const [postaKodu, setPostaKodu] = useState(adresDetails?.postaKodu ?? '')
  const [selectedIl, setSelectedIl] = useState(adresDetails?.selectedIl ?? { value: '20', label: 'Denizli' })
  const [selectedIlce, setSelectedIlce] = useState(adresDetails?.selectedIlce ?? { value: '-1', label: 'Seçiniz' })
  const [selectedMahalle, setSelectedMahalle] = useState(adresDetails?.selectedMahalle ?? { value: '-1', label: 'Seçiniz' })

  const [adresType, setAdresType] = useState(adresDetails?.adresType ?? { value: 1, label: 'Bireysel' })
  const [ilceOptions, setIlceOptions] = useState([])
  const [mahalleOptions, setMahalleOptions] = useState([])
  const [allCites, setAllCites] = useState([])
  const [errors, setErrors] = useState({})
  const [adresTitle, setAdresTitle] = useState(adresDetails?.adresTitle ?? '')
  const [adresTarif, setAdresTarif] = useState(adresDetails?.adresTarif ?? '')
  const errorMessageRef = React.useRef(null)

  const validateForm = () => {
    const newErrors = {}

    console.log(selectedIl.value)
    if (adresTitle.replace(/\s/g, '').length < 1)
      newErrors.adresTitle = 'Adres Title is required'

    if (adresType.value === '-1')
      newErrors.adresType = 'Adres Type is required'

    if (selectedIl.value === '-1')
      newErrors.selectedIl = 'Il is required'

    if (selectedIlce.value === '-1')
      newErrors.selectedIlce = 'Ilce is required'

    if (selectedMahalle.value === '-1')
      newErrors.selectedMahalle = 'Mahalle is required'

    console.log(newErrors)

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    if (validateForm()) {
      
      await handleUpdateAddress({
        id: adresDetails?.id ?? null,
        address: adresTarif,
        city: selectedIl.label,
        district: selectedIlce.label,
        neighborhood: selectedMahalle.label,
        postalCode: postaKodu,
        title: adresTitle,
        isPersonal: adresType.value === 1,
      })
        
       
        
        setAddAdres((p) => {
          setEditAdres(false)
          return false
        })
    
     
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
    const tempArray = []
    a.forEach((element, index) => {
      tempArray.push({ value: index, label: element })
    })
    console.log(tempArray)
    setIlceOptions(tempArray)
  }, [selectedIl])
  useEffect(() => {
    console.log(selectedIlce, 'selilce')
    const a = getNeighbourhoodsByCityCodeAndDistrict(selectedIl.value, selectedIlce.label)
    const tempArray = []
    a.forEach((element, index) => {
      tempArray.push({ value: index, label: element })
    })

    console.log(tempArray)

    setMahalleOptions(tempArray)
  }, [selectedIlce])

  // useEffect(() => {
  //   console.log('TRİGGERED')
  //   setSelectedIlce({ value: '-1', label: 'Seçiniz' })
  //   setSelectedMahalle({ value: '-1', label: 'Seçiniz' })
  // }, [selectedIl, ilceOptions])
  // useEffect(() => {
  //   console.log('TRİGGERED')
  //
  //   setSelectedMahalle({ value: '-1', label: 'Seçiniz' })
  // }, [selectedIlce, mahalleOptions])
  // useEffect(() => {
  //   console.log('TRİGGERED')
  // }, [selectedMahalle])

  return (
    <form
      onSubmit={handleSubmit}
    >

      <div>
        <label className='text-center flex justify-center mt-4'>
          Adres Başlığı
        </label>
        <div className='w-full flex justify-center mt-1'>

          <input type="text" onChange={e => setAdresTitle(e.target.value)} defaultValue={adresDetails?.adresTitle ?? null} className="w-48 rounded-xl border-2 border-gray-300 p-2  outline-none focus:border-primary" />
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
          <span className='text-lg text-black w-full flex text-center justify-center font-bold bg-white'>
            Mahalle
          </span>
          <div className='flex w-full h-full items-center justify-center'>

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
          {/* <Select options={
         [
          {"value":"15","label":"BURDUR"},
          {"value":"26","label":"ESKİŞEHİR"},
          {"value":"18","label":"ÇANKIRI"},
          {"value":"80","label":"OSMANİYE"},
          {"value":"41","label":"KOCAELİ"},
          {"value":"27","label":"GAZİANTEP"},
          {"value":"31","label":"HATAY"},
          {"value":"38","label":"KAYSERİ"},
          {"value":"29","label":"GÜMÜŞHANE"},
          {"value":"54","label":"SAKARYA"},
          {"value":"16","label":"BURSA"},
          {"value":"69","label":"BAYBURT"},
          {"value":"17","label":"ÇANAKKALE"},
          {"value":"57","label":"SİNOP"},
          {"value":"74","label":"BARTIN"},
          {"value":"503","label":"MAĞUSA (KIBRIS)"},
          {"value":"33","label":"MERSİN"},
          {"value":"51","label":"NİĞDE"},
          {"value":"42","label":"KONYA"},
          {"value":"60","label":"TOKAT"},
          {"value":"2","label":"ADIYAMAN"},
          {"value":"6","label":"ANKARA"},
          {"value":"66","label":"YOZGAT"},
          {"value":"52","label":"ORDU"},
          {"value":"53","label":"RİZE"},
          {"value":"1","label":"ADANA"},
          {"value":"40","label":"KIRŞEHİR"},
          {"value":"76","label":"IĞDIR"},
          {"value":"45","label":"MANİSA"},
          {"value":"21","label":"DİYARBAKIR"},
          {"value":"64","label":"UŞAK"},
          {"value":"501","label":"LEFKOŞE (KIBRIS)"},
          {"value":"5","label":"AMASYA"},
          {"value":"24","label":"ERZİNCAN"},
          {"value":"32","label":"ISPARTA"},
          {"value":"502","label":"GİRNE (KIBRIS)"},
          {"value":"23","label":"ELAZIĞ"},
          {"value":"78","label":"KARABÜK"},
          {"value":"30","label":"HAKKARİ"},
          {"value":"36","label":"KARS"},
          {"value":"67","label":"ZONGULDAK"},
          {"value":"68","label":"AKSARAY"},
          {"value":"44","label":"MALATYA"},
          {"value":"10","label":"BALIKESİR"},
          {"value":"20","label":"DENİZLİ"},
          {"value":"49","label":"MUŞ"},
          {"value":"73","label":"ŞIRNAK"},
          {"value":"48","label":"MUĞLA"},
          {"value":"59","label":"TEKİRDAĞ"},
          {"value":"39","label":"KIRKLARELİ"},
          {"value":"56","label":"SİİRT"},
          {"value":"28","label":"GİRESUN"},
          {"value":"63","label":"ŞANLIURFA"},
          {"value":"9","label":"AYDIN"},
          {"value":"72","label":"BATMAN"},
          {"value":"13","label":"BİTLİS"},
          {"value":"3","label":"AFYONKARAHİSAR"},
          {"value":"8","label":"ARTVİN"},
          {"value":"4","label":"AĞRI"},
          {"value":"77","label":"YALOVA"},
          {"value":"50","label":"NEVŞEHİR"},
          {"value":"61","label":"TRABZON"},
          {"value":"58","label":"SİVAS"},
          {"value":"7","label":"ANTALYA"},
          {"value":"37","label":"KASTAMONU"},
          {"value":"47","label":"MARDİN"},
          {"value":"46","label":"KAHRAMANMARAŞ"},
          {"value":"25","label":"ERZURUM"},
          {"value":"75","label":"ARDAHAN"},
          {"value":"81","label":"DÜZCE"},
          {"value":"55","label":"SAMSUN"},
          {"value":"19","label":"ÇORUM"},
          {"value":"65","label":"VAN"},
          {"value":"14","label":"BOLU"},
          {"value":"43","label":"KÜTAHYA"},
          {"value":"[46px]","label":"BİLECİK"},
          {"value":"34","label":"İSTANBUL"},
          {"value":"79","label":"KİLİS"},
          {"value":"62","label":"TUNCELİ"},
          {"value":"12","label":"BİNGÖL"},
          {"value":"22","label":"EDİRNE"},
          {"value":"71","label":"KIRIKKALE"},
          {"value":"70","label":"KARAMAN"},
          {"value":"35","label":"İZMİR"}
          ]
        } onChange={e => setSelectedSokak(e)} searchable defaultValue={{"value":"20","label":"DENİZLİ"}} styles={{
  control: (baseStyles, state) => ({
    ...baseStyles,
    'borderColor': 'grey',
    "position":"relative",
    'boxShadow': 'none',
    '&:hover': { borderColor: 'grey' },
    'margin': '0.5rem',
    'borderRadius': '0.5rem',
    'paddingTop': '0.25rem',
    'paddingBottom': '0.25rem',
    'marginLeft': '1rem',
    'marginRight': '1rem',
    "width":"10rem"
  }),
  menu: (baseStyles, state) => ({
    ...baseStyles,
    top: "50px",
    borderRadius: '0.5rem',
    margin: '0.5rem',
    borderRadius: '0.5rem',
    paddingTop: '0.25rem',
    paddingBottom: '0.25rem',
    marginLeft: '1.5rem',
    width: 'calc(100% - 3rem)',
    zIndex:"1000"
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
/> */}
        </div>
        <div className='w-full h-full flex flex-col'>
            <span className='text-lg text-black w-full flex text-center justify-center font-bold bg-white'>
              Posta Kodu
            </span>
<div className='flex w-full h-full items-center justify-center'>

            <input type='text' className="w-40 mt-2 h-[46px] border border-gray-500 rounded-lg px-2" onChange={e => setPostaKodu(e.target.value)} defaultValue={postaKodu} />
</div>

        </div>

        <div className="w-full h-full flex flex-col">
          <span className='text-lg text-black w-full flex text-center justify-center font-bold bg-white '>
            Adres Tipi
          </span>
          <div className='flex w-full h-full items-center justify-center'>

          <Select options={
            [
              { value: 1, label: 'Bireysel' },
              { value: 2, label: 'Kurumsal' },
            ]
          } onChange={e => setAdresType(e)} searchable defaultValue={adresDetails?.adresType ?? { value: 1, label: 'Bireysel' }} styles={{
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

      </div>

      <textarea name="" id="" cols="30" rows="10" placeholder="Açıklama bina ve daire no'larınızı buraya ekleyiniz" className=' inline-flex w-[95%] h-[30%] m-auto rounded-xl border border-black shadow-sm shadow-gray-400 resize-none mt-4 p-1 -z-50' defaultValue={adresTarif} onChange={e => setAdresTarif(e.target.value)}></textarea>
      <div className='w-full h-[7.5%] -translate-x-8 translate-y-2 flex items-center justify-end gap-4'>
        <span className=' text-button-red font-bold hidden' ref={errorMessageRef}>
          Lütfen zorunlu alanları doldurunuz
        </span>

      <button type='submit' className='w-24 h-8 rounded-full bg-green-500  hover:bg-button-green text-white'>
          Kaydet
        </button>
        <button type='button' onClick={() => {
          setAddAdres((p) => {
            setEditAdres(false)
            console.log(editingAdres)
            editingAdres.current = null
            setAddAdres(false)
            return false
          })
        }
        } className='w-24 h-8 rounded-full bg-button-red  hover:bg-red-400 text-white'>
          İptal
        </button>

      </div>
    </form>
  )
}
