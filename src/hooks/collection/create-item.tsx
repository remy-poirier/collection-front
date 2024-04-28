import { common } from "@/conf/common";
import { Item, ItemCreation } from "@/domain/collection";
import { useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "sonner";

const addItemFn = async (
  itemCreation: ItemCreation
): Promise<Item> => {
  return fetch(`${common.apiUrl}/collection/create`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(itemCreation)
  })
    .then(res => {
      if(!res.ok) {
        return Promise.reject(res)
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

export const useCreateItem = () => {
  const queryClient = useQueryClient()

  const { mutateAsync, isLoading, isError, error } = useMutation({
    mutationFn: addItemFn,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['account']})
      queryClient.invalidateQueries({queryKey: ['collection']})
      queryClient.invalidateQueries({queryKey: ['adminItems']})
    }
  })

  useEffect(() => {
    if (isError && error) {
      toast.error(`Oops ! Une erreur s'est produite`, {
        description: `Erreur lors de la création de l'objet (${error})`,
      })
    }
  }, [isError, error])

  return {
    createItem: mutateAsync,
    isLoading,
  }
} 