import React, { useEffect, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'
import Select from 'react-select'
import { getCities, getDistrictsByCityCode, getNeighbourhoodsByCityCodeAndDistrict } from
  'turkey-neighbourhoods'

function AddAdressComponent() {
  // When Adres ekle kısmınna bir adres eklendiğinde sonrasında çıkıldığında ve tekrar adres ekleye tıklandığında boş adres dahil ekleniyor
  // Change default values to states default values by states
  // Clear the interval somehow
  const [selectedIl, setSelectedIl] = useState({ value: '20', label: 'Denizli' })
  const [selectedIlce, setSelectedIlce] = useState({ value: '-1', label: 'Seçiniz' })
  const [selectedMahalle, setSelectedMahalle] = useState({ value: '-1', label: 'Seçiniz' })
  const [selectedSokak, setSelectedSokak] = useState('')
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [phone, setPhone] = useState('')
  const [adresType, setAdresType] = useState('')
  const [ilceOptions, setIlceOptions] = useState([])
  const [mahalleOptions, setMahalleOptions] = useState([])
  const [allCites, setAllCites] = useState([])
  const [errors, setErrors] = useState({})
  const [adresTitle, setAdresTitle] = useState('')
  const errorMessageRef = React.useRef(null)

  const validateForm = () => {
    const newErrors = {}

    console.log(selectedIl.value)
    if (adresTitle.replace(/\s/g, '').length < 1)
      newErrors.adresTitle = 'Adres Title is required'

    if (name.replace(/\s/g, '').length < 2)
      newErrors.name = 'Name is required'

    if (surname.replace(/\s/g, '').length < 1)
      newErrors.surname = 'Surname is required'

    if (phone.replace(/\s/g, '').length < 10)
      newErrors.phone = 'Phone is required'

    if (adresType.value === '-1')
      newErrors.adresType = 'Adres Type is required'

    if (selectedIl.value === '-1')
      newErrors.selectedIl = 'Il is required'

    if (selectedIlce.value === '-1')
      newErrors.selectedIlce = 'Ilce is required'

    if (selectedMahalle.value === '-1')
      newErrors.selectedMahalle = 'Mahalle is required'

    console.log(selectedSokak)
    if (selectedSokak.replace(/\s/g, '').length < 1)
      newErrors.selectedSokak = 'Sokak is required'

    console.log(newErrors)

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      console.log('validated')
      setSelectedIl({ value: '20', label: 'Denizli' })
      setSelectedIlce({ value: '-1', label: 'Seçiniz' })
      setSelectedMahalle({ value: '-1', label: 'Seçiniz' })
      setSelectedSokak('')
      setName('')
      setSurname('')
      setPhone('')
      setAdresType('')
      setOpen(false)
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
    console.log(selectedIlce)
    const a = getNeighbourhoodsByCityCodeAndDistrict(selectedIl.value, selectedIlce.label)
    const tempArray = []
    a.forEach((element, index) => {
      tempArray.push({ value: index, label: element })
    })

    setMahalleOptions(tempArray)
  }, [selectedIlce])

  const [open, setOpen] = React.useState(false)

  return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
          <button className='min-w-[7rem] h-12 rounded-full bg-button-green '>
            <span className='text-white'>
                Adres Ekle
            </span>

            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="" />
            <Dialog.Content className="bg-white rounded-3xl shadow-sm border-2 shadow-gray-600 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-[37.5%] w-[90vh] max-w-[800px] h-[670px]  animateAdress focus:outline-none z-[99] " >
              <Dialog.Title className="m-0 text-3xl text-primary text-center mt-8 font-bold">Adres Ekle</Dialog.Title>
              <form
              onSubmit={handleSubmit}
              >

              <div>
                  <label className='text-center flex justify-center mt-4'>
                      Adres Başlığı
                  </label>
                  <div className='w-full flex justify-center mt-1'>

                  <input type="text" onChange={e => setAdresTitle(e.target.value)} className="w-48 rounded-xl border-2 border-gray-300 p-2  outline-none focus:border-primary" />
                  </div>
              </div>
              <div className='w-full h-[35%] flex mt-4 z-50'>

                <div className="w-full h-full flex flex-col">
                  <span className='text-lg text-black w-full flex text-center justify-center font-bold bg-white'>
                    İl
                  </span>
                <Select options={
                  allCites
                  }
                  onChange={(e) => {
                    setSelectedIl(JSON.parse(JSON.stringify(e)))
                    console.log(e)
                  }}
                   searchable defaultValue={{ value: '20', label: 'Denizli' }} styles={{
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
        <span className='text-lg text-black w-full flex text-center justify-center font-bold bg-white'>
                    İlçe
                  </span>
        <Select options={
                   ilceOptions
                  } onChange={e => setSelectedIlce(e)} searchable defaultValue={{ value: '-1', label: 'Seçiniz' }} styles={{
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

                <div className="w-full h-full flex flex-col border-r border-black ">
                <span className='text-lg text-black w-full flex text-center justify-center font-bold bg-white'>
                    Mahalle
                  </span>
                <Select options={
                  mahalleOptions
                  } onChange={e => setSelectedMahalle(e)} searchable defaultValue={{ value: '-1', label: 'Seçiniz' }} styles={{
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
        <span className='text-lg text-black w-full flex text-center justify-center font-bold bg-white'>
                    Sokak
                  </span>
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
          <input type='text' className="w-40 mt-2 h-[46px] ml-4 p-1 border border-gray-500 rounded-lg" onChange={e => setSelectedSokak(e.target.value)} />

                </div>
                <div className="w-full h-full flex flex-col">
                <span className='text-lg text-black w-full flex text-center justify-center font-bold bg-white'>
                    İsim
                  </span>

       <input type='text' className="w-40 mt-2 h-[46px] ml-5 border border-gray-500 rounded-lg" onChange={e => setName(e.target.value)} />
                <span className='text-lg text-black w-full flex text-center justify-center font-bold bg-white mt-[9px]'>
                    Telefon
                  </span>

                  <input type="tel" className="w-40 mt-2 h-[46px] ml-5 border border-gray-500 rounded-lg" onChange={e => setPhone(e.target.value)}/>

                </div>
                <div className="w-full h-full flex flex-col">
                <span className='text-lg text-black w-full flex text-center justify-center font-bold bg-white'>
                    Soyisim
                  </span>

       <input type='text' className="w-40 mt-2 h-[46px] ml-5 border border-gray-500 rounded-lg" onChange={e => setSurname(e.target.value)} />
                <span className='text-lg text-black w-full flex text-center justify-center font-bold bg-white mt-[9px]'>
                    Adres Tipi
                  </span>

                  <Select options={
                   [
                     { value: 1, label: 'Bireysel' },
                     { value: 2, label: 'Kurumsal' },
                   ]
                  } onChange={e => setAdresType(e)} searchable defaultValue={{ value: 1, label: 'Bireysel' }} styles={{
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

              <textarea name="" id="" cols="30" rows="10" placeholder='Açıklama' className='flex w-[95%] h-[30%] m-auto rounded-xl border border-black shadow-sm shadow-gray-400 resize-none mt-4 p-1 first-letter:' />
              <div className='w-full h-[7.5%] -translate-x-8 translate-y-2 flex items-center justify-end gap-4'>
              <span className=' text-button-red font-bold hidden' ref={errorMessageRef}>
                Lütfen zorunlu alanları doldurunuz
              </span>

              <button type='submit' className='w-24 h-8 rounded-full bg-green-500  hover:bg-button-green text-white'>
                Kaydet
              </button>

             <Dialog.Close asChild>
              <button className='w-24 h-8 rounded-full bg-red-400  hover:bg-button-red text-white'>
                İptal
              </button>

             </Dialog.Close>
              </div>
              </form>

              <Dialog.Close asChild>
                <button className="IconButton" aria-label="Close">
                  <Cross2Icon />
                </button>
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
  )
}

export default AddAdressComponent
