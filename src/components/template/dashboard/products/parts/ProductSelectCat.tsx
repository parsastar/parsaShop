"use client";

import { Check, ChevronsUpDown, X } from "lucide-react";

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
import { useGetAllCategoriesQuery } from "@/hooks/queries/category";
import { useEffect, useState } from "react";

export function ProductSelectedCat({
  value,
  handleSubmit,
}: {
  value?: string;
  handleSubmit: ({
    e,
    category,
  }: {
    category?: string | undefined;
    e?: React.FormEvent<HTMLFormElement> | undefined;
  }) => void;
}) {
  const [open, setOpen] = useState(false);
  const { data: categories, isLoading, isError } = useGetAllCategoriesQuery();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          asChild
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`w-[300px] py-6 justify-between ${
            value !== "" && "bg-gray-100 text-black"
          }`}
        >
          <div>
            {isError
              ? "Something went wrong!"
              : isLoading
              ? "Loading Categories..."
              : value
              ? value
              : "Select category..."}
            {value ? (
              <Button
                onClick={() => handleSubmit({ category: "" })}
                variant={"none"}
                className="bg-slate-200 group"
              >
                <X size={15} className="text-black group-hover:scale-110" />
              </Button>
            ) : (
              <ChevronsUpDown className="ml-2 opacity-50" />
            )}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search category..." className="h-9" />
          <CommandList>
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup>
              <CommandItem
                value={""}
                onSelect={(currentValue) => {
                  handleSubmit({ category: currentValue });
                  setOpen(false);
                }}
              >
                {"All"}
                <Check
                  className={cn(
                    "ml-auto",
                    value === "" ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>

              {categories?.map((category) => (
                <CommandItem
                  key={category._id}
                  value={category.name}
                  onSelect={(currentValue) => {
                    setOpen(false);
                    console.log("hello");
                    handleSubmit({ category: currentValue });
                  }}
                >
                  {category.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      value?.trim() === category.name.trim()
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
