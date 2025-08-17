import { useRef, useState } from 'react'
import Autosuggest from 'react-autosuggest'
import * as Dialog from '@radix-ui/react-dialog'
import { AnimatePresence, motion } from 'framer-motion'
import useMeasure from 'react-use-measure'

export default function WhatYouNeedComponent() {
  const [value, setValue] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [quizNumber, setQuizNumber] = useState(0)
  const mockData = ['Vücutumu nemlendirmek için hangi ürünü almalıyım', 'Çatlaklara iyi gelen ürünler', 'Güzel losyon önerisi', 'Kırışıklıklıklar için öneri']
  const [ref, { width }] = useMeasure()
  const [selected, setSelected] = useState(null)

  const [tuple, setTuple] = useState([null, quizNumber])

  const quizSelectionRef = useRef([])
  console.log(selected)
  if (tuple[1] !== quizNumber)
    setTuple([tuple[1], quizNumber])

  const prev = tuple[0]

  const direction = quizNumber > prev ? 1 : -1

  const questionRequest = [
    {
      title: 'En sevdiğiniz cilt bakım ürünü hangisi?',
      options: ['Cleanser', 'Moisturizer', 'Sunscreen', 'Serum'],

    },
    {
      title: 'Cildiniz hangi ürünü daha çok seviyor?',
      options: ['1', '2', '3', '4'],
    },
    {
      title: 'En sevdiğiniz ürünümüz nedir?',
      options: ['5', '6', '7', '8'],
    },
  ]
  function onChange(event, { newValue }) {
    setValue(newValue)
  }
  function onSuggestionsFetchRequested({ value }) {
    // Fetch suggestions based on the input value
    // and update the suggestions state.
    const filteredSuggestions = mockData.filter(suggestion =>
      suggestion.toLowerCase().includes(value.toLowerCase()),
    )

    // Update the suggestions state with the filtered suggestions
    setSuggestions(filteredSuggestions)
  }

  function onSuggestionsClearRequested() {
    // Clear the suggestions state.

    setSuggestions([])
  }
  const inputProps = {
    placeholder: 'Ne aramıştınız?',
    value,
    onChange,
  }
  function getSuggestionValue(suggestion) {
    // Return the value to be displayed in the input field when suggestion is selected.
    return suggestion
  }

  function renderSuggestion(suggestion) {
    // Return the JSX for rendering each suggestion item.
    return (
      <div className=' bg-white text-black hover:bg-blue-400 hover:text-white cursor-pointer  font-roboto font-base w-96'>
        {suggestion}
      </div>
    )
  }

  const variants = {
    enter: ({ direction, width }) => ({
      x: direction * width,
    }),
    center: {
      x: 0,
    },
    exit: ({ direction, width }) => ({
      x: direction * -width,
    }),
  }

  console.log(quizSelectionRef.current)

  return (

    <div className='px-16 flex w-full h-[750px] overflow-auto mt-12'>

        <div className=' search-bar-container flex w-full justify-around h-full min-w-0 bg-red-600 items-center'>
          <div className='flex'>

          <div className='border bg-white rounded-l-xl h-[46px] flex items-center w-10 justify-center'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
</svg>

          </div>
        <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
    />
          </div>
          <Dialog.Root>
    <Dialog.Trigger asChild>
      <button className="Button violet">Quiz</button>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="DialogOverlay" />
      <Dialog.Content className="DialogContent">
        <Dialog.Title className="DialogTitle w-full flex justify-center">
         <div className='flex relative w-full justify-center mb-6'>
          <AnimatePresence custom={{ direction, width }}>

          <motion.span key={quizNumber}
          variants={variants}
          ref={ref}
          custom={{ direction, width }}
          initial="enter"
          animate="center"
          exit="exit"
          className='absolute'
          transition={{ x: { duration: 0.75, ease: 'easeInOut' } }}>
      Soru &nbsp;
    {quizNumber + 1}

          </motion.span>
          </AnimatePresence>
        </div>
        </Dialog.Title>
        <Dialog.Description className="DialogDescription w-full flex justify-center ">
        <AnimatePresence custom={{ direction, width }}>
<div key={quizNumber} className='absolute flex w-full'>

          <motion.span
          key={quizNumber}
          variants={variants}
          ref={ref}
          custom={{ direction, width }}
          initial="enter"
          animate="center"
          exit="exit"
          className='absolute w-full flex justify-center'
          transition={{ x: { duration: 0.75, ease: 'easeInOut' } }}>
            {questionRequest[quizNumber].title}
          </motion.span>
</div>

        </AnimatePresence>
        </Dialog.Description>
        <AnimatePresence custom={{ direction, width }}>
        <div key={quizNumber} className='relative flex '>

        <motion.div key={quizNumber} className=' absolute top-3 flex w-full h-12 justify-evenly items-center overflow-hidden mt-6'
        variants={variants}
        ref={ref}
        custom={{ direction, width }}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ x: { duration: 0.75, ease: 'easeInOut' } }}>
          <button className={`border border-gray-700 rounded-2xl  text-sm h-8 px-2 font-roboto hover:bg-blue-600 hover:text-white transition-colors hover:shadow-full shadow-md ${selected === 0 || (quizSelectionRef.current[quizNumber] === 0 && selected === null) ? 'bg-blue-600' : 'bg-white'} `} onClick={() => setSelected(0)}>
          {
            questionRequest[quizNumber].options[0]
          }
          </button>
          <button className={`border border-gray-700 rounded-2xl text-sm h-8 px-2 font-roboto hover:bg-blue-600 hover:text-white transition-colors hover:shadow-full shadow-md  ${selected === 1 || (quizSelectionRef.current[quizNumber] === 1 && selected === null) ? 'bg-blue-600' : 'bg-white'} `} onClick={() => setSelected(1)}>
          {
            questionRequest[quizNumber].options[1]
          }
          </button>
          <button className={`border border-gray-700 rounded-2xl text-sm h-8 px-2 font-roboto hover:bg-blue-600 hover:text-white transition-colors hover:shadow-full shadow-md ${selected === 2 || (quizSelectionRef.current[quizNumber] === 2 && selected === null) ? 'bg-blue-600' : 'bg-white'} `} onClick={() => setSelected(2)}>
          {
            questionRequest[quizNumber].options[2]
          }
          </button>
          <button className={`border border-gray-700 rounded-2xl text-sm h-8 px-2 font-roboto hover:bg-blue-600 hover:text-white transition-colors hover:shadow-full shadow-md ${selected === 3 || (quizSelectionRef.current[quizNumber] === 3 && selected === null) ? 'bg-blue-600' : 'bg-white'} `} onClick={
            () => setSelected(3)
            }>
          {
            questionRequest[quizNumber].options[3]
          }
          </button>

        </motion.div>
        <motion.div className='w-full top-20 ' style={{
          display: 'flex',
          position: 'absolute',
          marginTop: 25,
          justifyContent: 'space-evenly',
        }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

            <button className={`w-36 h-9 rounded-md hover:bg-white hover:border hover:text-black  ${quizNumber === 0 ? 'bg-gray-200 text-black ' : ' bg-green-600 text-white '} `} onClick={() => {
              if (selected !== null) {
                const tempArray = [...quizSelectionRef.current]
                tempArray[quizNumber] = selected
                quizSelectionRef.current = tempArray
              }
              setSelected(null)

              setQuizNumber(
                (p) => {
                  if (p <= 0)
                    return 0
                  return p - 1
                })
            }} >Previous Part</button>
            <button className={`w-36 h-9 rounded-md hover:bg-white hover:border hover:text-black  ${quizNumber === 20 ? 'bg-gray-200 text-black ' : ' bg-green-600 text-white'} `} onClick={() => {
              if (selected !== null) {
                const tempArray = [...quizSelectionRef.current]
                tempArray[quizNumber] = selected
                console.log(tempArray)
                quizSelectionRef.current = tempArray
              }
              setSelected(null)

              setQuizNumber(
                (p) => {
                  if (p >= 20)
                    return 20
                  return p + 1
                },
              )
            }} >Next Part</button>
        </motion.div>

        </div>

        </AnimatePresence>
        <Dialog.Close asChild>
          <button className="IconButton" aria-label="Close">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>

          </button>
        </Dialog.Close>
      </Dialog.Content>

    </Dialog.Portal>
  </Dialog.Root>

        </div>
    </div>

  )
}
