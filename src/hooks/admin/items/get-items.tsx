import { common } from '@/conf/common'
import { useQuery } from 'react-query'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { Item } from '@/domain/collection'

const getItemsFn = async (): Promise<Item[]> => {

  return fetch(`${common.apiUrl}/admin/items`, {
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

export const useGetItems = () => {
  const { data, isLoading, isError, error } = useQuery(
    'adminItems',
    getItemsFn,
    {
      enabled: true
    },
  )

  useEffect(() => {
    if (isError && error) {
      toast.error(`Oops ! Une erreur s'est produite`, {
        description: `Erreur lors de la récupération des objets (${error})`,
      })
    }
  }, [isError, error])

  return {
    items: data || [],
    isLoading,
  }
}