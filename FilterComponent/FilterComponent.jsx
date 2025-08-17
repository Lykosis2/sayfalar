import React, { useContext, useEffect,useState } from 'react'
import Select, { components } from 'react-select'
import { NavbarTextContext } from '../NavbarProvider'
import AllCategoryIcon from '../icons/AllCategoryIcon'
import MaleIcon from '../icons/MaleIcon'
import WomenIcon from '../icons/WomenIcon'
import SunCareIcon from '../icons/SunCareIcon'
import SkinCareIcon from '../icons/SkinCareIcon'
import FaceCareIcon from '../icons/FaceCareIcon'
import SerumIcon from '../icons/SerumIcon'
import BodyCareIcon from '../icons/BodyCareIcon'
import EyeCareIcon from '../icons/EyeCareIcon'
import BabyCategoryIcon from '../icons/BabyCategoryIcon'
import HairCareIcon from '../icons/HairCareIcon'
import { CartContext } from '../Cart/CartContextProvider'
import Link from 'next/link'
import FilterPartToast from '../Toast/FilterPartToast'
import Image from 'next/image'
import { ofetch } from 'ofetch'
import { SharedContext } from '../layout/AgacDataSharer'
import useWindowSize from '../hooks/useWindowDimension'
import LeftArrowSmallIcon from '../icons/LeftArrowSmallIcon'
import toast, { Toaster } from 'react-hot-toast'

// TODO SIZE OPTIONSUN DYNAMICALLY ALINMASINA GEREK VAR MI KONUS 
export default function FilterComponent() {
  const { navbarText, setNavbarText, filter, setFilter,sortby } = useContext(NavbarTextContext)
  const { addToCart, cartProducts } = useContext(CartContext)
  const [selectedGender, setSelectedGender] = React.useState({ value: 0, label: 'Tüm Cinsiyetler' })
  const [selectedAge, setSelectedAge] = React.useState(0)
  const [selectedSize, setSelectedSize] = React.useState({ value: 0, label: 'Tüm Boyutlar' })
  const [selectedMinPrice, setMinSelectedPrice] = React.useState(0)
  const [selectedMaxPrice, setSelectedMaxPrice] = React.useState(Number.MAX_VALUE)
  const {categories : kategoriOptions} = useContext(SharedContext)
  const [filteredProducts, setFilteredProducts] = useState([])


  
  const ValueContainer = ({ children, ...props }) => {

    const selectedOption = props?.selectProps?.value;
  
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {selectedOption && (
          <>
            <Image src={selectedOption?.icon} alt="Icon" width={24} height={24} className='ml-2 mr-1 ' />
            {selectedOption?.label}
          </>
        )}
      </div>
  )
}
  const {products} = useContext(SharedContext)
  const options = [
    { value: 0, label: 'Tüm Cinsiyetler' },
    { value: 1, label: 'Erkek' },
    { value: 2, label: 'Kadın' },
  ]

  const ageOptions = [
    { value: 0, label: 'Tüm Yaşlar' },
    { value: 1, label: '0-3 Yaş' },
    { value: 2, label: '3-12 Yaş' },
    { value: 3, label: '12-18 Yaş' },
    { value: 4, label: '18-40 Yaş' },
    { value: 5, label: '40-60 Yaş' },
    { value: 6, label: '60+ Yaş' },
  ]
  // EZ
  const [sizeOptions, setSizeOptions] = useState([])
  useEffect(() => {
    ofetch('/api/finalEndPoints/products/getSizes').then(res => res?.sizes).then(sizes => setSizeOptions(sizes))
  }, [])
  
  // s
  function filterProducts() {
    let tempFilteredProducts = []
    products.map((product, index) => {
      if (navbarText?.length !== 0 && filter === 0) {
        if (product?.name.includes(navbarText))
          tempFilteredProducts.push(product)
      }
      if (navbarText?.length === 0 && filter !== 0) {
        console.log(product?.categories);
        if (product.categories.includes(parseInt(filter)))
        tempFilteredProducts.push(product)
      }
      if (navbarText?.length !== 0 && filter !== 0) {
        if (product?.name.includes(navbarText) && product?.categories.includes(parseInt(filter)))
        tempFilteredProducts.push(product)
      }
      if (navbarText.length === 0 && filter === 0) tempFilteredProducts.push(product)
    })
    
    if (selectedAge !== 0) {
      tempFilteredProducts.filter((product) => {

        if(selectedAge?.value === 1){
          return (
             product?.ages?.lowerAge >=0 &&
             product?.ages?.lowerAge <= 3 && 
             product?.ages?.upperAge <=3 && 
             product?.ages?.upperAge >= 0 &&
             product?.ages?.upperAge >= product?.ages?.lowerAge
             )
        }
        else if (selectedAge?.value === 2) {
          return( 
            product?.ages?.lowerAge >=3 && 
            product?.ages?.lowerAge <= 12 && 
            product?.ages?.upperAge <=12 && 
            product?.ages?.upperAge >= 3 &&
            product?.ages?.upperAge >= product?.ages?.lowerAge 
           )
        }
        else if (selectedAge?.value === 3) {
          return (
            product?.ages?.lowerAge >=12 && 
            product?.ages?.lowerAge <= 18 && 
            product?.ages?.upperAge <=18 && 
            product?.ages?.upperAge >= 12 &&
            product?.ages?.upperAge >= product?.ages?.lowerAge 
            )
        }
        else if (selectedAge?.value === 4) {
          return (
            product?.ages?.lowerAge >=18 && 
            product?.ages?.lowerAge <= 40 && 
            product?.ages?.upperAge <=40 && 
            product?.ages?.upperAge >= 18 &&
            product?.ages?.upperAge >= product?.ages?.lowerAge
            )
        }
        else if (selectedAge?.value === 5) {
          return (
            product?.ages?.lowerAge >=40 && 
            product?.ages?.lowerAge <= 60 && 
            product?.ages?.upperAge <=60 && 
            product?.ages?.upperAge >= 40 &&
            product?.ages?.upperAge >= product?.ages?.lowerAge 
            )
        }
        else if (selectedAge?.value === 6) {
          return (
            product?.ages?.lowerAge >=60 && 
            product?.ages?.lowerAge <= 100 && 
            product?.ages?.upperAge <=100 && 
            product?.ages?.upperAge >= 60 &&
            product?.ages?.upperAge >= product?.ages?.lowerAge 
            )
        }
      })
    }
    console.log(selectedGender?.value);
    if (selectedGender?.value !== 0) {
      const changed= tempFilteredProducts.filter((product) => {
        return product?.categories.includes(selectedGender?.value+1)
      })
      tempFilteredProducts=changed

    }
    if (selectedSize?.value !== 0) {
      const changed = tempFilteredProducts?.filter((product) => {
        return product?.size === selectedSize?.value
      })
      tempFilteredProducts=changed
    }
    if (selectedMinPrice > 0) {
      const changed = tempFilteredProducts?.filter((product) => {
        return product?.price >= Number.parseInt(selectedMinPrice)
      })
      tempFilteredProducts=changed
    }
    if (selectedMaxPrice < Number.MAX_VALUE) {
      const changed = tempFilteredProducts.filter((product) => {
        return product?.price <= Number.parseInt(selectedMaxPrice)
      })
      tempFilteredProducts=changed
    }
    return tempFilteredProducts
  }
  // DONT DELETE THIS CONSOLE LOG

  useEffect(() => {
    console.log('useEffect');
    setFilteredProducts(filterProducts())

  }, [navbarText, filter, selectedAge, selectedGender, selectedSize, selectedMinPrice, selectedMaxPrice,products,sortby])

  const {width} = useWindowSize()
  console.log(width);
  const [openFilter, setOpenFilter] = useState(false)
  const [userSelectToOpenFilter, setUserSelectToOpenFilter] = useState(0)
  useEffect(() => {
    if(width < 1024){
      setOpenFilter(false)
    }
    else{
      setOpenFilter(true)
    }
  }, [width])
  const [count, setCount] = React.useState({})


  return (
    <div className='flex w-full'>
      <div style={{
        minMarginLeft: '15rem',
      }} className={`absolute left-0 top-[54%] w-4 h-10 border-y  border-black flex items-center justify-center z-50 cursor-pointer
      ${
        userSelectToOpenFilter===0 ? openFilter ? "ml-[max(14%,225px)] border-l rounded-l-md" : "border-r rounded-r-md" : userSelectToOpenFilter===1 ? "ml-[max(14%,225px)] border-l rounded-l-md": "border-r rounded-r-md"
      }
      `} onClick={()=>{
        setUserSelectToOpenFilter(p=>{
          if(p===0){
            if(width < 1024){
            return 1
            }
            else{
              return -1
            }
          }
          else if(p===1){
            return -1
          }
          else if (p===-1){
            return 1
          }
        
        })
      }}>
        
        {
          userSelectToOpenFilter===0 ? openFilter ? "<" : ">" : userSelectToOpenFilter===1 ? "<": ">"
        }
      </div>
    <div className={`w-[15%] h-screen border-t pl-2 flex-col pt-2 min-w-[240px] relative ${
      userSelectToOpenFilter===0 ? openFilter ? "flex" : "hidden" : userSelectToOpenFilter===1 ? "flex" : "hidden"
    }`}>
        <div className='flex h-10 bg-[#3743AE] justify-center rounded-t-xl border border-black border-b-0'>
            <div className=' h-full items-center flex text-white'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
            </svg>

            </div>
            <div className='h-full justify-start items-center flex font-semibold font-sans text-xl text-white'>
                Filtrele
            </div>

        </div>
        <div className='w-full h-full bg-white border border-black'>
<div className='w-full flex justify-center mt-3'>

        <div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{
          opacity: {
            duration: 0.35,
          },
        }} className={'w-52 h-[45px] rounded-xl border border-black bg-white flex justify-center items-center'}>
               <Select options={kategoriOptions} value={kategoriOptions[filter-1 <= 0 ? 0: filter-1]} defaultValue={kategoriOptions[0]} isSearchable={false} captureMenuScroll={false}
      onChange={(e) => { setFilter(e.value === 0 ? 0 : e.value );}}
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          'borderColor': 'grey',
          'width': '13rem',
          'display': 'flex',
          'height': '3rem',
          'boxShadow': 'none',
          '&:hover': { borderColor: 'grey' },
          'borderRadius': '0.5rem',
          'overflow': 'auto',
        }),
      }}

      components={{
        IndicatorSeparator: () => null,
        ValueContainer,
      }}

      />

        </div>
</div>

        <form>

    {
      filter === 3 || filter === 2
        ? <>
    </>
        : <div>
    <label htmlFor="" className='flex w-full justify-center mt-3 font-semibold font-sans '>
            Cinsiyet
        </label>

    

    <Select options={options} onChange={e => setSelectedGender(e)} defaultValue={{ value: 0, label: 'Tüm Cinsiyetler' }} styles={{
      control: (baseStyles, state) => ({
        ...baseStyles,
        'borderColor': 'grey',
        'boxShadow': 'none',
        '&:hover': { borderColor: 'grey' },
        'margin': '0.5rem',
        'borderRadius': '0.5rem',
        'paddingTop': '0.25rem',
        'paddingBottom': '0.25rem',
        'marginLeft': '1.5rem',
        'marginRight': '1.5rem',
      }),
      menu: (baseStyles, state) => ({
        ...baseStyles,
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
    </div>
    }
    

   

    <div >
        <label htmlFor="" className='flex w-full justify-center mt-3 font-semibold font-sans '>
            Fiyat Aralığı
        </label>
        <div className='flex w-full justify-evenly mt-1'>
        <input type="number" name="" id="" onChange={e => setMinSelectedPrice((p) => {
          if (e.target.value > 0)
            return e.target.value

          else
            return 0
        })} className='w-24 h-10 border border-black rounded-md text-base no-arrow text-center' placeholder='Minimum' />
        <span className=' font-bold mt-2'>-</span>
        <input type="number" name="" id="" onChange={e => setSelectedMaxPrice((p) => {
          if (e.target.value)
            return e.target.value

          else
            return Number.MAX_VALUE
        })} className='w-24 h-10 border border-black rounded-md text-base text-center ' placeholder='Maksimum' />

        </div>
    </div>

  </form>

        </div>

    </div>
    <div className={`w-[85%] h-[1600px] border-t pt-4
    ${
      userSelectToOpenFilter===0 ? openFilter ? "w-[85%]" : "w-full" : userSelectToOpenFilter===1 ? "w-[85%]": "w-full"
    }
    `}>
        <div className={`grid lg:grid-cols-auto-fill-300px ${
          
          userSelectToOpenFilter===0 ? openFilter ? "grid-cols-auto-fill-200px" : "grid-cols-auto-fill-300px": userSelectToOpenFilter===1 ? "grid-cols-auto-fill-200px": "grid-cols-auto-fill-300px"
          
          } px-2 gap-2`}>
        {
            (navbarText.length > 0 || filter !== 0 || selectedAge.value !== 0 || selectedGender.value !== 0 || selectedSize.value !== 0 || Number.parseInt(selectedMinPrice) > 0 || Number.parseInt(selectedMaxPrice) < Number.MAX_VALUE)
              ? filteredProducts.map((product, index) => {
                return <div className={'flex bg-white justify-center items-center overflow-hidden border rounded-xl ml-0.5'}
                key={index}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}

                >
                             <div  className='flex flex-col h-full bg-white rounded-xl w-full py-2 '>
                                    <Link href={`/products/${product?.id}`} className='bg-white pb-2 max-h-[75%] flex justify-center py-4  h-[256px]'>
                                    
                                    <Image width={256} height={256} loading="lazy" src={`${process.env.NEXT_PUBLIC_CDN_URL}/products/${product.id}`} alt="" className='max-h-[256px] min-h-[256px] max-w-[256px] h-[256px]' layout='responsive' quality={100} />
                                    </Link>
                                    <div className='mt-4 translate-y-4'>

                                    <Link href={`/products/${product?.id}`} className='flex justify-between px-2 items-center '>
                                        <span className='text-sm text-center font-medium '>
                                        {
                                          product?.name
                                        }
                                        </span>
                                        <span className='text-sm font-medium whitespace-nowrap'>

                                           {
                                              product?.price
                                           } TL
                                        </span>

                                    </Link>
                                    <div className='flex w-full justify-between items-center gap-2 pl-2 pr-4 '>

                                       <div className='flex justify-center items-center gap-1'>
                                        <div className='w-3 h-3 rounded-full bg-orange-400 flex'>

                                        </div>
                                        <span className='text-xs text-center font-medium flex items-center justify-center'>
                                            {
                                                product?.point1.toFixed(2)
                                            }
                                        </span>
                                       </div>
                                       <button className='w-10 h-8 rounded-lg flex justify-center items-center bg-green-400' onClick={
                                        ()=>{

  try {
    if (count[product.id] && count[product.id] >= 1) {
      console.log(count)
      setCount(prev => ({
        ...prev,
        [product.id]: prev[product.id] + 1,

      }))

      addToCart(product.id, 1)
      toast.success(`Toplam ${count[product.id] + 1} adet ${product.name} sepete eklendi`, {
        id:product.id,
      })
    }
    else {
      console.log({ [product.id]: 1 })

      setCount(prev => ({
        ...prev,
        [product.id]: 1,
      }))

      addToCart(product.id, 1)
      toast.success(`${product.name} sepete eklendi`, {
        id:product.id,
      })
    }
  }
  catch (err) {
    console.log(err);
    toast.error(`${product.name} sepete eklenemedi`, {
      id:product.id,
    })
  }
                                      }}
                                       >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                        stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                            color='white'/>
                    </svg>

                </button>
                                    </div>
                                    </div>
                                    <Toaster
                                    position='right'
                                    />
                                </div>

                </div>
              },
              )
              : products?.map((product, index) => {
                return <div className={'flex bg-slate-50 justify-center items-center overflow-hidden border rounded-xl ml-0.5 shadow-lg'}
                    key={index}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}

                    >
                                <div className='flex flex-col h-full bg-white rounded-xl w-full '>
                                    <div className='h-[60%] border-b bg-[#C6C7CB] border-black pb-2 max-h-[75%] flex justify-center py-4'>

                                    <Image width={100} height={100} src={`${process.env.NEXT_PUBLIC_CDN_URL}/products/${products?.[index]?.id}`} alt="" className='max-h-[160px] max-w-[100%]' />
                                    </div>
                                    <div className='mt-3'>

                                    <div className='flex justify-between px-2 items-center '>
                                        <span className='text-base text-center font-bold '>
                                        {
                                          products?.[index]?.name
                                        }
                                        </span>
                                        <span className='text-base font-bold'>

                                           {
                                              products?.[index]?.price
                                           }
                                        </span>

                                    </div>
                                    <div className='flex w-full justify-between items-center gap-2 pl-2 pr-4'>

                                       <div className='flex justify-center items-center gap-1'>
                                        <div className='w-3 h-3 rounded-full bg-orange-400 flex'>

                                        </div>
                                        <span className='text-sm text-center font-semibold'>
                                            {
                                                products?.[index]?.point1
                                            }
                                        </span>
                                       </div>
                                        <div className='w-10 h-8 rounded-lg flex justify-center items-center bg-green-400' onClick={() => { addToCart(products[index].id,1) }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" color='white' />
                </svg>

                                        </div>
                                    </div>
                                    </div>

                                </div>

                    </div>
              },
              )

        }

        </div>

    </div>
    </div>
  )
}