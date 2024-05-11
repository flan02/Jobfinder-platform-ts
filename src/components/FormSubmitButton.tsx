"use client"

import { useFormStatus } from "react-dom"
import { Button } from "./ui/button"
import { Loader2 } from "lucide-react"

export default function FormSubmitButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  const status = useFormStatus()
  return (
    <Button
      disabled={props.disabled || status.pending}
      {...props} type="submit" className="w-full"
    >
      <span className="flex items-center justify-center gap-1">
        {status.pending && <Loader2 size={16} className="animate-spin" />}
        {props.children}
      </span>
    </Button>
  )
}