import dynamic from 'next/dynamic'

const Map = dynamic(() => import('./MapPart'), { ssr: false })
export default Map
