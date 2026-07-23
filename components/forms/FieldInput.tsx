"use client"

import { useState } from "react"
import { Controller, type FieldValues } from "react-hook-form"
import { EyeIcon, EyeOffIcon } from "lucide-react"

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { useFieldId, type TextFieldProps } from "./types"

interface FieldInputProps<T extends FieldValues> extends TextFieldProps<T> {
  type?: "text" | "email" | "password"
}

/**
 * Form field component for text-based inputs.
 * Use FieldNumber for numeric inputs — it handles valueAsNumber correctly.
 *
 * @example
 * <FieldInput control={form.control} name="email" label="Email" type="email" autoComplete="email" />
 */
export function FieldInput<T extends FieldValues>({
  control,
  name,
  label = "Label",
  description,
  id,
  type = "text",
  placeholder = "Enter text",
  autoComplete,
  disabled,
  className,
}: FieldInputProps<T>) {
  const fieldId = useFieldId(String(name), id)
  const isPassword = type === "password"
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const input = (
          <Input
            {...field}
            id={fieldId}
            type={
              isPassword && !showPassword
                ? "password"
                : isPassword
                  ? "text"
                  : type
            }
            placeholder={placeholder}
            autoComplete={autoComplete}
            disabled={disabled}
            aria-invalid={fieldState.invalid || undefined}
            className={cn(isPassword && "pr-9", className)}
          />
        )

        return (
          <Field data-disabled={disabled ? true : undefined}>
            <FieldLabel htmlFor={fieldId}>{label}</FieldLabel>
            {isPassword ? (
              <div className="relative">
                {input}
                <div
                  className="absolute top-1/2 right-1 -translate-y-1/2 text-muted-foreground"
                  onClick={() => setShowPassword((visible) => !visible)}
                >
                  {showPassword ? (
                    <EyeOffIcon className="size-4" />
                  ) : (
                    <EyeIcon className="size-4" />
                  )}
                </div>
              </div>
            ) : (
              input
            )}
            {description ? (
              <FieldDescription>{description}</FieldDescription>
            ) : null}
            {fieldState.invalid ? (
              <FieldError errors={[fieldState.error]} />
            ) : null}
          </Field>
        )
      }}
    />
  )
}
