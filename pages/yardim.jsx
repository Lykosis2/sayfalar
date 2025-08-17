import React from 'react'
import Layout from '@/components/layout/NavbarandProviderLayout'
import ChevronDownArrow from '@/components/icons/ChevronDownArrow'
import useFilterable from '@/components/hooks/useFilterable'

export default function Yardim() {
  const filterable = useFilterable()


  const questions = [
    {
      question: 'Nasıl üye olabilirim?',
      answer: 'Üye kısmındaki iş paketlerinden herhangi bir tanesini aldiginiz anda üye olmuş sayılırsınız.İş paketleri kullanıcı ile Lykosis arasında bir sözleşme niteliği taşıdığından dolayı iade edilemezler.',
    },
    {
      question: 'Üyeliğimi nasıl aktif edebilirim?',
      answer: 'Üyeliğinizi aktif etmek için aylık 50 puan değerinde ürün almanız gerekmektedir.',
    },
    {
      question: 'Nasıl para kazanabilirim?',
      answer: 'Üye olduktan sonra referans numaranızla birisini üye veya müşteri yaptığınız taktirde onların alışverişinden para kazanırsınız.Üyeniniz üyesinden de 6.basamağa kadar para kazanabilirsiniz.Bu paraları alabilmek için aktif üye olmak zorundasınız.',
    },
    {
      question: 'Şifremi unuttum ne yapmalıyım?',
      answer: 'Şifrenizi unuttuğunuzda müşteri hizmetlerimizle iletişime geçerek hesabın size olduğuna dair birkaç kanıtlamayı yaptıktan sonra TC sorgulaması gibi müşteri hizmetlerine hesabın size ait olduğunu kanıtladığınız zaman şifrenizi sıfırlayacaktır.',
    },
    {
      question:"IBAN'ımı nasıl değiştirebilirim?",
      answer: 'IBAN değişikliği  müşteri hizmetlerimizle iletişime geçerek hesabın size olduğuna dair birkaç kanıtlamayı yaptıktan sonra TC sorgulaması gibi müşteri hizmetlerine hesabın size ait olduğunu kanıtladığınız zaman IBANınızı değiştirebilirsiniz.',
    },
    {
      question: 'Üyeliğimi nasıl iptal edebilirim?',
      answer: 'Üyeliğinizi iptal etmek gibi bir şey mümkün değildir iş paketi aldıktan sonra ancak 12 ay pasif üye olursanız sistemimizden otomatik olarak silinirsiniz.',
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
                <h1 className="text-2xl font-semibold">Yardım</h1>
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
                </div>
            </div>
        </Layout>
  )
}
