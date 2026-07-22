import { Controller, type FieldValues } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { getOptionLabel, getOptionValue, type SelectFieldProps } from "./types";

/**
 * Form field component for select dropdowns.
 * Accepts plain strings or { label, value } objects as items.
 *
 * @example
 * <FieldSelect
 *   control={form.control}
 *   name="role"
 *   label="Role"
 *   items={[{ label: "Admin", value: "admin" }, { label: "User", value: "user" }]}
 * />
 */
export function FieldSelect<T extends FieldValues>({
  name,
  items,
  control,
  label = "Label",
  placeholder = "Choose option",
  description,
  disabled = false,
}: SelectFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field>
          <FieldLabel>{label}</FieldLabel>
          <Select value={field.value} onValueChange={field.onChange} disabled={disabled}>
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {items.map((item) => (
                <SelectItem key={getOptionValue(item)} value={getOptionValue(item)}>
                  {getOptionLabel(item)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
