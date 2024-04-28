import { Item } from "@/domain/collection"
import { CollectionItem } from "./collection-item"

interface Props {
  items: Item[]
}

export const CollectionItemList = ({items}: Props) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {items.map(i => <CollectionItem item={i} key={i.id} />)}
    </div>
  )
}