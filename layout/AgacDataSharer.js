// AgacDataSharer.js
import React, { useEffect, useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
export const SharedContext = React.createContext({})

function AgacDataSharer({ children }) {
  const [apiData, setApiData] = useState({})
  const [allUsers, setAllUsers] = useState({})
  const [changeableUsers, setChangeableUsers] = useState({})
  const [preference, setPreference] = useState({})// [0] = [left,right
  const [fullUserData, setFullUserData] = useState({})
  const [bulusmaTarihi, setBulusmaTarihi] = useState([])// [0] = [left,right
  const [products, setProducts] = useState([])// [0] = [left,right
  const [favoriteProducts, setFavoriteProducts] = useState([])// [0] = [left,right
  const [links, setLinks] = useState({})
  const [categories, setCategories] = useState([])// [0] = [left,right
  const [mapData, setMapData] = useState([])// [0] = [left,right
  const [orderData, setOrderData] = useState([])
  const [ordersChecked, setOrdersChecked] = useState(false)
  const [hissedarBonusuMoney, setHissedarBonusuMoney] = useState(0)
  const [connectedCategories, setConnectedCategories] = useState([])// [0] = [left,right
  const session = useSession()
  useEffect(() => {
    fetch('/api/images/links').then(apiLinks => {
      return apiLinks.json()
    }
    ).then(apiLinks => {
      setLinks(apiLinks)
    })
    console.log(session)
    console.log(apiData)
  
   
    if (session.status === 'loading')
      return
  
    if(session?.data?.invalid) {
      signOut()
      return
    }
    console.log(session);
    if (products && products.length === 0) {
      console.log('here')

      fetch('/api/finalEndPoints/products').then((res) => {
        return res.json()
      }).then(res=>{
        if(session?.status === 'authenticated' && session?.data?.user?.has_saleAccount === true && session?.data?.user?.saleAccountId !== null){ 
          setProducts(res.products.filter(product => product.special !== 1))
        }else{
          setProducts(res.products)
        }
      }).catch((err) => {
        console.log(err)
      })
    }
    if(connectedCategories && connectedCategories.length === 0){
      fetch('/api/finalEndPoints/connectedCategories').then((res) => {
        return res.json()
      }).then(res=>{
        console.log(res);
        setConnectedCategories(res.connectedCategories)
      })
      .catch((err) => {
        console.log(err)
      })
    }
    if( categories && categories.length === 0){
      fetch('/api/finalEndPoints/categories').then((res) => {
        return res.json()
      }).then(res=>{
        console.log(res);
        setCategories(res.categories)
      })
      .catch((err) => {
        console.log(err)
      })
    }
    if(bulusmaTarihi && bulusmaTarihi.length === 0){
      fetch('/api/finalEndPoints/bulusmaTakvim').then((res) => {  
        console.log(res)
        return res.json()
      })
      .then(res=>{
        console.log(res);
        setBulusmaTarihi(res.bulusmaTarihi)
      })
      .catch((err) => {
        console.log(err)
      })
    }
    if (session.status === 'unauthenticated') {
     // signOut()
      return 
    }
    if(ordersChecked === false && session?.data?.user?.id){
      fetch(` /api/finalEndPoints/orders/${session.data.user.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }).
        then(res => res.json()
        ).
        then((data) => {
          console.log(data)
          setOrderData(data)
        })
        setOrdersChecked(true)
    }

   
    if (apiData === undefined)
      return
    if (Object.keys(apiData).length === 0 && session.data) {
      fetch(`/api/finalEndPoints/user/${session.data.user.id}`).then((res) => {
        return res.json()
      }).then(res=>{
        const addresses = res.user.addressData
        const preference = res.user.Preference
        setPreference(preference)
        setApiData(addresses)
        setFullUserData(res.user)
      }).catch(e=>{
        console.log(e,"weeee");
      })
    }

    if (favoriteProducts.length === 0 && session.data) {
      console.log('here')
      fetch('/api/user/favorites').then((res) => {
        return res.json()
      }
      ).then(res=>{
        setFavoriteProducts(res)
      },
      ).catch((err) => {
        console.log(err)
      })
    }
    if (Object.keys(allUsers).length === 0 && session.data) {
      if (!session.data.user?.saleAccountId)
        return
      fetch(`/api/finalEndPoints/uye/tree/?id=${session.data.user.saleAccountId}`).then((res) => {
        return res.json()
      }).then(res=>{
        setAllUsers(res)
      })

      fetch('/api/finalEndPoints/uye/mapInfo').then(res => {
        return res.json()
      }
      ).then(res => {
        setMapData(res)
      }).catch(e => console.log(e))

      fetch("/api/finalEndPoints/hissedarBonusu").then(res => {
        return res.json()
      }).then(res => {
        setHissedarBonusuMoney(res)
      }).catch(e => console.log(e))

    }
    if (Object.keys(changeableUsers).length === 0 && session.data) {
      fetch(`/api/finalEndPoints/uye/changeTreePositions/?sale_account_id=${session.data.user.saleAccountId}`).then((res) => {
        console.log(res)
        return res.json()
      }).then(res=>{
        console.log(res);
        setChangeableUsers(res)
      })
    }
  }, [session.status])



  return (
        <SharedContext.Provider value={{ apiData, links, allUsers, changeableUsers, preference, fullUserData, products, favoriteProducts,setApiData, session ,categories,mapData,bulusmaTarihi,orderData,hissedarBonusuMoney,connectedCategories}}>
            {children}
        </SharedContext.Provider>
  )
}

export default AgacDataSharer
