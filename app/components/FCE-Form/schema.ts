import * as z from "zod"
import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"

dayjs.extend(customParseFormat)

const educationSchema = z.object({
  countryOfStudy: z.string({ required_error: "Please enter country of study" }),
  degreeObtained: z.string().min(1, { message: "Please enter the degree obtained" }),
  schoolName: z.string().min(1, { message: "Please enter school name" }),
  studyDuration: z.object({
    startDate: z.object({
      month: z.string({ required_error: "Please select start month" }),
      year: z.string({ required_error: "Please select start year" }),
    }),
    endDate: z.object({
      month: z.string({ required_error: "Please select end month" }),
      year: z.string({ required_error: "Please select end year" }),
    }),
  }).superRefine((data, ctx) => {
    const { startDate, endDate } = data
    if (!startDate.year || !startDate.month || !endDate.year || !endDate.month) return

    const start = dayjs(`${startDate.year}-${startDate.month}-01`)
    const end = dayjs(`${endDate.year}-${endDate.month}-01`)

    if (end.isBefore(start) || end.isSame(start)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Graduation date must be after enrollment date",
        path: ["endDate", "year"]
      })
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Graduation date must be after enrollment date",
        path: ["endDate", "month"]
      })
    }
  }),
})

// Define speed options and their display values
const speedOptions = {
  firstDegree: {
    "7day": "7 Business Days",
    "3day": "3 Business Days",
    "24hour": "24 Hours",
    "sameday": "Same Day"
  },
  coursebyCourse: {
    "8day": "8 Business Days",
    "5day": "5 Business Days",
    "3day": "3 Business Days",
    "24hour": "24 Hours"
  },
  professionalExperience: {
    "21day": "21 Business Days",
    "7day": "7 Business Days",
    "3day": "3 Business Days"
  },
  positionEvaluation: {
    "10day": "10 Business Days",
    "5day": "5 Business Days",
    "3day": "3 Business Days",
    "2day": "2 Business Days"
  }
} as const

// Update the service selection part of the schema
const serviceTypeSchema = z.object({
  firstDegree: z.object({
    speed: z.enum(["7day", "3day", "24hour", "sameday"] as const).optional(),
  }),
  secondDegree: z.object({
    quantity: z.number().min(0).default(0),
  }),
  coursebyCourse: z.object({
    firstDegree: z.object({
      speed: z.enum(["8day", "5day", "3day", "24hour"] as const).optional(),
    }),
    secondDegree: z.object({
      quantity: z.number().min(0).default(0),
    }),
  }),
  professionalExperience: z.object({
    speed: z.enum(["21day", "7day", "3day"] as const).optional(),
  }),
  positionEvaluation: z.object({
    speed: z.enum(["10day", "5day", "3day", "2day"] as const).optional(),
  }),
  translation: z.object({
    required: z.boolean().default(false),
  }),
}).refine(
  (data) => {
    // At least one evaluation service must be selected
    return !!(
      data.firstDegree.speed ||
      data.coursebyCourse.firstDegree.speed ||
      data.professionalExperience.speed ||
      data.positionEvaluation.speed
    )
  },
  {
    message: "Please select at least one evaluation service",
    path: ["firstDegree", "speed"], // Show error on first degree field
  }
)

// Validation rules migrated from FCE-Form.tsx
export const formSchema = z.object({
  // 1. CLIENT INFORMATION
  firmName: z.string().min(2, { message: "Please enter company/individual name" }),
  streetAddress: z.string().min(5, { message: "Please enter street address" }),
  streetAddress2: z.string().optional(),
  city: z.string().min(2, { message: "Please enter city name" }),
  state: z.string({
    required_error: "请选择地区"
  }),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, { message: "Please enter a valid ZIP code" }),
  phone: z.string().regex(/^\d{3}-\d{3}-\d{4}$/, {
    message: "Please enter a valid phone number in format: 123-456-7890"
  }),
  fax: z.string().regex(/^\d{3}-\d{3}-\d{4}$/, {
    message: "Please enter a valid fax number in format: 123-456-7890"
  }).optional(),
  email: z.string().email({ message: "Please enter a valid email address" }),
  purpose: z.enum(["immigration", "employment", "education", "other"], {
    required_error: "Please select evaluation purpose",
  }),
  purposeOther: z.string().optional(),

  // 2. EVALUEE INFORMATION
  title: z.enum(["mr", "ms", "mx"], {
    required_error: "Please select title",
  }),
  firstName: z.string()
    .min(1, { message: "First name cannot be empty" })
    .refine((val) => val.trim().length > 0, { message: "First name cannot contain only spaces" }),
  lastName: z.string()
    .min(1, { message: "Last name cannot be empty" })
    .refine((val) => val.trim().length > 0, { message: "Last name cannot contain only spaces" }),
  middleName: z.string().optional(),
  dateOfBirth: z.object({
    month: z.string({ required_error: "Please select month" }),
    date: z.string({ required_error: "Please select date" }),
    year: z.string({ required_error: "Please select year" })
  }).superRefine((data, ctx) => {
    const { year, month, date } = data
    if (!year || !month || !date) return

    // Check if date is valid
    const isValid = dayjs(`${year}-${month}-${date}`, 'YYYY-MM-DD', true).isValid()
    if (!isValid) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please enter a valid date",
        path: ["date"]
      })
    }

    // Check if date is in future
    const selectedDate = dayjs(`${year}-${month}-${date}`)
    if (selectedDate.isAfter(dayjs())) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Birth date cannot be in the future",
        path: ["date"]
      })
    }
  }),

  // New education array field
  educations: z.array(educationSchema)
    .min(1, { message: "At least one degree is required" }),

  // 3. SERVICE SELECTION
  serviceType: serviceTypeSchema,
  deliveryMethod: z.enum([
    "usps_domestic",
    "usps_international",
    "usps_priority_domestic",
    "usps_express_domestic",
    "ups_express_domestic",
    "usps_express_international",
    "fedex_express_international"
  ]),
  additionalServices: z.array(z.enum([
    "extra_copy",
    "pdf_with_hard_copy",
    "pdf_only"
  ])),
  country: z.string({
    required_error: "请选择国家",
  }),
})

// You might want to export the education schema for reuse
export type EducationSchema = z.infer<typeof educationSchema>

// Export the speed options and types for use in the UI
export const SERVICE_SPEED_OPTIONS = speedOptions
export type ServiceTypeSchema = z.infer<typeof serviceTypeSchema>
