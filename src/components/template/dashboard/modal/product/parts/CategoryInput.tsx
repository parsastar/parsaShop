"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TRhfProps } from "src/types/react-hook-form";
import { TProductSchema } from "src/types/validators/product";
import { useGetAllCategoriesQuery } from "@/hooks/queries/category";
import { Controller } from "react-hook-form";

export default function CategoryInput({
  form,
}: {
  form: TRhfProps<TProductSchema>;
}) {
  const { control, errors, watch } = form;
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const { data: categories, isLoading, isError } = useGetAllCategoriesQuery();
  console.log("categories", categories);
  // Filter categories based on the search term
  const filteredCategories = React.useMemo(() => {
    if (!categories) return [];
    return categories.filter((category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [categories, searchTerm]);

  return (
    <Controller
      name="categoryId"
      control={control}
      rules={{ required: "Category is required" }}
      render={({ field }) => (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className={cn(
                "w-full justify-between",
                errors.categoryId ? "border-red-500" : "border-gray-300"
              )}
            >
              {field.value
                ? categories?.find((cat) => cat._id === field.value)?.name
                : "Select category..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-0">
            <Command>
              <CommandInput
                placeholder="Search category..."
                value={searchTerm}
                onValueChange={setSearchTerm} // Update search term as user types
              />
              <CommandList>
                {isLoading && <CommandEmpty>Loading...</CommandEmpty>}
                {isError && (
                  <CommandEmpty>Error loading categories</CommandEmpty>
                )}
                {!isLoading && filteredCategories.length === 0 && (
                  <CommandEmpty>No categories found.</CommandEmpty>
                )}
                <CommandGroup>
                  {filteredCategories.map((category) => {
                    return (
                      <CommandItem
                        key={category.name}
                        value={category.name}
                        onSelect={(currentValue) => {
                          field.onChange(category._id);
                          setOpen(false);
                          setSearchTerm(""); // Clear search term after selection
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            field.value === category._id
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {category.name}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      )}
    />
  );
}
