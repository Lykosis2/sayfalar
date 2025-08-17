import React from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import L from 'leaflet'

export default function Map() {
  const markerRef = React.useRef(null)
  const [popupOpen, setPopupOpen] = React.useState(true) // Decoy state

  React.useEffect(() => {
    console.log(markerRef.current)
    setPopupOpen(false)
    if (markerRef.current) {
      markerRef.current.openPopup()
      console.log(markerRef.current.openPopup())
    }
  }
  , [markerRef.current])

  const myIcon = new L.Icon({
    iconUrl: './marker.png',
    iconRetinaUrl: './marker.png',
    popupAnchor: [-0, -0],
    iconSize: [18, 30],
  })
  return (
    <MapContainer className='map rounded-xl' center={[37.74816742026157, 29.091463285137458]} // CENTER BILGINIZ NEREDE İSE ORAYA KOYUNUZ
    zoom={14} // ZOOM NE KADAR YAKINDA OLMASINI
    maxZoom={17}
    doubleClickZoom={false} // Disable double-click zoom
      scrollWheelZoom={false} // Disable scroll wheel zoom
      dragging={false} >
        <TileLayer // Bu kısımda değişikliğe gerek yok
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'

        />
        <Marker
        position={[37.74816742026157, 29.091463285137458]} // MARKERIN KOORDINATLARI
        icon={myIcon}
        ref={markerRef}

        >
        <Popup autoClose={false} >
            <div className='flex w-72 h-36 flex-col'>

            <span className='font-semibold flex text-lg w-full justify-center cursor-pointer' onClick={() => {
              window.open('https://maps.app.goo.gl/GcPkAE9EfMb8WpiL7')
            }}>Lykosis Network Marketing </span>
            <span className='flex w-full justify-center mt-2 cursor-pointer select-none' onClick={() => {
              window.open('https://maps.app.goo.gl/GcPkAE9EfMb8WpiL7')
            }}>
                Adres: Kınıklı Mahallesi Çamlık Cad, 6108. Sk. 8/A, 20160 Denizli Merkez/Denizli
            </span>
            <span className='flex w-full justify-start mt-2'>
                Telefon: <a href='tel:+90 258 211 29 09'>+90 258 211 29 09</a>
            </span>
            <span className='flex w-full justify-start mt-2'>
                Açık : Haftaiçi 09:00 - 18:00
            </span>
            <span className='flex w-full justify-start mt-2'>
                Network Dersleri : Salı 19:00 - 21:00
            </span>

            </div>

        </Popup>
        </Marker>

    </MapContainer>
  )
}
