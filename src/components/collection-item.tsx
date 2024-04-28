import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { LoggedOutletContext } from "@/conf/logged-route"
import { Item } from "@/domain/collection"
import { useDeleteItem } from "@/hooks/admin/items/delete-item"
import { BadgeEuro, CalendarCheck, SquareArrowOutUpRightIcon, TrendingUp } from "lucide-react"
import { Link, useOutletContext } from "react-router-dom"
import { toast } from "sonner"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

const dateFormatter = new Intl.DateTimeFormat('fr-FR', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
})

interface Props {
  item: Item
}

export const CollectionItem = ({item}: Props) => {
  const { deleteItem, isDeleting } = useDeleteItem()
  const {user} = useOutletContext<LoggedOutletContext>()

  const onDeleteItem = () => {
    deleteItem(item.id)
      .then(() => {
        toast.success("Félicitations", {
          description: "Objet supprimé avec succès"
        })
    })
  } 

  return (
    <Card >
      <CardHeader className="flex flex-row gap-4 items-center">
        <Avatar className="w-[3rem] h-[3rem] rounded-xl">
          <AvatarImage src={item.image} alt={item.name} />
          <AvatarFallback className="bg-primary text-primary-foreground">
            {item.name.slice(0, 2)}
          </AvatarFallback>
        </Avatar>
        <span className="font-bold hover:underline cursor-pointer">
          <Link to={`/app/collection/${item.id}`}>
            {item.name}
          </Link>
        </span>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="flex items-center gap-4">
          <CalendarCheck size={18} /> <span>{dateFormatter.format(new Date(item.updatedAt))}</span>
        </div>
        <div className="flex items-center gap-4">
          <BadgeEuro size={18} /> <span>{item.lastPrice} €</span>
        </div>
        <div className="flex items-center gap-4">
          <TrendingUp size={18} /> <span>{item.highestPrice} €</span>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 justify-end">
        <a href={item.url} target="_blank">
          <Button size="icon-sm" variant="ghost"><SquareArrowOutUpRightIcon size={16} /></Button>
        </a>
        {user.isAdmin && (
          <Button size="sm" loading={isDeleting} onClick={onDeleteItem} variant="destructive">Supprimer</Button>
        )}
      </CardFooter>
    </Card>
  )
}