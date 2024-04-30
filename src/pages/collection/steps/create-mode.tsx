import CreateItemForm from "@/components/create-item-form.tsx";

interface Props {
  back: () => void
  onSuccess: () => void
}



const CreateMode = ({back, onSuccess}: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-bold">Formulaire de création</span>
      <CreateItemForm onSuccess={onSuccess} onCancel={back} cancelText="Retour" />
    </div>
  );
};

export default CreateMode;