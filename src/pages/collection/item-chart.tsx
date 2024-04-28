import { Item } from "@/domain/collection"
import { Common } from "@/operations/common"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export const ItemChart = ({prices}: {
  prices: Item["prices"]
}) => {

  const chartData = Common.buildChartData(prices)

  return (
    <ResponsiveContainer width="100%" height="100%" minHeight={300}>
      <AreaChart
        width={500}
        height={300}
        data={chartData.data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <defs>
          <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.9}/>
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0.2}/>
          </linearGradient>
        </defs>
        <XAxis
         style={{
            textTransform: "capitalize"
          }} 
          dataKey="month" 
          ticks={chartData.months}
          tickLine={false}
        />
        <YAxis type="number" domain={['dataMin', 'dataMax']} tickLine={false} />
        <Tooltip formatter={(value: number) => [`${value} €`, 'Montant']} labelFormatter={(_, d) => {
          if(d[0]?.payload) {
            return d[0].payload.date
          }
          return ""
          }} />
        <Area type="monotone" dataKey="amount" stroke="#8884d8" fill="url(#color)" />
      </AreaChart>
    </ResponsiveContainer>
  )
}