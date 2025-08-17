import { useEffect, useRef } from 'react'

export default function ProfilSettingsInput({ title, type, id, placeholder, value, isDisabled, onChange }) {
  const inputRef = useRef(null)

  useEffect(() => {
    if (value)
      inputRef.current.value = value
  }, [])

  return (
        <div className="flex h-fit flex-col gap-2 items-center">
            <label htmlFor={title || ''}>{title}</label>
            <input onChange={onChange} ref={inputRef} disabled={isDisabled || false} type={type || 'text'} name={title || ''} id={id || ''} placeholder={placeholder || ''} className={`border drop-shadow-lg rounded-full px-5 py-2 ${isDisabled ? 'bg-[#D9D9D9]' : ''}`}/>
        </div>
  )
}
