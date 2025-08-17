export default function getAfterDays(days) {
  const date = new Date()
  date.setDate(date.getDate() + days)
  return date
}
