import { useState } from "react"
import { Controller, type FieldValues } from "react-hook-form"
import { ChevronDownIcon } from "lucide-react"
import type { DateRange } from "react-day-picker"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

import { useFieldId, type DateRangePickerFieldProps } from "./types"

function formatDateRange(range: DateRange | undefined, placeholder: string): string {
  if (!range?.from) return placeholder
  const from = new Date(range.from).toLocaleDateString()
  if (!range.to) return from
  return `${from} – ${new Date(range.to).toLocaleDateString()}`
}

/**
 * Form field component for date range selection.
 * Popover closes naturally once the user picks both start and end dates.
 *
 * @example
 * <FieldDateRangePicker control={form.control} name="stayDates" label="Stay Dates" />
 */
export function FieldDateRangePicker<T extends FieldValues>({
  control,
  name,
  label = "Label",
  description,
  placeholder = "Select date range",
  numberOfMonths = 2,
  id,
  disabled,
  className,
}: DateRangePickerFieldProps<T>) {
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
              <span className={field.value?.from ? "" : "text-muted-foreground"}>
                {formatDateRange(field.value, placeholder)}
              </span>
              <ChevronDownIcon />
            </PopoverTrigger>
            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
              <Calendar
                mode="range"
                defaultMonth={field.value?.from}
                selected={field.value}
                numberOfMonths={numberOfMonths}
                disabled={disabled}
                onSelect={(range) => {
                  field.onChange(range)
                  if (range?.from && range?.to) {
                    setOpen(false)
                  }
                }}
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
