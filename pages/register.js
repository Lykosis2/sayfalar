import React, { useEffect, useState } from 'react'
import { ofetch } from 'ofetch'
import { set, z } from 'zod'
import { useRouter } from 'next/router'
import Image from 'next/image'
import validateThePhoneNumber from '../lib/validateThePhoneNumber'

export default function register() {
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [gender, setGender] = useState(0)
  const [sponsorId, setSponsorId] = useState('')
  const [age, setAge] = useState('')
  const [identityNumber, setIdentityNumber] = useState('')
  const router = useRouter()
  const [errorFields, setErrorFields] = useState([])
  const [agreed, setAgreed] = useState(false)
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
  const [confirmData, setConfirmData] = useState({})
  const [loading, setLoading] = useState(false)
  // computed form data in json
  const onSubmit = async (e) => {
    e.preventDefault()
    setErrorFields([])
    setLoading(true)
    if (password !== confirmPassword) {
      alert('Şifreleriniz uyuşmuyor')
      setLoading(false)
      return
    }
    if(!agreed){
      alert('Lütfen üyelik sözleşmesini okuyup onaylayınız.')
      setLoading(false)
      return
    }
    if(!phoneNumber){
      alert('Lütfen telefon numaranızı giriniz.')
      setLoading(false)
      return
    }
    const validatedPhoneNumber = validateThePhoneNumber(phoneNumber)
    if(!validatedPhoneNumber){
      alert('Lütfen geçerli bir telefon numarası giriniz.')
      setLoading(false)
      return
    }

    const formData = {
      name,
      surname,
      email,
      phoneNumber: validatedPhoneNumber,
      password,
      gender: Number.parseInt(gender),
      sponsor: sponsorId,
      age: Number.parseInt(age),
      identityNumber,
    }

    // TODO: replace alert with toast

    const schema = z.object({
      name: z.string().min(2).max(50),
      surname: z.string().min(2).max(50),
      email: z.string().email(),
      phoneNumber: z.number().refine((num) => {
        const numString = num.toString();
        return numString.length === 10 && /^[0-9]+$/.test(numString);
    }, {
        message: "Phone number must be a 10-digit integer."
    }) ,
      password: z.string().min(8).max(50),
      gender: z.number().min(0).max(1),
      sponsor: z.string().optional(), // turn to number
      age: z.number().min(18).max(100),
      identityNumber: z.string().min(11).max(11).regex(/^[1-9]{1}[0-9]{9}[02468]{1}$/),
    })

    try {
      schema.parse(formData)
    }
    catch (error) {
      setErrorFields(error.issues.map(issue => issue.path))
      alert("Lütfen bilgilerinizi kontrol ediniz.")
      setLoading(false)
      return
    }

    try {
      // Talk about this part
      fetch(
        '/api/finalEndPoints/user',
        {
          method: 'POST',
          body: JSON.stringify(formData),
        },
      ).then(res => {
        if(res.status !== 200){
          alert('Beklenmedik bir hata oluştu. Lütfen tekrar deneyiniz.')
          return
        }
        return res.json()
      }).then(res => {
        console.log(res)

        if(!res) {setLoading(false);return}
        if (res?.error) {
          alert(res.error)
          return
        }
        console.log('elo ')
        setConfirmDialogOpen(true)
        setConfirmData(res?.sponsorsInformations)
        setLoading(false)
      })

    }
    catch (error) {
      setLoading(false)
      alert(`Beklenmedik bir hata oluştu. Lütfen tekrar deneyiniz.`)
      console.log(error)
    }
  }

 
  useEffect(() => {
    const getQueryParam = (name) => {
      const queryParam = router.query[name];
      return Array.isArray(queryParam) ? queryParam[0] : queryParam;
    };

    const routerReferenceNumber = getQueryParam('sponsorId');
    console.log(routerReferenceNumber);

    if (routerReferenceNumber) {
      setSponsorId(routerReferenceNumber);
    }
  }, [router.query]);

  return (
    <div className='w-full h-screen bg-white flex justify-center items-center '>
      <div className='lg:absolute hidden top-4 left-2 lg:flex'> 
            <Image src='/logo.png' width={400} height={200} className='cursor-pointer' onClick={()=>router.push("/home")} />
            <span className='lg:flex items-end ml-2 hidden'>
                'e Hoşgeldiniz
            </span>

        </div>
      <form className='w-full sm:w-1/3 flex flex-col gap-2 border border-black rounded-lg  px-8 lg:py-10 py-4 ' onSubmit={onSubmit}>
        <label className='flex w-full items-start justify-center pb-4'>
          <span className='text-2xl text-primary '>

            Müşteri ol
          </span>
        </label>
        <label className="flex gap-2 text-primary ">
          <span>Adınız</span>
          <input className={`${name && errorFields.includes('name') ? 'border-red-500' : 'border-black'} border rounded-md`} type='text' onChange={e => setName(e.target.value)} />
        </label>
        <label className="flex gap-2 text-primary ">
          <span>Soyadınız</span>
          <input type='text' className={`${surname && errorFields.includes('surname') ? 'border-red-500' : 'border-black'} border rounded-md`} onChange={e => setSurname(e.target.value)} />
        </label>

        <label className="flex gap-2 text-primary relative">
          <span className=' whitespace-nowrap'> Telefon no</span>
          <input type='text' className={`${email && errorFields.includes('email') ? 'border-red-500' : 'border-black'} border rounded-md`} onChange={e => setPhoneNumber(e.target.value)} />
        </label>

        <label className="flex gap-2 text-primary ">
          <span>Email</span>
          <input type='text' className={`${email && errorFields.includes('email') ? 'border-red-500' : 'border-black'} border rounded-md`} onChange={e => setEmail(e.target.value)} />
        </label>

        <label className="flex gap-2 text-primary ">
          <span>Şifreniz</span>
          <input type='password' className={`${password && errorFields.includes('password') ? 'border-red-500' : 'border-black'} border rounded-md`} onChange={e => setPassword(e.target.value)} />,
        </label>

        <label className="flex gap-2 text-primary ">
          <span className=' whitespace-nowrap'>Şifreniz Tekrar</span>
          <input type='password' className={`${confirmPassword && errorFields.includes('confirmPassword') ? 'border-red-500' : 'border-black'} border rounded-md`} onChange={e => setConfirmPassword(e.target.value)} />,
        </label>

        <label className="flex gap-2 text-primary ">
          <span>Cinsiyetiniz</span>
          <select onChange={(e) => {
            setGender(e.target.value)
          }} className={`${confirmPassword && errorFields.includes('confirmPassword') ? 'border-red-500' : 'border-black'} border rounded-md`}>
            <option value='0'>Erkek</option>
            <option value='1'>Kadın</option>
          </select>
        </label>

        <label className="flex gap-2 text-primary ">
          <span>Yaşınız</span>
          <input type='text' className={`${age && errorFields.includes('age') ? 'border-red-500' : 'border-black'} border rounded-md`} onChange={e => setAge(e.target.value)} />
        </label>

        <label className="flex gap-2 text-primary ">
          <span className=' whitespace-nowrap'>TC Kimlik No</span>
          <input type='text' className={`${identityNumber && errorFields.includes('identityNumber') ? 'border-red-500' : 'border-black'} border rounded-md`} onChange={e => setIdentityNumber(e.target.value)} />
        </label>

        <label className="flex gap-2 text-primary ">
          <span className=' whitespace-nowrap'>Sponsor ID'niz</span>
          <input type='text' value={sponsorId} className={`${sponsorId && errorFields.includes('sponsorId') ? 'border-red-500' : 'border-black'} border rounded-md`} onChange={e => setSponsorId(e.target.value)} />
        </label>
        <label className="flex gap-2 text-primary ">
        <input type='checkbox' className="w-6 h-6" onChange={()=>setAgreed(e=>!e)} />
          <span><a className=' underline cursor-pointer select-none' target='_blank' href='https://cdn.lykosis.com/sozlesmeler/Lykosis Mesafeli Satış Sözleşmesi.pdf'>Üyelik Sözleşmesini,</a> <a className=' underline cursor-pointer select-none' target='_blank' href='https://cdn.lykosis.com/sozlesmeler/Lykosis Çerez Politikası.pdf'>Çerez Politikasini,</a> <a className=' underline cursor-pointer select-none' target='_blank' href='https://cdn.lykosis.com/sozlesmeler/Lykosis İade Sözleşmesi.pdf'>Iade Politikasini</a> okudum anladım onaylıyorum.</span>
        </label> 
        

        <button disabled={loading} type="submit" className='bg-primary text-white rounded-md py-2 px-4'>{loading ? "Yükleniyor...":"Kayıt Ol"}</button>
      </form>

      <dialog open={confirmDialogOpen} className='lg:w-[800px] w-full h-[600px] mx-auto bg-white shadow-xl rounded-lg overflow-hidden'>
    <div className='w-full h-24 rounded-xl mt-4 bg-primary flex justify-center items-center'>
        <h1 className='text-white text-3xl font-semibold'>Kaydınız Başarılı</h1>
    </div>
    <div className='p-6 flex flex-col justify-center m-auto'>

      <h2>
        Lütfen kendi bilgilerinizi ve sponsorunuzu kontrol ediniz. Bilgilerinizi lütfen not alınız.
      </h2>
      <h2 className='text-2xl font-semibold text-gray-800 mb-4'>
            Bilgileriniz:
        </h2>
        <p className='text-gray-600'>
            <span className='font-medium'>Email:</span> {email}
        </p>
        <p className='text-gray-600'>
            <span className='font-medium'>Şifre:</span> {password}
        </p>
        <h2 className='text-2xl font-semibold text-gray-800 mb-4'>
            Sponsorunuzun bilgileri:
        </h2>
        {
          console.log(confirmData)
        }
        <p className='text-gray-600'>
            <span className='font-medium'>Adı:</span> {confirmData?.name}
        </p>
        <p className='text-gray-600'>
            <span className='font-medium'>Soyadı:</span> {confirmData?.surname}
        </p>
        <p className='text-gray-600 mb-6'>
            <span className='font-medium'>Referans Numarası:</span> {confirmData?.referenceNumber}
        </p>
        <button 
            onClick={() => {
              router.push('/login')
            }}
            className='text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
        >
            Tamam
        </button>
        <a href='tel:+08503000000' className='text-blue-600 hover:text-blue-700 transition-colors duration-300'>
            Hata olduğunu düşünüyorum
        </a>
    </div>
</dialog>

    </div>
  )
}
