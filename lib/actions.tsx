'use server'

import { createClient } from '@/utils/supabase/server'
import { FormData } from '@/app/components/FCE-Form/types'
import { formatUtils } from '@/app/components/FCE-Form/utils'

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

export async function createFCESubmission(formData: FormData) {
  const client = await createClient()
  const { error } = await client.from('fce_applications').insert(formData)
  if (error) throw error
}

export async function submitFCEApplication(formData: FormData) {
  try {
    const client = await createClient()

    // 添加调试日志
    console.log("Original form data:", formData)
    const dbData = formatUtils.toDatabase(formData, 3, 'completed')
    console.log("Converted database data:", dbData)

    // 开始数据库事务
    const { data: application, error: applicationError } = await client
      .from('fce_applications')
      .insert({
        ...dbData,
        submitted_at: new Date().toISOString()
      })
      .select()
      .single()

    if (applicationError) {
      console.error('Application insert error:', applicationError)
      throw applicationError
    }

    // 插入教育经历记录
    const educationPromises = formData.educations.map(education =>
      client
        .from('fce_educations')
        .insert({
          application_id: application.id,
          ...formatUtils.toEducationDatabase(education)
        })
    )

    await Promise.all(educationPromises)

    return { success: true, applicationId: application.id }
  } catch (error) {
    console.error('Failed to submit FCE application:', error)
    throw new Error('Failed to submit application')
  }
}
