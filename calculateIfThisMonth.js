export default function calculateIfThisMonth(determineDate) {
  const now = new Date()
  console.log(determineDate);
  const day1 = determineDate.getDate()
  const month1 = determineDate.getMonth()
  const year1 = determineDate.getFullYear()

  const day2 = now.getDate()
  const month2 = now.getMonth()
  const year2 = now.getFullYear()

  if (month1 === month2 && year1 === year2 && day1 < 28 && day2 < 28){
    return true
  }
  else if (month1 === month2 && year1 === year2 && day1 >= 28 && day2 >= 28){
    return true
  }

  else if (year1 === year2 && month1 < month2 && day1 >= 28 && day2 < 28){
  console.log(determineDate);

  return true
  }

  else if (year1 + 1 === year2 && month1 === 11 && month2 === 0 && day2 < 28 && day1 >= 28){
    console.log(determineDate);
    return true
  }
  console.log(determineDate.getMonth());

  return false
}
