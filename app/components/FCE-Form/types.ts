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

// 添加数据库格式的类型定义
export interface DatabaseApplication {
  id: string;
  status: 'draft' | 'submitted' | 'processing' | 'completed' | 'cancelled';
  current_step: FormStep;

  // Client Information
  name: string;
  country: string;
  street_address: string;
  street_address2: string | null;
  city: string;
  region: string;
  zip_code: string;
  phone: string;
  fax: string | null;
  email: string;
  purpose: 'immigration' | 'employment' | 'education' | 'other';
  purpose_other: string | null;

  // Evaluee Information
  pronouns: 'mr' | 'ms' | 'mx';
  first_name: string;
  last_name: string;
  middle_name: string | null;
  date_of_birth: string;  // ISO format date

  // Service Selection
  service_type: FormData['serviceType'];  // 使用相同的类型
  delivery_method: string;
  additional_services: string[];
  additional_services_quantity: {
    extra_copy: number;
    pdf_with_hard_copy: number;
    pdf_only: number;
  };

  // Metadata
  created_at: string;
  updated_at: string;
  submitted_at: string | null;
}

export interface DatabaseEducation {
  id: string;
  application_id: string;
  country_of_study: string;
  degree_obtained: string;
  school_name: string;
  study_start_date: {
    month: string;
    year: string;
  };
  study_end_date: {
    month: string;
    year: string;
  };
}

export type DeliveryMethod = "no_delivery_needed" | "usps_first_class_domestic" | "usps_first_class_international" | "usps_priority_domestic" | "usps_express_domestic" | "ups_express_domestic" | "usps_express_international" | "fedex_express_international"

export type AdditionalService = "extra_copy" | "pdf_with_hard_copy" | "pdf_only"
