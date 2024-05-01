import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { LoggedOutletContext } from "@/conf/logged-route"
import { Item } from "@/domain/collection"
import {BadgeEuro, Boxes, CalendarCheck, Repeat, SquareArrowOutUpRightIcon, Trash2, TrendingUp} from "lucide-react"
import { Link, useOutletContext } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { useState } from "react"
import { EditNb } from "./edit-nb"
import {EditPrice} from "@/components/edit-price.tsx"
import {DeleteItem} from "@/components/ui/delete-item.tsx";
import RemoveFromCollection from "@/components/remove-from-collection.tsx";
import {userOperations} from "@/operations/user.ts";

const dateFormatter = new Intl.DateTimeFormat('fr-FR', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
})

interface Props {
  item: Item
}

export const CollectionItem = ({item}: Props) => {
  const {user} = useOutletContext<LoggedOutletContext>()

  const [showEditNbDialog, setShowEditNbDialog] = useState(false)
  const [showEditPriceDialog, setShowEditPriceDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showRemoveFromCollectionDialog, setShowRemoveFromCollectionDialog] = useState(false)

  const toggleShowEditNbDialog = () => setShowEditNbDialog(prev => !prev)
  const onShowEditDialogChange = (open: boolean) => setShowEditNbDialog(open)
  const closeEditNbDialog = () => setShowEditNbDialog(false)

  const toggleShowEditPriceDialog = () => setShowEditPriceDialog(prev => !prev)
  const onShowEditPriceDialogChange = (open: boolean) => setShowEditPriceDialog(open)
  const closeEditPriceDialog = () => setShowEditPriceDialog(false)

  const toggleShowDeleteDialog = () => setShowDeleteDialog(prev => !prev)
  const onShowDeleteDialogChange = (open: boolean) => setShowDeleteDialog(open)
  const closeDeleteDialog = () => setShowDeleteDialog(false)

  const toggleShowRemoveFromCollectionDialog = () => setShowRemoveFromCollectionDialog(prev => !prev)
  const onShowRemoveFromCollectionDialogChange = (open: boolean) => setShowRemoveFromCollectionDialog(open)
  const closeRemoveFromCollectionDialog = () => setShowRemoveFromCollectionDialog(false)

  return (
    <Card>
      <CardHeader className="flex flex-row gap-4 py-3 items-center">
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
        <div className="flex">
          <div className="tooltip flex items-center gap-4" data-tip="Dernière actualisation">
            <CalendarCheck size={18}/> <span>{dateFormatter.format(new Date(item.updatedAt))}</span>
          </div>
        </div>
        <div className="flex">
          <div className="tooltip flex items-center gap-4" data-tip="Prix actuel">
            <BadgeEuro size={18}/> <span>{item.lastPrice} €</span>
          </div>
        </div>
        <div className="flex">
          <div className="flex items-center gap-4 tooltip" data-tip="Prix le plus haut constaté">
            <TrendingUp size={18}/> <span>{item.highestPrice} €</span>
          </div>
        </div>
        {item.count && (
          <div
            onClick={toggleShowEditNbDialog}
            className="flex tooltip items-center gap-4 hover:underline cursor-pointer"
            data-tip="Mettre à jour votre votre stock"
          >
            <Boxes size={18}/> <span>{item.count} en votre possession</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex gap-2 justify-end pb-3">
        <div className="tooltip" data-tip="Consulter la fiche de l'objet">
          <a href={item.url} target="_blank">
            <Button size="icon-sm" variant="ghost"><SquareArrowOutUpRightIcon size={16}/></Button>
          </a>
        </div>
        {userOperations.canUpdateItemPrice(user, item.userId) && (
          <div className="tooltip" data-tip="Actualiser le prix de l'objet">
            <Button variant="secondary" onClick={toggleShowEditPriceDialog} size="icon-sm">
              <Repeat size={16}/>
            </Button>
          </div>
        )}
        <div className="tooltip" data-tip="Supprimer de ma collection">
          <Button onClick={toggleShowRemoveFromCollectionDialog} size="sm" variant="destructive"><Trash2
            size={16}/></Button>
        </div>
        {user.isAdmin && (
          <Button size="sm" onClick={toggleShowDeleteDialog} variant="destructive">Supprimer</Button>
        )}
      </CardFooter>
      {item.count && (
        <EditNb id={item.id} nbItems={item.count} onOpenChange={onShowEditDialogChange} open={showEditNbDialog}
                close={closeEditNbDialog}/>
      )}
      <EditPrice open={showEditPriceDialog} close={closeEditPriceDialog} onOpenChange={onShowEditPriceDialogChange} price={item.lastPrice} id={item.id} />
      <DeleteItem id={item.id} open={showDeleteDialog} onOpenChange={onShowDeleteDialogChange} close={closeDeleteDialog} />
      <RemoveFromCollection item={item} open={showRemoveFromCollectionDialog} onOpenChange={onShowRemoveFromCollectionDialogChange} close={closeRemoveFromCollectionDialog} />
    </Card>
  )
}