    import React from 'react'
    import Link from 'next/link'
    import toast, { Toaster } from 'react-hot-toast'
    import { CartContext } from '../Cart/CartContextProvider'

    export default function FilterPartToast2({ id, name, productCount }) {
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
            console.log(id);

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

    //  React.useEffect(() => {
    //    console.log("useeffect");
    //    toast.remove()
    //    }
    //    , [closeAllToasters])

    return (
            <div className='flex items-center' key={id}>
                <button className='w-10 h-8 rounded-lg flex justify-center items-center bg-green-400' onClick={notify}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                        stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                            color='white'/>
                    </svg>

                </button>
                    

                    <Toaster
                        position='bottom-left'
                        key={id}
                    />
            </div>
    )
    }
