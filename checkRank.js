export default function checkRank(point, current_rank) {
  let tempRank = 0
  if (point >= 1000 && point < 2000)
    tempRank = 1

  else if (point >= 2000 && point < 5000)
    tempRank = 2

  else if (point >= 5000 && point < 10000)
    tempRank = 3

  else if (point >= 10000 && point < 25000)
    tempRank = 4

  else if (point >= 25000 && point < 50000)
    tempRank = 5

  else if (point >= 50000 && point < 100000)
    tempRank = 6

  else if (point >= 100000 && point < 250000)
    tempRank = 7

  else if (point >= 250000 && point < 500000)
    tempRank = 8

  else if (point >= 500000 && point < 1000000)
    tempRank = 9

  else if (point >= 1000000 && point < 2000000)
    tempRank = 10

  else if (point >= 2000000 && point < 4000000)
    tempRank = 11

  else if (point >= 4000000 && point < 10000000)
    tempRank = 12

  else if (point >= 10000000)
    tempRank = 13

  if (tempRank > current_rank)
    return tempRank

  return current_rank
}
