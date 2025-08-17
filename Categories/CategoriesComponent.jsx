import Categories from './Categories'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import CategoryProduct from './CategoryProduct'
import { SharedContext } from '../layout/AgacDataSharer'

export default function CategoriesComponent() {
  const [selectedCategory, setSelectedCategory] = useState(0)
  const [closeAllToasters, setCloseAllToasters] = useState(false)
  const [filteredProducts, setFilteredProducts] = useState([])
  const filtering = useRef(false)
  const {products} = useContext(SharedContext)

  function passToChild(input) {
    setCloseAllToasters((p) => {
      return true
    })
    setSelectedCategory(input)
    setCloseAllToasters((p) => {
      return false
    })
  }

  function filterProducts() {
    filtering.current = true
    const tempArray = []
    if (selectedCategory === 0) {
      setFilteredProducts([])
      filtering.current = false
      return
    }
    products.forEach((product) => {
      console.log(product)
      console.log(selectedCategory)
      console.log(product.categories.includes(selectedCategory))
      if (product.categories.includes(selectedCategory))
        tempArray.push(product)
    })
    if (tempArray.length > 0)
      setFilteredProducts(tempArray)

    else setFilteredProducts([])

    filtering.current = false
  }
  
  useEffect(() => {
    if (!filtering.current)
      filterProducts()
  }, [selectedCategory])
  const [memoizedProducts, setMemoizedProducts] = useState([])

  useEffect(()=>{filteredProducts.length > 0 ? setMemoizedProducts(filteredProducts) : setMemoizedProducts(products) },[filteredProducts,products])
  console.log(memoizedProducts,"memoizedProducts");
 


  return (

    <div className='lg:px-16 px-2 flex w-full h-[700px] overflow-auto mt-12 relative'>
        <div className='w-[25%]' >
            <Categories passToParent={passToChild} />
        </div>
        <div className='flex w-full h-full max-h-[680px] rounded-b-xl min-w-0 bg-white border-t rounded-t-xl border-l flex-col'>

          

         <div className='w-full min-w-[250px] max-h-[631px] h-[calc(100%-3rem)] rounded-b-xl gap-3 p-3 overflow-y-auto flex justify-center flex-wrap'>
            {(!!memoizedProducts  && memoizedProducts.length > 0 && filteredProducts.length <= 0)
              && memoizedProducts.map((product) => {
                return (
                        <CategoryProduct
                        product={product}
                        key={product.id}
                        category = {selectedCategory}
                        closeAllToasters={closeAllToasters}
                        />
                )
              })
            }


        </div>
        </div>

    </div>

  )
}
