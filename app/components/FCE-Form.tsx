"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/app/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form"
import { Input } from "@/app/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group"
import { useToast } from "@/hooks/use-toast"
import { Checkbox } from "@/app/components/ui/checkbox"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/app/components/ui/select"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

// TODO: Make sure which fields are required or optional!!!
const formSchema = z.object({
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

  // 2. INFORMATION OF INDIVIDUAL TO BE EVALUATED
  title: z.enum(["mr", "ms", "mrs", "mx", "dr", "prof"], {
    required_error: "请选择称谓",
  }),
  firstName: z.string().min(1, { message: "请输入名字" }),
  lastName: z.string().min(1, { message: "请输入姓氏" }),
  middleName: z.string().optional(),
  gender: z.enum(["male", "female"]),
  dateOfBirth: z.object({
    month: z.string({ required_error: "请选择月份" }),
    date: z.string({ required_error: "请选择日期" }),
    year: z.string({ required_error: "请选择年份" }),
  }).refine((data) => {
    // 验证日期是否有效
    const { year, month, date } = data
    const fullDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(date))
    return fullDate > new Date("1940-01-01") && fullDate < new Date()
  }, {
    message: "请输入有效的出生日期",
  }),
  countryOfStudy: z.string().min(1, { message: "请输入学习国家" }),
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
  }).refine((data) => {
    // 验证结束日期是否晚于开始日期
    const start = new Date(parseInt(data.startDate.year), parseInt(data.startDate.month) - 1)
    const end = new Date(parseInt(data.endDate.year), parseInt(data.endDate.month) - 1)
    return end >= start
  }, {
    message: "毕业日期必须晚于入学日期",
  }),

  // 4. SERVICE SELECTION
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

const US_STATES = [
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'DC', label: 'District of Columbia' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'PR', label: 'Puerto Rico' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' },
  { value: 'VI', label: 'Virgin Islands' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' },
  { value: 'AS', label: 'American Samoa' },
  { value: 'GU', label: 'Guam' },
  { value: 'MP', label: 'Northern Mariana Islands' },
] as const

const PURPOSE_OPTIONS = [
  { value: "immigration", label: "Immigration" },
  { value: "employment", label: "Employment" },
  { value: "education", label: "Education" },
  { value: "other", label: "Other" },
] as const

const TITLE_OPTIONS = [
  { value: "mr", label: "Mr. (he/him)" },
  { value: "ms", label: "Ms. (she/her)" },
  { value: "mrs", label: "Mrs. (she/her)" },
  { value: "mx", label: "Mx. (they/them)" },
  { value: "dr", label: "Dr." },
  { value: "prof", label: "Prof." },
] as const

// 首先添加月份和年份的选项常量
const MONTH_OPTIONS = [
  { value: "01", label: "January" },
  { value: "02", label: "February" },
  { value: "03", label: "March" },
  { value: "04", label: "April" },
  { value: "05", label: "May" },
  { value: "06", label: "June" },
  { value: "07", label: "July" },
  { value: "08", label: "August" },
  { value: "09", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
] as const

// 生成年份选项（比如从1940到当前年份）
const currentYear = new Date().getFullYear()
const YEAR_OPTIONS = Array.from({ length: currentYear - 1940 + 1 }, (_, i) => {
  const year = String(currentYear - i)
  return { value: year, label: year }
})

// 添加一个获取月份天数的函数
function getDaysInMonth(month: string, year: string) {
  const daysInMonth = new Date(parseInt(year), parseInt(month), 0).getDate()
  return Array.from({ length: daysInMonth }, (_, i) => {
    const day = String(i + 1).padStart(2, '0')
    return { value: day, label: day }
  })
}

// Add new constant for service pricing
const FCE_FIRST_DEGREE = [
  { value: "7day", label: "7 business day service", price: 100 },
  { value: "3day", label: "3 business day service", price: 150 },
  { value: "24hour", label: "24-hour service", price: 200 },
  { value: "sameday", label: "Same-day service", price: 250 },
] as const

const CoursebyCourse_FIRST_DEGREE = [
  { value: "8day", label: "8 business day service", price: 180 },
  { value: "5day", label: "5 business day service", price: 210 },
  { value: "3day", label: "3 business day service", price: 280 },
  { value: "24hour", label: "24-hour service", price: 350 },
] as const

// 在 FCEForm 组件内添加一个函数来获取 second degree 的单价
function getFCESecondDegreePrice(secondDegreeSpeed: string) {
  return secondDegreeSpeed === "7day" ? 30 : 40
}

// 修改 second degree 价格计算函数
function getCoursebyCourseSecondDegreePrice(firstDegreeSpeed: string) {
  // 如果选择了 8 天服务，单价是 40，其他都是 60
  return firstDegreeSpeed === "8day" ? 40 : 60
}

// 添加 Professional Experience 服务的常量
const PROFESSIONAL_EXPERIENCE = [
  { value: "21day", label: "21 business day service", price: 600 },
  { value: "7day", label: "7 business day service", price: 700 },
  { value: "3day", label: "3 business day service", price: 800 },
] as const

// 添加 Position Evaluation 服务的常量
const POSITION_EVALUATION = [
  { value: "10day", label: "10 business day service", price: 300 },
  { value: "5day", label: "5 business day service", price: 400 },
  { value: "3day", label: "3 business day service", price: 500 },
  { value: "2day", label: "2 business day service", price: 600 },
] as const

// 添加 Delivery 选项常量
const DELIVERY_OPTIONS = [
  { value: "usps_domestic", label: "USPS First Class Mail (Regular Mail) - U.S. domestic", price: 7 },
  { value: "usps_international", label: "USPS First Class Mail (Regular Mail) - International", price: 13 },
  { value: "usps_priority_domestic", label: "USPS Priority Mail- U.S. Domestic", price: 17 },
  { value: "usps_express_domestic", label: "USPS Express Mail-US Domestic", price: 32 },
  { value: "ups_express_domestic", label: "UPS Express Mail-US Domestic", price: 58 },
  { value: "usps_express_international", label: "USPS Express Mail- International", price: 71 },
  { value: "fedex_express_international", label: "FedEx Express Mail- International", price: 93 },
] as const

// 添加 Additional Services 常量
const ADDITIONAL_SERVICES = [
  { id: "extra_copy", label: "Extra Hard Copy Report", price: 20 },
  { id: "pdf_with_hard_copy", label: "PDF Report with Hard Copy", price: 20 },
  { id: "pdf_only", label: "PDF Report Only (without Hard Copy)", price: 10 },
] as const

export default function FCEForm() {
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "mr",
      gender: "male",
      purpose: "education",
      serviceType: {
        firstDegree: {
          speed: "7day",
        },
        secondDegree: {
          quantity: 0,
        },
        coursebyCourse: {
          firstDegree: {
            speed: "8day",
          },
          secondDegree: {
            quantity: 0,
          },
        },
        professionalExperience: {
          speed: undefined,
        },
        positionEvaluation: {
          speed: undefined,
        },
        translation: {
          required: false,
        },
      },
      deliveryMethod: "usps_domestic",
      additionalServices: [],
      dateOfBirth: {
        month: "",
        date: "",
        year: "",
      },
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    toast({
      title: "申请已提交",
      description: "我们将尽快处理您的申请",
    })
  }

  // 获取当前选择的月份和年份
  const watchedDateOfBirth = form.watch("dateOfBirth")
  const selectedMonth = watchedDateOfBirth.month
  const selectedYear = watchedDateOfBirth.year

  // 然后在组件内使用 watch 来监听 first degree 的选择
  const firstDegreeSpeed = form.watch("serviceType.firstDegree.speed")
  const secondDegreePrice = getFCESecondDegreePrice(firstDegreeSpeed)

  // 获取 course by course first degree 的选择
  const coursebyCourseFirstDegreeSpeed = form.watch("serviceType.coursebyCourse.firstDegree.speed")
  const coursebyCourseSecondDegreePrice = getCoursebyCourseSecondDegreePrice(coursebyCourseFirstDegreeSpeed)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* 1. CLIENT INFORMATION */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">1. 客户信息</h2>

          <FormField
            control={form.control}
            name="firmName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>公司/个人名称</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* TODO： Make it optional, only required if need mail address */}
          <FormField
            control={form.control}
            name="streetAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>街道地址</FormLabel>
                <FormControl>
                  <Input placeholder="1234 Main St" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="streetAddress2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  街道地址 2
                  <span className="text-sm text-gray-500 ml-2">(可选)</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Apartment, suite, unit, etc." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>城市</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>州</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="选择州" />
                    </SelectTrigger>
                    <SelectContent>
                      {US_STATES.map((state) => (
                        <SelectItem
                          key={state.value}
                          value={state.value}
                        >
                          {state.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="zipCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>邮编</FormLabel>
                <FormControl>
                  <Input
                    placeholder="12345"
                    maxLength={10}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>电话号码</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="123-456-7890"
                      {...field}
                      onChange={(e) => {
                        // 自动格式化电话号码
                        const value = e.target.value.replace(/\D/g, '')
                        if (value.length <= 10) {
                          const formatted = value.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')
                          field.onChange(formatted)
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fax"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    传真号码
                    <span className="text-sm text-gray-500 ml-2">(可选)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="123-456-7890"
                      {...field}
                      onChange={(e) => {
                        // 自动格式化传真号码
                        const value = e.target.value.replace(/\D/g, '')
                        if (value.length <= 10) {
                          const formatted = value.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')
                          field.onChange(formatted)
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>电子邮箱</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="purpose"
            render={({ field }) => (
              <FormItem>
                <FormLabel>评估目的</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="选择评估目的" />
                  </SelectTrigger>
                  <SelectContent>
                    {PURPOSE_OPTIONS.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {form.watch("purpose") === "other" && (
            <FormField
              control={form.control}
              name="purposeOther"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="请说明其他评估目的"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        {/* 2. INFORMATION OF INDIVIDUAL TO BE EVALUATED */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">2. 待评估人员信息</h2>

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                {/* TODO: Only keep Mr. and Mrs. */}
                <FormLabel>称谓</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="选择称谓" />
                  </SelectTrigger>
                  <SelectContent>
                    {TITLE_OPTIONS.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Add name fields in a row */}
          <div className="grid grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>名</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>姓</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="middleName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    中间名
                    <span className="text-sm text-gray-500 ml-2">(可选)</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* 添加生择 */}
          <div className="space-y-2">
            <FormLabel>出生日期</FormLabel>
            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="dateOfBirth.month"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="月" />
                      </SelectTrigger>
                      <SelectContent>
                        {MONTH_OPTIONS.map((month) => (
                          <SelectItem
                            key={month.value}
                            value={month.value}
                          >
                            {month.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dateOfBirth.date"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={!selectedMonth}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="日" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedMonth ?
                          getDaysInMonth(selectedMonth, selectedYear || new Date().getFullYear().toString()).map((day) => (
                            <SelectItem
                              key={day.value}
                              value={day.value}
                            >
                              {day.label}
                            </SelectItem>
                          ))
                          : null
                        }
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dateOfBirth.year"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="年" />
                      </SelectTrigger>
                      <SelectContent>
                        {YEAR_OPTIONS.map((year) => (
                          <SelectItem
                            key={year.value}
                            value={year.value}
                          >
                            {year.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name="countryOfStudy"
            render={({ field }) => (
              <FormItem>
                <FormLabel>学习国家</FormLabel>
                <FormControl>
                  <Input
                    placeholder="请输入学习所在国家"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="degreeObtained"
            render={({ field }) => (
              <FormItem>
                <FormLabel>获得的学位</FormLabel>
                <FormControl>
                  <Input
                    placeholder="例如：Bachelor of Science"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="schoolName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>学校名称</FormLabel>
                <FormControl>
                  <Input
                    placeholder="请输入学校全称"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-2">
            <FormLabel>学习时间</FormLabel>
            <div className="grid grid-cols-2 gap-4">
              {/* 入学时间 */}
              <div className="space-y-2">
                <FormLabel className="text-sm text-gray-500">入学时间</FormLabel>
                <div className="grid grid-cols-2 gap-2">
                  <FormField
                    control={form.control}
                    name="studyDuration.startDate.month"
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="月" />
                          </SelectTrigger>
                          <SelectContent>
                            {MONTH_OPTIONS.map((month) => (
                              <SelectItem
                                key={month.value}
                                value={month.value}
                              >
                                {month.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="studyDuration.startDate.year"
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="年" />
                          </SelectTrigger>
                          <SelectContent>
                            {YEAR_OPTIONS.map((year) => (
                              <SelectItem
                                key={year.value}
                                value={year.value}
                              >
                                {year.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* 毕业时间 */}
              <div className="space-y-2">
                <FormLabel className="text-sm text-gray-500">毕业时间</FormLabel>
                <div className="grid grid-cols-2 gap-2">
                  <FormField
                    control={form.control}
                    name="studyDuration.endDate.month"
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="月" />
                          </SelectTrigger>
                          <SelectContent>
                            {MONTH_OPTIONS.map((month) => (
                              <SelectItem
                                key={month.value}
                                value={month.value}
                              >
                                {month.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="studyDuration.endDate.year"
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="年" />
                          </SelectTrigger>
                          <SelectContent>
                            {YEAR_OPTIONS.map((year) => (
                              <SelectItem
                                key={year.value}
                                value={year.value}
                              >
                                {year.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Document Submission Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">3. DOCUMENT SUBMISSION</h2>
          <div className="space-y-4 text-sm">
            <p>
              Company/attorney/individuals may submit documents along this application form via email to{' '}
              <a href="mailto:info@aet21.com" className="text-blue-600 hover:underline">
                info@aet21.com
              </a>
              , or via fax to (954) 644-7787 (Headquarter), or via email to{' '}
              <a href="mailto:ca2@aet21.com" className="text-blue-600 hover:underline">
                ca2@aet21.com
              </a>
              {' '}(California Office), or via email to{' '}
              <a href="mailto:boston@aet21.com" className="text-blue-600 hover:underline">
                boston@aet21.com
              </a>
              {' '}(Boston Office), or via email to{' '}
              <a href="mailto:nyc@aet21.com" className="text-blue-600 hover:underline">
                nyc@aet21.com
              </a>
              {' '}(New York Office).
            </p>
            <p className="text-gray-600">
              Applications should arrive before 1:00PM EST in order to be processed the same day.
              Applications that arrive after 1:00PM EST will be processed the next business day.
              Application would be processed after payment is cleared.
            </p>
          </div>
        </div>

        {/* 4. SERVICE SELECTION */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">4. Type of Service</h2>
          <p className="text-sm text-gray-500">
            Actual prices may vary. All prices in this document are only for your reference purpose.
            AET offices will give you an official quote / price based on your specific situation and requests.
          </p>

          <div className="space-y-8">
            {/* Educational Foreign Credential Evaluation Report Section */}
            <div className="space-y-4">
              <h3 className="font-medium">1) Educational Foreign Credential Evaluation Report (document-by-document)</h3>

              {/* First Degree */}
              <div className="space-y-4 pl-6">
                <h4 className="font-medium">a) First Degree</h4>
                <FormField
                  control={form.control}
                  name="serviceType.firstDegree.speed"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-2"
                        >
                          {FCE_FIRST_DEGREE.map((service) => (
                            <FormItem
                              key={service.value}
                              className="flex items-center space-x-3 space-y-0"
                            >
                              <FormControl>
                                <RadioGroupItem value={service.value} />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {service.label}
                                <span className="ml-2 text-gray-500">
                                  ${service.price}
                                </span>
                              </FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Second Degree */}
              <div className="space-y-4 pl-6">
                <h4 className="font-medium">b) Second Degree</h4>
                <div className="flex items-center gap-4">
                  <FormField
                    control={form.control}
                    name="serviceType.secondDegree.quantity"
                    render={({ field }) => (
                      <FormItem className="w-48">
                        <FormLabel>Quantity (${secondDegreePrice}/ea.)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="0"
                            {...field}
                            onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-8">
            {/* Course-by-course Evaluation Section */}
            <div className="space-y-4">
              <h3 className="font-medium">2) Course-by-course Evaluation (including GPA)</h3>
              <p className="text-sm text-gray-500 italic">* Payment and documents must be received by 1:00pm EST.</p>

              {/* First Degree */}
              <div className="space-y-4 pl-6">
                <h4 className="font-medium">a) First Degree</h4>
                <FormField
                  control={form.control}
                  name="serviceType.coursebyCourse.firstDegree.speed"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-2"
                        >
                          {CoursebyCourse_FIRST_DEGREE.map((service) => (
                            <FormItem
                              key={service.value}
                              className="flex items-center space-x-3 space-y-0"
                            >
                              <FormControl>
                                <RadioGroupItem value={service.value} />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {service.label}
                                <span className="ml-2 text-gray-500">
                                  ${service.price}
                                </span>
                              </FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Second Degree */}
              <div className="space-y-4 pl-6">
                <h4 className="font-medium">b) Second Degree</h4>
                <div className="flex items-center gap-4">
                  <FormField
                    control={form.control}
                    name="serviceType.coursebyCourse.secondDegree.quantity"
                    render={({ field }) => (
                      <FormItem className="w-48">
                        <FormLabel>Quantity (${coursebyCourseSecondDegreePrice}/ea.)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="0"
                            {...field}
                            onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-medium">3) Professional Experience Evaluation</h3>

            <div className="space-y-4 pl-6">
              <FormField
                control={form.control}
                name="serviceType.professionalExperience.speed"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-2"
                      >
                        {PROFESSIONAL_EXPERIENCE.map((service) => (
                          <FormItem
                            key={service.value}
                            className="flex items-center space-x-3 space-y-0"
                          >
                            <FormControl>
                              <RadioGroupItem value={service.value} />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {service.label}
                              <span className="ml-2 text-gray-500">
                                ${service.price}
                              </span>
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-medium">4) Position Evaluation</h3>

            <div className="space-y-4 pl-6">
              <FormField
                control={form.control}
                name="serviceType.positionEvaluation.speed"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-2"
                      >
                        {POSITION_EVALUATION.map((service) => (
                          <FormItem
                            key={service.value}
                            className="flex items-center space-x-3 space-y-0"
                          >
                            <FormControl>
                              <RadioGroupItem value={service.value} />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {service.label}
                              <span className="ml-2 text-gray-500">
                                ${service.price}
                              </span>
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-medium">5) Type of Delivery</h3>

            <div className="space-y-4 pl-6">
              <FormField
                control={form.control}
                name="deliveryMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-2"
                      >
                        {DELIVERY_OPTIONS.map((option) => (
                          <FormItem
                            key={option.value}
                            className="flex items-center space-x-3 space-y-0"
                          >
                            <FormControl>
                              <RadioGroupItem value={option.value} />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {option.label}
                              <span className="ml-2 text-gray-500">
                                ${option.price.toFixed(2)}
                              </span>
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        {/* Translation Service Section */}
        <div className="space-y-4">
          <h3 className="font-medium">6) Translation Service</h3>

          <div className="space-y-4 pl-6">
            <FormField
              control={form.control}
              name="serviceType.translation.required"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Translation
                      <span className="ml-2 text-sm text-gray-500">
                        (Per the quote provided upon request)
                      </span>
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Additional Service Section */}
        <div className="space-y-4">
          <h3 className="font-medium">7) Additional Service</h3>

          <div className="space-y-4 pl-6">
            <FormField
              control={form.control}
              name="additionalServices"
              render={() => (
                <FormItem>
                  <div className="space-y-2">
                    {ADDITIONAL_SERVICES.map((service) => (
                      <FormField
                        key={service.id}
                        control={form.control}
                        name="additionalServices"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={service.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(service.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, service.id])
                                      : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== service.id
                                        )
                                      )
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {service.label}
                                <span className="ml-2 text-gray-500">
                                  ${service.price.toFixed(2)} Each
                                </span>
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button type="submit" className="w-full">提交申请</Button>
      </form>
    </Form>
  )
}
