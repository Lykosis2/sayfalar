import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import ProfilLayout from '@/components/layout/ProfilLayout'
import OrderTakenIcon from '@/components/icons/OrderTakenIcon'
import TruckIcon from '@/components/icons/TruckIcon'
import HomeIcon from '@/components/icons/HomeIcon'
import XmarkIcon from '@/components/icons/XmarkIcon'
import { CartContext } from '@/components/Cart/CartContextProvider'
import { SharedContext } from '@/components/layout/AgacDataSharer'
import { ofetch } from 'ofetch'
import Link from 'next/link'
import { CopyIcon } from '@radix-ui/react-icons'
import TickIcon from '../../components/icons/TickIcon'

/*

TODO
FATURA BILGISINI EKLE ORDERA
URUNLERIN RESIMLERINI EKLE ORDERA
IADE TALEBINI BAGLA

BU KISIM ICIN BUNLAR

SETTINGSTESTEKI KALANLARI BAGLA
CART KISMINDAKI ADRES EKLEME VE KREDI KARTI KISMINI BAGLA

*/

export default function Siparisler() {
  const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  const { addToCart, clearCart } = useContext(CartContext)
  const [selectedOrdertoRefund, setSelectedOrdertoRefund] = useState({})
  const [showCustomOptions, setShowCustomOptions] = useState(false)
  const [allProducts, setAllProducts] = useState([])
  const [filterOption, setFilterOption] = useState(0)
  const [devamEdenOrders, setDevamEdenOrders] = useState([])
  const [iadeEdilenOrders, setIadeEdilenOrders] = useState([])
  const [iptalEdilenOrders, setIptalEdilenOrders] = useState([])
  const [refundProductsState, setRefundProductsState] = useState({})
  const router = useRouter()
  const {products,orderData,session} = useContext(SharedContext)
  const [openSiparisTakibiDialog, setOpenSiparisTakibiDialog] = useState(false)
  const [siparisTakibiDialogData, setSiparisTakibiDialogData] = useState({})
  const [copiedKargoNo, setCopiedKargoNo] = useState(false)


  useEffect(()=>{
    if(products.length === 0)return
    const returnVal = {} 
    products.map((product)=>{
      returnVal[product.id] = product
    }
    )
    setAllProducts(returnVal)
  },[products])
  

  useEffect(() => {
    if (!orderData || !orderData.orders || orderData.orders.length === 0)
      return

    setDevamEdenOrders(orderData.orders.filter(order => order.status === 1 || order.status === 2 || order.status === 3))
    setIadeEdilenOrders(orderData.orders.filter(order => order.status === 5 || order.status === 6 || order.status === 7))
    setIptalEdilenOrders(orderData.orders.filter(order => order.status === 8))
  }, [orderData])

  useEffect(() => {
    console.log(selectedOrdertoRefund)
    setRefundProductsState(selectedOrdertoRefund.products)
  }, [selectedOrdertoRefund])

  const handleIadeSubmit = (e) => {
    e.preventDefault()
    console.log(session);
    console.log(selectedOrdertoRefund);
    console.log(refundProductsState)
     ofetch("/api/finalEndPoints/refund",{
       method:'POST',
       body:{
         user_id:session.data.user.id,
         order_id:selectedOrdertoRefund.id,
         saleAccountId:selectedOrdertoRefund.saleAccount_id,
         products:refundProductsState,
       }
     }).then(res=>{
      setSelectedOrdertoRefund({})
      router.reload()

    })
  }

  useEffect(() => {
    let timeout = null
    if (copiedKargoNo) timeout = setTimeout(() => {
      setCopiedKargoNo(false)
    }, 3000)
    return () => {
      if(timeout)clearTimeout(timeout)
    }

  }, [copiedKargoNo])

  console.log(devamEdenOrders)
  console.log(refundProductsState)
  console.log(selectedOrdertoRefund)
  return (
        <ProfilLayout navbarTitle="Siparişlerim" navbarSearchPlaceholder="Siparişini Ara..">
            <section className="w-full h-full rounded-3xl border border-primary drop-shadow-lg flex flex-col z-30">
                {/* Top Section */}
                <div className="flex w-[calc(100%-5px)] border-b border-primary items-center overflow-x-scroll overflow-y-hidden z-20 px-2">
                    <button className={`px-5 h-12 m-3 whitespace-nowrap text-center flex justify-center items-center ${filterOption === 0 ? 'bg-primary text-white' : 'bg-white text-black'} rounded-full drop-shadow-lg`}
                    onClick={() => setFilterOption(0)}
                    >
                        Tümü
                    </button>
                    <button className={`px-5 h-12 border whitespace-nowrap border-primary m-3 text-center flex justify-center items-center ${filterOption === 1 ? 'bg-primary text-white ' : 'bg-white text-black '} rounded-full drop-shadow-lg hover:bg-primary hover:text-white transition-all`} onClick={() => {
                      setFilterOption(1)
                    }}>
                        Devam Eden Siparişler
                    </button>
                    <button className={`px-5 h-12 border whitespace-nowrap border-primary m-3 text-center flex justify-center items-center ${filterOption === 2 ? 'bg-primary text-white' : 'bg-white text-black'} rounded-full drop-shadow-lg hover:bg-primary hover:text-white transition-all`}
                    onClick={() => {
                      setFilterOption(2)
                    }
                    }
                    >
                        İadeler
                    </button>
                    <button className={`px-5 h-12 border whitespace-nowrap border-primary m-3 text-center flex justify-center items-center ${filterOption === 3 ? 'bg-primary text-white ' : 'bg-white text-black '} rounded-full drop-shadow-lg hover:bg-primary hover:text-white transition-all`}
                    onClick={() => {
                      setFilterOption(3)
                    }
                    }
                    >
                        İptaller
                    </button>
                </div>

                {/* Bottom Section */}
                <div className="flex flex-col w-full h-full overflow-y-scroll last:border-b-0">
                    {/* Order */}
                    {
                    }
                    <dialog className={`w-[800px] h-[500px] bg-white flex flex-col rounded-xl ${Object.keys(selectedOrdertoRefund).length > 0 ? 'flex ' : 'hidden '}`} >
                        <div className="w-6 h-6 float-right cursor-pointer" onClick={() => setSelectedOrdertoRefund((e) => {
                          return {}
                        })}>
                            <XmarkIcon />
                        </div>

                                <label className="text-3xl text-black w-full flex justify-center">
                                    Iade Talebi
                                </label>
                                <form className="flex flex-col gap-2" onSubmit={handleIadeSubmit}>

                                    <div className="flex gap-2">
                                    <label>Iade Idsi: </label>
                                    <input type="text" disabled value={selectedOrdertoRefund?.id ?? 0} className="border bg-gray-100 border-gray-400 rounded-lg px-1" />
                                    </div>
                                    <div className="flex gap-2">
                                    <label>
                                        Iade edilicek ürünler
                                    </label>
                                    <select className="border border-gray-400 rounded-lg" onClick={(e) => {
                                      if (e.target.value === '2')
                                        setShowCustomOptions(true)
                                      else setShowCustomOptions(false)
                                    }}>
                                        <option value="1">Hepsi</option>
                                        <option value="2">Özel </option>
                                    </select>
                                    </div>
                                    <div className="flex flex-col">

                                        {
                                            // TODO CONNECT THIS PART
                                        }
                                    {
                                        showCustomOptions
                                        && !!selectedOrdertoRefund
                                        && !!selectedOrdertoRefund.products
                                        && Object.keys(selectedOrdertoRefund.products).map((productId, index) => {
                                          return (
                                                <div className="flex gap-2 items-center " key={index}>
                                                    <label>
                                                        {allProducts[productId].name}
                                                    </label>
                                                    <select className="border border-gray-400 rounded-lg" value={selectedOrdertoRefund.products[productId].count} onChange={(changedValue) => {
                                                      setRefundProductsState((e) => {
                                                        if (e.hasOwnProperty(productId)) {
                                                          e[productId].count = changedValue.target.value
                                                        }
                                                        else {
                                                          e[productId].count = null
                                                          e[productId].count = changedValue.target.value
                                                        }
                                                        return { ...e }
                                                      })
                                                    }}>
                                                        {
                                                            [...Array(selectedOrdertoRefund.products[productId].count).keys()].map((count, index) => {
                                                              return (
                                                                    <option value={count + 1}>{count + 1}</option>
                                                              )
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                          )
                                        })

                                    }
                                    </div>
                                    <div className="flex gap-2">

                                        <label className=" whitespace-nowrap flex items-center">
                                            Iade sebebiniz:
                                        </label>
                                        <textarea className="border border-gray-400 rounded-lg w-[90%]" />

                                    </div>
                                    <button type="submit" className="border border-gray-400 bg-primary w-36 h-14 m-auto rounded-xl">
                                        Iade Talebi Oluştur
                                    </button>
                                    <span>
                                      Göndereceğiniz numara yurtiçi kargo: 7538139
                                    </span>
                                </form>
                    </dialog>

                    <dialog className={`w-[800px] h-[500px] bg-white flex flex-col rounded-xl ${openSiparisTakibiDialog ? 'flex ' : 'hidden '}`} >
                        <div className="w-6 h-6 float-right cursor-pointer" onClick={() => {
                          setSiparisTakibiDialogData({})
                          setOpenSiparisTakibiDialog(false)
                        }}>
                            <XmarkIcon />
                        </div>

                                <label className="text-3xl text-black w-full flex justify-center ">
                                    Siparis takibi 
                                </label>
                                <div className="flex flex-col gap-2">
                                    <div className="flex justify-center items-center mt-4">

                                    <label>{!siparisTakibiDialogData?.followNumber ? "Siparişiniz henüz kargoya verilmedi": "Takip numaranız: "} </label>
                                    <div className='border bg-gray-100 border-gray-700 px-1 rounded-md'>
                                      {
                                        siparisTakibiDialogData?.followNumber
                                      }

                                    </div>
                                    <button className='border border-gray-400 rounded-md px-1 min-w-[1.5rem] min-h-[1.5rem] justify-center items-center' onClick={()=>{
                                      setCopiedKargoNo(true)
                                      navigator.clipboard.writeText(siparisTakibiDialogData?.followNumber)
                                    }}
                                      >
                                        {
                                          copiedKargoNo ? <TickIcon/> : <CopyIcon/>
                                        }
                                    </button>
                                    </div>
                                    <div className='w-full flex justify-center items-center'>

                                      <a href={"https://www.yurticikargo.com/tr/online-servisler/gonderi-sorgula"} target='_blank' className='
                                      flex justify-center items-center text-white bg-primary px-2 py-1 rounded-lg border'>
                                        Kargo takip sayfasına gitmek için tıklayınız
                                      </a>
                                    </div>
                                  </div>
                                
                    </dialog>
                    {
                        orderData
                        && orderData.orders
                        && orderData.orders.length > 0
                        && filterOption === 0
                          ? orderData.orders.map((order, index) => {
                            console.log(order)
                            return <div className="flex flex-col xl:flex-row w-full h-[800px] xl:h-80 border-b border-primary items-center p-5" key={index}>

                            <div className="flex flex-col w-full h-full">
                                {/* About Order */}
                                <div className="flex flex-col xl:flex-row w-full justify-between">
                                    <div className="flex flex-col gap-2 items-center justify-center whitespace-nowrap">
                                        <label>Sipariş Tarihi</label>
                                        <span className="text-primary">{new Date(order.createdAt).toLocaleDateString('tr', dateOptions)}</span>
                                    </div>
                                    <div className="flex flex-col gap-2 items-center justify-center whitespace-nowrap">
                                        <label>Tahmini Teslim Tarihi</label>
                                        <span className="text-primary">{
                                        new Date(new Date(order.createdAt).setDate(new Date(order.createdAt).getDate() + 4)).toLocaleDateString('tr', dateOptions)

                                        }</span>
                                    </div>
                                    <div className="flex flex-col gap-2 items-center justify-center whitespace-nowrap">
                                        <label>Sipariş Özeti</label>
                                        <span className="text-primary">
                                          {
                                            console.log(order.products)
                                          }
                                            {Object.keys(order.products).length > 0 ? `${Object.values(order.products).reduce((acc,thisorder)=>acc+thisorder.count,0)} Ürün` : 'Iade edilmiş ' }
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-2 items-center justify-center whitespace-nowrap">
                                        <label>Alıcı</label>
                                        <span className="text-primary">{order.name} {' '} {order.surname}</span>
                                    </div>
                                </div>

                                <div className="w-full h-full items-center flex flex-col xl:flex-row my-5 justify-between px-28">
                                  <div className='flex justify-center items-center'>

                                    <label className=' whitespace-nowrap'>
                                          Sipariş Idsi: 
                                        </label>
                                        <span className="text-primary">
                                          {order.id}
                                        </span>
                                  </div>
                                    <div className="w-full flex flex-col items-center justify-between">
                                      
                                        <label>Sipariş Durumu</label>
                                        <span className={`
                                        ${order.status === 0
? 'text-yellow-300 '
                                        : order.status === 1
? 'text-blue-400'
                                        : order.status === 2
? 'text-button-green '
                                        : order.status === 3
? 'text-button-green '
                                        : order.status === 4
? 'text-button-red '
                                        : order.status === 5
? 'text-button-red '
                                        : 
                                        order.status === 6 ?
                                        "text-orange-400":
                                        order.status === 7 ?
                                        " text-purple-500":
                                        order.status === 8 ? 
                                        "text-pink-500":
                                        'text-button-red '
                                        } flex items-center`}>
                                        {

                                            order.status === 0
                                              ? <OrderTakenIcon />
                                              : order.status === 1
                                                ? <TruckIcon />
                                                : order.status === 2
                                                  ? <TruckIcon />
                                                  : order.status === 3
                                                    ? <TruckIcon/>
                                                    : order.status === 4
                                                      ? <HomeIcon/>
                                                      : order.status === 5
                                                        ? <XmarkIcon />
                                                        : <XmarkIcon />
                                        }
                                            {
                                                order.status === 0
                                                  ? 'Siparişinizin Ödemesi Bekleniyor'
                                                  : order.status === 1
                                                    ? 'Siparişinizin Ödemesi Bekleniyor'
                                                    : order.status === 2
                                                      ? 'Siparişiniz Hazırlanıyor'
                                                      : order.status === 3
                                                        ? 'Siparişiniz Yolda'
                                                        : order.status === 4
                                                          ? 'Siparişiniz Teslim Edildi'
                                                          : order.status === 5
                                                            ? 'Siparişiniz Iadesi Onay Bekliyor'
                                                            : order.status === 6 ? 
                                                             "Iade Edildi" : 
                                                             order.status === 7 ? 
                                                             "Iade Reddedildi":
                                                             "Iptal Edildi"
                                            }
                                        </span>
                                    </div>

                                   
                                </div>
                            </div>
                            {/* Button on the right side and bottom on the mobile */}
                            <div className="xl:w-[25%] w-full h-full items-center justify-center flex flex-wrap xl:flex-nowrap xl:flex-col gap-3">
                                
                                <button className="w-40 border border-black rounded-lg py-2 hover:bg-black hover:text-white transition-all" onClick={() => {
                                  if (Object.keys(order.products).length === 0)
                                    return alert('Siparişte ürün bulunmamaktadır.')
                                  clearCart()
                                  Object.keys(order.products).map((productId) => {
                                    for (let i = 0; i < order.products[productId].count; i++) addToCart(productId)
                                  })
                                  router.push('/cart')
                                }}>
                                    Siparişi Tekrarla
                                </button>
                                {
                                  order.status === 3 &&
                                <button className="w-40 border border-black rounded-lg py-2 hover:bg-black hover:text-white transition-all" onClick={()=>{
                                  setOpenSiparisTakibiDialog(true)
                                  console.log(order);
                                  setSiparisTakibiDialogData(order)
                                }}>
                                    Sipariş Takibi
                                </button>
                                }
                                {
                                  !( order.status ===0 || order.status===1||order.status === 5 || order.status === 6 || order.status ===7 || Object.values(order.products).some(product => product.special === 1)) && (new Date() - new Date(order.createdAt)) / (1000 * 60 * 60 * 24) <= 14 && 
                                <button className={`w-40 border border-black rounded-lg py-2 hover:bg-black hover:text-white transition-all flex justify-center items-center `} onClick={ () => {
                                  console.log(order.products)
                                  if(order.status === 5 || order.status === 6 || order.status ===7 || Object.values(order.products).some(product => product.special === 1)) return 
                                  setSelectedOrdertoRefund(order)
                                }}>
                                    İade Talebi
                                </button>
                                }
                            </div>
                        </div>
                          })
                          : filterOption === 1
                            ? devamEdenOrders.map((order, index) => {
                              return <div className="flex flex-col xl:flex-row w-full h-[800px] xl:h-80 border-b border-primary items-center p-5" key={index}>

                            <div className="flex flex-col w-full h-full">
                                {/* About Order */}
                                <div className="flex flex-col xl:flex-row w-full justify-between">
                                    <div className="flex flex-col gap-2 items-center justify-center whitespace-nowrap">
                                        <label>Sipariş Tarihi</label>
                                        <span className="text-primary">{new Date(order.createdAt).toLocaleDateString('tr', dateOptions)}</span>
                                    </div>
                                    <div className="flex flex-col gap-2 items-center justify-center whitespace-nowrap">
                                        <label>Tahmini Teslim Tarihi</label>
                                        <span className="text-primary">{
                                        new Date(new Date(order.createdAt).setDate(new Date(order.createdAt).getDate() + 4)).toLocaleDateString('tr', dateOptions)

                                        }</span>
                                    </div>
                                    <div className="flex flex-col gap-2 items-center justify-center whitespace-nowrap">
                                        <label>Sipariş Özeti</label>
                                        <span className="text-primary">
                                            {Object.keys(order.products).length > 0 ? `${Object.keys(order.products).length} Ürün` : 'Iade edilmiş ' }
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-2 items-center justify-center whitespace-nowrap">
                                        <label>Alıcı</label>
                                        <span className="text-primary">{order.name} {' '} {order.surname}</span>
                                    </div>
                                </div>

                                <div className="w-full h-full items-center flex flex-col xl:flex-row my-5 justify-between px-28">
                                <div className='flex justify-center items-center'>

<label className=' whitespace-nowrap'>
      Sipariş Idsi: 
    </label>
    <span className="text-primary">
      {order.id}
    </span>
</div>
                                    <div className="w-full flex flex-col items-center justify-between">
                                        <label>Sipariş Durumu</label>
                                        <span className={`
                                         ${order.status === 0
                                          ? 'text-yellow-300 '
                                                                                  : order.status === 1
                                          ? 'text-blue-400'
                                                                                  : order.status === 2
                                          ? 'text-button-green '
                                                                                  : order.status === 3
                                          ? 'text-button-green '
                                                                                  : order.status === 4
                                          ? 'text-button-red '
                                                                                  : order.status === 5
                                          ? 'text-button-red '
                                                                                  : 
                                                                                  order.status === 6 ?
                                                                                  "text-orange-400":
                                                                                  order.status === 7 ?
                                                                                  " text-purple-500":
                                                                                  order.status === 8 ? 
                                                                                  "text-pink-500":
                                                                                  'text-button-red '
                                        } flex items-center`}>
                                        {

                                            order.status === 0
                                              ? <OrderTakenIcon />
                                              : order.status === 1
                                                ? <TruckIcon />
                                                : order.status === 2
                                                  ? <TruckIcon />
                                                  : order.status === 3
                                                    ? <TruckIcon />
                                                    : order.status === 4
                                                      ? <HomeIcon />
                                                      : order.status === 5
                                                        ? <XmarkIcon />
                                                        : <XmarkIcon />
                                        }
                                            {
                                                order.status === 0
                                                ? 'Siparişinizin Ödemesi Bekleniyor'
                                                : order.status === 1
                                                  ? 'Siparişinizin Ödemesi Bekleniyor'
                                                  : order.status === 2
                                                    ? 'Siparişiniz Hazırlanıyor'
                                                    : order.status === 3
                                                      ? 'Siparişiniz Yolda'
                                                      : order.status === 4
                                                        ? 'Siparişiniz Teslim Edildi'
                                                        : order.status === 5
                                                          ? 'Siparişiniz Iadesi Onay Bekliyor'
                                                          : order.status === 6 ? 
                                                           "Iade Edildi" : 
                                                           order.status === 7 ? 
                                                           "Iade Reddedildi":
                                                           "Iptal Edildi"
                                            }
                                        </span>
                                    </div>

                                   
                                </div>
                            </div>
                            {/* Button on the right side and bottom on the mobile */}
                            <div className="xl:w-[25%] w-full h-full items-center justify-center flex flex-wrap xl:flex-nowrap xl:flex-col gap-3">
                               
                                <button className="w-40 border border-black rounded-lg py-2 hover:bg-black hover:text-white transition-all" onClick={() => {
                                  if (Object.keys(order.products).length === 0)
                                    return alert('Siparişte ürün bulunmamaktadır.')
                                  clearCart()
                                  Object.keys(order.products).map((productId) => {
                                    for (let i = 0; i < order.products[productId].count; i++) addToCart(productId)
                                  })
                                  router.push('/cart')
                                }}>
                                    Siparişi Tekrarla
                                </button>
                                {
                                  order.status === 3 &&
                                <button className="w-40 border border-black rounded-lg py-2 hover:bg-black hover:text-white transition-all" onClick={()=>{
                                  setOpenSiparisTakibiDialog(true)
                                  console.log(order);
                                  setSiparisTakibiDialogData(order)
                                }}>
                                    Sipariş Takibi
                                </button>
                                }
                                {
                                  !( order.status ===0 || order.status===1||order.status === 5 || order.status === 6 || order.status ===7 || Object.values(order.products).some(product => product.special === 1)) && (new Date() - new Date(order.createdAt)) / (1000 * 60 * 60 * 24) <= 14 && 
                                <button className={`w-40 border border-black rounded-lg py-2 hover:bg-black hover:text-white transition-all flex justify-center items-center `} onClick={ () => {
                                  console.log(order.products)
                                  if(order.status === 5 || order.status === 6 || order.status ===7 || Object.values(order.products).some(product => product.special === 1)) return 
                                  setSelectedOrdertoRefund(order)
                                }}>
                                    İade Talebi
                                </button>
                                }
                            </div>
                        </div>
                            })
                            : filterOption === 2
                              ? iadeEdilenOrders.map((order, index) => {
                                return <div className="flex flex-col xl:flex-row w-full h-[800px] xl:h-80 border-b border-primary items-center p-5" key={index}>

                            <div className="flex flex-col w-full h-full">
                                {/* About Order */}
                                <div className="flex flex-col xl:flex-row w-full justify-between">
                                    <div className="flex flex-col gap-2 items-center justify-center whitespace-nowrap">
                                        <label>Sipariş Tarihi</label>
                                        <span className="text-primary">{new Date(order.createdAt).toLocaleDateString('tr', dateOptions)}</span>
                                    </div>
                                    <div className="flex flex-col gap-2 items-center justify-center whitespace-nowrap">
                                        <label>Tahmini Teslim Tarihi</label>
                                        <span className="text-primary">{
                                        new Date(new Date(order.createdAt).setDate(new Date(order.createdAt).getDate() + 4)).toLocaleDateString('tr', dateOptions)

                                        }</span>
                                    </div>
                                    <div className="flex flex-col gap-2 items-center justify-center whitespace-nowrap">
                                        <label>Sipariş Özeti</label>
                                        <span className="text-primary">
                                            {Object.keys(order.products).length > 0 ? `${Object.keys(order.products).length} Ürün` : 'Iade edilmiş ' }
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-2 items-center justify-center whitespace-nowrap">
                                        <label>Alıcı</label>
                                        <span className="text-primary">Mustafa Kemal</span>
                                    </div>
                                </div>

                                <div className="w-full h-full items-center flex flex-col xl:flex-row my-5 justify-between px-28">
                                <div className='flex justify-center items-center'>

<label className=' whitespace-nowrap'>
      Sipariş Idsi: 
    </label>
    <span className="text-primary">
      {order.id}
    </span>
</div>
                                    <div className="w-full flex flex-col items-center justify-between">
                                        <label>Sipariş Durumu</label>
                                        <span className={`
                                         ${order.status === 0
                                          ? 'text-yellow-300 '
                                                                                  : order.status === 1
                                          ? 'text-blue-400'
                                                                                  : order.status === 2
                                          ? 'text-button-green '
                                                                                  : order.status === 3
                                          ? 'text-button-green '
                                                                                  : order.status === 4
                                          ? 'text-button-red '
                                                                                  : order.status === 5
                                          ? 'text-button-red '
                                                                                  : 
                                                                                  order.status === 6 ?
                                                                                  "text-orange-400":
                                                                                  order.status === 7 ?
                                                                                  " text-purple-500":
                                                                                  order.status === 8 ? 
                                                                                  "text-pink-500":
                                                                                  'text-button-red '
                                        } flex items-center`}>
                                        {

                                            order.status === 0
                                              ? <OrderTakenIcon />
                                              : order.status === 1
                                                ? <TruckIcon />
                                                : order.status === 2
                                                  ? <TruckIcon />
                                                  : order.status === 3
                                                    ? <TruckIcon />
                                                    : order.status === 4
                                                      ? <HomeIcon />
                                                      : order.status === 5
                                                        ? <XmarkIcon />
                                                        : <XmarkIcon />
                                        }
                                        
                                            {
                                                order.status === 0
                                                ? 'Siparişinizin Ödemesi Bekleniyor'
                                                : order.status === 1
                                                  ? 'Siparişinizin Ödemesi Bekleniyor'
                                                  : order.status === 2
                                                    ? 'Siparişiniz Hazırlanıyor'
                                                    : order.status === 3
                                                      ? 'Siparişiniz Yolda'
                                                      : order.status === 4
                                                        ? 'Siparişiniz Teslim Edildi'
                                                        : order.status === 5
                                                          ? 'Siparişiniz Iadesi Onay Bekliyor'
                                                          : order.status === 6 ? 
                                                           "Iade Edildi" : 
                                                           order.status === 7 ? 
                                                           "Iade Reddedildi":
                                                           "Iptal Edildi"
                                            }
                                        </span>
                                    </div>

                                    
                                </div>
                            </div>
                            {/* Button on the right side and bottom on the mobile */}
                            <div className="xl:w-[25%] w-full h-full items-center justify-center flex flex-wrap xl:flex-nowrap xl:flex-col gap-3">
                                
                                <button className="w-40 border border-black rounded-lg py-2 hover:bg-black hover:text-white transition-all" onClick={() => {
                                  if (Object.keys(order.products).length === 0)
                                    return alert('Siparişte ürün bulunmamaktadır.')
                                  clearCart()
                                  Object.keys(order.products).map((productId) => {
                                    for (let i = 0; i < order.products[productId].count; i++) addToCart(productId)
                                  })
                                  router.push('/cart')
                                }}>
                                    Siparişi Tekrarla
                                </button>
                                {
                                  order.status === 3 &&
                                <button className="w-40 border border-black rounded-lg py-2 hover:bg-black hover:text-white transition-all" onClick={()=>{
                                  setOpenSiparisTakibiDialog(true)
                                  console.log(order);
                                  setSiparisTakibiDialogData(order)
                                }}>
                                    Sipariş Takibi
                                </button>
                                }
                                 {
                                  !( order.status ===0 || order.status===1||order.status === 5 || order.status === 6 || order.status ===7 || Object.values(order.products).some(product => product.special === 1)) && (new Date() - new Date(order.createdAt)) / (1000 * 60 * 60 * 24) <= 14 && 
                                <button className={`w-40 border border-black rounded-lg py-2 hover:bg-black hover:text-white transition-all flex justify-center items-center `} onClick={ () => {
                                  console.log(order.products)
                                  if(order.status === 5 || order.status === 6 || order.status ===7 || Object.values(order.products).some(product => product.special === 1)) return 
                                  setSelectedOrdertoRefund(order)
                                }}>
                                    İade Talebi
                                </button>
                                }
                            </div>
                        </div>
                              })
                              : filterOption === 3
                                ? iptalEdilenOrders.map((order, index) => {
                                  return <div className="flex flex-col xl:flex-row w-full h-[800px] xl:h-80 border-b border-primary items-center p-5" key={index}>

                            <div className="flex flex-col w-full h-full">
                                {/* About Order */}
                                <div className="flex flex-col xl:flex-row w-full justify-between">
                                    <div className="flex flex-col gap-2 items-center justify-center whitespace-nowrap">
                                        <label>Sipariş Tarihi</label>
                                        <span className="text-primary">{new Date(order.createdAt).toLocaleDateString('tr', dateOptions)}</span>
                                    </div>
                                    <div className="flex flex-col gap-2 items-center justify-center whitespace-nowrap">
                                        <label>Tahmini Teslim Tarihi</label>
                                        <span className="text-primary">{
                                        new Date(new Date(order.createdAt).setDate(new Date(order.createdAt).getDate() + 4)).toLocaleDateString('tr', dateOptions)

                                        }</span>
                                    </div>
                                    <div className="flex flex-col gap-2 items-center justify-center whitespace-nowrap">
                                        <label>Sipariş Özeti</label>
                                        <span className="text-primary">
                                            {Object.keys(order.products).length > 0 ? `${Object.keys(order.products).length} Ürün` : 'Iade edilmiş ' }
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-2 items-center justify-center whitespace-nowrap">
                                        <label>Alıcı</label>
                                        <span className="text-primary">Mustafa Kemal</span>
                                    </div>
                                </div>

                                <div className="w-full h-full items-center flex flex-col xl:flex-row my-5 justify-between px-28">
                                <div className='flex justify-center items-center'>

<label className=' whitespace-nowrap'>
      Sipariş Idsi: 
    </label>
    <span className="text-primary">
      {order.id}
    </span>
</div>
                                    <div className="w-full flex flex-col items-center justify-between">
                                        <label>Sipariş Durumu</label>
                                        <span className={`
                                        ${order.status === 0
                                          ? 'text-yellow-300 '
                                                                                  : order.status === 1
                                          ? 'text-blue-400'
                                                                                  : order.status === 2
                                          ? 'text-button-green '
                                                                                  : order.status === 3
                                          ? 'text-button-green '
                                                                                  : order.status === 4
                                          ? 'text-button-red '
                                                                                  : order.status === 5
                                          ? 'text-button-red '
                                                                                  : 
                                                                                  order.status === 6 ?
                                                                                  "text-orange-400":
                                                                                  order.status === 7 ?
                                                                                  " text-purple-500":
                                                                                  order.status === 8 ? 
                                                                                  "text-pink-500":
                                                                                  'text-button-red '
                                        } flex items-center`}>
                                        {

                                            order.status === 0
                                              ? <OrderTakenIcon />
                                              : order.status === 1
                                                ? <TruckIcon />
                                                : order.status === 2
                                                  ? <TruckIcon />
                                                  : order.status === 3
                                                    ? <TruckIcon />
                                                    : order.status === 4
                                                      ? <HomeIcon />
                                                      : order.status === 5
                                                        ? <XmarkIcon />
                                                        : <XmarkIcon />
                                        }
                                            {
                                                order.status === 0
                                                ? 'Siparişinizin Ödemesi Bekleniyor'
                                                : order.status === 1
                                                  ? 'Siparişinizin Ödemesi Bekleniyor'
                                                  : order.status === 2
                                                    ? 'Siparişiniz Hazırlanıyor'
                                                    : order.status === 3
                                                      ? 'Siparişiniz Yolda'
                                                      : order.status === 4
                                                        ? 'Siparişiniz Teslim Edildi'
                                                        : order.status === 5
                                                          ? 'Siparişiniz Iadesi Onay Bekliyor'
                                                          : order.status === 6 ? 
                                                           "Iade Edildi" : 
                                                           order.status === 7 ? 
                                                           "Iade Reddedildi":
                                                           "Iptal Edildi"
                                            }
                                        </span>
                                    </div>

                                   
                                </div>
                            </div>
                            {/* Button on the right side and bottom on the mobile */}
                            <div className="xl:w-[25%] w-full h-full items-center justify-center flex flex-wrap xl:flex-nowrap xl:flex-col gap-3">
                                
                                <button className="w-40 border border-black rounded-lg py-2 hover:bg-black hover:text-white transition-all" onClick={() => {
                                  if (Object.keys(order.products).length === 0)
                                    return alert('Siparişte ürün bulunmamaktadır.')
                                  clearCart()
                                  Object.keys(order.products).map((productId) => {
                                    for (let i = 0; i < order.products[productId].count; i++) addToCart(productId)
                                  })
                                  router.push('/cart')
                                }}>
                                    Siparişi Tekrarla
                                </button>
                                {
                                  order.status === 3 &&
                                <button className="w-40 border border-black rounded-lg py-2 hover:bg-black hover:text-white transition-all" onClick={()=>{
                                  setOpenSiparisTakibiDialog(true)
                                  console.log(order);
                                  setSiparisTakibiDialogData(order)
                                }}>
                                    Sipariş Takibi
                                </button>
                                }
                                {
                                  !( order.status ===0 || order.status===1||order.status === 5 || order.status === 6 || order.status ===7 || Object.values(order.products).some(product => product.special === 1)) && (new Date() - new Date(order.createdAt)) / (1000 * 60 * 60 * 24) <= 14 && 
                                <button className={`w-40 border border-black rounded-lg py-2 hover:bg-black hover:text-white transition-all flex justify-center items-center `} onClick={ () => {
                                  console.log(order.products)
                                  if(order.status === 5 || order.status === 6 || order.status ===7 || Object.values(order.products).some(product => product.special === 1)) return 
                                  setSelectedOrdertoRefund(order)
                                }}>
                                    İade Talebi
                                </button>
                                }
                            </div>
                        </div>
                                })
                                : ''

                    }

                </div>
            </section>
        </ProfilLayout>
  )
}
