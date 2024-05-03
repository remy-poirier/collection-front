import { EditNb } from "@/components/edit-nb"
import { EditPrice } from "@/components/edit-price"
import RemoveFromCollection from "@/components/remove-from-collection"
import { Button } from "@/components/ui/button"
import { DeleteItem } from "@/components/ui/delete-item"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { LoggedOutletContext } from "@/conf/logged-route"
import { ItemWithCount } from "@/domain/collection"
import { MoreHorizontal } from "lucide-react"
import { useState } from "react"
import { Link, useOutletContext } from "react-router-dom"

interface Props {
  item: ItemWithCount
}

export const ActionsCell = ({item}: Props) => {
  const [showEditNbDialog, setShowEditNbDialog] = useState(false)
  const [showRemoveFromCollectionDialog, setShowRemoveFromCollectionDialog] = useState(false)
  const [showEditPriceDialog, setShowEditPriceDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const toggleShowEditPriceDialog = () => setShowEditPriceDialog(prev => !prev)
  const onShowEditPriceDialogChange = (open: boolean) => setShowEditPriceDialog(open)
  const closeEditPriceDialog = () => setShowEditPriceDialog(false)

  const toggleShowEditNbDialog = () => setShowEditNbDialog(prev => !prev)
  const onShowEditDialogChange = (open: boolean) => setShowEditNbDialog(open)
  const closeEditNbDialog = () => setShowEditNbDialog(false)

  const toggleShowRemoveFromCollectionDialog = () => setShowRemoveFromCollectionDialog(prev => !prev)
  const onShowRemoveFromCollectionDialogChange = (open: boolean) => setShowRemoveFromCollectionDialog(open)
  const closeRemoveFromCollectionDialog = () => setShowRemoveFromCollectionDialog(false)

  const toggleShowDeleteDialog = () => setShowDeleteDialog(prev => !prev)
  const onShowDeleteDialogChange = (open: boolean) => setShowDeleteDialog(open)
  const closeDeleteDialog = () => setShowDeleteDialog(false)

  const { user } = useOutletContext<LoggedOutletContext>()
  
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <Link to={`${item.id}`}>
            <DropdownMenuItem>
              Accéder aux détails
            </DropdownMenuItem>
          </Link>
          <a href={item.url} target="_blank">
            <DropdownMenuItem>
              Consulter la fiche
            </DropdownMenuItem>
          </a>
          {!!item.userId && user.id === item.userId && (
            <DropdownMenuItem onClick={toggleShowEditPriceDialog}>
              Mettre à jour le prix de l'objet
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={toggleShowEditNbDialog}>
            Mettre à jour le stock
          </DropdownMenuItem>
          <DropdownMenuItem className="text-red-500" onClick={toggleShowRemoveFromCollectionDialog}>
            Supprimer de ma collection
          </DropdownMenuItem>
          {user.isAdmin && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Administration</DropdownMenuLabel>
              <DropdownMenuItem onClick={toggleShowEditPriceDialog}>
                Mettre à jour le prix de l'objet
              </DropdownMenuItem>
              <DropdownMenuItem onClick={toggleShowDeleteDialog} className="text-red-500">
                Supprimer de la base de donnée
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      {showEditPriceDialog && (
        <EditPrice open={showEditPriceDialog} close={closeEditPriceDialog} onOpenChange={onShowEditPriceDialogChange} price={item.lastPrice} id={item.id} />
      )}
      {showEditNbDialog && (
        <EditNb id={item.id} nbItems={item.count} onOpenChange={onShowEditDialogChange} open={showEditNbDialog}
          close={closeEditNbDialog}/>
      )}
      {showRemoveFromCollectionDialog && (
        <RemoveFromCollection item={item} open={showRemoveFromCollectionDialog} onOpenChange={onShowRemoveFromCollectionDialogChange} close={closeRemoveFromCollectionDialog} />
      )}
      {showDeleteDialog && (
        <DeleteItem id={item.id} open={showDeleteDialog} onOpenChange={onShowDeleteDialogChange} close={closeDeleteDialog} />
      )}
    </>
  )
}
