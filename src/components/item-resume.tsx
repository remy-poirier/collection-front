import {Item} from "@/domain/collection.ts";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {Common} from "@/operations/common.ts";
import {clsx} from "clsx";

interface Props {
  item: Item
  className?: string
}

export const ItemResume = ({item, className}: Props) => {
  return (
    <div className={clsx('flex items-center gap-6', className)}>
      <Avatar className="rounded-md">
        <AvatarImage src={item.image} alt={item.name} />
        <AvatarFallback className="bg-primary text-primary-foreground">
          {item.name.slice(0, 2)}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span>{item.name}</span>
        <span className="text-sm">Prix: <span className="font-bold">{item.lastPrice} €</span></span>
        <span className="text-sm">Dernière mise à jour du prix le: {Common.formatDate(item.updatedAt)}</span>
      </div>
    </div>
  )
}