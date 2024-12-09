import * as z from "zod"

// Validation rules migrated from FCE-Form.tsx
export const formSchema = z.object({
  // 1. CLIENT INFORMATION
  firmName: z.string().min(2, { message: "请输入公司/个人名称" }),
  streetAddress: z.string().min(5, { message: "请输入街道地址" }),
  streetAddress2: z.string().optional(),
  city: z.string().min(2, { message: "请输入城市名称" }),
  state: z.string().length(2, { message: "请选择州" }),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, { message: "请输入有效的邮编" }),
  phone: z.string().regex(/^\d{3}-\d{3}-\d{4}$/, {
    message: "请输入有效的电话号码，格式：123-456-7890"
  }),
  fax: z.string().regex(/^\d{3}-\d{3}-\d{4}$/, {
    message: "请输入有效的传真号码，格式：123-456-7890"
  }).optional(),
  email: z.string().email({ message: "请输入有效的邮箱地址" }),
  purpose: z.enum(["immigration", "employment", "education", "other"], {
    required_error: "请选择评估目的",
  }),
  purposeOther: z.string().optional(),

  // 2. EVALUEE INFORMATION
  title: z.enum(["mr", "ms", "mx"], {
    required_error: "请选择称谓",
  }),
  firstName: z.string({ required_error: "请输入名" }),
  lastName: z.string({ required_error: "请输入姓" }),
  middleName: z.string().optional(),
  dateOfBirth: z.object({
    month: z.string({ required_error: "请选择月份" }),
    date: z.string({ required_error: "请选择日期" }),
    year: z.string({ required_error: "请选择年份" })
  }),
  countryOfStudy: z.string({ required_error: "请输入学习国家" }),
  degreeObtained: z.string().min(1, { message: "请输入获得的学位" }),
  schoolName: z.string().min(1, { message: "请输入学校名称" }),
  studyDuration: z.object({
    startDate: z.object({
      month: z.string({ required_error: "请选择入学月份" }),
      year: z.string({ required_error: "请选择入学年份" }),
    }),
    endDate: z.object({
      month: z.string({ required_error: "请选择毕业月份" }),
      year: z.string({ required_error: "请选择毕业年份" }),
    }),
  }),

  // 3. SERVICE SELECTION
  serviceType: z.object({
    firstDegree: z.object({
      speed: z.enum(["7day", "3day", "24hour", "sameday"]),
    }),
    secondDegree: z.object({
      quantity: z.number().min(0).default(0),
    }),
    coursebyCourse: z.object({
      firstDegree: z.object({
        speed: z.enum(["8day", "5day", "3day", "24hour"]),
      }),
      secondDegree: z.object({
        quantity: z.number().min(0).default(0),
      }),
    }),
    professionalExperience: z.object({
      speed: z.enum(["21day", "7day", "3day"]).optional(),
    }),
    positionEvaluation: z.object({
      speed: z.enum(["10day", "5day", "3day", "2day"]).optional(),
    }),
    translation: z.object({
      required: z.boolean().default(false),
    }),
  }),
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
})
