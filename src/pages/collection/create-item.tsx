import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { BigInput, Input } from "@/components/ui/input"
import { useCreateItem } from "@/hooks/collection/create-item"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

interface Props {
  open: boolean
  onOpenChange: (isOpen: boolean) => void
  close: () => void
}

const addItemSchema =  z.object({
  name: z.string().min(1, 'Champ obligatoire'),
  image: z.string().min(1, 'Champ obligatoire'),
  price: z.string().min(1, 'Valeur minimum: 1'),
  url: z.string().min(1, 'Valeur minimum: 1'),
  count: z.coerce.number().min(1, "1 copie minimum")
})

export const CreateItem = ({open, onOpenChange, close}: Props) => {
  const { isLoading, createItem } = useCreateItem()

  const form = useForm<z.infer<typeof addItemSchema>>({
    resolver: zodResolver(addItemSchema),
    mode: 'onChange',
    defaultValues: {
      name: 'Coffret Dresseur d\'Élite de La Voie du Maître',
      image: 'https://product-images.s3.cardmarket.com/1016/488304/488304.png',
      url: 'https://www.cardmarket.com/fr/Pokemon/Products/Elite-Trainer-Boxes/Champions-Path-Elite-Trainer-Box?language=2',
      price: "280",
      count: 1,
    }
  })

  const onSubmit = async (values: z.infer<typeof addItemSchema>) => {
    const amount = parseFloat(values.price).toFixed(2)
    createItem({
      ...values,
      price: parseFloat(amount)
    })
      .then(() => {
        form.reset()
        toast.success('Félicitations', {
          description: "Objet ajouté avec succès",
        })
        close()
      })
  }
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Ajouter un nouvel objet</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex gap-4">
              <FormField 
                name="name"
                render={({field}) => (
                  <FormItem className="flex-1">
                    <FormLabel>Nom</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormField 
                name="image"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Illustration Cardmarket</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField 
                name="url"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>URL Cardmarket</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            

            <FormField
              name="price"
              render={({ field }) => (
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
            <DialogFooter>
              <Button type="button" disabled={isLoading} onClick={close} variant="outline">Annuler</Button>
              <Button>Créer</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}