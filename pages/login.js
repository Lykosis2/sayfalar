import { signIn } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import z from 'zod'
import { SharedContext } from '../components/layout/AgacDataSharer'
import XmarkIcon from '../components/icons/XmarkIcon'
export default function login() {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [errorFields, setErrorFields] = React.useState([])
    const [error, setError] = React.useState('')
    const [makeLoginClickable, setMakeLoginClickable] = React.useState(false)
    const [showPasswordDialog, setShowPasswordDialog] = React.useState(false)
    const router = useRouter()
    const {session} = useContext(SharedContext)
    const [showError, setShowError] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState('')
    const checkDataAndSignIn = async (e) => {
        e.preventDefault()
        setErrorFields([])
        if (email.length === 0 || password.length === 0) {
            alert('Lütfen tüm alanları doldurunuz')
            return
        }

        const formData = {
            email,
            password,
        }

        const schema = z.object({
            email: z.string().email(),
            password: z.string().min(2).max(50),
        })

        try {
            schema.parse(formData)
        }
        catch (error) {
            console.log(error);
            setErrorFields(error.issues.map(issue => issue.path))
            alert(error)
            return
        }
        console.log("girdi")
        const a = await signIn("credentials",{redirect:false,email:email,password:password}).catch((err) => {
            console.log(err);
            alert(err)
        })
        if(a?.status === 401){
            setShowError(true)
            setErrorMessage('Email veya şifre yanlış')
        }
        if(a?.status === 200){
            router.push('/home')
        }
    }

    React.useEffect(() => {
        if (session.status === 'authenticated') {
            router.push('/home')
        }
        else{
            setMakeLoginClickable(true)
        }
    }
    , [session])

    React.useEffect(() => {
        let timeout = null
        if (showError) {
            timeout = setTimeout(() => {
                setShowError(false)
                setErrorMessage('')
            },3000)
        }
        return () => {
            if(!!timeout)clearTimeout(timeout)
        }

    },[showError,errorMessage])
  return (
    <div className='w-full h-screen bg-white flex justify-center items-center '>
        <div className='lg:absolute top-4 left-2 flex'> 
            <Image src='/logo.png' width={400} height={200} className=' cursor-pointer' onClick={()=>router.push("/home")}/>
            <span className='lg:flex items-end ml-2 hidden'>
                'e Hoşgeldiniz
            </span>

        </div>
        <div className='h-2/5 w-1/5 min-w-[360px] min-h-[400px] border border-black rounded-xl shadow-md'>
            <form className='w-full h-full justify-center items-center  ' onSubmit={checkDataAndSignIn}>
                <label className='flex w-full items-start justify-center pb-4 pt-20'>
                    <span className='text-2xl text-primary '>
                        Giriş Yap
                    </span>
                </label>
                {showError && (
                    <div className='w-full flex justify-center items-center text-red-500'>
                        {errorMessage}
                    </div>
                )}

                    <label className="flex gap-2 justify-center text-primary my-4 px-2">
                        <span>Email</span>
                        <input type='text' className={`${email && errorFields.includes('email') ? 'border-red-500' : 'border-black'} border rounded-md`} onChange={e => setEmail(e.target.value)} value={email} />
                    </label>

                    <label className="flex gap-2 justify-center text-primary my-2 px-2">
                        <span>Şifre </span>
                        <input type='password' className={`${password && errorFields.includes('password') ? 'border-red-500' : 'border-black'} border rounded-md ml-2`} onChange={e => setPassword(e.target.value)} />
                    </label>
                <button className='bg-primary text-white rounded-md w-24 h-10 flex items-center justify-center translate-y-2 m-auto ' disabled={!makeLoginClickable} type='submit'>Giriş Yap</button>
                <Link
                href={"/register"}

                className='w-full flex m-auto justify-center underline text-primary mt-4'
                >
                    Üye ol
                </Link>
                <button className='w-full flex m-auto justify-center underline text-primary mt-4' type='button' onClick={()=>{
                    setShowPasswordDialog(true)
                }}>
                    Şifremi Unuttum
                </button>



            </form>


            <dialog open={showPasswordDialog} className={`w-1/3 h-1/3 flex flex-col justify-around items-center absolute top-1/2 transform  -translate-y-1/2 border border-black bg-white p-8 rounded-lg shadow-lg ${showPasswordDialog ?"":" hidden "}`}>
    

        <h2 className="text-lg font-semibold text-gray-800">
            Şifrenizi unuttuysanız lütfen müşteri hizmetlerimizle iletişime geçiniz
        </h2>
        <div className="flex flex-col items-start space-y-2 justify-center">
            <span className="font-medium flex justify-center w-full" >
                Mail Adresimiz:
            </span>
            <a href="mailto:info@lykosis.com" className="text-blue-600 hover:text-blue-800 transition-colors font-medium flex justify-center w-full">
                info@lykosis.com
            </a>
            <span className="font-medium flex justify-center w-full">
                Telefon Numaramız:
            </span>
            <a href="tel:+902321234567" className="text-blue-600 hover:text-blue-800 transition-colors font-medium flex justify-center w-full">
                0232 123 45 67
            </a>
            <div className='w-full h-12 flex justify-center items-center translate-y-4'>
                <button className='flex w-24 h-12 bg-primary border rounded-xl justify-center items-center text-white font-medium' onClick={()=>setShowPasswordDialog(false)}>
                    Tamam 
                </button>
            </div>
        </div>
    </dialog>

        </div>

    </div>
  )
}
