import {useState} from 'react';
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command.tsx";
import {CommandLoading} from "cmdk";
import {Trash2} from "lucide-react";
import {useGetAutocomplete} from "@/hooks/collection/search.tsx";
import {Item} from "@/domain/collection.ts";
import {MODE} from "@/pages/collection/add-item-to-collection.tsx";

interface Props {
  selectedItem: Item | null
  selectItem: (item: Item) => void
  resetSelectedItem: () => void
  setMode: (mode: MODE) => void
}

const SelectMode = ({selectedItem, resetSelectedItem, setMode, ...rest}: Props) => {
  const [ openAutocomplete, setOpenAutocomplete ] = useState(false)
  const [search, setSearch] = useState("")
  const {autocompleteItems, isLoading} = useGetAutocomplete(search)

  const onOpenAutocompleteChange = (isOpen: boolean) => setOpenAutocomplete(isOpen)
  const onValueChange = (value: string) => {
    setSearch(value)
  }

  const selectItem = (item: Item) => () => {
    rest.selectItem(item)
    setOpenAutocomplete(false)
  }

  return (
    <>
      <Popover open={openAutocomplete} onOpenChange={onOpenAutocompleteChange}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={openAutocomplete}
            className="justify-between flex items-center gap-4"
          >
            {selectedItem ? (
              <>
                <Avatar className="w-[1.5rem] h-[1.5rem] rounded-md">
                  <AvatarImage src={selectedItem.image} alt={selectedItem.name}/>
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {selectedItem.name.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <span className="flex-1 text-left">{selectedItem.name}</span>
              </>
            ) : "Sélectionner un objet"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full md:w-[33rem] p-0">
          <Command>
            <CommandInput placeholder="Nom de l'objet" value={search} onValueChange={onValueChange}/>
            <CommandList>
              {isLoading && <CommandLoading>Chargement...</CommandLoading>}
              <CommandEmpty>Aucun résultat à afficher</CommandEmpty>
              <CommandGroup>
                {!isLoading && autocompleteItems.map(item => (
                  <CommandItem onSelect={selectItem(item)} className="flex gap-2" key={`autocomplete-${item.id}`}
                               value={item.name}>
                    <Avatar className="h-[2rem] w-[2rem]">
                      <AvatarImage src={item.image} alt={item.name}/>
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {item.name.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <span>{item.name}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {selectedItem &&
        <div className="flex gap-4">
          <Button className="flex-1" disabled={!selectedItem} onClick={() => setMode(MODE.SELECT)}>
            Ajouter l'objet à votre collection
          </Button>
          <div className="flex-none">
            <Button variant="outline" onClick={resetSelectedItem}>
              <Trash2 size={16}/>
            </Button>
          </div>
        </div>
      }
      <div className="divider">OU</div>
      <span className="text-sm">Si votre objet ne figure pas dans la liste des objets existants</span>
      <Button onClick={() => setMode(MODE.CREATE)} disabled={!!selectedItem} className="justify-between">Créer votre objet</Button>
      <span className="text-sm">
        La création d'un objet vous permettra de l'utiliser pour votre collection personnelle. Il sera en même temps
        soumis à une validation, qui une fois effectuée donnera accès à cet objet à <span className="font-bold">toute la communauté</span> !
      </span>
    </>
  );
};

export default SelectMode;