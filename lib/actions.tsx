'use server'

import { createClient } from '@/utils/supabase/server'

// Define the type for form data
type ContactSubmission = {
  name: string
  email: string
  phone?: string
  wechat?: string
  address?: string
  message: string
  created_at?: string // Supabase will handle this
}

export async function createContactSubmission(formData: ContactSubmission) {
  try {
    const client = await createClient()

    // Add timestamp
    const submission = {
      ...formData,
      created_at: new Date().toISOString(),
    }

    const { error } = await client
      .from('contact_submissions')
      .insert(submission)

    if (error) {
      console.error('Supabase error:', error)
      throw new Error('Failed to create contact submission')
    }

    return { success: true }
  } catch (error) {
    console.error('Submission error:', error)
    throw new Error('Failed to create contact submission')
  }
}
