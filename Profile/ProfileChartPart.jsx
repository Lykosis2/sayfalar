import React, { useContext } from 'react'
import { Line, Pie } from 'react-chartjs-2'
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import { NavbarContext } from '@/pages/profile'

ChartJS.register(ArcElement, Tooltip, Legend)

export default function ProfileChartPart() {
  const context = useContext(NavbarContext)
  const { showNavbar } = context
  const data2 = {
    labels: ['You', 'Others'],
    datasets: [
      {

        data: [1, 99],

        pieceLabel: {
          mode: 'percentage',
        },
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(0, 0, 0, 0.2)',

        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(0, 0, 0, 0.2)',

        ],
        borderWidth: 1,
      },
    ],
  }
  const options = {
    responsive: true,
    plugins: {
      datalabels: {
        display: true,
        align: 'center',
        backgroundColor: '#ccc',
        borderRadius: 3,
        font: {
          size: 18,
        },
      },
      legend: {
        display: false,
      },
      title: {
        display: true,
      },
    },
  }

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']
  const data = {
    labels,

    datasets: [
      {
        fill: true,
        label: 'Dataset 2',
        data: labels.map(() => Math.round(Math.random() * 100)),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  }

  return (
    <div className={` ${showNavbar ? 'privateNav2' : 'privateNav1'} bg-white lg:translate-x-[33.5%] translate-x-0 lg:w-[75%] w-full  justify-center items-center flex h-[30%]`}>
      <div className='flex justify-evenly pt-4 h-full w-full '>

      <div className='h-full w-[30%] border-2 rounded-xl shadow-gray-800 items-center justify-center flex-col'>
          <div className='flex justify-center items-center mt-4 text-xl font-semibold'>

          <span>
            Total Sold
          </span>
          </div>
          <div className='h-[80%] w-full flex justify-center'>
            <Line options={options} data={data} width={400} height={200} />
          </div>

        </div>

        <div className='h-full w-[30%] border-2 rounded-xl shadow-gray-800  items-center justify-center flex-col'>
          <div className='flex mt-2 justify-center items-center text-xl font-semibold'>
          <span>
            Top 1%
          </span>
          </div>
          <div className='max-h-[200px]   w-full mb-[22.5px] flex justify-center'>
          <Pie data={data2} className='' options={options} width={100} height={50} />
          </div>

        </div>

        <div className='h-full w-[30%] border-2 rounded-xl shadow-gray-800 items-center justify-center flex-col'>
          <div className='flex justify-center items-center mt-4 text-xl font-semibold'>

          <span>
            Total Earned
          </span>
          </div>
          <div className='h-[80%] w-full flex justify-center '>
            <Line options={options} data={data} width={400} height={200} />
          </div>

        </div>

      </div>

    </div>
  )
}
