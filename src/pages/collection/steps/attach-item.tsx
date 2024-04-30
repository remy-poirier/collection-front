import {Button} from "@/components/ui/button.tsx";
import {Item} from "@/domain/collection.ts";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useAttachItem} from "@/hooks/collection/attach-item.tsx";
import {toast} from "sonner";
import {ItemResume} from "@/components/item-resume.tsx";

interface Props {
  back: () => void
  item: Item
  onSuccess: () => void
}

const countSchema =  z.object({
  count: z.coerce.number().min(1, "1 copie minimum"),
})

const AttachItem = ({back, item, onSuccess}: Props) => {

  const form = useForm<z.infer<typeof countSchema>>({
    resolver: zodResolver(countSchema),
    mode: 'onChange',
    defaultValues: {
      count: 1,
    }
  })

  const { isLoading, attach } = useAttachItem()

  const onSubmit = async (values: z.infer<typeof countSchema>) => {
    attach({
      ...values,
      item_id: item.id
    })
      .then(() => {
        toast.success("Félicitations", {
          description: "Objet ajouté avec succès"
        })
        form.reset()
        onSuccess()
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="bg-accent py-1 px-4 rounded-md">
          <ItemResume item={item} />
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            name="count"
            render={({field}) => (
              <FormItem>
                <FormLabel>Nombre d'exemplaires en ta possession</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />

          <div className="flex mt-6 justify-end gap-2">
            <Button type="button" disabled={isLoading} onClick={back} variant="outline">
              Retour
            </Button>
            <Button loading={isLoading} disabled={!form.formState.isValid}>
              Valider
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AttachItem;