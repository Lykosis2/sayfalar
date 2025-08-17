import React, { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Layout from '@/components/layout/NavbarandProviderLayout'
import { SharedContext } from '@/components/layout/AgacDataSharer'
import ProductComponent from '@/components/ProductComponent'
import useFilterable from '@/components/hooks/useFilterable'
import { signOut } from 'next-auth/react'
import ExitIcon from '@/components/icons/ExitIcon'


// TODO : SESSIONA BAK 
export default function Uye() {
  const router = useRouter()
  const {products,session} = React.useContext(SharedContext)
  const [specialProducts,setSpecialProducts] = React.useState([])
  useEffect(() => {
    if(products.length === 0)return
    setSpecialProducts(products.filter((product)=>product.special === 1))
  },[products])
  const filterable = useFilterable()

 


  React.useEffect(() => {
    if(session.status === 'loading')return
    if(session?.data?.user?.has_saleAccount && session?.status === "authenticated"){
      router.replace('/uye/uyeleriniz')
    }
  },[session.status])
if(!session?.data?.user?.has_saleAccount ){
  return (
    <Layout>
        <div className="w-full h-full flex flex-col justify-center gap-10 text-center py-10 px-20">
                <h1 className="text-2xl font-semibold">İş Paketlerimiz</h1>
                <div className="grid grid-cols-auto-fill-300px gap-3">
                    {
                    specialProducts.map((product, i) => {
                      return <ProductComponent product={product} key={i} namedToast={`${product.id + i}first`}/>
                    },
                    )}
                </div>
                <span className=''>
                  Eğer iş paketini satın aldıysanız lütfen çıkış yapıp tekrar giriş yapınız. Hesabınız aktive olacaktır.
                  <button className="bg-primary text-white rounded-lg p-1" onClick={()=>{
                    signOut().then(()=>{
                      window.location.replace("/login")
                    })
                  }}>
                    <span className='flex px-2 '>
                    Çıkış Yap<ExitIcon/>
                    </span>
                    </button>
                </span>
          </div>
    </Layout>
  )
}
  
return <div className="h-screen w-screen grid place-items-center">
<h1 className="text-black text-3xl">Yönlendiriliyorsunuz..</h1>
</div>
}
