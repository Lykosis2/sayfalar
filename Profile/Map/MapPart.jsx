import 'leaflet/dist/leaflet.css'
import React, { useContext } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import L from 'leaflet'
import { FullscreenControl } from 'react-leaflet-fullscreen'
import MarkerClusterGroup from './MakeClusterGroup'

export default function MapPart({ mapData }) {
  console.log(mapData)
  if (!mapData)
    mapData = {}
  const ref = React.useRef()
  const iconUrl = '/marker.png' // URL of the marker icon image

  // Preload the marker icon image
  React.useEffect(() => {
    const iconImage = new Image()
    iconImage.src = iconUrl

    // Optionally, handle the onload and onerror events if needed
    iconImage.onload = () => {
      console.log('Marker icon image preloaded successfully')
      // You can set some state or perform other actions here if needed
    }

    iconImage.onerror = (error) => {
      console.error('Marker icon image preload error:', error)
    }

    // Clean up the event listeners when the component unmounts
    return () => {
      iconImage.onload = null
      iconImage.onerror = null
    }
  }, [iconUrl])

  const myIcon = new L.Icon({
    iconUrl,
    iconRetinaUrl: '/marker.png',
    popupAnchor: [-0, -0],
    iconSize: [25, 41],
  })
  const position = [51.505, -0.09]
  // lg:translate-x-[33.5%] translate-x-0 lg:w-[75%] w-full ${showNavbar? "privateNav2":"privateNav1 "} justify-evenly h-full min-h-[682px]
  return (
    <MapContainer
      className="map rounded-xl" // class adı kendinize göre ayarlayabilirsiniz isterseniz
      ref={ref}
      center={[37.7833, 29.10]} // CENTER BILGINIZ NEREDE İSE ORAYA KOYUNUZ
      zoom={7} // ZOOM NE KADAR YAKINDA OLMASINI
      maxZoom={17}
          // maxZoomu kendinize göre ayarlayın
    >
      <TileLayer // Bu kısımda değişikliğe gerek yok
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'

        />
        <MarkerClusterGroup>
          {
            Object.keys(mapData).map(user => (
              <Marker key={user} position={[mapData[user].latitude,
                mapData[user].longitude]} icon={myIcon}>
                  <Popup>
                    <div className="w-40 h-12 flex  ">

                        <div className='w-full h-full flex flex-col items-center justify-center'>
                          <h3 className="font-semibold text-base whitespace-nowrap">
                            {mapData[user].name}
                          </h3>

                        <span className="text-sm font-semibold">
                          {mapData[user].real_title === 0
                            ? 'Üye'
                            : mapData[user].real_title === 1
                              ? 'Jade'
                              : mapData[user].real_title === 2
                                ? 'Pearl'
                                : mapData[user].real_title === 3
                                  ? 'Emerald'
                                  : mapData[user].real_title === 4
                                    ? 'Sapphire'
                                    : mapData[user].real_title === 5
                                      ? 'Black Sapphire'
                                      : mapData[user].real_title === 6
                                        ? 'Red Sapphire'
                                        : mapData[user].real_title === 7
                                          ? 'Ruby'
                                          : mapData[user].real_title === 8
                                            ? 'Black Ruby'
                                            : mapData[user].real_title === 9
                                              ? 'Blue Ruby'
                                              : mapData[user].real_title === 10
                                                ? 'Diamond'
                                                : mapData[user].real_title === 11
                                                  ? 'Black Diamond'
                                                  : mapData[user].real_title === 12
                                                    ? 'Red Diamond'
                                                    : mapData[user].real_title === 13
                                                      ? 'Blue Diamond'
                                                      : 'Üye'

                          }
                        </span>
                        </div>

                      </div>

              </Popup>
                </Marker>))
          }
        </MarkerClusterGroup>

        <FullscreenControl position="topright" forceSeparateButton content='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4"><path d="M8 3V5H4V9H2V3H8ZM2 21V15H4V19H8V21H2ZM22 21H16V19H20V15H22V21ZM22 9H20V5H16V3H22V9Z"></path></svg>'

        />
     {
       /*
       <MarkerCluster/>

      */
     }
    </MapContainer>
  )
}
