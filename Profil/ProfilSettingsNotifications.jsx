import { useContext, useState } from 'react'
import { ofetch } from 'ofetch'
import { SharedContext } from '../layout/AgacDataSharer'

export default function ProfilSettingsNotifications({ setInputChanged }) {
  const { preference } = useContext(SharedContext)
  const [mailNotifications, setMailNotifications] = useState(preference.mail)
  const [smsNotifications, setSmsNotifications] = useState(preference.sms)

  async function handleSubmit() {
    ofetch('/api/finalEndPoints/user/notifications', {
      method: 'POST',
      body: {
        mail: mailNotifications,
        sms: smsNotifications,
      },
    })
  }

  return (
    <>
        {/* <div className="flex flex-col items-center w-full h-full">
            <div className="flex w-18 h-fit gap-2 items-center">
                <input checked={mailNotifications} onChange={e => setMailNotifications(e.target.checked)} type="checkbox" className="w-5 h-5"/>
                <span className="text-xl">Mail Üzerinden bildirim almak istiyor musunuz?</span>
            </div>
            <div className="flex w-18 h-fit gap-2 items-center">
                <input checked={smsNotifications} onChange={e => setSmsNotifications(e.target.checked)} type="checkbox" className="w-5 h-5"/>
                <span className="text-xl">Mesaj ile bildirim almak istiyor musunuz?</span>
            </div>
    <button onClick={handleSubmit} className="mt-5 bg-primary text-white rounded-md p-2">
      <span className="text-xl">Kaydet</span>
    </button>
        </div> */}
        <h2>
          Bildirim Ayarları Sayfası Yapım Aşamasındadır.
        </h2>
    </>
  )
}
