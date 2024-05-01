import { useGetCollection } from "@/hooks/collection/get-collection"
import AddItemToCollection from "@/pages/collection/add-item-to-collection.tsx";
import {useState} from "react";
import { ItemSearch } from "@/domain/collection";
import { DataTable } from "@/pages/collection/table/data-table";
import { columns } from "./table/columns";
import { ColumnFiltersState, PaginationState, SortingState } from "@tanstack/react-table";

const cleanSortBy = (sortBy: string): string => {
  switch(sortBy) {
    case "updatedAt":
      return 'updated_at'
    case "createdAt":
      return "created_at"
    case "lastPrice":
      return "last_price"
    default:
      return sortBy
  }
}

const buildCleanCriteria = (criteria: ItemSearch): ItemSearch => ({
  ...criteria,
  sortBy: cleanSortBy(criteria.sortBy)
})

export const Collection = () => {
  
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  })

  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "created_at",
      desc: true
    }
  ])

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([{
    id: "name",
    value: ""
  }])

  const criteria: ItemSearch = {
    search: columnFilters[0]?.value as string ?? "",
    sortBy: sorting[0].id,
    orderBy: sorting[0].desc ? "desc" : 'asc',
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize
  }
 
  const { isLoading, collection } = useGetCollection(buildCleanCriteria(criteria))

  const [showAddItemDialog, setShowAddItemDialog] = useState(false)
  const toggleShowAddItemDialog = () => setShowAddItemDialog(prev => !prev)
  const onShowAddItemDialogChange = (open: boolean) => setShowAddItemDialog(open)
  const closeAddItemDialog = () => setShowAddItemDialog(false)

  return (
    <div className="container mx-auto flex flex-col gap-4">
      {isLoading && <h2>Chargement</h2>}
      {(!isLoading && collection) && (
        <div>
          <DataTable 
            meta={collection.meta} 
            criteria={criteria}
            columns={columns}
            data={collection?.data} 

            toggleShowAddItemDialog={toggleShowAddItemDialog}

            onPaginationChange={setPagination}
            onSortingChange={setSorting}
            onColumnFiltersChange={setColumnFilters}
          />
        </div>      
      )}

      <AddItemToCollection open={showAddItemDialog} onOpenChange={onShowAddItemDialogChange} close={closeAddItemDialog} />
    </div>
  )
} 