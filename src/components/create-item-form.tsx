import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "sonner";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {BigInput, Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useCreateItem} from "@/hooks/collection/create-item.tsx";

interface Props {
  onSuccess: () => void
  onCancel: () => void
  cancelText?: string
}

const addItemSchema =  z.object({
  name: z.string().min(1, 'Champ obligatoire'),
  image: z.string().min(1, 'Champ obligatoire'),
  price: z.string().min(1, 'Valeur minimum: 1'),
  url: z.string().min(1, 'Valeur minimum: 1'),
  count: z.coerce.number().min(1, "1 copie minimum")
})

const CreateItemForm = ({onSuccess, onCancel, cancelText}: Props) => {
  const { isLoading, createItem } = useCreateItem()

  const form = useForm<z.infer<typeof addItemSchema>>({
    resolver: zodResolver(addItemSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      image: '',
      url: '',
      price: "1",
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
        onSuccess()
      })
  }

  return (
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
                <FormLabel>Illustration</FormLabel>
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
                <FormLabel>URL de suivi</FormLabel>
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
        <div className="flex justify-end gap-2">
          <Button type="button" disabled={isLoading} onClick={onCancel} variant="outline">{cancelText ?? "Annuler"}</Button>
          <Button>Créer</Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateItemForm;