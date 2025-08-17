import React, { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { NavbarTextContext } from '@/components/NavbarProvider'
import Layout from '@/components/layout/NavbarandProviderLayout'
import MainComponent from '@/components/iletisim/MainComponent'
import useFilterable from '@/components/hooks/useFilterable'

export default function iletisim() {
  const filterable = useFilterable()

  return (
    <Layout>
      <MainComponent/>
    </Layout>
  )
}
