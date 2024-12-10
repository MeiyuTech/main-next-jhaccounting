"use client"

import { useFormContext } from "react-hook-form"
import { SERVICE_SPEED_OPTIONS } from "../schema"
import { Card, CardContent } from "@/app/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group"
import { Label } from "@/app/components/ui/label"
import { cn } from "@/lib/utils"

const DELIVERY_OPTIONS = {
  usps_domestic: {
    label: "USPS First Class Mail (Domestic)",
    price: "Free"
  },
  usps_international: {
    label: "USPS First Class Mail (International)",
    price: "$10"
  },
  usps_priority_domestic: {
    label: "USPS Priority Mail (Domestic)",
    price: "$15"
  },
  usps_express_domestic: {
    label: "USPS Express Mail (Domestic)",
    price: "$35"
  },
  ups_express_domestic: {
    label: "UPS Express (Domestic)",
    price: "$45"
  },
  usps_express_international: {
    label: "USPS Express Mail (International)",
    price: "$55"
  },
  fedex_express_international: {
    label: "FedEx Express (International)",
    price: "$75"
  }
} as const

const ADDITIONAL_SERVICES = {
  extra_copy: {
    label: "Extra Copy of Evaluation Report",
    price: "$25/copy"
  },
  pdf_with_hard_copy: {
    label: "PDF Copy with Hard Copy",
    price: "$15"
  },
  pdf_only: {
    label: "PDF Copy Only",
    price: "$10"
  }
} as const

export function ServiceSelection() {
  const { register, watch, formState: { errors } } = useFormContext()

  const renderLabel = (label: string, value: string) => {
    const needsNote = value === "24hour" || value === "sameday"
    return <span>{label}{needsNote && '*'}</span>
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-4">Document Evaluation Service</h3>
          {errors.serviceType && (
            <p className="text-sm text-destructive mb-4">
              Please select at least one evaluation service
            </p>
          )}

          {/* Educational Foreign Credential Evaluation Report */}
          <div className="mb-6">
            <h4 className="font-medium mb-3">Educational Foreign Credential Evaluation Report (document-by-document)</h4>
            <RadioGroup
              className="grid grid-cols-2 gap-4"
              {...register("serviceType.firstDegree.speed")}
            >
              {Object.entries(SERVICE_SPEED_OPTIONS.firstDegree).map(([value, label]) => (
                <div key={value} className="flex items-center space-x-2">
                  <RadioGroupItem value={value} id={`first-degree-${value}`} />
                  <Label
                    htmlFor={`first-degree-${value}`}
                    className="flex justify-between w-full"
                  >
                    {renderLabel(label, value)}
                    <span className="text-muted-foreground">
                      {value === "7day" && "$100"}
                      {value === "3day" && "$150"}
                      {value === "24hour" && "$200"}
                      {value === "sameday" && "$250"}
                    </span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Course-by-Course Evaluation */}
          <div className="mb-6">
            <h4 className="font-medium mb-3">Course-by-Course Evaluation (including GPA)</h4>
            <RadioGroup
              className="grid grid-cols-2 gap-4"
              {...register("serviceType.coursebyCourse.firstDegree.speed")}
            >
              {Object.entries(SERVICE_SPEED_OPTIONS.coursebyCourse).map(([value, label]) => (
                <div key={value} className="flex items-center space-x-2">
                  <RadioGroupItem value={value} id={`course-${value}`} />
                  <Label
                    htmlFor={`course-${value}`}
                    className="flex justify-between w-full"
                  >
                    {renderLabel(label, value)}
                    <span className="text-muted-foreground">
                      {value === "8day" && "$150"}
                      {value === "5day" && "$200"}
                      {value === "3day" && "$250"}
                      {value === "24hour" && "$300"}
                    </span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Professional Experience Evaluation */}
          <div className="mb-6">
            <h4 className="font-medium mb-3">Professional Experience Evaluation</h4>
            <RadioGroup
              className="grid grid-cols-2 gap-4"
              {...register("serviceType.professionalExperience.speed")}
            >
              {Object.entries(SERVICE_SPEED_OPTIONS.professionalExperience).map(([value, label]) => (
                <div key={value} className="flex items-center space-x-2">
                  <RadioGroupItem value={value} id={`prof-exp-${value}`} />
                  <Label
                    htmlFor={`prof-exp-${value}`}
                    className="flex justify-between w-full"
                  >
                    <span>{label}</span>
                    <span className="text-muted-foreground">
                      {value === "21day" && "$400"}
                      {value === "7day" && "$500"}
                      {value === "3day" && "$600"}
                    </span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Position Evaluation */}
          <div className="mb-6">
            <h4 className="font-medium mb-3">Position Evaluation</h4>
            <RadioGroup
              className="grid grid-cols-2 gap-4"
              {...register("serviceType.positionEvaluation.speed")}
            >
              {Object.entries(SERVICE_SPEED_OPTIONS.positionEvaluation).map(([value, label]) => (
                <div key={value} className="flex items-center space-x-2">
                  <RadioGroupItem value={value} id={`pos-eval-${value}`} />
                  <Label
                    htmlFor={`pos-eval-${value}`}
                    className="flex justify-between w-full"
                  >
                    <span>{label}</span>
                    <span className="text-muted-foreground">
                      {value === "10day" && "$200"}
                      {value === "5day" && "$250"}
                      {value === "3day" && "$300"}
                      {value === "2day" && "$350"}
                    </span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Translation Service */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium">Translation Service</h4>
              <span className="text-sm text-muted-foreground">(Optional)</span>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="translation-required"
                className="h-4 w-4 rounded border-gray-300"
                {...register("serviceType.translation.required")}
              />
              <Label htmlFor="translation-required" className="flex justify-between w-full">
                <span>Translation Service Required</span>
                <span className="text-muted-foreground">Price varies by document</span>
              </Label>
            </div>
          </div>

          {/* Add note at bottom of card */}
          <div className="mt-6 text-xs text-muted-foreground">
            * Payment and documents must be received by 1:00pm EST.
          </div>
        </CardContent>
      </Card>

      {/* Delivery Method - Optional */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Type of Delivery</h3>
            <span className="text-sm text-muted-foreground">(Optional)</span>
          </div>
          <RadioGroup
            className="space-y-3"
            {...register("deliveryMethod")}
          >
            {Object.entries(DELIVERY_OPTIONS).map(([value, { label, price }]) => (
              <div key={value} className="flex items-center space-x-2">
                <RadioGroupItem value={value} id={`delivery-${value}`} />
                <Label
                  htmlFor={`delivery-${value}`}
                  className="flex justify-between w-full"
                >
                  <span>{label}</span>
                  <span className="text-muted-foreground">{price}</span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Additional Services - Optional */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Additional Services</h3>
            <span className="text-sm text-muted-foreground">(Optional)</span>
          </div>
          <div className="space-y-3">
            {Object.entries(ADDITIONAL_SERVICES).map(([value, { label, price }]) => (
              <div key={value} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={`additional-${value}`}
                  className="h-4 w-4 rounded border-gray-300"
                  {...register("additionalServices")}
                  value={value}
                />
                <Label
                  htmlFor={`additional-${value}`}
                  className="flex justify-between w-full"
                >
                  <span>{label}</span>
                  <span className="text-muted-foreground">{price}</span>
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
