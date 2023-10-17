"use client"

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { Check, ChevronsUpDown, Home, PlusCircle } from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "./ui/command";
import { usePropertyModal } from "@/hooks/use-property-modal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface PropertySwitcherProps extends PopoverTriggerProps {
  items: Record<string, any>[];
}

export default function PropertySwitcher({ className, items = [] }: PropertySwitcherProps) {
  const propertyModal = usePropertyModal();
  const params = useParams();
  const router = useRouter();

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id
  }));

  const currentProperty = formattedItems.find((item) => item.value === params.propertyId);

  const [open, setOpen] = React.useState(false);

  const onPropertySelect = (property: { value: string, label: string }) => {
    setOpen(false);
    router.push(`/${property.value}`);
  };

  return ( 
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a property"
          className={cn("w-[200px] justify-between", className)}
        >
          <Home className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          {currentProperty?.label}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search property..." />
            <CommandEmpty>No property found.</CommandEmpty>
            <CommandGroup heading="Property">
              {formattedItems.map((property) => (
                <CommandItem
                  key={property.value}
                  onSelect={() => onPropertySelect(property)}
                  className="text-sm"
                >
                  {property.label}
                  <Check className={cn("ml-auto h-4 w-4", currentProperty?.value === property.value ? "opacity-100" : "opacity-0")} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem onSelect={() => {
                setOpen(false)
                propertyModal.onOpen()
                }}
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                Create Property 
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};