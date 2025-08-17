import * as React from 'react'
import * as Toast from '@radix-ui/react-toast'
import Image from 'next/image'
import { CartContext } from './Cart/CartContextProvider'

function ToastDemo({
  image,
  name,
  id,
  productCount,
}) {
  const [open, setOpen] = React.useState(false)
  const eventDateRef = React.useRef(new Date())
  const timerRef = React.useRef(0)
  const [count, setCount] = React.useState(0)
  const { addToCart } = React.useContext(CartContext)

  React.useEffect(() => {
    return () => clearTimeout(timerRef.current)
  }, [])

  return (
      <Toast.Provider swipeDirection="right">
        <button className=' w-80 xl:w-96 h-16 rounded-xl bg-primary mb-4'
          onClick={() => {
            if (id !== 404) {
              console.log(id)
              addToCart(id, productCount)
            }
            setOpen(false)
            window.clearTimeout(timerRef.current)
            timerRef.current = window.setTimeout(() => {
              setOpen(true)
              setCount(prev => prev + 1)
            }, 100)
          }}
          >
          <span className='text-white text-2xl select-none'>
            Sepete Ekle
          </span>

        </button>

        <Toast.Root className="ToastRoot" open={open} onOpenChange={setOpen}>
          <Toast.Title className="ToastTitle select-none" onClick={() => {
            window.open('/cart', '_self')
          }} >
            <div className='flex items-end cursor-pointer select-none'>

            <Image loading='lazy' src={image} width={100} height={100} alt="" className=' w-14 h-18 flex  select-none ' draggable={false}/>
            <span className='text-lg ml-2'>
              {
                id === 404 ? 'Ürün bulunamadı' : ' Ürün sepete eklendi'
              }

            </span>
            </div>
            </Toast.Title>
          <Toast.Description asChild onClick={() => {
            window.open('/cart', '_self')
          }} >

            <time className="ToastDescription" dateTime={eventDateRef.current.toISOString()}>
              {
                id === 404 ? 'Ürün Bulunamadı' : `${name} Sepete eklendi`
}

            </time>

          </Toast.Description>
          {/* <Toast.Action className="ToastAction" asChild altText="Goto schedule to undo">
            {
              id === 404 ?
              <>
              </>
              :
              <button className="Button small green" onClick={() => {
                // cart.delete(product.id)
              }}>Geri al</button>
            }

          </Toast.Action> */}
        </Toast.Root>
        <Toast.Viewport className="ToastViewport" />
      </Toast.Provider>
  )
}

export default ToastDemo
