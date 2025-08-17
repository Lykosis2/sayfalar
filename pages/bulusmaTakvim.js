import React, { useContext, useEffect } from 'react'
import Layout from '@/components/layout/NavbarandProviderLayout'
import Calendar from 'rsuite/Calendar'
import 'rsuite/dist/rsuite-no-reset.min.css'
import trTR from 'rsuite/locales/tr_TR'
import { Badge, CustomProvider, Popover, Whisper } from 'rsuite'
import useFilterable from '@/components/hooks/useFilterable'
import { SharedContext } from '@/components/layout/AgacDataSharer'


// TODO : FETCH CALLI PROVIDERDA AT 
export default function BulusmTakvimi() {
  const filterable = useFilterable()
  const {bulusmaTarihi:apiData} = useContext(SharedContext)


  function getTodoList(date,apiData) {
    const day = date.getDate()  
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const dateStr = `${day}-${month}-${year}`

    const selectedDate = apiData.find((item) => {
      const itemDate = new Date(item.time)
      const itemsDay = itemDate.getDate()
      const itemsMonth = itemDate.getMonth() + 1
      const itemsYear = itemDate.getFullYear()
      console.log(itemDate);
      console.log(`${itemsDay}-${itemsMonth}-${itemsYear}`);
      console.log(dateStr);
      return `${itemsDay}-${itemsMonth}-${itemsYear}` === dateStr
    })
    if (!selectedDate)
    return []
  else{
    const dateObject = new Date(selectedDate.time);
    let hours = dateObject.getHours();
const minutes = dateObject.getMinutes();



    return [
      { time:`${hours < 10 ? '0' : ''}${hours}.${minutes < 10 ? '0' : ''}${minutes}`, title: selectedDate.title, type: selectedDate.type, link: selectedDate.link },
    ]
  }
  }
  function renderCell(date) {
    const list = getTodoList(date,apiData)
    const displayList = list.filter((item, index) => index < 2)

    if (list.length) {
      const moreCount = list.length - displayList.length
      const moreItem = (

          <li>
            <Whisper
              placement="top"
              trigger="click"
              speaker={
                <Popover

                >
                  {list.map((item, index) => (
                    <p key={index}>
                      <b>{item.time}</b> - {item.title}
                    </p>
                  ))}
                </Popover>
              }
            >
              <a>{moreCount} more</a>
            </Whisper>
          </li>

      )

      return (

        <ul className="calendar-todo-list"
          >
            {displayList.map((item, index) => {
              console.log(item)
              return (
              <a
              key={index}
                href={`${item.link}`}
                >
              <li key={index}>
                <Badge
                color={item.type === 'online' ? 'blue' : item.type === 'ofis' ? 'green' : 'yellow'}

                  /> <b>{item.time }</b> 
                <span className='text-xs lg:text-base overflow-hidden text-ellipsis'>
<br/>
                 { item.title}
                </span>
              </li>
            </a>
              )
            })}
            {moreCount ? moreItem : null}
          </ul>
      )
    }

    return null
  }
  return (
        <Layout>
          <div className='flex w-full h-[calc(100%-14rem)] items-center justify-center lg:flex-row flex-col'>

              <div className='flex lg:w-2/3 w-full h-[75%] translate-y-[35%] lg:translate-y-0 items-center justify-center '>
  <CustomProvider
  locale={trTR}
  >

                    <Calendar
                    bordered
                    renderCell={renderCell}
                    locale={
                      {
                        sunday: 'Pazar',
                        monday: 'Pazartesi',
                        tuesday: 'Salı',
                        wednesday: 'Çarşamba',
                        thursday: 'Perşembe',
                        friday: 'Cuma',
                        saturday: 'Cumartesi',
                        ok: 'Tamam',
                        today: 'Bugün',
                        yesterday: 'Dün',
                        hours: 'Saat',
                        minutes: 'Dakika',
                        seconds: 'Saniye',
                        dateLocale: trTR,

                      }
                    }                    
                    />
  </CustomProvider>

              </div>
              <div className='flex lg:w-1/3 w-full lg:h-[34vh] h-[45vh] border bg-primary rounded-xl border-gray-300 p-4 flex-col gap-2 text-white  translate-y-1/2 mt-12 lg:translate-y-0'>
                <h2 className='text-2xl w-full text-center my-4'>
                  Lykosis Yeni Nesil Network Marketing
                </h2>
                <h4 className='text-xl'>
                  Discord : <a href="https://discord.gg/KTwPMWksXS" className='text-lg text-gray-200'>https://discord.gg/KTwPMWksXS</a>
                </h4>
                <h4 className='text-xl'>
                  Tıkıroğlu Tasarım Ofisi : <a href='tel:+90 258 264 00 00' className='text-lg text-gray-200'>+90 258 264 00 00</a>
                </h4>
                <h4 className='text-xl'>
                  Tıkıroğlu Tasarım Ofisi Numara 2  : <a href='tel:+90 258 000 00 00' className='text-lg text-gray-200'>+90 258 000 00 00</a>
                </h4>
                <h4 className='text-xl'>
                  Tıkıroğlu Tasarım Ofisi Numara 2  : <a href='tel:+90 258 000 00 00' className='text-lg text-gray-200'>+90 258 000 00 00</a>
                </h4>
                <h3 className='text-lg flex h-full items-end'>
                  !!! Lütfen ofis ve otel buluşmaları için numaraları arayıp önceden randevu alınız.
                </h3>
              </div>
          </div>

        </Layout>
  )
}
