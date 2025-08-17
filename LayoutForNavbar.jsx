// LayoutForNavbar.js
import React from 'react'

export const NavbarTextContext = React.createContext()

export default function LayoutForNavbar({ children }) {
  const [navbarText, setNavbarText] = React.useState('')
  const [filter, setFilter] = React.useState(0)
  const [showProducts, setShowProducts] = React.useState(false)

  const isBrowser = () => typeof window !== 'undefined'

  return (
    <>
      <NavbarTextContext.Provider
        value={{
          navbarText,
          setNavbarText,
          setFilter,
          filter,
          showProducts,
          setShowProducts,
        }}
      >
        {children}
      </NavbarTextContext.Provider>
    </>
  )
}
