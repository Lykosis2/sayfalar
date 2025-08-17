import React, { useContext, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js'
import Link from 'next/link'
import useWindowSize from '../hooks/useWindowDimension'
import { NavbarContext } from '@/pages/profile'
Chart.register(...registerables)

export default function ProfilePart() {
  const context = useContext(NavbarContext)
  const size = useWindowSize()
  const { showNavbar, setShowNavbar } = context

  useEffect(() => {
    if (size.width < 1024)
      setShowNavbar(false)

    else
      setShowNavbar(true)
  }, [size.width])
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        data: [12, 19, 3, 5, 2, 3, 4, 5, 6, 7, 9, 8],
      },
    ],
  }
  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    elements: {
      line: {
        tension: 0,
        borderWidth: 2,
        borderColor: (ctx) => {
          const temp = (ctx.dataset.data.slice(-2))
          if (temp[0] > temp[1])
            return 'red'

          else
            return 'green'
        },

      },
      point: {
        radius: 0,
        hitRadius: 0,
      },

    },

    scales: {
      xAxis: [{
        gridLines: {
          display: false,

        },

      }],
      yAxis: [{
        gridLines: {
          display: false,
        },

      }],
    },
  }

  return (
    (showNavbar)
      ? <div className='w-[25%] min-w-[200px] h-full fixed left-0 top-0 bottom-0 rounded-3xl bg-white flex flex-col items-center border '>
        <div className=' absolute w-4 h-12 bg-gray-600 top-[50%] left-[100%] translate-x-[-100%] rounded-l-lg' onClick={() => {
          setShowNavbar(false)
        }} >

        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-11 pr-0.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" color='white' />
        </svg>

        </div>
        <Link className={`top-0 left-0  w-10 h-10 bg-gray-400 rounded-full ${showNavbar ? 'absolute' : 'hidden'}`}
        href={'/'}>

        </Link>
        <div className='mt-12 mb-2 w-full h-[30%] flex flex-col justify-end items-center'>
            <div className='w-56 h-56 rounded-full bg-blue-600'>
            </div>

        <div className='flex justify-center text-2xl ml-2 mt-4 items-center  '>
            <span>
                Your name
            </span>
            <div className='w-6 h-6 bg-gray-400 ml-3 mt-1 flex items-center justify-center'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
</svg>

            </div>
        </div>
        </div>
        <div className='flex w-full h-[25%] items-center '>
            <ul className=' mx-[10%] py-4 w-full h-full flex flex-col gap-2 justify-center'>
                <li className='h-full flex justify-center items-center'>
                    <div className='w-full h-[50px] bg-white border flex items-center justify-center rounded-2xl text-lg font-semibold'>
                        Your missions

                    </div>

                </li>
                <li className="h-full flex justify-center items-center">
                    <div className='w-full h-[50px] bg-white border flex items-center justify-center rounded-xl text-lg font-semibold'>
                        New Missions

                    </div>

                </li>
                <li className='h-full flex justify-center items-center'>
                    <div className='w-full h-[50px] bg-white border flex items-center justify-center rounded-xl font-roboto font-semibold'>
                        Completed Missions

                    </div>

                </li>
            </ul>

        </div>
        <div className='h-[28%] w-full'>
            <div className='text-xl font-semibold text-center flex justify-center items-center'>
                <span>
                    Your Progress
                </span>
            </div>
            <div className='flex justify-center items-center'>

                <div className='border w-full rounded-xl max-w-[60%] flex px-3 py-2 gap-2' >
                    <div className='flex w-[30%] h-full whitespace-nowrap text-ellipsis bg-purple-500'>
                        span

                    </div>
                    <button className=' flex w-[30%] border border-blue-600 rounded-xl px-2 text-sm'>
                   Weekly
                    </button>
                    <button className=' flex w-[30%] text-ellipsis whitespace-nowrap mr-2 border border-blue-600 rounded-xl px-2 text-sm'>
                        <span className='w-full text-ellipsis whitespace-nowrap'>

                    Monthly
                        </span>
                    </button>
                </div>
            </div>

            <div className='h-full w-full justify-center items-center flex '>
                <Line data={data} width={100} height={50} options={options} />

            </div>
        </div>
    </div>
      : <div className=' absolute top-0 left-0 z-50' onClick={() => setShowNavbar(true)}>
        <div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
        </svg>

        </div>

    </div>
  )
}
