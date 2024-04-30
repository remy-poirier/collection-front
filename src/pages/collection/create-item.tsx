import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import CreateItemForm from "@/components/create-item-form.tsx";

interface Props {
  open: boolean
  onOpenChange: (isOpen: boolean) => void
  close: () => void
}



export const CreateItem = ({open, onOpenChange, close}: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Ajouter un nouvel objet</DialogTitle>
        </DialogHeader>
        <CreateItemForm onSuccess={close} onCancel={close} />
      </DialogContent>
    </Dialog>
  )
}