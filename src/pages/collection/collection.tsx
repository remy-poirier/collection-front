import { useGetCollection } from "@/hooks/collection/get-collection"
import { CollectionItemList } from "@/components/collection-item-list"

export const Collection = () => {
  const { isLoading, collection } = useGetCollection()

  return (
    <div className="flex flex-col gap-4">
      {isLoading && <h2>Chargement</h2>}
      {!isLoading && <CollectionItemList items={collection} />}
    </div>
  )
} 