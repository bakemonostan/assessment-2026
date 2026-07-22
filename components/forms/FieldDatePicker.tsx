import { Controller, type FieldValues } from "react-hook-form";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import type { DatePickerFieldProps } from "./types";

/**
 * Form field component for single date selection.
 *
 * @example
 * <FieldDatePicker control={form.control} name="birthDate" label="Date of Birth" />
 */
export function FieldDatePicker<T extends FieldValues>({
  control,
  name,
  label = "Label",
  description,
  placeholder = "Select date",
}: DatePickerFieldProps<T>) {
  const [open, setOpen] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field>
          <FieldLabel>{label}</FieldLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger
              render={
                <Button
                  variant="outline"
                  className="h-10 w-full justify-between border-border bg-background font-normal text-foreground shadow-sm hover:bg-muted/50 [&[data-state=open]]:ring-2 [&[data-state=open]]:ring-ring/20"
                />
              }
            >
              <span className={field.value ? "" : "text-muted-foreground"}>
                {field.value
                  ? new Date(field.value).toLocaleDateString()
                  : placeholder}
              </span>
              <ChevronDownIcon />
            </PopoverTrigger>
            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                captionLayout="dropdown"
                onSelect={(date) => {
                  field.onChange(date);
                  setOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
