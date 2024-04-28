import { z } from "zod"
import { Dialog, DialogTitle, DialogContent, DialogFooter, DialogHeader } from "./ui/dialog"
import { Button } from "./ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { useUpdateCount } from "@/hooks/collection/update-count"
import { toast } from "sonner"

interface Props {
  open: boolean
  close: () => void
  onOpenChange: (isOpen: boolean) => void
  nbItems: number
  id: string
}

const nbItemsSchema =  z.object({
  count: z.coerce.number().min(1, "1 copie minimum"),
  item_id: z.string()
})

export const EditNb = ({onOpenChange, open, close, nbItems, id}: Props) => {

  const { updateCount, isLoading } = useUpdateCount()

  const form = useForm<z.infer<typeof nbItemsSchema>>({
    resolver: zodResolver(nbItemsSchema),
    mode: 'onChange',
    defaultValues: {
      count: nbItems,
      item_id: id
    }
  })

  const onSubmit = async (values: z.infer<typeof nbItemsSchema>) => {
    updateCount(values)
      .then(() => {
        toast.success("Félicitations", {
          description: "Nombre d'exemplaires mis à jour avec succès"
        })
        form.reset()
        close()
      })
  }

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Editer le nombre d'exemplaire en votre possession
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField 
              name="count"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Nombre d'exemplaires</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" disabled={isLoading} onClick={close} variant="outline">Annuler</Button>
              <Button loading={isLoading} >Valider</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}