import findAtLeastTwo from '../calculate/findAtLeastTwo'
import findAtLeastOne from '../calculate/findAtLeastOne'
import findSmallandLongBranchTitles from '../findSmallandLongBranchTitles'

export default async function isValidForLeadershipBonusandCalculateIfValid(userTree, pathcedSaleAccount, realPoint1) {
  // userTree kullanıcının ağacı
  // pathcedSaleAccount kullanıcının saleAccountı
  // realPoint1 kullanıcının gerçek puanı

  // TODO : USERIN KENDI TITLEINA BAK 7 DEN BUYUK OLMALI
  // EGER 7 DEN BUYUKSE KISA DALINI BUL VE O KISIMDA KENDI TITLEINDAN DUSUK 1 ADET ADAM KENDI TITLEINDA 2 DUSUK 2 ADAM OLMALI
  // ORNEK RANKI 8 KISA DALINDA 1 ADET TITLE 7 , 2 ADET TITLE 6 OLMALI
  // UZUN DALINI BUL UZUN DALINDA DA 1 ADET ADAM KENDI TITLEINDA 2 DUSUK 2 ADAM OLMALI
  // AYNI SEY KISA DAL ILE ORNEK RANKI 8 KISA DALINDA 1 ADET TITLE 7 , 2 ADET TITLE 6 OLMALI
  // EGER BU KONDISYONLAR SAGLANIYORSA TRUE DONER
  // EGER BU KONDISYONLAR SAGLANMIYORSA FALSE DONER
  // NOT: KISA VE UZUN DALI BULAM FONKSIYONLAR VAR ADI FINDSMALLBRANCH
  // NOT: FINDSMALLBRANCH AGACTAKI KISA DALI BULUP KISA VE UZUN DALA GORE PUAN DONDURUR ONA BENZER AMA TITLEARA BAKICAK BIR FONKSIYON YAZ
  // EGER VALID ISE ELINDEKI VERILERLE ADAMIN LIDERLIK BONUSUNU HESAPLA TITLE * 500 YAP SU ANLIK
  if (pathcedSaleAccount.real_title >= 5) {
    const titles = findSmallandLongBranchTitles(userTree.self_tree_positions)
    const longBranchTitles = titles[0]
    const shortBranchTitles = titles[1]
    const bigLeaders = pathcedSaleAccount.real_title - 1
    const smallLeaders = pathcedSaleAccount.real_title - 2
    if (findAtLeastOne(longBranchTitles, bigLeaders) && findAtLeastTwo(longBranchTitles, smallLeaders) && findAtLeastOne(shortBranchTitles, bigLeaders) && findAtLeastTwo(shortBranchTitles, smallLeaders)) {
      const price = (pathcedSaleAccount.real_point1 / 50) * pathcedSaleAccount.real_title
      return [true, price]
    }
    return [false, 0]
  }
  return [false, 0]

  // ORNEK RETURN [false,0]
  // ORNEK RETURN [true,5000]
}
