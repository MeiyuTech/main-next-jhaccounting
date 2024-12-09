"use client"

import { useFormContext } from "react-hook-form"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form"
import { Input } from "@/app/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group"
import { Checkbox } from "@/app/components/ui/checkbox"
import { FormData } from "../types"
import {
  FCE_FIRST_DEGREE,
  COURSE_BY_COURSE_FIRST_DEGREE,
  PROFESSIONAL_EXPERIENCE,
  POSITION_EVALUATION,
  DELIVERY_OPTIONS,
  ADDITIONAL_SERVICES
} from "../constants"

export function ServiceSelection() {
  const form = useFormContext<FormData>()

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
                    value={field.value}
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
                    value={field.value}
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
                  value={field.value}
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
                  value={field.value}
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
                  value={field.value}
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
          render={({ field }) => (
            <FormItem>
              <div className="space-y-2">
                {ADDITIONAL_SERVICES.map((service) => (
                  <FormItem
                    key={service.id}
                    className="flex flex-row items-start space-x-3 space-y-0"
                  >
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(service.id)}
                        onCheckedChange={(checked) => {
                          const currentValue = field.value || []
                          return checked
                            ? field.onChange([...currentValue, service.id])
                            : field.onChange(
                              currentValue.filter(
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
                ))}
              </div>
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}
