"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { Checkbox } from "@/app/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { FormStep, FormData } from "./types"
import { formSchema } from "./schema"
import { StepIndicator } from "./StepIndicator"
import { PURPOSE_OPTIONS, US_STATES, TITLE_OPTIONS, MONTH_OPTIONS, YEAR_OPTIONS } from "./constants"
import { FCE_FIRST_DEGREE, COURSE_BY_COURSE_FIRST_DEGREE, PROFESSIONAL_EXPERIENCE, POSITION_EVALUATION, DELIVERY_OPTIONS, ADDITIONAL_SERVICES } from "./constants"

export default function FCEForm() {
    const [currentStep, setCurrentStep] = useState<FormStep>(FormStep.CLIENT_INFO)
    const { toast } = useToast()

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firmName: "",
            streetAddress: "",
            streetAddress2: "",
            city: "",
            state: "CA",
            zipCode: "",
            phone: "",
            fax: "",
            email: "",
            purpose: "education",
            purposeOther: "",

            title: "mr",
            firstName: "",
            lastName: "",
            middleName: "",
            gender: "male",
            dateOfBirth: {
                month: "",
                date: "",
                year: "",
            },
            countryOfStudy: "",
            degreeObtained: "",
            schoolName: "",
            studyDuration: {
                startDate: {
                    month: "",
                    year: "",
                },
                endDate: {
                    month: "",
                    year: "",
                },
            },

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
        },
    })

    // 根据当前步骤渲染相应的表单字段
    const renderFormFields = () => {
        switch (currentStep) {
            case FormStep.CLIENT_INFO:
                return (
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold">客户信息</h2>

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
                )
            case FormStep.EVALUEE_INFO:
                return (
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold">评估对象信息</h2>

                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
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

                        <FormField
                            control={form.control}
                            name="gender"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel>性别</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex flex-row space-x-4"
                                        >
                                            <FormItem className="flex items-center space-x-2">
                                                <FormControl>
                                                    <RadioGroupItem value="male" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    男
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-2">
                                                <FormControl>
                                                    <RadioGroupItem value="female" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    女
                                                </FormLabel>
                                            </FormItem>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* 出生日期 */}
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
                                                disabled={!form.watch("dateOfBirth.month")}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="日" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {Array.from({ length: 31 }, (_, i) => {
                                                        const day = String(i + 1).padStart(2, '0')
                                                        return (
                                                            <SelectItem key={day} value={day}>
                                                                {day}
                                                            </SelectItem>
                                                        )
                                                    })}
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

                        {/* 学习信息 */}
                        <FormField
                            control={form.control}
                            name="countryOfStudy"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>学习国家</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
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
                                        <Input placeholder="例如：Bachelor of Science" {...field} />
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
                                        <Input placeholder="请输入学校全称" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* 学习时间 */}
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
                )
            case FormStep.SERVICE_SELECTION:
                return (
                    <div className="space-y-8">
                        <h2 className="text-xl font-semibold">服务选择</h2>
                        <p className="text-sm text-gray-500">
                            实际价格可能会有所变动。此处显示的所有价格仅供参考。
                            AET 办公室将根据您的具体情况和要求提供正式报价。
                        </p>

                        {/* 1. Educational Foreign Credential Evaluation Report */}
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
                                <FormField
                                    control={form.control}
                                    name="serviceType.secondDegree.quantity"
                                    render={({ field }) => (
                                        <FormItem className="w-48">
                                            <FormLabel>
                                                Quantity (${form.watch("serviceType.firstDegree.speed") === "7day" ? "30" : "40"}/ea.)
                                            </FormLabel>
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

                        {/* 2. Course-by-course Evaluation */}
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
                                                    {COURSE_BY_COURSE_FIRST_DEGREE.map((service) => (
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
                                <FormField
                                    control={form.control}
                                    name="serviceType.coursebyCourse.secondDegree.quantity"
                                    render={({ field }) => (
                                        <FormItem className="w-48">
                                            <FormLabel>
                                                Quantity (${form.watch("serviceType.coursebyCourse.firstDegree.speed") === "8day" ? "40" : "60"}/ea.)
                                            </FormLabel>
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

                        {/* 3. Professional Experience Evaluation */}
                        <div className="space-y-4">
                            <h3 className="font-medium">3) Professional Experience Evaluation</h3>
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

                        {/* 4. Position Evaluation */}
                        <div className="space-y-4">
                            <h3 className="font-medium">4) Position Evaluation</h3>
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

                        {/* 5. Translation Service */}
                        <div className="space-y-4">
                            <h3 className="font-medium">5) Translation Service</h3>
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

                        {/* 6. Type of Delivery */}
                        <div className="space-y-4">
                            <h3 className="font-medium">6) Type of Delivery</h3>
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

                        {/* 7. Additional Services */}
                        <div className="space-y-4">
                            <h3 className="font-medium">7) Additional Services</h3>
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
                                                    render={({ field }) => (
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
                                                    )}
                                                />
                                            ))}
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                )
            case FormStep.REVIEW:
                return (
                    <div className="space-y-8">
                        <h2 className="text-xl font-semibold">确认信息</h2>

                        {/* 客户信息 */}
                        <div className="space-y-4">
                            <h3 className="font-medium">1. 客户信息</h3>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <div className="font-medium">公司/个人名称</div>
                                    <div>{form.getValues("firmName")}</div>
                                </div>
                                <div>
                                    <div className="font-medium">地址</div>
                                    <div>{form.getValues("streetAddress")}</div>
                                    {form.getValues("streetAddress2") && (
                                        <div>{form.getValues("streetAddress2")}</div>
                                    )}
                                    <div>
                                        {form.getValues("city")}, {form.getValues("state")} {form.getValues("zipCode")}
                                    </div>
                                </div>
                                <div>
                                    <div className="font-medium">联系方式</div>
                                    <div>电话: {form.getValues("phone")}</div>
                                    {form.getValues("fax") && <div>传真: {form.getValues("fax")}</div>}
                                    <div>邮箱: {form.getValues("email")}</div>
                                </div>
                                <div>
                                    <div className="font-medium">评估目的</div>
                                    <div>
                                        {PURPOSE_OPTIONS.find(o => o.value === form.getValues("purpose"))?.label}
                                        {form.getValues("purpose") === "other" && (
                                            <span> - {form.getValues("purposeOther")}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 评估对象信息 */}
                        <div className="space-y-4">
                            <h3 className="font-medium">2. 评估对象信息</h3>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <div className="font-medium">姓名</div>
                                    <div>
                                        {TITLE_OPTIONS.find(o => o.value === form.getValues("title"))?.label}{' '}
                                        {form.getValues("firstName")}{' '}
                                        {form.getValues("middleName")}{' '}
                                        {form.getValues("lastName")}
                                    </div>
                                </div>
                                <div>
                                    <div className="font-medium">性别</div>
                                    <div>{form.getValues("gender") === "male" ? "男" : "女"}</div>
                                </div>
                                <div>
                                    <div className="font-medium">出生日期</div>
                                    <div>
                                        {MONTH_OPTIONS.find(o => o.value === form.getValues("dateOfBirth.month"))?.label}{' '}
                                        {form.getValues("dateOfBirth.date")},{' '}
                                        {form.getValues("dateOfBirth.year")}
                                    </div>
                                </div>
                                <div>
                                    <div className="font-medium">学习信息</div>
                                    <div>国家: {form.getValues("countryOfStudy")}</div>
                                    <div>学位: {form.getValues("degreeObtained")}</div>
                                    <div>学校: {form.getValues("schoolName")}</div>
                                    <div>
                                        学习时间: {form.getValues("studyDuration.startDate.month")}/{form.getValues("studyDuration.startDate.year")} -
                                        {form.getValues("studyDuration.endDate.month")}/{form.getValues("studyDuration.endDate.year")}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 服务选择 */}
                        <div className="space-y-4">
                            <h3 className="font-medium">3. 服务选择</h3>
                            <div className="space-y-6 text-sm">
                                {/* FCE First Degree */}
                                <div>
                                    <div className="font-medium">Educational Foreign Credential Evaluation</div>
                                    <div className="pl-4 space-y-2">
                                        <div>
                                            First Degree: {
                                                FCE_FIRST_DEGREE.find(
                                                    s => s.value === form.getValues("serviceType.firstDegree.speed")
                                                )?.label
                                            } - ${
                                                FCE_FIRST_DEGREE.find(
                                                    s => s.value === form.getValues("serviceType.firstDegree.speed")
                                                )?.price
                                            }
                                        </div>
                                        {form.getValues("serviceType.secondDegree.quantity") > 0 && (
                                            <div>
                                                Second Degree: {form.getValues("serviceType.secondDegree.quantity")} × ${
                                                    form.getValues("serviceType.firstDegree.speed") === "7day" ? "30" : "40"
                                                } = ${
                                                    form.getValues("serviceType.secondDegree.quantity") *
                                                    (form.getValues("serviceType.firstDegree.speed") === "7day" ? 30 : 40)
                                                }
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Course by Course */}
                                <div>
                                    <div className="font-medium">Course-by-course Evaluation</div>
                                    <div className="pl-4 space-y-2">
                                        <div>
                                            First Degree: {
                                                COURSE_BY_COURSE_FIRST_DEGREE.find(
                                                    s => s.value === form.getValues("serviceType.coursebyCourse.firstDegree.speed")
                                                )?.label
                                            } - ${
                                                COURSE_BY_COURSE_FIRST_DEGREE.find(
                                                    s => s.value === form.getValues("serviceType.coursebyCourse.firstDegree.speed")
                                                )?.price
                                            }
                                        </div>
                                        {form.getValues("serviceType.coursebyCourse.secondDegree.quantity") > 0 && (
                                            <div>
                                                Second Degree: {form.getValues("serviceType.coursebyCourse.secondDegree.quantity")} × ${
                                                    form.getValues("serviceType.coursebyCourse.firstDegree.speed") === "8day" ? "40" : "60"
                                                } = ${
                                                    form.getValues("serviceType.coursebyCourse.secondDegree.quantity") *
                                                    (form.getValues("serviceType.coursebyCourse.firstDegree.speed") === "8day" ? 40 : 60)
                                                }
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Professional Experience */}
                                {form.getValues("serviceType.professionalExperience.speed") && (
                                    <div>
                                        <div className="font-medium">Professional Experience Evaluation</div>
                                        <div className="pl-4">
                                            {PROFESSIONAL_EXPERIENCE.find(
                                                s => s.value === form.getValues("serviceType.professionalExperience.speed")
                                            )?.label} - ${
                                                PROFESSIONAL_EXPERIENCE.find(
                                                    s => s.value === form.getValues("serviceType.professionalExperience.speed")
                                                )?.price
                                            }
                                        </div>
                                    </div>
                                )}

                                {/* Position Evaluation */}
                                {form.getValues("serviceType.positionEvaluation.speed") && (
                                    <div>
                                        <div className="font-medium">Position Evaluation</div>
                                        <div className="pl-4">
                                            {POSITION_EVALUATION.find(
                                                s => s.value === form.getValues("serviceType.positionEvaluation.speed")
                                            )?.label} - ${
                                                POSITION_EVALUATION.find(
                                                    s => s.value === form.getValues("serviceType.positionEvaluation.speed")
                                                )?.price
                                            }
                                        </div>
                                    </div>
                                )}

                                {/* Translation Service */}
                                {form.getValues("serviceType.translation.required") && (
                                    <div>
                                        <div className="font-medium">Translation Service</div>
                                        <div className="pl-4">
                                            Price will be quoted upon request
                                        </div>
                                    </div>
                                )}

                                {/* Delivery Method */}
                                <div>
                                    <div className="font-medium">Delivery Method</div>
                                    <div className="pl-4">
                                        {DELIVERY_OPTIONS.find(
                                            o => o.value === form.getValues("deliveryMethod")
                                        )?.label} - ${
                                            DELIVERY_OPTIONS.find(
                                                o => o.value === form.getValues("deliveryMethod")
                                            )?.price.toFixed(2)
                                        }
                                    </div>
                                </div>

                                {/* Additional Services */}
                                {form.getValues("additionalServices").length > 0 && (
                                    <div>
                                        <div className="font-medium">Additional Services</div>
                                        <div className="pl-4 space-y-1">
                                            {form.getValues("additionalServices").map((serviceId) => {
                                                const service = ADDITIONAL_SERVICES.find(s => s.id === serviceId)
                                                return (
                                                    <div key={serviceId}>
                                                        {service?.label} - ${service?.price.toFixed(2)}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                )}

                                {/* Total Price */}
                                <div className="pt-4 border-t">
                                    <div className="font-medium">预估总价: ${calculateTotalPrice()}</div>
                                    <div className="text-xs text-gray-500 mt-1">
                                        * 实际价格可能会有所变动。我们将根据您的具体情况提供正式报价。
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-lg bg-gray-50 p-4 text-sm">
                            <p>请仔细检查以上信息是否正确。提交后，我们将尽快处理您的申请。</p>
                        </div>
                    </div>
                )
        }
    }

    const handleNext = async () => {
        let fieldsToValidate: string[] = []

        // 根据当前步骤确定需要验证的字段
        switch (currentStep) {
            case FormStep.CLIENT_INFO:
                fieldsToValidate = [
                    "firmName", "streetAddress", "city", "state",
                    "zipCode", "phone", "email", "purpose"
                ]
                if (form.watch("purpose") === "other") {
                    fieldsToValidate.push("purposeOther")
                }
                break
            case FormStep.EVALUEE_INFO:
                fieldsToValidate = [
                    "title", "firstName", "lastName", "gender",
                    "dateOfBirth", "countryOfStudy", "degreeObtained",
                    "schoolName", "studyDuration"
                ]
                break
            // ... 其他步骤的字段验证
        }

        const isValid = await form.trigger(fieldsToValidate as (keyof FormData)[])
        if (isValid) {
            setCurrentStep(prev => prev + 1)
        }
    }

    const handlePrevious = () => {
        setCurrentStep(prev => prev - 1)
    }

    const onSubmit = (data: FormData) => {
        console.log(data)
        toast({
            title: "申请已提交",
            description: "我们将尽快处理您的申请",
        })
    }

    const calculateTotalPrice = () => {
        let total = 0

        // FCE First Degree
        const fceFirstDegree = FCE_FIRST_DEGREE.find(
            s => s.value === form.getValues("serviceType.firstDegree.speed")
        )
        if (fceFirstDegree) {
            total += fceFirstDegree.price
            // Second Degree
            total += form.getValues("serviceType.secondDegree.quantity") *
                (form.getValues("serviceType.firstDegree.speed") === "7day" ? 30 : 40)
        }

        // Course by Course
        const courseFirstDegree = COURSE_BY_COURSE_FIRST_DEGREE.find(
            s => s.value === form.getValues("serviceType.coursebyCourse.firstDegree.speed")
        )
        if (courseFirstDegree) {
            total += courseFirstDegree.price
            // Second Degree
            total += form.getValues("serviceType.coursebyCourse.secondDegree.quantity") *
                (form.getValues("serviceType.coursebyCourse.firstDegree.speed") === "8day" ? 40 : 60)
        }

        // Professional Experience
        const profExp = PROFESSIONAL_EXPERIENCE.find(
            s => s.value === form.getValues("serviceType.professionalExperience.speed")
        )
        if (profExp) {
            total += profExp.price
        }

        // Position Evaluation
        const posEval = POSITION_EVALUATION.find(
            s => s.value === form.getValues("serviceType.positionEvaluation.speed")
        )
        if (posEval) {
            total += posEval.price
        }

        // Delivery
        const delivery = DELIVERY_OPTIONS.find(
            o => o.value === form.getValues("deliveryMethod")
        )
        if (delivery) {
            total += delivery.price
        }

        // Additional Services
        form.getValues("additionalServices").forEach(serviceId => {
            const service = ADDITIONAL_SERVICES.find(s => s.id === serviceId)
            if (service) {
                total += service.price
            }
        })

        return total.toFixed(2)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <StepIndicator currentStep={currentStep} />

                {renderFormFields()}

                <div className="flex justify-between mt-8">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handlePrevious}
                        disabled={currentStep === FormStep.CLIENT_INFO}
                    >
                        上一步
                    </Button>

                    {currentStep === FormStep.REVIEW ? (
                        <Button type="submit">提交申请</Button>
                    ) : (
                        <Button type="button" onClick={handleNext}>
                            下一步
                        </Button>
                    )}
                </div>
            </form>
        </Form>
    )
} 