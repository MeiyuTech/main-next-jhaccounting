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

const formSchema = z.object({
    // 1. CLIENT INFORMATION
    firmName: z.string().min(2, { message: "请输入公司/个人名称" }),
    address: z.string().min(2, { message: "请输入地址" }),
    cityStateZip: z.string().min(2, { message: "请输入城市/州/邮编" }),
    phone: z.string().min(2, { message: "请输入电话号码" }),
    fax: z.string().optional(),
    email: z.string().email({ message: "请输入有效的邮箱地址" }),
    purpose: z.enum(["immigration", "employment", "education", "other"]),
    purposeOther: z.string().optional(),

    // 2. INFORMATION OF INDIVIDUAL TO BE EVALUATED
    title: z.enum(["Mr.", "Ms."]),
    firstName: z.string().min(1, { message: "请输入名字" }),
    lastName: z.string().min(1, { message: "请输入姓氏" }),
    middleName: z.string().optional(),
    gender: z.enum(["male", "female"]),
    dateOfBirth: z.object({
        month: z.string(),
        date: z.string(),
        year: z.string(),
    }),
    countryOfStudy: z.string().min(1, { message: "请输入学习国家" }),
    degreeObtained: z.string().min(1, { message: "请输入获得的学位" }),
    schoolName: z.string().min(1, { message: "请输入学校名称" }),
    studyDuration: z.string().min(1, { message: "请输入学习时长" }),

    // 4. SERVICE SELECTION
    serviceType: z.enum([
        "7day",
        "3day",
        "24hour",
        "sameday"
    ]),
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

export default function UserForm() {
    const { toast } = useToast()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "Mr.",
            gender: "male",
            purpose: "education",
            serviceType: "7day",
            deliveryMethod: "usps_domestic",
            additionalServices: [],
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        toast({
            title: "申请已提交",
            description: "我们将尽快处理您的申请",
        })
    }

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

                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>地址</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Add other client information fields... */}
                </div>

                {/* 2. INFORMATION OF INDIVIDUAL TO BE EVALUATED */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">2. 待评估人员信息</h2>

                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>称谓</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex flex-row space-x-4"
                                    >
                                        <FormItem className="flex items-center space-x-2">
                                            <RadioGroupItem value="Mr." />
                                            <FormLabel className="font-normal">Mr.</FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-2">
                                            <RadioGroupItem value="Ms." />
                                            <FormLabel className="font-normal">Ms.</FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
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
                                    <FormLabel>中间名</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Add other evaluation information fields... */}
                </div>

                {/* 4. SERVICE SELECTION */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">4. 服务选择</h2>

                    <FormField
                        control={form.control}
                        name="serviceType"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>服务类型</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex flex-col space-y-2"
                                    >
                                        <FormItem className="flex items-center space-x-2">
                                            <RadioGroupItem value="7day" />
                                            <FormLabel className="font-normal">7个工作日服务 ($100)</FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-2">
                                            <RadioGroupItem value="3day" />
                                            <FormLabel className="font-normal">3个工作日服务 ($150)</FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-2">
                                            <RadioGroupItem value="24hour" />
                                            <FormLabel className="font-normal">24小时服务 ($200)</FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-2">
                                            <RadioGroupItem value="sameday" />
                                            <FormLabel className="font-normal">当日服务 ($250)</FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Button type="submit" className="w-full">提交申请</Button>
            </form>
        </Form>
    )
} 