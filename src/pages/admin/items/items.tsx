import { useGetItems } from "@/hooks/admin/items/get-items"
import { CollectionItemList } from "@/components/collection-item-list"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CreateItem } from "@/pages/collection/create-item"

export const Items = () => {
  const { isLoading, items } = useGetItems()
  const [creationOpened, setCreationOpened] = useState(false)

  const toggleCreationOpened = (isOpened: boolean) => setCreationOpened(isOpened)
  const openCreation = () => setCreationOpened(true)

  const close = () => setCreationOpened(false)
  
  if(isLoading) {
    return <p>Chargement...</p>
  }

  
  return (
    <div className="flex flex-col gap-4">
       <div>
        <Button onClick={openCreation}>Ajouter un objet</Button>
      </div>
      <CollectionItemList items={items} />
      <CreateItem open={creationOpened} onOpenChange={toggleCreationOpened} close={close} />
    </div>
  )
}