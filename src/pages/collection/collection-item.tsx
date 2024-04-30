import { useParams } from "react-router-dom"
import { ErrorPage } from "../error/error"
import { useGetCollectionItemById } from "@/hooks/collection/by-id"
import {
  CalendarDays,
  PiggyBank,
  SquareArrowOutUpRight,
  TrendingUp,
  UsersRound
} from "lucide-react"
import { Common } from "@/operations/common"
import { Card } from "@/components/ui/card"
import { ItemChart } from "./item-chart"

export const CollectionItem = () => {
  const {id} = useParams<{id: string}>()
  const {isLoading, item} = useGetCollectionItemById(id ?? "")
  
  if(!id) {
    return (
      <ErrorPage />
    )
  }

  if(isLoading || !item) {
    return (
      <span>Chargement en cours...</span>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <p className="font-bold flex gap-4 items-center text-xl">
        {item.name}
        <a href={item.url} className="hover:text-primary" target="_blank"><SquareArrowOutUpRight /></a>
      </p>
      <div className="stats overflow-hidden shadow h-fit">
        <div className="stat">
          <div className="stat-figure text-primary">
            <PiggyBank />
          </div>
          <div className="stat-title">Prix actuel</div>
          <div className="stat-value text-lg text-primary">{item.lastPrice} €</div>
        </div>
        <div className="stat">
          <div className="stat-figure text-primary">
            <TrendingUp />
          </div>
          <div className="stat-title">Plus haut prix</div>
          <div className="stat-value text-lg text-primary">{item.highestPrice} €</div>
        </div>
        <div className="stat">
          <div className="stat-figure text-primary">
            <CalendarDays />
          </div>
          <div className="stat-title">Dernière actualisation</div>
          <div className="stat-value text-lg text-primary">{Common.formatDate(item.updatedAt)}</div>
        </div>
        <div className="stat">
          <div className="stat-figure text-primary">
            <UsersRound />
          </div>
          <div className="stat-title">Nombre de détenteurs</div>
          <div className="stat-value text-lg text-primary">{item.users?.length ?? 0}</div>
        </div>
      </div>
      <div className="flex gap-6">

        <div className="flex-1 flex flex-col text-center gap-4">
          <span className="font-bold text-lg">Graphique d'évolution du prix</span>
          <Card className="p-4">
            <ItemChart prices={item.prices}/>
          </Card>
        </div>

      </div>
    </div>
  )
}