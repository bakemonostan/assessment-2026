import { Controller, type FieldValues } from "react-hook-form";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { TextFieldProps } from "./types";

interface FieldInputProps<T extends FieldValues> extends TextFieldProps<T> {
  type?: "text" | "email" | "password";
}

/**
 * Form field component for text-based inputs.
 * Use FieldNumber for numeric inputs — it handles valueAsNumber correctly.
 *
 * @example
 * <FieldInput control={form.control} name="email" label="Email" type="email" />
 */
export function FieldInput<T extends FieldValues>({
  control,
  name,
  label = "Label",
  description,
  htmlFor,
  inputId,
  type = "text",
  placeholder = "Placeholder text",
}: FieldInputProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field>
          <FieldLabel htmlFor={htmlFor ?? inputId}>{label}</FieldLabel>
          <Input {...field} id={inputId} type={type} placeholder={placeholder} />
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
