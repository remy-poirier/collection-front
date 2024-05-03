import { ChartItem } from "@/domain/chart"

const dateFormatter = new Intl.DateTimeFormat('fr-FR', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
})

export const Common = {
  formatDate: (date: string): string => {
    const d = new Date(date)
    return dateFormatter.format(d)
  },

  buildChartData: (input: Record<string, number>): {data: ChartItem[], months: string[]} => {
    const sortedDates = Object.entries(input).sort(([dateA], [dateB]) => {
      // Dates should be sorted from oldest to newest
      const [dayA, monthA, yearA] = dateA.split("/")
      const [dayB, monthB, yearB] = dateB.split("/")
      const dateAValue = new Date(parseInt(yearA), parseInt(monthA) - 1, parseInt(dayA)).valueOf()
      const dateBValue = new Date(parseInt(yearB), parseInt(monthB) - 1, parseInt(dayB)).valueOf()
      return dateAValue - dateBValue
    })
    const data = sortedDates.map(([date, amount]) => {
      const [day, month, year] = date.split("/")
      const parsedDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day)); // -1 car les mois commencent à 0
      const monthName = parsedDate.toLocaleString('default', { month: 'long' }); // Obtenir le nom du mois
  
      return {
        amount,
        date,
        month: monthName,
      };
    })

    return {
      data,
      months: Array.from(new Set(data.map(item => item.month)))
    }
  }
}
