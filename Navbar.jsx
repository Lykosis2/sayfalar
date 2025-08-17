import React, { useContext, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Select,{components} from 'react-select'
import Image from 'next/image'
import { CartContext } from './Cart/CartContextProvider'
import { NavbarTextContext } from './NavbarProvider'
import useWindowSize from './hooks/useWindowDimension'
import { SharedContext } from './layout/AgacDataSharer'

export default function Navbar() {
  const { navbarText, setNavbarText, filter, setFilter, showProducts, setShowProducts, sortby, setSortby } = useContext(NavbarTextContext) ?? {}
  const { cartProducts, setCartProducts } = useContext(CartContext) ?? {}
  const router = useRouter()
  const inputRef = useRef(null)
  const isFilter = router.pathname === '/filter'
  const [imageSrc, setImageSrc] = useState('/logo.png')
  const size = useWindowSize()
  const {categories:options} = useContext(SharedContext)
  console.log(options,"options");
  const [selectableOptions , setSelectableOptions] = useState([])

  useEffect(() => {
    if(options){
      const temp = options.map((option)=>{
        if(option.id === null){
          return {
            value:0,
            label:option.label,
            icon:option.icon
          }
        }
        return {
          value:option.id ,
          label:option.label,
          icon:option.icon
        }
      })
      setSelectableOptions(temp)
    }
  }, [options])

  useEffect(() => {
    if (router && router?.pathname &&  router.pathname.includes('/filter') && inputRef.current)
      inputRef.current.focus()
    if(router && router?.pathname && !router.pathname.includes('/filter') ){
      setShowProducts(false)
      
    }
  }, [])

  const sortOptions = [
    { value: 0, label: 'Alakaya Göre Sırala' },
    { value: 1, label: 'Fiyata Göre Sırala' },
    { value: 2, label: 'Yeni Ürüne Göre Sırala' },
  ]
  useEffect(() => {
    if (size.width > 1024) {
      if (imageSrc !== 'logo.png')
        setImageSrc('/logo.png')
    }
    else {
      if (imageSrc !== '/smallLogo.jpeg')
        setImageSrc('/smallLogo.jpeg')
    }
  }, [size.width])

  const ValueContainer = ({ children, ...props }) => {
    const selectedOption = props?.selectProps?.value

    return (
        <div style={{ display: 'flex', alignItems: 'center' , overflow:"hidden" }}>
          {selectedOption && (
            <>
              <Image src={selectedOption?.icon} alt="Icon" width={24} height={24} />
              <span className='xl:text-sm text-xxs sm:flex hidden'>

              {selectedOption?.label}
              </span>
            </>
          )}
        </div>
    )
  }

  return (
    <div className='bg-white sticky  z-50 top-0'>

      <div className='lg:px-16 pt-4 '>
  {
    // TOP
  }
      <div className='w-full bg-white h-20 flex md:justify-between justify-center sm:gap-6 gap-2' >
          <div onClick={() => {
            router.push('/home')
          }} className='flex lg:w-[20%] lg:ml-[5%] ml-2 justify-start items-center  cursor-pointer select-none' >
              <Image loading='lazy' src={imageSrc} width={`${size.width >= 1024 ? '200' : '40'}`} height={40} alt="image"
              className=' max-w-full flex w-26 h-12' />
          </div>
          <div className=' w-[60%] lg:ml-0 ml-1 text-black flex justify-center items-center ' >
              <div className='flex  justify-center  border-solid border w-full h-[75%] mt-4 items-center rounded-3xl  ' >
                <div className='w-[5%] ml-5'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>

                </div>
                <div className='w-[70%] '>
                  <input ref={inputRef} aria-label="filter" data-testid="input-filter" className='w-full ml-2 outline-none' type="text" value={navbarText} onChange={(e) => {
                    if(setNavbarText && typeof setNavbarText === 'function') setNavbarText(e.target.value)
                  }} />
                </div >
                
                <div className={'md:w-[25%] md:min-w-[150px] w-24 justify-center flex border-l-gray-400 border-l '}>

                  <Select className='lg:w-48 w-full lg:pr-2  lg:text-base text-xxs flex z-50' options={selectableOptions} value={selectableOptions?.[filter<= 0 ? 0 : filter-1]} isSearchable={false} captureMenuScroll={false}
        onChange={(e) => { 
          setFilter(e.value) }}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            'border': 'none',
            'display': 'flex',
            'height': '3rem',
            'boxShadow': 'none',
            '&:hover': { borderColor: 'grey' },
            'borderRadius': '0.5rem',
            'overflow': 'auto',
          }),

          singleValue: (baseStyles, state) => ({
            ...baseStyles,
            display: size.width >= 768 ? 'flex' : 'none',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',

          }),
        }}

        components={{
          IndicatorSeparator: () => null,
          ValueContainer,
        }}

        />  
                </div>

              </div>
          </div>
          <div className='lg:w-[20%] flex items-center justify-center  mt-3'>

  <div className='flex w-full lg:justify-end justify-center items-center lg:gap-8 gap-2 lg:mr-8 mt-3'>
              <Link href="/profile"  aria-label="profil">

              <div className='w-12 h-12  bg-gray-200 rounded-full justify-center items-center flex' >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
    <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
  </svg>

              </div>
              </Link>

              <Link href= "/cart" aria-label="cart">

              <div className='w-12 h-12 border bg-gray-200 rounded-full justify-center items-center flex relative'>
              <svg data-testid="cart-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M6 5v1H4.667a1.75 1.75 0 00-1.743 1.598l-.826 9.5A1.75 1.75 0 003.84 19H16.16a1.75 1.75 0 001.743-1.902l-.826-9.5A1.75 1.75 0 0015.333 6H14V5a4 4 0 00-8 0zm4-2.5A2.5 2.5 0 007.5 5v1h5V5A2.5 2.5 0 0010 2.5zM7.5 10a2.5 2.5 0 005 0V8.75a.75.75 0 011.5 0V10a4 4 0 01-8 0V8.75a.75.75 0 011.5 0V10z" clipRule="evenodd" />
  </svg>
  {
  cartProducts && cartProducts?.length > 0

  && <div className='w-4 h-4 rounded-full absolute bg-amber-600 right-0 -bottom-1 text-center text-xs text-white'>
  {
  cartProducts ? cartProducts?.length : 0
  }
  </div>
  }
              </div>
              </Link>

  </div>

          </div>

      </div>

      <div className='w-full bg-white h-16 flex justify-between shadow-down-sm md:flex-row flex-col ' >
        <div className='lg:ml-24 ml-6 mb-3 items-end  flex ' >

            {

              isFilter || showProducts
                ? (

              <></>

                  )
                : <div className={'w-40 h-12 rounded-xl border border-black bg-gray-100 justify-center items-center md:flex hidden'} data-testid='category-select' >
                <div className='flex justify-center items-center opacity-95' >

                <Select aria-label='category-select-component' className='md:flex hidden ' options={selectableOptions} value={selectableOptions?.[filter<= 0 ? 0 : filter-1]} isSearchable={false} captureMenuScroll={false}
      onChange={(e) => { setFilter(e.value) }}
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          'borderColor': 'grey',
          'width': '12rem',
          'display': 'flex',
          'height': '3rem',
          'borderRadius': '0.75rem',
          'boxShadow': 'none',
          '&:hover': { borderColor: 'grey' },
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

            }


        </div>
        <div className='flex w-full text-black  lg:justify-end justify-center items-end mb-4 lg:mr-16 text-lg'>
          <div className='flex md:gap-6 sm:gap-4 gap-2.5'>
            <Link href={'/home'} className='text-black hover:text-red-600 transition-colors ease-in lg:text-lg sm:text-base text-sm' onClick={() => {
              if (typeof setShowProducts === 'function')
                setShowProducts(false)

              if (((navbarText.length > 0) || (filter !== 0) || showProducts) && typeof setNavbarText === 'function' && typeof setFilter === 'function') {
                setNavbarText('')
                setFilter(0)
                setShowProducts(false)
              }
            }}>
              Anasayfa
            </Link>
              <Link href='/filter' className='text-black hover:text-red-600 lg:text-lg sm:text-base text-sm transition-colors ease-in duration-200 cursor-pointer' onClick={() => {
                if(setShowProducts && typeof setShowProducts === 'function') setShowProducts(true)
              } }>
                Ürünler
              </Link>
            <Link href="/bulusmaTakvim" className='text-black hover:text-red-600 lg:text-lg sm:text-base text-sm transition-colors ease-in duration-200' >
              Buluşmalar
            </Link>
            <Link href="/uye" className='text-black hover:text-red-600 lg:text-lg sm:text-base text-sm transition-colors ease-in duration-200 whitespace-nowrap' >
              Üyelik
            </Link>
            <Link href="/favoriler" className='text-black hover:text-red-600 lg:text-lg sm:text-base text-sm transition-colors ease-in duration-200' >
            Favoriler
            </Link>
            <Link href="/iletisim" className='text-black hover:text-red-600 lg:text-lg sm:text-base text-sm transition-colors ease-in duration-200' >
              İletişim
            </Link>

          </div>
        </div>
      </div >
      </div>
    </div>
  )
}
