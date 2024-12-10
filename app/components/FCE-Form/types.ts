import * as z from "zod"
import { formSchema, EducationSchema } from "./schema"

export enum FormStep {
  CLIENT_INFO = 0,        // Client Information
  EVALUEE_INFO = 1,       // Evaluee Information
  SERVICE_SELECTION = 2,  // Service Selection
  REVIEW = 3,            // Review Information
}

export type FormData = z.infer<typeof formSchema>

export interface FormDraft {
  id: string
  form_data: Partial<FormData>
  status: 'draft' | 'completed'
  current_step: FormStep
  created_at: string
  updated_at: string
}

// Re-export EducationSchema type
export type { EducationSchema }
