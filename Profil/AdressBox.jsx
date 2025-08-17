import React from 'react'

export default function AdressBox({ adresData,setCurrentEditAddressData,deleteAddress,loading}) {
    console.log(adresData);
  return (
        <div className="w-full rounded-xl border border-black flex flex-col items-center p-2">
            <h3 className="text-center font-semibold ">{adresData.adresTitle}</h3>
            <div className="flex flex-col lg:flex-row gap-5 justify-between w-full">

                <div
                    className="flex flex-col lg:flex-row gap-3 w-full lg:w-[75%] whitespace-nowrap text-center">
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col lg:flex-row">
                            <p className="font-semibold">Adres Başlığı: </p>
                            <p className="ml-2">{adresData.title}</p>
                        </div>
                        <div className="flex flex-col lg:flex-row">
                            <p className="font-semibold">Şehir: </p>
                            <p className="ml-2">{adresData.city}</p>
                        </div>
                        <div className="flex flex-col lg:flex-row">
                            <p className="font-semibold">İlçe: </p>
                            <p className="ml-2">{adresData.district}</p>
                        </div>
                        <div className="flex flex-col lg:flex-row">
                            <p className="font-semibold">Mahalle: </p>
                            <p className="ml-2">{adresData.neighborhood}</p>
                        </div>
                    </div>
                </div>

                <div
                    className="flex flex-col justify-between w-full items-center lg:items-end text-center">
                    <div className="flex flex-col lg:flex-row">
                        <p className="font-semibold whitespace-nowrap">Adres Tarifi: </p>
                        <p className="ml-2 text-ellipsis overflow-hidden">{adresData.address}</p>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-3 justify-center">
                        <button
                            onClick={() => {
                             setCurrentEditAddressData(adresData)
                            }}
                            className="bg-button-yellow text-white rounded-lg px-3 py-2">Düzenle

                        </button>
                        <button
                            className="bg-custom-button-red text-white rounded-lg px-3 py-2"
                            onClick={() => deleteAddress(adresData.id)}
                            disabled={loading}
                        >
                            {
                                loading ? "Siliniyor..." : "Kaldır"
                            }
                        </button>
                    </div>
                </div>
            </div>
        </div>
  )
}
