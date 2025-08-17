import React, { useContext, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Layout from '@/components/layout/NavbarandProviderLayout'
import ProductComponent from '@/components/ProductComponent'
import { NavbarTextContext } from '@/components/NavbarProvider'
import { SharedContext } from '@/components/layout/AgacDataSharer'
import useFilterable from '@/components/hooks/useFilterable'

export default function Favoriler() {
  const { favoriteProducts, products } = useContext(SharedContext)
  const [convertedProducts, setConvertedProducts] = React.useState({})
  const filterable = useFilterable()
  useEffect(() => {
    const temp = {}
    products.forEach((product) => {
      temp[product.id] = product
    })
    setConvertedProducts(temp)
  }, [products])



  

  return (
        <Layout>
            <div className="w-full h-full flex flex-col justify-center gap-10 text-center py-10 px-20">
                <h1 className="text-2xl font-semibold">Favoriler</h1>
                <div className="grid grid-cols-auto-fill-300px gap-3">
                    {

                    favoriteProducts.map((product, i) => {
                      console.log(product)
                      console.log(convertedProducts[product])
                      return <ProductComponent product={convertedProducts[product]} key={i} namedToast={`${product + i}first`}/>
                    },
                    )}
                </div>
            </div>
        </Layout>
  )
}
