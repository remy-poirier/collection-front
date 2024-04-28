import { common } from '@/conf/common'
import { useQuery } from 'react-query'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { Item } from '@/domain/collection'

const getCollectionFn = async (): Promise<Item[]> => {

  return fetch(`${common.apiUrl}/collection`, {
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

export const useGetCollection = () => {
  const { data, isLoading, isError, error } = useQuery(
    'collection',
    getCollectionFn,
    {},
  )

  useEffect(() => {
    if (isError && error) {
      toast.error(`Oops ! Une erreur s'est produite`, {
        description: `Erreur lors de la récupération de votre collection (${error})`,
      })
    }
  }, [isError, error])

  return {
    collection: data ?? [],
    isLoading,
  }
}