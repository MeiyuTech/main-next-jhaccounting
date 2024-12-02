import { getTranslations } from 'next-intl/server'

export async function getContactFormTranslations() {
  const t = await getTranslations({
    namespace: "ContactForm",
  });

  return {
    name: {
      label: t('name.label'),
      validation: {
        min: t('name.validation.min'),
        max: t('name.validation.max'),
      }
    },
    email: {
      label: t('email.label'),
      validation: {
        invalid: t('email.validation.invalid'),
      }
    },
    phone: {
      label: t('phone.label'),
      validation: {
        invalid: t('phone.validation.invalid'),
      }
    },
    wechat: {
      label: t('wechat.label'),
      validation: {
        min: t('wechat.validation.min'),
        max: t('wechat.validation.max'),
        format: t('wechat.validation.format'),
      }
    },
    address: {
      label: t('address.label'),
      validation: {
        min: t('address.validation.min'),
        max: t('address.validation.max'),
      }
    },
    zipcode: {
      label: t('zipcode.label'),
      validation: {
        invalid: t('zipcode.validation.invalid'),
      }
    },
    message: {
      label: t('message.label'),
      validation: {
        min: t('message.validation.min'),
        max: t('message.validation.max'),
      }
    },
    submit: t('submit'),
    submitting: t('submitting'),
    toast: {
      success: {
        title: t('toast.success.title'),
        description: t('toast.success.description'),
      },
      error: {
        title: t('toast.error.title'),
        description: t('toast.error.description'),
      }
    }
  } as const
}

// Export the type for use in components
export type ContactFormTranslations = ReturnType<typeof getContactFormTranslations> 