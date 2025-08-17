export default function safeMemberDiscount(price) {
  // 30% discount with safe float operation
  // First multiply by 100 then get 70% then divide back
  return price * 100 * 70 / 10000
}
