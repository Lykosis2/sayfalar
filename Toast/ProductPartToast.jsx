import React from 'react'
import Link from 'next/link'
import toast, { Toaster } from 'react-hot-toast'
import { CartContext } from '../Cart/CartContextProvider'

export default function ProductPartToast({ id, name, productCount }) {
  const { addToCart } = React.useContext(CartContext)
  const notify = () => {
    try {
      if (productCount > 1) {
        addToCart(id, productCount)
        toast.success(`Toplam ${productCount} adet ${name} sepete eklendi`)
      }
      else {
        addToCart(id, productCount)
        toast.success(`${name} sepete eklendi`)
      }
    }
    catch (err) {
      toast.error(`${name} sepete eklenemedi`, {
        id,
      })
    }
  }

  //  React.useEffect(() => {
  //    console.log("useeffect");
  //    toast.remove()
  //    }
  //    , [closeAllToasters])

  return (
    <div className='flex items-center'>
    <button className=' w-80 xl:w-96 h-16 rounded-xl bg-primary mb-4' onClick={notify}>
    <span className='text-white text-2xl select-none w-full h-full flex items-center justify-center'>
        Sepete Ekle
        </span>

                                        </button>
                                        <Link href={'/cart'}>

<Toaster
position='bottom-right'
/>
  </Link>
    </div>
  )
}
