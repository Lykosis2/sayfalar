import React from 'react'

function Item({ setKisaLimit, setUzunLimit, setUzunAgac, setKisaAgac, item, agacTipi, limit, setShowError, setChanged, changed }) {
  console.log(item)

  return (<div className='w-full min-h-[100px] relative border border-black rounded-xl bg-white flex ' >
                        <img src="https://pbs.twimg.com/media/FtsxswzaUAAZXJj.jpg:large" width={100} height={100} className='ml-2' />
                        <div className='w-full  flex justify-start items-start pr-16'>
                            <div className='w-full h-1/2'>
                                <div className='w-full h-full flex flex-col items-center justify-center'>
                                    <span className="text-lg font-bold">
                                        İsim
                                    </span>
                                    <span className="">
                                        {
                                            item?.name
                                        }
                                    </span>

                                </div>
                                <div className='w-full h-full'>
                                <div className='w-full h-full flex flex-col items-center justify-center'>
                                    <span className="text-lg font-bold whitespace-nowrap" >
Kazandırdığı Para                                    </span>
                                    <span className="">
                                        {
                                        Number.parseInt(item?.balance)
                                        }
                                    </span>

                                </div>
                                </div>

                            </div>
                            <div className='w-full h-1/2'>
                                <div className='w-full h-full'>
                                <div className='w-full h-full flex flex-col items-center justify-center'>
                                    <span className="text-lg font-bold whitespace-nowrap">
                                        Kazandırdığı Puan
                                    </span>
                                    <span>
                                        {
                                            Number.parseInt(item?.point1)
                                        }
                                    </span>

                                </div>
                                </div>
                                <div className='w-full h-full'>
                                <div className='w-full h-full flex flex-col items-center justify-center'>
                                    <span className="text-lg font-bold">
                                        Üyelik Türü
                                    </span>
                                    <span>
                                        {
                                            item?.has_saleAccount ? 'Üye' : 'Müşteri'
                                        }
                                    </span>

                                </div>
                                </div>

                            </div>

                            <button className='absolute flex right-2 top-[calc(50%-1rem)] w-8 h-8 rounded-full justify-center items-center bg-blue-600' onClick={() => {
                              if (limit <= 0) {
                                console.log('asdasd')
                                setShowError(true)
                              }
                              else {
                                if (agacTipi === 1) {
                                  setUzunAgac((p) => {
                                    setKisaLimit(u => u - 1)
                                    setUzunLimit(u => u + 1)
                                    const newItem = structuredClone(item)
                                    const changedItem = { id: newItem.id, position: newItem.position }
                                    // calculate if it is in changed if not put there if there that from there
                                    let itemIsInChanged = false
                                    console.log(changed)

                                    console.log(newItem)

                                    if (changed.length <= 0) {
                                      itemIsInChanged = true
                                      setChanged((p) => {
                                        console.log('asdasd')
                                        return [changedItem]
                                      })
                                    }
                                    changed.map((item, index) => {
                                      if (item.id === newItem.id) {
                                        console.log(item)
                                        itemIsInChanged = true
                                        setChanged((p) => {
                                          return p.filter(x => x.id !== newItem.id)
                                        })
                                      }
                                    })
                                    if (!itemIsInChanged) {
                                      setChanged((p) => {
                                        p.push(changedItem)
                                        return p
                                      })
                                    }
                                    setKisaAgac(p => [newItem, ...p])
                                    const newList = p.filter(x => x.id !== item.id)
                                    console.log(newList)
                                    return newList
                                  },
                                  )
                                }
                                else {
                                  setKisaAgac((p) => {
                                    setUzunLimit(u => u - 1)
                                    setKisaLimit(u => u + 1)
                                    const newItem = structuredClone(item)
                                    const changedItem = { id: newItem.id, position: newItem.position }
                                    let itemIsInChanged = false
                                    if (Object.keys(changed).length <= 0) {
                                      itemIsInChanged = true
                                      setChanged((p) => {
                                        console.log('asdasd')
                                        return [changedItem]
                                      })
                                    }
                                    changed.map((item, index) => {
                                      if (item.id === newItem.id) {
                                        console.log(item)
                                        itemIsInChanged = true
                                        setChanged((p) => {
                                          return p.filter(x => x.id !== newItem.id)
                                        })
                                      }
                                    })
                                    console.log(itemIsInChanged)
                                    if (!itemIsInChanged) {
                                      setChanged((p) => {
                                        p.push(changedItem)
                                        return p
                                      })
                                    }
                                    setUzunAgac(p => [newItem, ...p])
                                    return p.filter(x => x.id !== item.id)
                                  },
                                  )
                                }
                              }
                            }}>

                            {
                                agacTipi === 1
                                  ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                              </svg>
                                  : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
</svg>

                            }
                            </button>
                        </div>

                    </div>)
}
export default Item
