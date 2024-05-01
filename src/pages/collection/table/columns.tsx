import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ItemWithCount } from "@/domain/collection";
import { Common } from "@/operations/common";
import { ColumnDef } from "@tanstack/react-table"
import { ActionsCell } from "./actions-cell";
import { Button } from "@/components/ui/button";
import { CaretSortIcon } from "@radix-ui/react-icons";

const currencyFormat = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR"
})

const numberFormat = new Intl.NumberFormat("fr-FR")

export const columns: ColumnDef<ItemWithCount>[] = [
  {
    accessorKey: 'name',
    header: "Objet",
    cell: ({row}) => {
      const item = row.original
      const name = row.getValue<string>("name") ?? ""

      return (
        <div className="flex items-center gap-4">
          <Avatar className="rounded-lg h-[2rem] w-[2rem]">
            <AvatarImage src={item.image} alt={name} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {name.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          {name}
        </div>
      )
    }
  },
  {
    accessorKey: 'updatedAt',
    header: ({column}) => {
     return (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Dernière mise à jour
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
     ) 
    },
    cell: ({row}) => Common.formatDate(row.getValue("updatedAt"))
  },
  {
    accessorKey: 'lastPrice',
    header: ({column}) => (
      <div className="text-right">
        <Button variant="ghost" className="justify-end text-right" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Dernier prix
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({row}) => {
      const amount = parseFloat(row.getValue("lastPrice"))
      const formatted = currencyFormat.format(amount)

      return <div className="text-right font-medium">{formatted}</div>
    }
  },
 
  {
    accessorKey: 'highestPrice',
    header: () => <div className="text-right">Prix le plus haut constaté</div>,
    cell: ({row}) => {
      const amount =  parseFloat(row.getValue('highestPrice'))
      const formatted = currencyFormat.format(amount)

      return <div className="text-right font-medium">{formatted}</div>
    }
  },
  {
    accessorKey: 'count',
    header: () => <div className="text-right">Nombre d'exemplaires</div>,
    cell: ({row}) => {
      const formatted = numberFormat.format(row.getValue("count"))
      return <div className="text-right font-medium">{formatted}</div> 
    }
  },
  {
    id: "actions",
    cell: ({row}) => {
      const item = row.original
      return <ActionsCell item={item} />
    }
  }
]