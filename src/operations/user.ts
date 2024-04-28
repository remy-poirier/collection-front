export const getLastKnowTotalValue = (
  totalValue: Record<string, number>
): number => {
  const dates = Object.keys(totalValue)

  if(dates.length === 0) {
    return 0
  }

  const sortedDates = dates.sort((a, b) => {
    const dateA = new Date(a.split('/').reverse().join('/'))
    const dateB = new Date(b.split('/').reverse().join('/'))
    return dateB.getTime() - dateA.getTime()
  })

  const lastKnownDate = sortedDates[0]
  return totalValue[lastKnownDate] ?? 0

}