import {Button} from "@/components/ui/button.tsx";
import {AlertDialog, AlertDialogContent, AlertDialogFooter} from "@/components/ui/alert-dialog.tsx";
import {useState} from "react";
import {Separator} from "@/components/ui/separator.tsx";
import {Item} from "@/domain/collection.ts";
import SelectMode from "@/pages/collection/steps/select-mode.tsx";
import {clsx} from "clsx";
import AttachItem from "@/pages/collection/steps/attach-item.tsx";
import CreateMode from "@/pages/collection/steps/create-mode.tsx";

interface Props {
  open: boolean
  close: () => void
  onOpenChange: (isOpen: boolean) => void
}

export enum MODE {
  SELECT = 0,
  CREATE = 1
}

const AddItemToCollection = ({ open, onOpenChange, close }: Props) => {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)
  const [mode, setMode] = useState<MODE | null>(null)

  const selectItem = (value: Item) => setSelectedItem(value)
  const resetSelectedItem = () => setSelectedItem(null)


  const onAddSuccess = () => {
    setMode(null)
    close()
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange} >
      <AlertDialogContent className="max-w-xl w-full">
        <ul className="steps">
          <li className="step step-primary">Sélection</li>
          <li className={clsx('step', mode !== null && 'step-primary')}>Saisie</li>
        </ul>
        {mode === null && (
          <SelectMode
            selectedItem={selectedItem}
            selectItem={selectItem}
            resetSelectedItem={resetSelectedItem}
            setMode={setMode}
          />
        )}

        {mode === MODE.CREATE && (
          <CreateMode
            onSuccess={onAddSuccess}
            back={() => setMode(null)}
          />
        )}

        {(mode === MODE.SELECT && selectedItem) && <AttachItem onSuccess={onAddSuccess} item={selectedItem} back={() => setMode(null)} />}

        {mode === null && (
          <>
            <Separator/>
            <AlertDialogFooter>
              <Button variant="outline" onClick={close}>Fermer</Button>
            </AlertDialogFooter>
          </>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddItemToCollection;
