import { common } from '@/conf/common'
import { useQuery} from 'react-query'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { ItemSearch, ItemWithCount, SearchResult } from '@/domain/collection'
import { useDebounce } from "@uidotdev/usehooks";

const getCollectionFn = (itemSearch: ItemSearch): Promise<SearchResult<ItemWithCount>> => {
  const url = new URL(`${common.apiUrl}/collection`)

  Object.keys(itemSearch).forEach((key) => {
    const value = itemSearch[key as keyof ItemSearch]
    if(value !== undefined) {
      url.searchParams.append(key, String(value))
    }
  })
  
  return fetch(url, {
    method: 'GET',
    credentials: 'include',
  })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(0)
      }
      return res.json()
    })
    .catch((error) => {
      return Promise.reject(
        error.statusText ??
          "Oops, une erreur s'est produite, veuillez réessayer ultérieurement.",
      )
    })
}

export const useGetCollection = (search: ItemSearch) => {

  const debouncedSearch = useDebounce(search.search, 200)

  const { data, isLoading, isError, error } = useQuery({
    queryFn: () => getCollectionFn(search),
    queryKey: ['collection', search.limit, search.orderBy, search.page, search.sortBy, debouncedSearch],
    keepPreviousData: true,
  })

  useEffect(() => {
    if (isError && error) {
      toast.error(`Oops ! Une erreur s'est produite`, {
        description: `Erreur lors de la récupération de votre collection (${error})`,
      })
    }
  }, [isError, error])

  return {
    collection: data,
    isLoading,
  }
}