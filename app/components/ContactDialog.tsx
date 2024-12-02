'use client'

import { Dialog, DialogContent, DialogTrigger } from "@/app/components/ui/dialog"
import { Button } from "@/app/components/ui/button"
import ContactForm, { ContactFormProps } from "@/app/components/ContactForm"
import { useState } from "react"

interface ContactDialogProps {
  formTranslations: ContactFormProps['translations']
  buttonText: string
  buttonClassName?: string
}

export default function ContactDialog({
  formTranslations,
  buttonText,
  buttonClassName = "text-2xl transition-all duration-200 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2 px-6 rounded-lg"
}: ContactDialogProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="lg" className={buttonClassName}>
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <div className="grid gap-4 py-4">
          <ContactForm
            translations={formTranslations}
            onSubmitSuccess={() => setOpen(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}