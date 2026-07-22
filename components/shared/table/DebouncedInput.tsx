"use client"

import { Search } from "lucide-react"
import * as React from "react"

import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

import type { DebouncedInputProps } from "./types"

export type { DebouncedInputProps } from "./types"

/**
 * Text input that delays `onChange` until the user pauses typing.
 *
 * @example
 * ```tsx
 * <DebouncedInput
 *   value={query}
 *   onChange={(value) => setQuery(String(value))}
 *   placeholder="Search..."
 *   debounce={300}
 *   className="pl-8"
 * />
 * ```
 */
export function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  inputClassName,
  className,
  ...props
}: DebouncedInputProps) {
  const [value, setValue] = React.useState(initialValue)
  const onChangeRef = React.useRef(onChange)
  onChangeRef.current = onChange

  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  React.useEffect(() => {
    const timeout = setTimeout(() => onChangeRef.current(value), debounce)
    return () => clearTimeout(timeout)
  }, [value, debounce])

  return (
    <div className={cn("relative", className)}>
      <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        className={cn("pl-8", inputClassName)}
        {...props}
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
    </div>
  )
}
