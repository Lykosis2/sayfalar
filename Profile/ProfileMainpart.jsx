import { NavbarContext } from '/pages/profile'
import React, { useContext } from 'react'

export default function ProfileMainpart() {
  const context = useContext(NavbarContext)
  const { showNavbar } = context
  return (
    <div className={` flex bg-white lg:translate-x-[33.5%] translate-x-0 lg:w-[75%] w-full ${showNavbar ? 'privateNav2' : 'privateNav1 '} justify-evenly h-full min-h-[682px] `}>
        <div className='flex w-full justify-evenly my-32'>
            <div className='w-96 h-full border shadow-md rounded-xl'>
                <div className=' h-full flex flex-col items-center justify-evenly'>
                <div className='text-2xl  '>
                Last Orders
                </div>
                    <div className='w-[85%] h-[15%] bg-white shadow-md border rounded-xl flex  items-center  '>
                        <div className='flex max-w-[4rem] max-h-full rounded-xl '>
                            <img src="https://cdn.dsmcdn.com/ty116/product/media/images/20210517/16/89103874/175162840/1/1_org_zoom.jpg" alt="" className=' rounded-l-xl'/>
                        </div>
                    <div className='w-[50%] flex flex-col justify-center items-center'>
                        <div className=' h-[60%] text-2xl'>
                            Lotion
                        </div>
                        <div className=' h-[40%]'>
                            440 TL
                        </div>

                    </div>
                <div className='flex w-[30%] min-w-[96px] h-full'>
                    <div className='flex w-full justify-end items-center pr-3'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mr-2">
                        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" color='red'/>
                        </svg>
                            <div className='w-[40px] h-[40px] bg-blue-500 flex justify-center items-center rounded-lg'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                </svg>
                            </div>

                    </div>
                </div>
            </div>

            <div className='w-[85%] h-[15%] bg-white shadow-md border rounded-xl flex  items-center  '>
                        <div className='flex max-w-[4rem] max-h-full rounded-xl '>
                            <img src="https://cdn.dsmcdn.com/ty116/product/media/images/20210517/16/89103874/175162840/1/1_org_zoom.jpg" alt="" className=' rounded-l-xl'/>
                        </div>
                    <div className='w-[50%] flex flex-col justify-center items-center'>
                        <div className=' h-[60%] text-2xl'>
                            Lotion
                        </div>
                        <div className=' h-[40%]'>
                            440 TL
                        </div>

                    </div>
                <div className='flex w-[30%] min-w-[96px] h-full'>
                    <div className='flex w-full justify-end items-center pr-3'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mr-2">
                        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" color='red'/>
                        </svg>
                            <div className='w-[40px] h-[40px] bg-blue-500 flex justify-center items-center rounded-lg'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                </svg>
                            </div>

                    </div>
                </div>
            </div>

            <div className='w-[85%] h-[15%] bg-white shadow-md border rounded-xl flex  items-center  '>
                        <div className='flex max-w-[4rem] max-h-full rounded-xl '>
                            <img src="https://cdn.dsmcdn.com/ty116/product/media/images/20210517/16/89103874/175162840/1/1_org_zoom.jpg" alt="" className=' rounded-l-xl'/>
                        </div>
                    <div className='w-[50%] flex flex-col justify-center items-center'>
                        <div className=' h-[60%] text-2xl'>
                            Lotion
                        </div>
                        <div className=' h-[40%]'>
                            440 TL
                        </div>

                    </div>
                <div className='flex w-[30%] min-w-[96px] h-full'>
                    <div className='flex w-full justify-end items-center pr-3'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mr-2">
                        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" color='red'/>
                        </svg>
                            <div className='w-[40px] h-[40px] bg-blue-500 flex justify-center items-center rounded-lg'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                </svg>
                            </div>

                    </div>
                </div>
            </div>

            <div className='w-[85%] h-[15%] bg-white shadow-md border rounded-xl flex  items-center  '>
                        <div className='flex max-w-[4rem] max-h-full rounded-xl '>
                            <img src="https://cdn.dsmcdn.com/ty116/product/media/images/20210517/16/89103874/175162840/1/1_org_zoom.jpg" alt="" className=' rounded-l-xl'/>
                        </div>
                    <div className='w-[50%] flex flex-col justify-center items-center'>
                        <div className=' h-[60%] text-2xl'>
                            Lotion
                        </div>
                        <div className=' h-[40%]'>
                            440 TL
                        </div>

                    </div>
                <div className='flex w-[30%] min-w-[96px] h-full'>
                    <div className='flex w-full justify-end items-center pr-3'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mr-2">
                        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" color='red'/>
                        </svg>
                            <div className='w-[40px] h-[40px] bg-blue-500 flex justify-center items-center rounded-lg'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                </svg>
                            </div>

                    </div>
                </div>
            </div>

    </div>
            </div>
            <div className='w-96 h-full border shadow-md rounded-xl'>
                <div className=' h-full flex flex-col items-center justify-evenly'>
                <div className=' text-2xl  '>
                Last Seen
                </div>
                <div className='w-[85%] h-[15%] bg-white shadow-md border rounded-xl flex  items-center  '>
                        <div className='flex max-w-[4rem] max-h-full rounded-xl '>
                            <img src="https://cdn.dsmcdn.com/ty116/product/media/images/20210517/16/89103874/175162840/1/1_org_zoom.jpg" alt="" className=' rounded-l-xl'/>
                        </div>
                    <div className='w-[50%] flex flex-col justify-center items-center'>
                        <div className=' h-[60%] text-2xl'>
                            Lotion
                        </div>
                        <div className=' h-[40%]'>
                            440 TL
                        </div>

                    </div>
                <div className='flex w-[30%] min-w-[96px] h-full'>
                    <div className='flex w-full justify-end items-center pr-3'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mr-2">
                        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" color='red'/>
                        </svg>
                            <div className='w-[40px] h-[40px] bg-blue-500 flex justify-center items-center rounded-lg'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                </svg>
                            </div>

                    </div>
                </div>
            </div>

            <div className='w-[85%] h-[15%] bg-white shadow-md border rounded-xl flex  items-center  '>
                        <div className='flex max-w-[4rem] max-h-full rounded-xl '>
                            <img src="https://cdn.dsmcdn.com/ty116/product/media/images/20210517/16/89103874/175162840/1/1_org_zoom.jpg" alt="" className=' rounded-l-xl'/>
                        </div>
                    <div className='w-[50%] flex flex-col justify-center items-center'>
                        <div className=' h-[60%] text-2xl'>
                            Lotion
                        </div>
                        <div className=' h-[40%]'>
                            440 TL
                        </div>

                    </div>
                <div className='flex w-[30%] min-w-[96px] h-full'>
                    <div className='flex w-full justify-end items-center pr-3'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mr-2">
                        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" color='red'/>
                        </svg>
                            <div className='w-[40px] h-[40px] bg-blue-500 flex justify-center items-center rounded-lg'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                </svg>
                            </div>

                    </div>
                </div>
            </div>

            <div className='w-[85%] h-[15%] bg-white shadow-md border rounded-xl flex  items-center  '>
                        <div className='flex max-w-[4rem] max-h-full rounded-xl '>
                            <img src="https://cdn.dsmcdn.com/ty116/product/media/images/20210517/16/89103874/175162840/1/1_org_zoom.jpg" alt="" className=' rounded-l-xl'/>
                        </div>
                    <div className='w-[50%] flex flex-col justify-center items-center'>
                        <div className=' h-[60%] text-2xl'>
                            Lotion
                        </div>
                        <div className=' h-[40%]'>
                            440 TL
                        </div>

                    </div>
                <div className='flex w-[30%] min-w-[96px] h-full'>
                    <div className='flex w-full justify-end items-center pr-3'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mr-2">
                        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" color='red'/>
                        </svg>
                            <div className='w-[40px] h-[40px] bg-blue-500 flex justify-center items-center rounded-lg'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                </svg>
                            </div>

                    </div>
                </div>
            </div>

            <div className='w-[85%] h-[15%] bg-white shadow-md border rounded-xl flex  items-center  '>
                        <div className='flex max-w-[4rem] max-h-full rounded-xl '>
                            <img src="https://cdn.dsmcdn.com/ty116/product/media/images/20210517/16/89103874/175162840/1/1_org_zoom.jpg" alt="" className=' rounded-l-xl'/>
                        </div>
                    <div className='w-[50%] flex flex-col justify-center items-center'>
                        <div className=' h-[60%] text-2xl'>
                            Lotion
                        </div>
                        <div className=' h-[40%]'>
                            440 TL
                        </div>

                    </div>
                <div className='flex w-[30%] min-w-[96px] h-full'>
                    <div className='flex w-full justify-end items-center pr-3'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mr-2">
                        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" color='red'/>
                        </svg>
                            <div className='w-[40px] h-[40px] bg-blue-500 flex justify-center items-center rounded-lg'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                </svg>
                            </div>

                    </div>
                </div>
            </div>

    </div>
            </div>
            <div className='w-96 h-full border shadow-md rounded-xl'>

                <div className=' h-full flex flex-col items-center justify-evenly'>
                <div className=' text-2xl  '>
                Favorites
                </div>
                <div className='w-[85%] h-[15%] bg-white shadow-md border rounded-xl flex  items-center  '>
                        <div className='flex max-w-[4rem] max-h-full rounded-xl '>
                            <img src="https://cdn.dsmcdn.com/ty116/product/media/images/20210517/16/89103874/175162840/1/1_org_zoom.jpg" alt="" className=' rounded-l-xl'/>
                        </div>
                    <div className='w-[50%] flex flex-col justify-center items-center'>
                        <div className=' h-[60%] text-2xl'>
                            Lotion
                        </div>
                        <div className=' h-[40%]'>
                            440 TL
                        </div>

                    </div>
                <div className='flex w-[30%] min-w-[96px] h-full'>
                    <div className='flex w-full justify-end items-center pr-3'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mr-2">
                        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" color='red'/>
                        </svg>
                            <div className='w-[40px] h-[40px] bg-blue-500 flex justify-center items-center rounded-lg'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                </svg>
                            </div>

                    </div>
                </div>
            </div>

            <div className='w-[85%] h-[15%] bg-white shadow-md border rounded-xl flex  items-center  '>
                        <div className='flex max-w-[4rem] max-h-full rounded-xl '>
                            <img src="https://cdn.dsmcdn.com/ty116/product/media/images/20210517/16/89103874/175162840/1/1_org_zoom.jpg" alt="" className=' rounded-l-xl'/>
                        </div>
                    <div className='w-[50%] flex flex-col justify-center items-center'>
                        <div className=' h-[60%] text-2xl'>
                            Lotion
                        </div>
                        <div className=' h-[40%]'>
                            440 TL
                        </div>

                    </div>
                <div className='flex w-[30%] min-w-[96px] h-full'>
                    <div className='flex w-full justify-end items-center pr-3'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mr-2">
                        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" color='red'/>
                        </svg>
                            <div className='w-[40px] h-[40px] bg-blue-500 flex justify-center items-center rounded-lg'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                </svg>
                            </div>

                    </div>
                </div>
            </div>

            <div className='w-[85%] h-[15%] bg-white shadow-md border rounded-xl flex  items-center  '>
                        <div className='flex max-w-[4rem] max-h-full rounded-xl '>
                            <img src="https://cdn.dsmcdn.com/ty116/product/media/images/20210517/16/89103874/175162840/1/1_org_zoom.jpg" alt="" className=' rounded-l-xl'/>
                        </div>
                    <div className='w-[50%] flex flex-col justify-center items-center'>
                        <div className=' h-[60%] text-2xl'>
                            Lotion
                        </div>
                        <div className=' h-[40%]'>
                            440 TL
                        </div>

                    </div>
                <div className='flex w-[30%] min-w-[96px] h-full'>
                    <div className='flex w-full justify-end items-center pr-3'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mr-2">
                        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" color='red'/>
                        </svg>
                            <div className='w-[40px] h-[40px] bg-blue-500 flex justify-center items-center rounded-lg'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                </svg>
                            </div>

                    </div>
                </div>
            </div>

            <div className='w-[85%] h-[15%] bg-white shadow-md border rounded-xl flex  items-center  '>
                        <div className='flex max-w-[4rem] max-h-full rounded-xl '>
                            <img src="https://cdn.dsmcdn.com/ty116/product/media/images/20210517/16/89103874/175162840/1/1_org_zoom.jpg" alt="" className=' rounded-l-xl'/>
                        </div>
                    <div className='w-[50%] flex flex-col justify-center items-center'>
                        <div className=' h-[60%] text-2xl'>
                            Lotion
                        </div>
                        <div className=' h-[40%]'>
                            440 TL
                        </div>

                    </div>
                <div className='flex w-[30%] min-w-[96px] h-full'>
                    <div className='flex w-full justify-end items-center pr-3'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mr-2">
                        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" color='red'/>
                        </svg>
                            <div className='w-[40px] h-[40px] bg-blue-500 flex justify-center items-center rounded-lg'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                </svg>
                            </div>

                    </div>
                </div>
            </div>

    </div>
            </div>
        </div>

    </div>
  )
}
