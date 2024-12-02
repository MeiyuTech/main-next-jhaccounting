'use client'

import { Dialog, DialogContent, DialogTrigger } from "@/app/components/ui/dialog"
import { Button } from "@/app/components/ui/button"
import ContactForm, { ContactFormProps } from "@/app/components/ContactForm"

interface ContactDialogProps {
  translations: ContactFormProps['translations']
}

export default function ContactDialog({ translations }: ContactDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" size="lg" className="transition-all duration-200 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2 px-6 rounded-lg transition-colors">
          Contact Us
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <div className="grid gap-4 py-4">
          <ContactForm translations={translations} />
        </div>
      </DialogContent>
    </Dialog>
  )
}