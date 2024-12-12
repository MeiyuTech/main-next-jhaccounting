import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import { FormData } from "./types"
import { EVALUATION_SERVICES } from "./constants"
import { DatabaseApplication, DatabaseEducation, DeliveryMethod, AdditionalService } from "./types"
import { EducationSchema, FormStep } from "./types"

dayjs.extend(customParseFormat)
dayjs.extend(isSameOrBefore)

export const dateUtils = {
  getDaysInMonth(month?: string, year?: string): number {
    if (!month || !year) return 31
    return dayjs(`${year}-${month}`).daysInMonth()
  },

  isValidDate(year?: string, month?: string, date?: string): boolean {
    if (!year || !month || !date) return true
    return dayjs(`${year}-${month}-${date}`, 'YYYY-MM-DD', true).isValid()
  },

  isFutureDate(year?: string, month?: string, date?: string): boolean {
    if (!year || !month || !date) return false
    return dayjs(`${year}-${month}-${date}`).isAfter(dayjs())
  },

  isValidDateRange(startMonth?: string, startYear?: string, endMonth?: string, endYear?: string): boolean {
    if (!startMonth || !startYear || !endMonth || !endYear) return true

    const startDate = dayjs(`${startYear}-${startMonth}-01`)
    const endDate = dayjs(`${endYear}-${endMonth}-01`)

    return endDate.isAfter(startDate)
  }
}

export function calculateTotalPrice(formData: FormData): number {
  let total = 0;

  // Foreign Credential Evaluation
  const fceSpeed = formData.serviceType.foreignCredentialEvaluation.firstDegree.speed;
  if (fceSpeed) {
    total += EVALUATION_SERVICES.FOREIGN_CREDENTIAL.FIRST_DEGREE[fceSpeed].price;

    // Add second degree prices
    const secondDegreePrice = fceSpeed === "7day"
      ? EVALUATION_SERVICES.FOREIGN_CREDENTIAL.SECOND_DEGREE["7day"].price
      : EVALUATION_SERVICES.FOREIGN_CREDENTIAL.SECOND_DEGREE.DEFAULT.price;

    total += secondDegreePrice * formData.serviceType.foreignCredentialEvaluation.secondDegrees;
  }

  // Course Evaluation
  const cbeSpeed = formData.serviceType.coursebyCourse.firstDegree.speed;
  if (cbeSpeed) {
    total += EVALUATION_SERVICES.COURSE_BY_COURSE.FIRST_DEGREE[cbeSpeed].price;

    // Add second degree prices
    const secondDegreePrice = cbeSpeed === "8day"
      ? EVALUATION_SERVICES.COURSE_BY_COURSE.SECOND_DEGREE["8day"].price
      : EVALUATION_SERVICES.COURSE_BY_COURSE.SECOND_DEGREE.DEFAULT.price;

    total += secondDegreePrice * formData.serviceType.coursebyCourse.secondDegrees;
  }

  return total;
}

export const formatUtils = {
  // 将前端格式转换为数据库格式
  toDatabase(formData: Partial<FormData>, currentStep: FormStep, status: 'draft' | 'completed' = 'draft'): Omit<DatabaseApplication, 'id' | 'created_at' | 'updated_at' | 'submitted_at'> {
    return {
      status,
      current_step: currentStep,

      // Client Information
      name: formData.name!,
      street_address: formData.streetAddress!,
      street_address2: formData.streetAddress2 || null,
      city: formData.city!,
      region: formData.region!,
      zip_code: formData.zipCode!,
      phone: formData.phone!,
      fax: formData.fax || null,
      email: formData.email!,
      purpose: formData.purpose!,
      purpose_other: formData.purposeOther || null,
      country: formData.country!,

      // Evaluee Information
      pronouns: formData.pronouns!,
      first_name: formData.firstName!,
      last_name: formData.lastName!,
      middle_name: formData.middleName || null,
      date_of_birth: `${formData.dateOfBirth?.year}-${formData.dateOfBirth?.month}-${formData.dateOfBirth?.date}`,

      // Service Selection
      service_type: formData.serviceType!,
      delivery_method: formData.deliveryMethod || "no_delivery_needed",
      additional_services: formData.additionalServices || [],
      additional_services_quantity: formData.additionalServicesQuantity || {
        extra_copy: 0,
        pdf_with_hard_copy: 0,
        pdf_only: 0,
      }
    }
  },

  // 将数据库格式转换为前端格式
  toFormData(dbData: DatabaseApplication): Partial<FormData> {
    return {
      // Client Information
      name: dbData.name,
      country: dbData.country,
      streetAddress: dbData.street_address,
      streetAddress2: dbData.street_address2 || undefined,
      city: dbData.city,
      region: dbData.region,
      zipCode: dbData.zip_code,
      phone: dbData.phone,
      fax: dbData.fax || undefined,
      email: dbData.email,
      purpose: dbData.purpose,
      purposeOther: dbData.purpose_other || undefined,

      // Evaluee Information
      pronouns: dbData.pronouns,
      firstName: dbData.first_name,
      lastName: dbData.last_name,
      middleName: dbData.middle_name || undefined,
      dateOfBirth: {
        year: dbData.date_of_birth.split('-')[0],
        month: dbData.date_of_birth.split('-')[1],
        date: dbData.date_of_birth.split('-')[2],
      },

      // Service Selection
      serviceType: dbData.service_type,
      deliveryMethod: dbData.delivery_method as DeliveryMethod,
      additionalServices: dbData.additional_services as AdditionalService[],
      additionalServicesQuantity: dbData.additional_services_quantity
    }
  },

  // 转换教育经历格式
  toEducationDatabase(education: EducationSchema): Omit<DatabaseEducation, 'id' | 'application_id'> {
    return {
      country_of_study: education.countryOfStudy,
      degree_obtained: education.degreeObtained,
      school_name: education.schoolName,
      study_start_date: education.studyDuration.startDate,
      study_end_date: education.studyDuration.endDate
    }
  },

  // 将数据库教育经历转换为前端格式
  toEducationFormData(dbEducation: DatabaseEducation): EducationSchema {
    return {
      countryOfStudy: dbEducation.country_of_study,
      degreeObtained: dbEducation.degree_obtained,
      schoolName: dbEducation.school_name,
      studyDuration: {
        startDate: dbEducation.study_start_date,
        endDate: dbEducation.study_end_date
      }
    }
  }
}
