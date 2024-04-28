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
    const data =  Object.entries(input).map(([date, amount]) => {
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