import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog.tsx";
import {toast} from "sonner";
import {useDeleteItem} from "@/hooks/admin/items/delete-item.tsx";

interface Props {
  open: boolean
  close: () => void
  onOpenChange: (isOpen: boolean) => void
  id: string
}

export const DeleteItem = ({open, onOpenChange, close, id}: Props) => {
  const { deleteItem, isDeleting } = useDeleteItem()

  const onDeleteItem = () => {
    deleteItem(id)
      .then(() => {
        toast.success("Félicitations", {
          description: "Objet supprimé avec succès"
        })
        close()
      })
  }
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Confirmer la suppression
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          Attention ! Cette action est <span className="font-bold">destructive et irréversible</span>. Elle aura notamment pour effet de:
          <ul>
            <li>Supprimer l'objet de la base de données</li>
            <li>Le retirer de tous les détenteurs</li>
            <li>Mettre à jour le montant de la collection de tous les utilisateurs ayant possédé cet objet</li>
          </ul>
          Êtes-vous sûr de vouloir continuer ?
        </AlertDialogDescription>
        <AlertDialogFooter>
          {isDeleting && <span>Suppression en cours...</span>}
          {!isDeleting && (
            <>
              <AlertDialogCancel onClick={close}>Annuler</AlertDialogCancel>
              <AlertDialogAction onClick={onDeleteItem}>Confirmer</AlertDialogAction>
            </>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}