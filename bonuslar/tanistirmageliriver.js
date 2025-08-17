import locker from "@/lib/providers/locker"

export default async function tanistirmaGeliriVer(firstSponsor,money){
      firstSponsor.unconfirmed_balance += money / 20
      firstSponsor.tanistirmaGeliri += money / 20
      
      await locker.lockAndWait(`saleAccount-${firstSponsor.id}`)
      firstSponsor.save()
      await locker.unlock(`saleAccount-${firstSponsor.id}`)
}
