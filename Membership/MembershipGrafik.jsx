import React from 'react'
import { Pie } from 'react-chartjs-2'
import 'chart.js/auto';
export default function MembershipGrafik({ graphData }) {
  console.log(graphData)
  if ((Object.keys(graphData).length <= 0))
    return <></>
  console.log(graphData)

  const labels = ['Müşteri', 'Üye']
  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Para kazanımı',
        data: [graphData.tree.musteri_geliri_val > 0 ? graphData.tree.musteri_geliri_val : 1, graphData.tree.unconfirmed_balance - graphData.tree.musteri_geliri_val > 0 ? graphData.tree.unconfirmed_balance - graphData.tree.musteri_geliri_val : 1], // 30% blue and 70% orange
        backgroundColor: ['blue', 'orange'],
      },
    ],
  }
  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'top', // You can adjust the position as needed
        labels: {
          color: 'black', // Label color
          font: {
            size: 16, // Label font size
          },
        },
      },
    },
  }
  const bonusGraphData = ['Müşteri geliri', 'Ekip geliri', 'Tanistirma geliri', 'Organizasyon geliri']
  const bonusGraphOptions = {
    labels: bonusGraphData,
    datasets: [
      {
        fill: true,
        label: 'Data',
        data: [
          graphData.tree.musteri_geliri_val > 0 ? graphData.tree.musteri_geliri_val : 1,
          graphData.tree.ekip_geliri_val > 0 ? graphData.tree.ekip_geliri_val : 1,
          graphData.tree.tanistirma_geliri_val > 0 ? graphData.tree.tanistirma_geliri_val : 1,
          graphData.tree.organizasyon_geliri_val > 0 ? graphData.tree.organizasyon_geliri_val : 1], // Define your data percentages for each part
        backgroundColor: [
          'green',
          'red',
          'purple',
          'cyan',
        ], // Colors for each part
      },
    ],
  }
  const bonusGraphSettings = {
    plugins: {
      legend: {
        display: true,
        position: 'left', // Move the legend to the right of the pie chart
      },
    },
  }
  const canvasWidth = 400 // Adjust the desired width for the pie chart
  const canvasHeight = 400 // Adjust the desired height for the pie chart
  function kariyerFromPoint(point) {
    switch(point){
      case 0:
        return "Üye"
      case 1:
        return "Jade"
      case 2:
        return "Pearl"
      case 3:
        return "Emerald"
      case 4:
        return "Sapphire"
      case 5:
        return "Black Sapphire"
      case 6:
        return "Red Sapphire"
      case 7:
        return "Ruby"
      case 8:
        return "Black Ruby"
      case 9:
        return "Blue Ruby"
      case 10:
        return "Diamond"
      case 11:
        return "Black Diamond"
      case 12:
        return "Red Diamond"
      case 13:
        return "Blue Diamond"
      default:
        return "Üye"
    }
  }
  return (
    <div className="w-full lg:w-[40%] h-full gap-5 bg-primary rounded-lg items-center flex flex-col">
      <div className="flex justify-between items-center divide-x w-full text-white text-xl border-b">
        <button className="w-full h-full justify-center items-center gap-2 flex flex-col">
          <span>Toplam Puan</span>
          <span className="font-normal text-gray-300">
            {graphData?.tree?.real_point1}
          </span>
        </button>
        <button className="w-full h-full justify-center items-center gap-2 flex flex-col">
          <span>Kazanılan Para</span>
          <span className="font-normal text-gray-300">
            {
              graphData?.tree?.unconfirmed_balance
            }
          </span>
        </button>
        <button className="w-full h-full justify-center items-center gap-2 flex flex-col">
          <span>Kariyer</span>
          <span className="font-normal text-gray-300">
            {
              kariyerFromPoint( graphData?.tree?.real_point1)            
            
            }
          </span>
        </button>
        <button className="w-full h-full justify-center items-center gap-2 flex flex-col">
          <span>Kendi Puanım</span>
          <span className="font-normal text-gray-300">
            {
              Number.parseInt(graphData?.tree?.self_gained_point1)

            }
          </span>
        </button>
      </div>
      <div className="w-full h-full p-2 items-center flex flex-col text-white gap-3 overflow-auto tree-container">
        <h3 className="text-xl font-semibold">
          {
            graphData?.tree?.active
              ? 'Aktif Üye'
              : 'Pasif Üye'
          }
        </h3>
        <div className="flex bg-white h-[275px] rounded-xl  ">
          <div className="w-[250px] h-[250px] p-5">
            <span className="text-black w-full flex justify-center items-center text-2xl font-semibold">
              Puan Dağılımı
            </span>

            <Pie data={data} options={options}/>
          </div>
          <div className="w-[250px] h-[250px] p-5">
          <span className="text-black w-full flex justify-center items-center text-2xl font-semibold">
              Para Dağılımı
            </span>
            <Pie data={data} options={options} />
          </div>

        </div>
        <div className="flex bg-white rounded-xl h-[275px] w-[500px] ">
           <Pie data={bonusGraphOptions}
                       options={{ ...bonusGraphSettings, responsive: true, maintainAspectRatio: false, width: canvasWidth, height: canvasHeight }}

           />
        </div>
      </div>
    </div>
  )
}
