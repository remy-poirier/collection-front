import { common } from "@/conf/common";
import { Item } from "@/domain/collection";
import { useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "sonner";

const updatePriceFn = async (
  updatePriceBody: {
    price: number
    item_id: string
  }
): Promise<Item> => {
  return fetch(`${common.apiUrl}/collection/price`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatePriceBody)
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

export const useUpdatePrice = () => {
  const queryClient = useQueryClient()

  const { mutateAsync, isLoading, isError, error } = useMutation({
    mutationFn: updatePriceFn,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['account']})
      queryClient.invalidateQueries({queryKey: ['collection']})
      queryClient.invalidateQueries({queryKey: ['adminItems']})
    }
  })

  useEffect(() => {
    if (isError && error) {
      toast.error(`Oops ! Une erreur s'est produite`, {
        description: `Erreur lors de la mise à jour du prix pour l'objet (${error})`,
      })
    }
  }, [isError, error])

  return {
    updatePrice: mutateAsync,
    isLoading,
  }
}