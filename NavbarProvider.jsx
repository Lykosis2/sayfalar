// NavbarProvider.js
import React from 'react'

export const NavbarTextContext = React.createContext({})

export function NavbarTextContextProvider({ children }) {
  const [navbarText, setNavbarText] = React.useState('')
  const [filter, setFilter] = React.useState(0)
  const [showProducts, setShowProducts] = React.useState(false)
  const [sortby, setSortby] = React.useState(0)

  return (
    <NavbarTextContext.Provider
      value={{ navbarText, setNavbarText, setFilter, filter, showProducts, setShowProducts, sortby, setSortby }}
    >
      {children}
    </NavbarTextContext.Provider>
  )
}
