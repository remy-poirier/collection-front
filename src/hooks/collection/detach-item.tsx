import { common } from "@/conf/common";
import { Item } from "@/domain/collection";
import { useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "sonner";

const detachItemFn = async (
  body: {
    item_id: string
  }
): Promise<Item> => {
  return fetch(`${common.apiUrl}/collection/detach`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
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

export const useDetachItem = () => {
  const queryClient = useQueryClient()

  const { mutateAsync, isLoading, isError, error } = useMutation({
    mutationFn: detachItemFn,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['account']})
      queryClient.invalidateQueries({queryKey: ['collection']})
      queryClient.invalidateQueries({queryKey: ['adminItems']})
    }
  })

  useEffect(() => {
    if (isError && error) {
      toast.error(`Oops ! Une erreur s'est produite`, {
        description: `Erreur lors de la suppression de l'objet de votre collection (${error})`,
      })
    }
  }, [isError, error])

  return {
    detachItem: mutateAsync,
    isLoading,
  }
}