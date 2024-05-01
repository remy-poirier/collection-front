import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ItemSearch, SearchResult } from "@/domain/collection"
import { ColumnDef, ColumnFiltersState, PaginationState, SortingState, Updater, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"

interface Props<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  criteria: ItemSearch
  meta: SearchResult<TData>["meta"]

  onPaginationChange: (updatedPagination: Updater<PaginationState>) => void
  onSortingChange: (updatedSorting: Updater<SortingState>) => void
  onColumnFiltersChange: (updatedFilters: Updater<ColumnFiltersState>) => void

  toggleShowAddItemDialog: () => void
}

export const DataTable = <TData, TValue>({
  columns, data, criteria, meta, onPaginationChange, onSortingChange, onColumnFiltersChange,
   toggleShowAddItemDialog
}: Props<TData, TValue>) => {

  const table = useReactTable({
    data,
    columns, 
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    pageCount: meta.lastPage,
    state: {
      pagination: {
        pageIndex: meta.currentPage - 1,
        pageSize: criteria.limit
      },
      sorting: [{id: criteria.sortBy, desc: criteria.orderBy === "desc"}],
      columnFilters: [{id: "name", value: criteria.search}]
    },
    onColumnFiltersChange,
    onPaginationChange,
    onSortingChange
  })

  return (
    <div>
      <div className="flex gap-4 mb-4">
        <Input 
          value={(table.getColumn("name")?.getFilterValue() as string ?? "")}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          placeholder="Recherche"
        />
        <Button onClick={toggleShowAddItemDialog} variant="default">
          Ajouter un objet
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Aucun résultat.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button 
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Précédent
        </Button>
        <Button 
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Suivant
        </Button>
      </div>
    </div>
  )
}