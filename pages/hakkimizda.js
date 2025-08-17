import React from 'react'
import useFilterable from '../components/hooks/useFilterable'
import Layout from '@/components/layout/NavbarandProviderLayout'
import ChevronDownArrow from '../components/icons/ChevronDownArrow'

export default function hakkimizda() {
    const filterable = useFilterable()
    const questions = [
        {
          question: 'Vizyonumuz',
          answer: 'İnsanlara; diledikleri hayatları yaşayabilmeleri için kendi başarı düzeylerini oluşturmalarını sağlarken, birlikte çalışma ile markanın değil, bir aile çatısı altında toplanmanın gücünü hissettirmektir.',
        },
        {
          question: 'Misyonumuz',
          answer: 'Dokunabildiğimiz tüm insanların; sahip oldukları potansiyel ile hayallerine ulaşabilmeleri için yanlarında olmak, onları desteklemek, kişisel gelişimleri için alanlar açmak, insan olmanın paylaşmaktan ve iyilik yapmaktan geçtiğini hissettirebilmek.',
        },  
   
      ]
    
      function toggleQuestion(event) {
        const target = event.currentTarget
        const isOpen = target.getAttribute('data-open') === 'true'
        target.setAttribute('data-open', !isOpen)
      }

  return (
    <Layout>
            <div className="w-full h-full flex flex-col justify-center gap-10 text-center py-5 lg:px-20 px-5">
                <h1 className="text-2xl font-semibold">Hakkımızda</h1>
                <div className="flex flex-wrap gap-3">
                    {questions.map((question, index) => (
                        <div key={index} data-open={false} onClick={(event) => {
                          toggleQuestion(event)
                        }}
                             className="bg-white w-full h-fit text-center justify-center select-none items-center border p-5 drop-shadow-lg flex flex-col group">
                            <span
                                className="flex items-center gap-3 group-data-[open=true]:[&>svg]:-rotate-180 [&>svg]:transition-all font-semibold">{question.question}
                                <ChevronDownArrow/></span>
                            <span className="origin-top h-0 group-data-[open=true]:h-full scale-0 group-data-[open=true]:scale-100 transition-transform text-gray-500">{question.answer}</span>
                        </div>
                    ))}
                   <div key={"nonListed"} data-open={false} onClick={(event) => {
                          toggleQuestion(event)
                        }}
                             className="bg-white w-full h-fit text-center justify-center select-none items-center border p-5 drop-shadow-lg flex flex-col group">
                            <span
                                className="flex items-center gap-3 group-data-[open=true]:[&>svg]:-rotate-180 [&>svg]:transition-all font-semibold">Değerlerimiz
                                <ChevronDownArrow/></span>
                            <span className="origin-top h-0 group-data-[open=true]:h-full scale-0 group-data-[open=true]:scale-100 transition-transform text-gray-500">
                            <div class="text-gray-700 text-sm">
    <div class="mb-4">
        <b class="block">LİDERLİK</b>
        <span>Doğru yapılanı en iyi yaparak, daha önce denenmemiş alanlara akıllıca yatırımlar yaparak, lider tavrımızı sürdürürüz.</span>
    </div>
    <div class="mb-4">
        <b class="block">MÜŞTERİ ODAKLILIK</b>
        <span>İş süreçlerimizin performansını, sorumluluk ve inisiyatif sahibi tavrımızı ve güvenirliğimizi sürekli sorgulayarak, istenilen müşteri memnuniyetinin de üstünde olmaya gayret ederiz. Böylelikle, tüm çalışanlarımız ve girişimcilerimiz için değer üretmeye devam ederiz.</span>
    </div>
    <div class="mb-4">
        <b class="block">DEĞERLERİMİZE BAĞLILIK</b>
        <span>Değer üretmek bizim için diğer kazançlardan önce gelir. Bu nedenle tüm müşterilerimiz ve girişimcilerimiz ile iyi niyetli, adil ve karşılıklı değer üretme prensibine dayalı ilişkiler kurarız. İşimizle ilgili uluslararası etik ve hukuki kurallarını gözetiriz. Toplum yararını ve gelecek kuşaklara yansıyacak olan sonuçları dikkate alarak davranırız. Dünyamız ve ülkemizdeki insanların sağlığını, önceliğimiz olarak görürken bunun önemini yaygınlaştırmayı kendimize görev biliriz.</span>
    </div>
    <div class="mb-4">
        <b class="block">KÜRESEL TECRÜBE</b>
        <span>Çalışanlarımızın mesleki yeteneklerini geliştirmelerini teşvik eder ve onları uygun koşullar sunarak destekleriz. Denemeyen başaramaz prensibinden hareketle, çalışanlarımıza denemeleri için cesaret veririz. Bu kapsamda da başarımızı sürdürmek ve hedeflerimize ulaşmak için, işini iyi bilen ve iyi yapan bir ekiple çalışırız.</span>
    </div>
    <div class="mb-4">
        <b class="block">SÜRDÜRÜLEBİLİR BÜYÜME</b>
        <span>Kurulduğumuz günden bu yana birincil önceliğimiz Türkiye'nin uluslararası marka değerini yükseltmek olmuştur. Bu nedenle ürettiğimiz ürünlerin hammaddelerini kendi bünyemizde üretmek fikrini her zaman benimseriz. Böylelikle yerli üretimi korumayı ve sahip olduğu değerleri ortaya çıkartmayı hedefleyen, sektörümüzün ve ülkemizin gelişimine katkı sağlayan, ekonomik sürdürülebilirlik prensiplerine uygun projelere imza atarız.</span>
    </div>
</div>
                            </span>
                </div>
                <div key={"nonListed2"} data-open={false} onClick={(event) => {
                          toggleQuestion(event)
                        }}
                             className="bg-white w-full h-fit text-center justify-center select-none items-center border p-5 drop-shadow-lg flex flex-col group">
                            <span
                                className="flex items-center gap-3 group-data-[open=true]:[&>svg]:-rotate-180 [&>svg]:transition-all font-semibold">Başkanın Mesajı
                                <ChevronDownArrow/></span>
                            <span className="origin-top h-0 group-data-[open=true]:h-full scale-0 group-data-[open=true]:scale-100 transition-transform text-gray-500">
                            Adı "Hayat " olan, neşe ve mutluluklarla dolu maceranın içinde, ailem ile birlikte yarattığımız ve arkamıza baktığımız da yaratılmış olan 30 yıllık bu eser bizlere gurur veriyor. 
Bu yola çıktığımızda sıfırdan başlamıştık. Öz sermayemiz yoktu. Tüm sermayemiz birlikten güç doğar diyerek kendimize olan inancımızdı. Paylaştıkça büyürsün felsefesinden vazgeçmemek bizleri bugünler taşıdı.
Şirket felsefemizin ana hatları o günlerde oluştu. Bu felsefe doğrultusunda, iş dünyasında "en saygın ve güvenilir” şirketleri arasında olmayı ana hedef edindik.
Birlikte çalıştığım tüm serbest girişimcilerimize ve tüm çalışma arkadaşlarıma güveniyorum. LYKOSis ‘i daha da yüksek platformlara birlikte taşıyacaklarına, yerli sermayenin dünya çapında da yerini alacağına sonsuz inanç besliyorum.
Kendine dokunan gezegene dokunur bilgeliğinin, dünyayı değiştireceğine inanıyorum 
<p className='block font-bold'>

-Gülşah TIKIROĞLU YILDIRIM 
</p>
<span className='block font-semibold'>
Lykosis Yönetim Kurulu Başkanı
</span>
                            </span>
                </div>
                </div>
            </div>
        </Layout>
  )
}
