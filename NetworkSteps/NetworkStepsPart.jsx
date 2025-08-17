import React from 'react'
import BlueBlobNetworkPart from './BlueBlobNetworkPart'

export default function NetworkStepsPart() {
  return (
    <div
    className='lg:mx-16 mx-0 h-auto justify-center flex flex-col m-auto sm:justify-start rounded-3xl mb-4 drop-shadow-xl shadow-primary '>

      <div className={'2xl:w-[1075px] xl:w-[850px] w-[95%] h-auto pb-1 2xl:translate-x-[35%] xl:translate-x-1/3 translate-x-[2%] rounded-xl bg-primary mt-4 block'}>
    <span className='w-full h-auto font-medium xl:text-4xl sm:text-2xl xs:text-lg text-lg items-center justify-center flex pt-2 mb-2 text-white '>
    ÜYE OLUN YAŞAM İLE İŞİNİZİN DENGESİNİ BULUN

    </span>
    <span className='w-full h-auto text-sm lg:pl-4 px-2 overflow-hidden text-ellipsis flex lg:text-lg text-white white '>
    Bir Lykosis üyesi olarak kendi işinizdesiniz,ama yalnız değilsiniz.İşinize ve yaşamınıza ne kadar zaman ayıracağınıza siz karar verirsiniz.Liderlerle tanışın,başarılarını öğrenin ve onlardan ilham alın ve zamanla bir lider olun.
    Her zaman lykosis olarak bir adım kadar yanınızdayız.   Pes etmeden yola devam edin.
    </span>
    </div>

      <div className='lg:w-[900px] w-full flex xl:justify-center justify-start flex-col items-center 2xl:translate-x-1/4 xl:translate-x-[15%] lg:translate-x-0 translate-x-0 md:gap-0 gap-4'>

        <BlueBlobNetworkPart title="TAVSİYE EDİN" description="20 yıllık tecrübesi ile yüksek kaliteli lykosis ürünlerini keyifle kullanırken başkalarına tavsiye ederek varlık edine bilirsin." placement="left"/>

        <BlueBlobNetworkPart title="BAŞARIYA ADIM ADIM" description="LYKOSİS sizi,yaşamın tüm alanlarında başarıya adım adım taşımak için profösyönel ekipleri ve sponsorları ile destekler." placement="right"/>

        <BlueBlobNetworkPart title="SİSTEMİNİ GENİŞLET" description="İşinizin kontrolü sizde, zaman mekan kişi zorunlulukları olmadan lykosis 'in profösyönel ekipleri ve sponsorları ile sistemini dilediğin kadar genişlete bilirsin." placement="left"/>

        <BlueBlobNetworkPart title="KARİYER ATLA" description="Yarı yada tam zamanlı çalışmak size bırakılmıştır.Kariyer seviyenizi performansınıza göre siz belirlersiniz" placement="right"/>

        <BlueBlobNetworkPart title="VARLIK EDİN" description="Lykosis ile görünmezlikten ortalamaya,ortalamadan sıradışılığa,sıradışılıktan efsaneye dönüşürsünüz." placement="left"/>
      </div>
    </div>
  )
}
