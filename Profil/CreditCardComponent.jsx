import React, { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function CreditCard({ cardNumber, cardName, cardDate, cardCvv, cardType, setCardNumber, setCardName, setCardDate, setCardCvv, setCardType, addCard }) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [tuple, setTuple] = useState([null, cardType])

  if (tuple[1] !== cardType)
    setTuple([tuple[1], cardType])

  useEffect(() => {
    const firstTwo = cardNumber.slice(0, 2)

    if (firstTwo === '34' || firstTwo === '37')
      setCardType(1) // American Express

    else if (firstTwo === '51' || firstTwo === '52' || firstTwo === '53' || firstTwo === '54' || firstTwo === '55')
      setCardType(2) // Mastercard

    else if (firstTwo[0] === '4')
      setCardType(3) // Visa

    else
      setCardType(0) // Unknown
  }, [cardNumber])

  const handleButtonClick = () => {
    setIsFlipped(!isFlipped)
  }

  const backgroundImage = useMemo(() => {
    if (cardType === 1)
      return 'url(\'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/1.jpeg\')'
    else if (cardType === 2)
      return 'url(\'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/2.jpeg\')'
    else if (cardType === 3)
      return 'url(\'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/3.jpeg\')'
    else
      return 'url(\'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/13.jpeg\')'
  }, [cardType])

  useEffect(() => {

  }, [cardType])

  const handleNumberInput = (event) => {
    const { key } = event
    const isNumber = /^\d$/.test(key)

    const isDelete = key === 'Delete' || key === 'Backspace'

    if (!isNumber && !isDelete)
      event.preventDefault()
  }

  return (
<div className={`flip-card ${isFlipped ? 'flipped' : ''}`}>
    <div className="flip-card-inner text-white">
      <AnimatePresence>

      <motion.div class={`flip-card-front rounded-lg ${
        (cardType === 0 && tuple[0] === 1)
? 'slideAnimate2'
: (cardType === 0 && tuple[0] === 2)
? 'slideChange2'
        : (cardType === 0 && tuple[0] == 3)
? 'slideMake2'
        : (cardType === 1 && tuple[0] === 0)
? 'slideAnimate'
        : (cardType === 2 && tuple[0] === 0)
? 'slideChange'
        : (cardType === 3 && tuple[0] === 0)
? 'slideMake'
        : (cardType === 1 && tuple[0] == null)
? 'slideAnimate2'
        : (cardType === 2 && tuple[0] == null)
? 'slideChange2'
        : (cardType === 3 && tuple[0] == null) ? 'slideMake2' : ''}`}
      // initial={{ backgroundImage: "url('https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/14.jpeg')",backgroundPosition:"right center",opacity:0}}
      // animate={{ background:["white",backgroundImage],backgroundPosition:"left center",opacity:1 }}

      // transition={{duration:0.5}}

      >
        <img src={`${
        cardType === 3
? 'https://static-00.iconduck.com/assets.00/visa-icon-2048x628-6yzgq2vq.png'

        : cardType === 2
? 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png'

        : cardType === 1
? 'https://cdn-icons-png.flaticon.com/512/349/349228.png'

        : cardType === 0
? 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/50%25_grey_rounded_square.svg/1200px-50%25_grey_rounded_square.svg.png'

        : 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/50%25_grey_rounded_square.svg/1200px-50%25_grey_rounded_square.svg.png'}` }alt="Front Image" className='w-[60px] absolute right-4 top-4'/>
        {/* <img src="https://usa.visa.com/dam/VCOM/regional/na/us/pay-with-visa/images/card-chip-800x450.png" alt="" className='w-[100px] h-[45px] top-4 absolute' /> */}
        <span className='absolute left-6 top-6 FONT'>
          LYKOSIS
        </span>
        <label htmlFor='cardNumber' className='absolute top-24 right-[13%] text-xl customFont '>
          <motion.span
          className='inline-block font-sans '
          key={`${cardNumber[0]}1`}
          initial={{ y: -5, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.1 }}
          >
            {cardNumber[0]}
          </motion.span>
          <motion.span
          className='inline-block font-sans'
          key={`${cardNumber[1]}2`}
          initial={{ y: -5, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.1 }}>
            {cardNumber[1]}
          </motion.span>
          <motion.span
          className='inline-block font-sans'
          key={`${cardNumber[2]}3`}
          initial={{ y: -5, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.1 }}>
  {cardNumber[2]}
          </motion.span>
          <motion.span
           className='inline-block font-sans'
           key={`${cardNumber[3]}4`}
           initial={{ y: -5, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ duration: 0.1 }}
          >
{cardNumber[3]}

          </motion.span>
          <motion.span className='m-3'>

          </motion.span>
          <motion.span
           className='inline-block font-sans'
           key={`${cardNumber[4]}5`}
           initial={{ y: -5, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ duration: 0.1 }}>

        {cardNumber[4]}

          </motion.span>
          <motion.span
           className='inline-block font-sans'
           key={`${cardNumber[5]}6`}
           initial={{ y: -5, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ duration: 0.1 }}>
            {cardNumber[5]}

          </motion.span>
          <motion.span
           className='inline-block font-sans'
           key={`${cardNumber[6]}7`}
           initial={{ y: -5, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ duration: 0.1 }}>
            {cardNumber[6]}
          </motion.span>
          <motion.span
           className='inline-block font-sans'
           key={`${cardNumber[7]}8`}
           initial={{ y: -5, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ duration: 0.1 }}>
            {cardNumber[7]}

          </motion.span>
          <motion.span className='m-3'>

</motion.span>
          <motion.span
           className='inline-block font-sans'
           key={`${cardNumber[8]}9`}
           initial={{ y: -5, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ duration: 0.1 }}>
            {cardNumber[8]}

          </motion.span>
          <motion.span
           className='inline-block font-sans'
           key={`${cardNumber[9]}10`}
           initial={{ y: -5, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ duration: 0.1 }}>
            {cardNumber[9]}

          </motion.span>
          <motion.span
           className='inline-block font-sans'
           key={`${cardNumber[10]}11`}
           initial={{ y: -5, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ duration: 0.1 }}>
            {cardNumber[10]}

          </motion.span>
          <motion.span
           className='inline-block font-sans'
           key={`${cardNumber[11]}12`}
           initial={{ y: -5, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ duration: 0.1 }}>
            {cardNumber[11]}
          </motion.span>
          <motion.span className='m-3'>

</motion.span>
          <motion.span
           className='inline-block font-sans'
           key={`${cardNumber[12]}13`}
           initial={{ y: -5, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ duration: 0.1 }}>
            {cardNumber[12]}

          </motion.span>
          <motion.span
           className='inline-block font-sans'
           key={`${cardNumber[13]}14`}
           initial={{ y: -5, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ duration: 0.1 }}>
            {cardNumber[13]}

          </motion.span>
          <motion.span
           className='inline-block font-sans'
           key={`${cardNumber[14]}15`}
           initial={{ y: -5, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ duration: 0.1 }}>
            {cardNumber[14]}

          </motion.span>
          <motion.span
           className='inline-block font-sans'
           key={`${cardNumber[15]}16`}
           initial={{ y: -5, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ duration: 0.1 }}>
            {cardNumber[15]}
          </motion.span>

        </label>

        <div className='absolute bottom-4 left-4 font-semibold'>
          <span className='flex'>
            Full Name
          </span>
          <motion.span className='text-lg flex'>
          {cardName.split('').map((char, index) => (
          <AnimatePresence key={index}>
            <motion.span
              className="inline-block font-sans"
              initial={{ y: -5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.2, delay: index * 0.02 + 0.1 }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          </AnimatePresence>
          ))}
          </motion.span>
        </div>

        <div className='absolute bottom-4 right-4 font-semibold'>
          <span className='flex '>
            Expires
          </span>
          <motion.span className='text-lg flex'>
             <motion.span
             className='inline-block font-sans'
              key={`${cardDate[0]}1`}
              initial={{ y: -5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.2 }}

             >
              {cardDate[0]}
             </motion.span>
              <motion.span
              className='inline-block font-sans'
              key={`${cardDate[1]}2`}
              initial={{ y: -5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.2 }}
              >
              {cardDate[1]}
              </motion.span>
              <span>
                {cardDate[2]}
              </span>
              <motion.span
              className='inline-block font-sans'
              key={`${cardDate[3]}4`}
              initial={{ y: -5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.2 }}
              >
              {cardDate[3]}
              </motion.span>
              <motion.span
              className='inline-block font-sans'
              key={`${cardDate[4]}5`}
              initial={{ y: -5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.2 }}
              >
              {cardDate[4]}
              </motion.span>

          </motion.span>

        </div>

      </motion.div>
      </AnimatePresence>
      <motion.div class={`flip-card-back rounded-lg ${
        (cardType === 0 && tuple[0] === 1)
? 'slideAnimate2'
: (cardType === 0 && tuple[0] === 2)
? 'slideChange2'
        : (cardType === 0 && tuple[0] == 3)
? 'slideMake2'
        : (cardType === 1 && tuple[0] === 0)
? 'slideAnimate'
        : (cardType === 2 && tuple[0] === 0)
? 'slideChange'
        : (cardType === 3 && tuple[0] === 0)
? 'slideMake'
        : (cardType === 1 && tuple[0] == null)
? 'slideAnimate2'
        : (cardType === 2 && tuple[0] == null)
? 'slideChange2'
        : (cardType === 3 && tuple[0] == null) ? 'slideMake2' : ''}`}>
        <div className='absolute top-6 w-[400px] h-12 bg-black'>

        </div>
        <span className='absolute right-10 top-20'>
            CVV
        </span>
        <div className='w-[352px] absolute bg-white h-10 rounded-lg top-[50%] right-6' >

        <span className=' text-black absolute right-8 top-2'>
          <motion.span
          className='inline-block font-sans'
          key={`${cardCvv[0]}1`}
          initial={{ y: -5, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.2 }}

          >
            {cardCvv[0]}
          </motion.span>
          <motion.span
          className='inline-block font-sans'
          key={`${cardCvv[1]}2`}
          initial={{ y: -5, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.2 }}
          >
            {cardCvv[1]}
          </motion.span>
          <motion.span
          className='inline-block font-sans'
          key={`${cardCvv[2]}3`}
          initial={{ y: -5, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.2 }}
          >
            {cardCvv[2]}
          </motion.span >
           {
              (cardCvv.length > 3 && cardCvv[3] !== null && cardCvv[3] !== undefined)
                ? <motion.span
              className='inline-block font-sans'
              key={`${cardCvv[3]}4`}
              initial={{ y: -5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.2 }}
              >
                {cardCvv[3]}
              </motion.span>
                : <></>
           }
        </span>

        </div>
      </motion.div>

    </div>

    <div className='flex justify-center items-center mt-2'>

    <label htmlFor="cardNumber" className="flex mr-4 font-serif text-lg">
        Kart Numarası
    </label>

    <input type="tel" name="" className='text-black flex border border-gray-300 rounded-md py-1 px-3 focus:outline-none focus:border-blue-500' id="cardNumber" maxLength={16} onKeyDown={handleNumberInput} onChange={e => setCardNumber((prev) => {
      const lenght = e.target.value.length
      const value = e.target.value
      if (lenght === 0)
        return '################'

      return value + '################'.slice(lenght, 16)
    })}/>
    </div>

    <div className='flex justify-center items-center mt-2'>
    <label htmlFor="cardName" className="flex mr-4 font-serif text-lg">
        İsim Soyisim
    </label>

    <input type="text" className='text-black flex border border-gray-300 rounded-md py-1 px-3 focus:outline-none focus:border-blue-500' name="" id="cardName" maxLength={200} onChange={(e) => {
      setCardName((prev) => {
        const value = e.target.value
        if (e.target.value.length === 0)
          return 'Your Name'

        return value
      })
    }} />
    </div>

    <div className=' flex justify-center items-center mt-2'>
        <label htmlFor='expireDate' className='flex mr-4 font-serif text-lg'>
            Son Kullanma Tarihi
        </label>
    <input className='text-black flex border border-gray-300 rounded-md py-1 px-3 focus:outline-none focus:border-blue-500' type="tel" name="" id="expireDate" onKeyDown={handleNumberInput} maxLength={4} onChange={(e) => {
      setCardDate((prev) => {
        const value = e.target.value
        const lenght = e.target.value.length
        const toRepeat = 4 - lenght
        if (lenght === 0)
          return '##/##'

        if (lenght === 1)
          return `${value}#` + '/##'

        if (lenght === 2)
          return `${value}/${'#'.repeat(toRepeat)}`

        if (lenght === 3)
          return `${value[0] + value[1]}/${value[2]}#`

        if (lenght === 4)
          return `${value[0] + value[1]}/${value[2]}${value[3]}`

        return '##/##'
      })
    }} />

    </div>

    <div className='flex justify-center items-center mt-2'>
        <label htmlFor='cvv' className='flex mr-4 font-serif text-lg'>
            CVV
        </label>

    <input type="tel" className='text-black flex border border-gray-300 rounded-md py-1 px-3 focus:outline-none focus:border-blue-500' name="" id="cvv" maxLength={4} onFocus={() => { setIsFlipped(true) }} onBlur={() => setIsFlipped(false)} onChange={(e) => {
      setCardCvv((prev) => {
        const value = e.target.value
        const lenght = e.target.value.length
        if (lenght === 0)
          return '###'

        if (lenght === 1)
          return value + '#'.repeat(2)

        if (lenght === 2)
          return `${value}#`

        if (lenght === 3)
          return value

        if (lenght === 4)
          return value

        return '###'
      })
    }}/>
    </div>
    <button onClick={addCard} className='w-24 h-10  rounded-xl mt-4 translate-x-36 bg-button-green' >
      <span className='text-white text-lg'>
        Kaydet

      </span>

    </button>
    {/* <button onClick={()=>{
      setCardType((prev)=>{
        if(prev === 0){
          return 1
        }
        if(prev === 1){
          return 2
        }
        if(prev === 2){
          return 3
        }
        if(prev === 3){
          return 0
        }
        return 0

      })
    }}>
     change image
    </button> */}

  </div>

  )
}
