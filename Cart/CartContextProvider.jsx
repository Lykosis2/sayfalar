'use client'
import { createContext, useEffect, useState } from 'react'

export const CartContext = createContext({})

export function CartContextProvider({ children }) {
  const ls = typeof window !== 'undefined' ? window.localStorage : null
  const [cartProducts, setCartProducts] = useState([])
  const [lockCart, setLockCart] = useState(false)
  useEffect(() => {
    if(lockCart) return
    if (cartProducts.length > 0)
      ls?.setItem('cart', JSON.stringify(cartProducts))
  }, [cartProducts])

  useEffect(() => {
    if (ls && ls.getItem('cart'))
      setCartProducts(JSON.parse(ls.getItem('cart')))
  }, [])
  function clearCart() {
    if(lockCart) return
    setCartProducts([])
    ls.removeItem('cart')
  }
  function addToCart(product, quantity) {
    console.log(product)
    console.log(quantity)
    if(lockCart) return
    const tempArray = Array(quantity).fill(product.toString())
    console.log(tempArray)
    setCartProducts(prev => [...prev, ...tempArray])
  }
  function removeFromCart(id) {
    if(lockCart) return
    setCartProducts((prev) => {
      const pos = prev.indexOf(id.toString())
      if (pos !== -1) {
        const returnValue = prev.filter((value, index) => index !== pos)
        if (returnValue.length <= 0) {
          ls.removeItem('cart')
          return []
        }
        return returnValue
      }

      return prev
    })
  }
  function removeAllFromCart(id) {
    console.log(id)
    console.log(cartProducts);
    console.log(lockCart);
    if(lockCart) return
    setCartProducts((prev) => {
      const returnValue = prev.filter((value) => { return value !== id.toString() })
      console.log(returnValue)
      if (returnValue.length <= 0) {
        ls.removeItem('cart')
        return []
      }
      return returnValue
    },
    )
  }

  return (
        <CartContext.Provider value={{ cartProducts, setCartProducts, addToCart, removeFromCart, clearCart, removeAllFromCart,setLockCart }}>
            {children}
        </CartContext.Provider>
  )
}
