import React, { useContext, useEffect, useRef,  useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Select from 'react-select'
import { useRouter } from 'next/router'
import { ofetch } from 'ofetch'
import { SharedContext } from '../layout/AgacDataSharer'
import NewAddAdressComponent from './NewAddAdressComponent'
import { CartContext } from './CartContextProvider'
import Layout from '../layout/NavbarandProviderLayout'
import duplicateArrayToJson from '@/lib/duplicateArrayToJson'
import CreditCardCartComponent from './CreditCardCartComponent'
import { TrashIcon } from '@radix-ui/react-icons'
import { signOut } from 'next-auth/react'

export default function CartComponent() {
  const { addToCart, removeFromCart, cartProducts, removeAllFromCart,setLockCart } = useContext(CartContext)
  const [userShowState, setUserShowState] = useState({})
  const [total, setTotal] = useState(0)
  const [totalPoint, setTotalPoint] = useState(0)
  const { apiData,products,session } = useContext(SharedContext)
  const [allProducs, setAllProducts] = useState(()=>{
   
  })
  console.log(allProducs);
  const [loadingOdeme, setLoadingOdeme] = useState(false)
  // TODO
  const [selectedCard, setSelectedCard] = useState({
    cardNo: "",
    cardUserName: "",
    cardEndDate: "",
    cardCvc: "",
  })
  // TODO
  const [selectedAdress, setSelectedAdress] = useState({})
  const [changedSponsors, setChangedSponsors] = useState('')
  const [iban, setIban] = useState('')
  const [showModal, setShowModel] = useState(false)

  const router = useRouter()
  const uyeOlRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (uyeOlRef.current && !uyeOlRef.current.contains(event.target)) {
        setShowModel(false);
        setLockCart(false)

      }
    };

    // Add when the component mounts
    window.addEventListener('mousedown', handleClickOutside);

    // Return function to be called when it unmounts
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [uyeOlRef]);

  useEffect(() => {
    let temp = {}
    console.log(products);
    Object.values(products).forEach((value,index)=>{
      temp[value.id] = value
    })
    console.log(temp);
    setAllProducts(temp)
  }, [products])



  

  useEffect(() => {
    const showState = duplicateArrayToJson(cartProducts)
    console.log(JSON.parse(showState))
    setUserShowState(JSON.parse(showState))
  }, [cartProducts])

  useEffect(() => {
    let total = 0
    let totalPoint = 0
    if (!allProducs)
      return
    Object.keys(userShowState).forEach((value, index) => {
      if (!allProducs[value])
        return
      total += allProducs[value].price * userShowState[value]
      totalPoint += allProducs[value].price/13 * userShowState[value]
    },
    )
    setTotal(Math.ceil(total * 100) / 100)
    setTotalPoint(Math.ceil(totalPoint * 100) / 100)
  }, [userShowState, allProducs])

  useEffect(() => {
    if (!apiData)
      return
    if (Object.keys(apiData).length <= 0)
      return
    console.log(apiData)
    setSelectedAdress({ value: Object.keys(apiData)?.[0], label: Object.values(apiData)?.[0]?.title })
  }, [apiData])

  return (
    <Layout>

      <div className='lg:h-[750px]  xl:mx-16 flex justify-center min-w-[250px] mt-4 min-h-0 overflow-auto max-w-full box-border  lg:flex-row flex-col lg:gap-0 gap-4'>

        <div className='w-full lg:w-[75%] flex justify-center items-center'>
          <div className='w-[calc(100%-1rem)] h-[calc(100%-1rem)] border border-gray-800 shadow-sm shadow-gray-700 overflow-y-auto  customScroller rounded-xl flex items-center justify-start flex-col py-4 lg:px-8 px-2'>
            {
              // TODO : OPTIMIZE THIS PART
            }
            {
              userShowState
              && Object.keys(userShowState).map((value, index) => {
                if (!allProducs[value])
                  return

                return (
                  <div key={index} className='w-[calc(100%-2rem)] min-h-[12rem] lg:mx-4 rounded-2xl border my-4 shadow-sm shadow-gray-700 border-gray-500 min-w-0 flex items-center justify-center'>
                    <div className='h-full w-full flex items-center lg:ml-12 ml-2 justify-center '>
                      <Link href={`/products/${value}`} className='lg:w-60 lg:h-36 w-24 h-36 border border-gray-500 shadow-sm shadow-gray-400 rounded-xl bg-white flex items-center justify-center' >

                        <Image
                          src={`${process.env.NEXT_PUBLIC_CDN_URL}/products/${allProducs[value].id}`}
                          width={200}
                          height={100}
                          alt=""
                          className='lg:w-60 lg:h-36 w-24 h-28 rounded-2xl object-contain mix-blend-normal min-w-[140px] min-h-[100px] py-2'
                        >

                        </Image>
                      </Link>

                      <div className='flex w-full h-full flex-col'>
                        <div className='w-[calc(100%-2rem)] h-1/2 flex items-center lg:ml-8 ml-2 lg:gap-10'>
                          <Link href={`/products/${value}`} className='lg:text-lg md:text-sm text-xs  w-full flex flex-wrap justify-center font-semibold select-none cursor-pointer'>
                            {
                              allProducs[value].name
                            }
                          </Link>

                          <div className='w-full h-full flex justify-center items-center font-medium'>
                            <span className='text-xl'>
                              Fiyat
                            </span>

                          </div>
                          <div className='w-full h-full flex justify-center items-center font-bold'>

                            <Link href={`/products/${value}`} className='  lg:w-40 w-16 h-12 flex rounded-full border border-gray-500 shadow-sm shadow-gray-400 bg-button-green cursor-pointer' >
                              <span className=' w-full h-full lg:text-lg text-base select-none  flex justify-center items-center text-white text-center'>
                                İncele
                              </span>

                            </Link>

                          </div>

                        </div>
                        <div className='w-[calc(100%-2rem)] h-1/2 flex items-center lg:ml-8 ml-2 lg:gap-10 '>
                          <div className='w-full h-full flex justify-center mt-4 '>

                            <div className=' lg:w-40 w-16 h-10 bg-custom-gray rounded-full justify-between flex'>
                              <button className='w-10 h-10 rounded-full bg-primary flex justify-center items-center' onClick={() => {
                                removeFromCart(Number.parseInt(value))
                              }}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                  <path fillRule="evenodd" d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z" clipRule="evenodd" color='white' />
                                </svg>

                              </button>
                              <span className='flex w-12 h-full justify-center items-center'>
                                {
                                  userShowState[value]
                                }
                              </span>
                              <button className='w-10 h-10 rounded-full bg-primary flex justify-center items-center' onClick={() => {
                                addToCart(Number.parseInt(value), 1)
                              }}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                  <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" color='white' />
                                </svg>

                              </button>

                            </div>

                          </div>
                          <div className='w-full h-full justify-center '>

                            <span className='w-full justify-center flex mt-3 font-medium text-lg'>
                              {
                                allProducs && (allProducs !== undefined && allProducs !== null && allProducs[value] !== undefined) ? Math.ceil(allProducs[value].price * userShowState[value] * 100) / 100 : '0'
                              } TL
                            </span>
                          </div>
                          <div className='w-full h-full flex justify-center mt-4 font-bold '>

                            <div onClick={() => removeAllFromCart(Number.parseInt(value))} className='lg:w-40 w-16 h-12 rounded-full border border-gray-500 shadow-sm shadow-gray-400 bg-custom-button-red cursor-pointer' >
                              <span className='w-full h-full lg:text-lg text-sm select-none  flex justify-center items-center text-white'>
                                Kaldır
                              </span>

                            </div>

                          </div>

                        </div>

                      </div>

                    </div>

                  </div>
                )
              })

            }

          </div>
        </div>

        <dialog ref={uyeOlRef} className={`lg:w-[400px] w-[300px] bg-white flex-col ${showModal ? 'flex ' : 'hidden'}`}>
          <form onSubmit={async (e) => {
            e.preventDefault()
            setLoadingOdeme(true)
            // Validate then close the modal then send the request
            // TODO: Maybe an alert on validation error?

            if (!iban){
              setShowModel(false)
              setLoadingOdeme(false)
              setLockCart(false)
              return alert('Iban boş olamaz')
            }

            if (!session){
              setLoadingOdeme(false)
              setLockCart(false)
              return
            }
            if (!allProducs){
              setLoadingOdeme(false)
              setLockCart(false)
              return
            }
            console.log(session)
            const postData = await ofetch('/api/user/address')
            let realAdress = {}
            await Promise.all(
              Object.values(postData).map((e) => {
                if (e.title === selectedAdress.label)
                  realAdress = e
              }),
            )
            console.log(realAdress)
            console.log(userShowState,"usershowstate")
            const res = await fetch('/api/payment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                products: Object.keys(userShowState).map(key => ({ id: Number.parseInt(key), count: userShowState[key] })),
                paymentMethod: 'akpos',
                addressID: selectedAdress.value,
                cardNo: selectedCard.cardNo,
                cardUserName: selectedCard.cardUserName,
                cardEndDate: selectedCard.cardEndDate,
                cardCvc: selectedCard.cardCvc,
                sponsorChangeId: changedSponsors, // optional
                iban, // special === 1 varsa required
                computedLastPrice: total,
                identityNumber: session.data.user.tcNumber.toString(),
              },
              ),
            }).then(res =>{
              if(res.status !== 200){
                setLoadingOdeme(false)
                setLockCart(false)

                return
              }
              return res.json()
            }).then(res => {
            if(!res) {
              return
            }
            setLoadingOdeme(false)
            setLockCart(false)
            router.push({
              pathname: '/validateCard',
              query: { htmlContent: encodeURIComponent(res.htmlContent) },
            })
          }
            )
          }}>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Ödeme Bilgileri</h2>
    
    <div className="mb-3">
      <label htmlFor="changedSponsors" className="block text-sm font-medium text-gray-700">Değişecek Sponsor</label>
      <input type="text" onChange={e => setChangedSponsors(e.target.value)} id="changedSponsors" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
    </div>

    <div className="mb-4">
      <label htmlFor="iban" className="block text-sm font-medium text-gray-700">Iban</label>
      <input type="text" onChange={e => setIban(e.target.value)} id="iban" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
    </div>

    <span>
      Not:Eğer şirketseniz gereken belgelerinizi info@lykosis.com'a gönderiniz.
    </span>

    <button type="submit" className="inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">Ödemeyi Tamamla</button>

          </form>
        </dialog>

        <div className=' w-full lg:w-[25%] min-w-[350px] flex justify-center items-center'>

          <div className='w-[calc(100%-1rem)] h-[calc(100%-1rem)] border border-gray-800 shadow-sm shadow-gray-700  rounded-xl '>

            <div className=' px-4 pt-8 pb-4 h-full w-full flex flex-col' >
              <span className='w-full justify-center flex font-bold text-2xl'>
                Ödeme Bilgileri

              </span>
              <span className='w-full flex font-bold text-xl mt-8'>
                Genel Bilgiler
              </span>
              <span className='mt-2'>
                Toplam Ürün Sayısı: {cartProducts.length}

              </span>

              <span className='mt-2'>
                Kazanılan Puan : {
                  totalPoint || '0 point'
                }
              </span>
              
              <span className='mt-4'>
              </span>
              <span className='mt-2 text-xl font-bold'>
                Toplam Tutar: {total} TL
              </span>

              <div className='w-full h-full flex justify-start mt-12 font-bold flex-col '>
                <span className='text-xl'>
                  Teslimat Bilgiler
                </span>
                <div className='flex w-full justify-evenly items-center'>

                  <label className=' text-base font-medium whitespace-nowrap flex h-full items-center mt-1' >
                    Adres
                  </label>
                  {
                    apiData

                  && <Select options={
                    Object.values(apiData).map((value, index) =>{return { value: value.id, label: value.title }})
                  } onChange={(e) => {
                    console.log(e)
                    setSelectedAdress(e)
                  }}
                  defaultValue={{ value: 1, label: selectedAdress?.label || 'Adres Seçiniz' }}
                  value={{ value: selectedAdress?.value , label: selectedAdress?.label }}
                  styles={{
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
                      top: 0,
                      borderRadius: '0.5rem',
                      margin: '0.5rem',
                      paddingTop: '0.25rem',
                      paddingBottom: '0.25rem',
                      marginLeft: '1.5rem',
                      width: 'calc(100% - 3rem)',
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
                  }

                  {/* <AddAdressComponent /> */}

                  <NewAddAdressComponent setSelectedAdress={setSelectedAdress} selectedAdress={selectedAdress} session={session} />

                </div>
                <span className='text-xl mt-4'>
                  Ödeme Bilgileri
                </span>
                <div className='flex w-full justify-evenly items-center'>

                  <label className='mt-1 font-medium'>
                    Kart
                  </label>
                 

                  <CreditCardCartComponent selectedCard={selectedCard} setSelectedCard={setSelectedCard} session={session} />
                </div>

                <button disabled={loadingOdeme} className='w-4/5 m-auto px-12 h-20 rounded-3xl bg-primary disabled:bg-gray-500 mt-12' onClick={async () => {
                  setLoadingOdeme(true)
                  if(!selectedCard.cardNo || !selectedCard.cardUserName || !selectedCard.cardEndDate || !selectedCard.cardCvc){
                    setLoadingOdeme(false)
                    return alert('Kart bilgileri boş olamaz')
                  }
                  if(selectedCard.cardNo.includes("#") || selectedCard.cardUserName.includes("#") || selectedCard.cardEndDate.includes("#") || selectedCard.cardCvc.includes("#")){
                    setLoadingOdeme(false)
                    return alert('Kart bilgileri boş olamaz')
                  }
                  if(Object.keys(userShowState).length <= 0){
                    setLoadingOdeme(false)
                    return alert('Sepetiniz boş')
                  }
                  const hasStock = Object.keys(userShowState).every((value) => {
                    return allProducs[value].stock >= userShowState[value]
                  })
                  if(!hasStock){
                    setLoadingOdeme(false)
                    return alert('Stokta yeterli ürün yok')
                  }
                  
                  for (const value of Object.keys(userShowState)) {
                    if (!allProducs[value]){
                      setLoadingOdeme(false)
                      return
                    }
                    if (allProducs[value].special) {
                      if (session.data.user.hasSaleAccount === false || session.data.user.has_saleAccount  === undefined) {
                        setLockCart(true)
                        setShowModel(true)
                        setLoadingOdeme(false)
                        return
                      }
                      else{
                        setLoadingOdeme(false)
                        return alert('Özel ürünler sadece müşteriler tarafından alınabilir.')

                      }
                    }
                  }
                  console.log(session)
                  console.log(selectedAdress)
                  const postData = fetch('/api/user/address').then(res => {
                    if(res.status === 401){
                      setLoadingOdeme(false)
                      signOut().then(() => {
                        window.location.href = '/login'
                        return
                      })

                      return res.json()
                    }
                  })
                  let realAdress = {}
                  await Promise.all(
                    Object.values(postData).map((e) => {
                      if (e.title === selectedAdress.label)
                        realAdress = e
                    }),
                  )
                  console.log(realAdress)
                  if (!session){
                    setLoadingOdeme(false)
                    return
                  }
                  if (!allProducs){
                    setLoadingOdeme(false)
                    return
                  }
                  // Object.keys(userShowState).forEach((value, index) => {
                  console.log();
                  if(session.status === "unauthenticated"){
                    signOut().then(() => {
                      window.location.href = '/login'
                      return
                    })
                    return 
                  }
                  const res = await fetch('/api/payment', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      products: Object.keys(userShowState).map(key => ({ id: Number.parseInt(key), count: userShowState[key] })),
                      paymentMethod: 'iyzico',
                      sponsorChangeId: '', // optional
                      iban: '', // special === 1 varsa required
                      computedLastPrice: total,
                      identityNumber: session.data.user.tcNumber.toString(),
                      addressID: selectedAdress.value,
                      cardNo: selectedCard.cardNo,
                      cardUserName: selectedCard.cardUserName,
                      cardEndDate: selectedCard.cardEndDate,
                      cardCvc: selectedCard.cardCvc,
                    },
                    ),
                  }).then(res =>{
                    if(res.status !== 200){
                      setLoadingOdeme(false)
                      setLockCart(false)
                      alert("Hata oluştu")
                      return
                    }
                    return res.json()

                    }).then(res => {
                    if(!res) {
                      return
                    }

                  console.log(res)
                  setLoadingOdeme(false)
                  router.push({
                    pathname: '/validateCard',
                    query: { htmlContent: encodeURIComponent(res.htmlContent) },
                  })
                })
                }}>
                  <span className=' font-bold text-white text-xl w-full'>
                    {
                      loadingOdeme ? 'Ödeme Yapılıyor' : 'Ödemeyi Tamamla'
                    }
                  </span>

                </button>

              </div>

            </div>

          </div>
        </div>

      </div>
    </Layout>
  )
}
