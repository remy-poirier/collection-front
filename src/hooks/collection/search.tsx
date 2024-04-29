import { common } from '@/conf/common'
import { useQuery } from 'react-query'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { Item } from '@/domain/collection'

const getAutocompleteFn = async (search: string): Promise<Item[]> => {

  return fetch(`${common.apiUrl}/collection/autocomplete?search=${search}`, {
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

export const useGetAutocomplete = (search: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryFn: () => getAutocompleteFn(search),
    queryKey: ["autocompleteFn", search]
  })

  useEffect(() => {
    if (isError && error) {
      toast.error(`Oops ! Une erreur s'est produite`, {
        description: `Erreur lors de la récupération de l'autocomplétion (${error})`,
      })
    }
  }, [isError, error])

  return {
    autocompleteItems: data ?? [],
    isLoading,
  }
}