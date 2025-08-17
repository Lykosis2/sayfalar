import * as React from 'react'
import toast, { Toaster } from 'react-hot-toast'
import Link from 'next/link'
import ShoppingCartIcon from '../icons/ShoppingCartIcon'
import { CartContext } from '../Cart/CartContextProvider'

function SmallToastButton({
  name,
  id,
  productCount,
  closeAllToasters,
}) {
  const [count, setCount] = React.useState({})
  const { addToCart } = React.useContext(CartContext)
  const notify = () => {
    try {
      if (count[id] && count[id] >= 1) {
        console.log(count)
        setCount(prev => ({
          ...prev,
          [id]: prev[id] + 1,

        }))

        addToCart(id, productCount)
        toast.success(`Toplam ${count[id] + 1} adet ${name} sepete eklendi`, {
          id,
        })
      }
      else {
        console.log({ [id]: 1 })

        setCount(prev => ({
          ...prev,
          [id]: 1,

        }))

        addToCart(id, productCount)
        toast.success(`${name} sepete eklendi`, {
          id,
        })
      }
    }
    catch (err) {
      toast.error(`${name} sepete eklenemedi`, {
        id,
      })
    }
  }

  React.useEffect(() => {
    console.log('useeffect')
    toast.remove()
  }
  , [closeAllToasters])

  // Clear the timeout when the component unmounts (i.e. when the toast is closed)

  return (
     <div className='flex items-center'>
        <button className=' w-10 h-8 rounded-lg flex justify-center items-center bg-button-green'
         aria-label="AddToCart"
          onClick={

        notify
          }
          >
          <ShoppingCartIcon/>

        </button>
        <Link href={'/cart'}>

      <Toaster
      position='bottom-right'
      />
        </Link>
     </div>
  )
}

export default SmallToastButton
