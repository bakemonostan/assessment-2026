import { useState } from "react"
import { Controller, type FieldValues } from "react-hook-form"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

import { useFieldId, type DatePickerFieldProps } from "./types"

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
  id,
  disabled,
  className,
}: DatePickerFieldProps<T>) {
  const [open, setOpen] = useState(false)
  const fieldId = useFieldId(String(name), id)

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-disabled={disabled ? true : undefined}>
          <FieldLabel htmlFor={fieldId}>{label}</FieldLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger
              disabled={disabled}
              render={
                <Button
                  id={fieldId}
                  variant="outline"
                  disabled={disabled}
                  aria-invalid={fieldState.invalid || undefined}
                  className={cn(
                    "h-10 w-full justify-between border-border bg-background font-normal text-foreground shadow-sm hover:bg-muted/50 [&[data-state=open]]:ring-2 [&[data-state=open]]:ring-ring/20",
                    className
                  )}
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
                  field.onChange(date)
                  setOpen(false)
                }}
                disabled={disabled}
              />
            </PopoverContent>
          </Popover>
          {description ? <FieldDescription>{description}</FieldDescription> : null}
          {fieldState.invalid ? <FieldError errors={[fieldState.error]} /> : null}
        </Field>
      )}
    />
  )
}
