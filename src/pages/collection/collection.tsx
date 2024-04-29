import { useGetCollection } from "@/hooks/collection/get-collection"
import { CollectionItemList } from "@/components/collection-item-list"
import {Button} from "@/components/ui/button.tsx";
import AddItemToCollection from "@/pages/collection/add-item-to-collection.tsx";
import {useState} from "react";

export const Collection = () => {
  const { isLoading, collection } = useGetCollection()

  const [showAddItemDialog, setShowAddItemDialog] = useState(false)
  const toggleShowAddItemDialog = () => setShowAddItemDialog(prev => !prev)
  const onShowAddItemDialogChange = (open: boolean) => setShowAddItemDialog(open)
  const closeAddItemDialog = () => setShowAddItemDialog(false)

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Button onClick={toggleShowAddItemDialog} variant="default">
          Ajouter un objet
        </Button>
      </div>

      {isLoading && <h2>Chargement</h2>}
      {!isLoading && <CollectionItemList items={collection} />}

      <AddItemToCollection open={showAddItemDialog} onOpenChange={onShowAddItemDialogChange} close={closeAddItemDialog} />
    </div>
  )
} 