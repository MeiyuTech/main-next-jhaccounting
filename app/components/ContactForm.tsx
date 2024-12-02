'use client'

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Textarea } from "@/app/components/ui/textarea"
import { createContactSubmission } from "@/lib/actions"
import { useToast } from "@/hooks/use-toast"

// Props type definition, used to pass translations to the Client Component
interface ContactFormProps {
  translations: {
    name: {
      label: string
      validation: {
        min: string
        max: string
      }
    },
    email: {
      label: string
      validation: {
        invalid: string
      }
    },
    phone: {
      label: string
      validation: {
        invalid: string
      }
    },
    wechat: {
      label: string
      validation: {
        min: string
        max: string
        format: string
      }
    },
    address: {
      label: string
      validation: {
        min: string
        max: string
      }
    },
    zipcode: {
      label: string
      validation: {
        invalid: string
      }
    },
    message: {
      label: string
      validation: {
        min: string
        max: string
      }
    },
    submit: string,
    submitting: string
  }
}

// Define form validation schema
const formSchema = (translations: ContactFormProps['translations']) => z.object({
  name: z.string()
    .min(1, translations.name.validation.min)
    .max(20, translations.name.validation.max),

  email: z.string().email(translations.email.validation.invalid),

  phone: z.string()
    .transform(val => val === "" ? undefined : val)
    .optional()
    .superRefine((val, ctx) => {
      if (val && !val.match(/^\+?[1-9]\d{1,14}$/)) {
        ctx.addIssue({
          code: "custom",
          message: translations.phone.validation.invalid,
        });
      }
    }),

  wechat: z.string()
    .transform(val => val === "" ? undefined : val)
    .optional()
    .superRefine((val, ctx) => {
      if (val) {
        if (!val.match(/^[a-zA-Z0-9_-]{6,20}$/)) {
          ctx.addIssue({
            code: "custom",
            message: translations.wechat.validation.format,
          });
        } else if (val.length < 6) {
          ctx.addIssue({
            code: "too_small",
            minimum: 6,
            type: "string",
            inclusive: true,
            message: translations.wechat.validation.min,
          });
        } else if (val.length > 20) {
          ctx.addIssue({
            code: "too_big",
            maximum: 20,
            type: "string",
            inclusive: true,
            message: translations.wechat.validation.max,
          });
        }
      }
    }),

  address: z.string()
    .transform(val => val === "" ? undefined : val)
    .optional()
    .superRefine((val, ctx) => {
      if (val && (val.length < 5 || val.length > 250)) {
        ctx.addIssue({
          code: val.length < 5 ? "too_small" : "too_big",
          minimum: 5,
          maximum: 250,
          type: "string",
          inclusive: true,
          message: val.length < 5 ? translations.address.validation.min : translations.address.validation.max,
        });
      }
    }),

  zipcode: z.string()
    .transform(val => val === "" ? undefined : val)
    .optional()
    .superRefine((val, ctx) => {
      if (val && !val.match(/^\d{5,6}$/)) {
        ctx.addIssue({
          code: "custom",
          message: translations.zipcode.validation.invalid,
        });
      }
    }),

  message: z.string()
    .min(10, translations.message.validation.min)
    .max(250, translations.message.validation.max),
})


export default function ContactForm({ translations }: ContactFormProps) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Initialize form with validation schema
  const form = useForm<z.infer<ReturnType<typeof formSchema>>>({
    resolver: zodResolver(formSchema(translations)),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      wechat: "",
      address: "",
      zipcode: "",
      message: "",
    },
  })

  // Handle form submission
  async function onSubmit(values: z.infer<ReturnType<typeof formSchema>>) {
    setIsSubmitting(true)
    try {
      await createContactSubmission(values)

      // Updated success toast with custom text color
      toast({
        title: "Success",
        description: "Your message has been sent successfully.",
        className: "text-teal-400",
      })

      form.reset()
    } catch (error) {
      // Updated error toast with custom text color
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
        className: "text-red-500",
      })
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{translations.name.label}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{translations.email.label}</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{translations.phone.label}</FormLabel>
                <FormControl>
                  <Input type="tel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="wechat"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{translations.wechat.label}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{translations.address.label}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="zipcode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{translations.zipcode.label}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{translations.message.label}</FormLabel>
              <FormControl>
                <Textarea rows={6} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full transition-all duration-200 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2 px-6 rounded-lg transition-colors"
          disabled={isSubmitting}
        >
          {isSubmitting ? translations.submitting : translations.submit}
        </Button>
      </form>
    </Form>
  )
} 