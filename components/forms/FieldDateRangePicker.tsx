import { Controller, type FieldValues } from "react-hook-form";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import type { DateRangePickerFieldProps } from "./types";

function formatDateRange(range: DateRange | undefined, placeholder: string): string {
  if (!range?.from) return placeholder;
  const from = new Date(range.from).toLocaleDateString();
  if (!range.to) return from;
  return `${from} – ${new Date(range.to).toLocaleDateString()}`;
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
}: DateRangePickerFieldProps<T>) {
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
                onSelect={(range) => {
                  field.onChange(range);
                  // Close only when a complete range has been selected
                  if (range?.from && range?.to) {
                    setOpen(false);
                  }
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
