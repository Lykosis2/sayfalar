import React, { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import FilterComponent from '@/components/FilterComponent/FilterComponent'
import Layout from '@/components/layout/NavbarandProviderLayout'
import { NavbarTextContext } from '@/components/NavbarProvider'

export default function Filter() {
  const { navbarText, setNavbarText, filter, setFilter, showProducts, setShowProducts } = React.useContext(NavbarTextContext)
  const router = useRouter()
  const isBrowser = () => typeof window !== 'undefined' // The approach recommended by Next.js
  const typingTimeoutRef = useRef(null)

  useEffect(() => {
    // Scroll to top on mount
    function scrollToTop() {
      if (!isBrowser())
        return
      window.scrollTo({ top: 0 })
    }

    scrollToTop()
  }, [])

  const isQueryInitialized = React.useRef(false)
  useEffect(() => {
    if (!isQueryInitialized.current) {
      const query = router.query.q
      const category = router.query.category
      if (query) {
        setNavbarText(query)
        isQueryInitialized.current = true
      }
      if (category) {
        setFilter(category)
        isQueryInitialized.current = true
      }
    }
    else {
      if ((navbarText.length > 0 || filter !== 0) && !isQueryInitialized.current)
        isQueryInitialized.current = true

      if (navbarText.length === 0 && filter === 0 && !showProducts) {
        // router.push('/home')

        isQueryInitialized.current = true
      }
    }
  }, [navbarText, filter, showProducts, router, isQueryInitialized])

  const lastMessageTime = React.useRef(Date.now())
  useEffect(() => {
    lastMessageTime.current = Date.now()
    // if (isQueryInitialized.current ===false )isQueryInitialized.current = true

    if (navbarText.length === 1)
      router.replace('/filter', { query: { q: navbarText } })
    if (isQueryInitialized.current && navbarText.length === 0 && filter === 0)
      router.replace('/filter', '') // Gerekirse router.push("/filter") yap

    setTimeout(() => {
      if (Date.now() - lastMessageTime.current > 1000) {
        if ((navbarText.length > 0 || filter !== 0) && !isQueryInitialized.current)
          isQueryInitialized.current = true

        if (navbarText.length > 0 && isQueryInitialized.current) {
          if (filter !== 0) {
            router.replace('/filter', { query: { q: navbarText, category: filter } })
          }
          else {
            router.replace('/filter', { query: { q: navbarText } })
          }
        }
        else if (filter !== 0 && isQueryInitialized.current && router.query.category !== filter) {
          router.replace('/filter', { query: { category: filter } })
        }
        else if (navbarText.length === 0 && filter === 0 && isQueryInitialized.current) {
          router.replace('/filter')
        }
      }
    }, 1000)
  }, [navbarText, isQueryInitialized, filter])

  return (
        <Layout>
            <FilterComponent />
        </Layout>
  )
}
