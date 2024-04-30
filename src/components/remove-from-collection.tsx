import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog.tsx";
import {Item} from "@/domain/collection.ts";
import {ItemResume} from "@/components/item-resume.tsx";
import {useDetachItem} from "@/hooks/collection/detach-item.tsx";
import {toast} from "sonner";

interface Props {
  item: Item
  open: boolean
  close: () => void
  onOpenChange: (isOpen: boolean) => void
}

const RemoveFromCollection = ({item, open, onOpenChange, close}: Props) => {

  const {detachItem, isLoading} = useDetachItem()

  const remove = () => {
    detachItem({item_id: item.id})
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
          <ItemResume item={item} className="py-1 rounded-md px-4 bg-accent mb-2" />
          Attention ! Cette action est <span className="font-bold">destructive et irréversible</span>. Elle aura notamment pour effet de:
          <ul className="list-disc pl-4 my-2">
            <li>Supprimer l'objet de votre collection</li>
            <li>Mettre à jour le montant de votre collection</li>
          </ul>
          Es-tu sûr de vouloir continuer ?
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading} onClick={close}>
            Annuler
          </AlertDialogCancel>
          <AlertDialogAction disabled={isLoading} onClick={remove}>
            {isLoading && <span className="loading loading-spinner loading-xs"></span> }
            {!isLoading && "Confirmer"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RemoveFromCollection;