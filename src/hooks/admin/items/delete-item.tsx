import { common } from '@/conf/common'
import { useMutation, useQueryClient } from 'react-query'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { Item } from '@/domain/collection'

const deleteItemFn = async (id: string): Promise<Item[]> => {
  return fetch(`${common.apiUrl}/admin/items/${id}`, {
    method: 'DELETE',
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

export const useDeleteItem = () => {
  const queryClient = useQueryClient()

  const { mutateAsync, isLoading, isError, error } = useMutation({
    mutationFn: deleteItemFn,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['account']})
      queryClient.invalidateQueries({queryKey: ['adminItems']})
    }
  })

  useEffect(() => {
    if (isError && error) {
      toast.error(`Oops ! Une erreur s'est produite`, {
        description: `Erreur lors de la récupération des objets (${error})`,
      })
    }
  }, [isError, error])

  return {
    deleteItem: mutateAsync,
    isDeleting: isLoading,
  }
}