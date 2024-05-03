import {z} from "zod";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {BigInput} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {toast} from "sonner";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useUpdatePrice} from "@/hooks/collection/update-price.tsx";

interface Props {
  open: boolean
  close: () => void
  onOpenChange: (isOpen: boolean) => void
  price: number
  id: string
}

const itemPriceSchema =  z.object({
  price: z.string().min(1, "1€ minimum"),
  item_id: z.string()
})

export const EditPrice = ({onOpenChange, open, close, price, id}: Props) => {

    const { updatePrice, isLoading } = useUpdatePrice()

    const form = useForm<z.infer<typeof itemPriceSchema>>({
      resolver: zodResolver(itemPriceSchema),
      mode: 'onChange',
      defaultValues: {
        price: `${price}`,
        item_id: id
      }
    })

    const onSubmit = async (values: z.infer<typeof itemPriceSchema>) => {
      updatePrice({
        ...values,
        price: parseFloat(values.price)
      })
        .then(() => {
          toast.success("Félicitations", {
            description: "Prix mis à jour avec succès"
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
              Editer le prix de l'objet
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                name="price"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Prix</FormLabel>
                    <FormControl>
                      <BigInput
                        value={field.value}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D,./g, '')

                          if (value) {
                            if (value.includes('.')) {
                              const parts = value.split('.')
                              if (parts[1].length > 2) {
                                e.preventDefault()
                              } else {
                                form.setValue('price', `${value}`, {
                                  shouldValidate: true,
                                })
                              }
                            } else {
                              const asNumber = parseFloat(value)
                              form.setValue('price', `${asNumber}`, {
                                shouldValidate: true,
                              })
                            }
                          } else {
                            form.setValue('price', '', { shouldValidate: true })
                          }
                        }}
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" loading={isLoading} disabled={isLoading} className="w-full">
                Mettre à jour
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    )
}
