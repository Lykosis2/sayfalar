export default async function changeLevelToSix(obj) {
  console.log(obj)
  const returnVal = { ...obj }
  console.log(returnVal)
  Object.keys(obj).forEach((key) => {
    returnVal[key].level = 6
  })
  console.log(obj)
  return obj
}
