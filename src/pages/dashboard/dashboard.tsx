import { useGetStatistics } from "@/hooks/statistic/statistic"
import { UserCollectionChart } from "./chart"
import { useOutletContext } from "react-router-dom"
import { LoggedOutletContext } from "@/conf/logged-route"
import { Card } from "@/components/ui/card"
import { Item } from "@/domain/collection"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookOpen, PiggyBank } from "lucide-react"

const ItemStat = ({item, label}: {
  item: Item
  label: string
}) => (
  <div className="stat">
    <div className="stat-figure text-primary">
      <Avatar className="w-[3rem] h-[3rem] rounded-lg">
        <AvatarImage src={item.image} alt={item.name} />
        <AvatarFallback className="bg-primary text-primary-foreground">
            {item.name.slice(0, 2)}
          </AvatarFallback>
      </Avatar>
    </div>
    <div className="stat-title">{label}</div>
    <div className="stat-value text-lg text-primary">{item.name}</div>
    <div className="stat-desc">Valeur {item.lastPrice} €</div>
  </div>
)

export const Dashboard = () => {
  const { isLoading, statistics } = useGetStatistics()
  const {user} = useOutletContext<LoggedOutletContext>()

  return (
    <div className="flex flex-col gap-2">
      <span className="text-xl font-bold">Tableau de bord</span>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex stats shadow h-fit">
            <div className="stat">
              <div className="stat-figure text-primary">
                <BookOpen size={32} />
              </div>
              <div className="stat-title">Nombre d'objets</div>
              <div className="stat-value text-primary">{isLoading ? 0 : statistics.nbItems}</div>
              <div className="stat-desc">Au total dans votre collection</div>
            </div>
            <div className="stat">
              <div className="stat-figure text-primary">
                <PiggyBank size={32} />
              </div>
              <div className="stat-title">Pactole</div>
              <div className="stat-value text-primary">{isLoading ? 0 : statistics.totalValue.amount} €</div>
              <div className="stat-desc">Dernière actualisation le {statistics.totalValue.date}</div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xl font-bold">Top de votre collection</span>
            <div className="stats stats-vertical overflow-hidden shadow h-fit">
              {statistics.mostValuableItems[0] && <ItemStat label="1ère place" item={statistics.mostValuableItems[0]} />}
              {statistics.mostValuableItems[1] && <ItemStat label="2ème place" item={statistics.mostValuableItems[1]} />}
              {statistics.mostValuableItems[2] && <ItemStat label="3ème place" item={statistics.mostValuableItems[2]} />}
            </div>
          </div>
        </div>
        
        <div className="flex flex-col gap-4">
          <span className="font-bold text-center">Évolution de votre pactole</span>
          <Card className="shadow p-4 rounded-lg">
            <UserCollectionChart totalValue={user.totalValue} />
          </Card>
        </div>
      </div>
    </div>
  )
}