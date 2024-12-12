"use client"

import { useFormContext } from "react-hook-form"
import { Card, CardContent } from "@/app/components/ui/card"
import { Label } from "@/app/components/ui/label"
import { Input } from "@/app/components/ui/input"
import { Checkbox } from "@/app/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select"
import {
  DELIVERY_OPTIONS,
  ADDITIONAL_SERVICES,
  EVALUATION_SERVICES
} from "../constants"
import { useEffect } from "react"

export function ServiceSelection() {
  const { register, watch, formState: { errors }, setValue } = useFormContext()

  useEffect(() => {
    const currentValue = watch("deliveryMethod")
    if (!currentValue) {
      setValue("deliveryMethod", "no_delivery_needed")
    }
  }, [])

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

          {/* Foreign Credential Evaluation Report */}
          <div className="mb-6">
            <h4 className="font-medium mb-3">Foreign Credential Evaluation Report (Document-by-Document)</h4>
            <Select
              onValueChange={(value) => {
                setValue("serviceType.foreignCredentialEvaluation.firstDegree.speed", value === "none" ? undefined : value)
              }}
              defaultValue={watch("serviceType.foreignCredentialEvaluation.firstDegree.speed") || "none"}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select service speed" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">
                  <div className="flex justify-between w-full">
                    <span>No evaluation needed</span>
                  </div>
                </SelectItem>
                {Object.entries(EVALUATION_SERVICES.FOREIGN_CREDENTIAL.FIRST_DEGREE).map(([value, service]) => (
                  <SelectItem key={value} value={value}>
                    <div className="flex justify-between w-full">
                      <span>{renderLabel(service.label, value)}</span>
                      <span className="text-muted-foreground ml-4">
                        ${service.price}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {watch("serviceType.foreignCredentialEvaluation.firstDegree.speed") && (
              <div className="mt-4 ml-6">
                <Label>Additional Degrees</Label>
                <Input
                  type="number"
                  min={0}
                  defaultValue={0}
                  className="w-24"
                  {...register("serviceType.foreignCredentialEvaluation.secondDegrees", {
                    valueAsNumber: true,
                    min: 0,
                    value: 0,
                  })}
                />
                <p className="text-sm text-muted-foreground mt-1">
                  {watch("serviceType.foreignCredentialEvaluation.firstDegree.speed") === "7day"
                    ? `$${EVALUATION_SERVICES.FOREIGN_CREDENTIAL.SECOND_DEGREE["7day"].price} per additional degree`
                    : `$${EVALUATION_SERVICES.FOREIGN_CREDENTIAL.SECOND_DEGREE.DEFAULT.price} per additional degree`}
                </p>
              </div>
            )}
          </div>

          {/* Course-by-Course Evaluation */}
          <div className="mb-6">
            <h4 className="font-medium mb-3">Course-by-Course Evaluation (Including GPA)</h4>
            <Select
              onValueChange={(value) => {
                setValue("serviceType.coursebyCourse.firstDegree.speed", value === "none" ? undefined : value)
              }}
              defaultValue={watch("serviceType.coursebyCourse.firstDegree.speed") || "none"}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select service speed" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">
                  <div className="flex justify-between w-full">
                    <span>No evaluation needed</span>
                  </div>
                </SelectItem>
                {Object.entries(EVALUATION_SERVICES.COURSE_BY_COURSE.FIRST_DEGREE).map(([value, service]) => (
                  <SelectItem key={value} value={value}>
                    <div className="flex justify-between w-full">
                      <span>{renderLabel(service.label, value)}</span>
                      <span className="text-muted-foreground ml-4">
                        ${service.price}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {watch("serviceType.coursebyCourse.firstDegree.speed") && (
              <div className="mt-4 ml-6">
                <Label>Additional Degrees</Label>
                <Input
                  type="number"
                  min={0}
                  defaultValue={0}
                  className="w-24"
                  {...register("serviceType.coursebyCourse.secondDegrees", {
                    valueAsNumber: true,
                    min: 0,
                    value: 0,
                  })}
                />
                <p className="text-sm text-muted-foreground mt-1">
                  {watch("serviceType.coursebyCourse.firstDegree.speed") === "8day"
                    ? `$${EVALUATION_SERVICES.COURSE_BY_COURSE.SECOND_DEGREE["8day"].price} per additional degree`
                    : `$${EVALUATION_SERVICES.COURSE_BY_COURSE.SECOND_DEGREE.DEFAULT.price} per additional degree`}
                </p>
              </div>
            )}
          </div>

          {/* Professional Experience Evaluation */}
          <div className="mb-6">
            <h4 className="font-medium mb-3">Professional Experience Evaluation</h4>
            <Select
              onValueChange={(value) => {
                setValue("serviceType.professionalExperience.speed", value === "none" ? undefined : value)
              }}
              defaultValue={watch("serviceType.professionalExperience.speed") || "none"}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select service speed" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">
                  <div className="flex justify-between w-full">
                    <span>No evaluation needed</span>
                  </div>
                </SelectItem>
                {Object.entries(EVALUATION_SERVICES.PROFESSIONAL_EXPERIENCE).map(([value, service]) => (
                  <SelectItem key={value} value={value}>
                    <div className="flex justify-between w-full">
                      <span>{renderLabel(service.label, value)}</span>
                      <span className="text-muted-foreground ml-4">
                        ${service.price}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Position Evaluation */}
          <div className="mb-6">
            <h4 className="font-medium mb-3">Position Evaluation</h4>
            <Select
              onValueChange={(value) => {
                setValue("serviceType.positionEvaluation.speed", value === "none" ? undefined : value)
              }}
              defaultValue={watch("serviceType.positionEvaluation.speed") || "none"}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select service speed" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">
                  <div className="flex justify-between w-full">
                    <span>No evaluation needed</span>
                  </div>
                </SelectItem>
                {Object.entries(EVALUATION_SERVICES.POSITION).map(([value, service]) => (
                  <SelectItem key={value} value={value}>
                    <div className="flex justify-between w-full">
                      <span>{renderLabel(service.label, value)}</span>
                      <span className="text-muted-foreground ml-4">
                        ${service.price}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Translation Service */}
          <div className="mb-6">
            <h4 className="font-medium mb-3">Translation Service</h4>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="translation-required"
                onCheckedChange={(checked) => {
                  setValue("serviceType.translation.required", checked)
                }}
                checked={watch("serviceType.translation.required")}
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

      {/* Type of Delivery */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-4">Type of Delivery</h3>
          <Select
            onValueChange={(value) => {
              setValue("deliveryMethod", value)
            }}
            value={watch("deliveryMethod") || "no_delivery_needed"}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select delivery method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="no_delivery_needed">
                <div className="flex justify-between w-full">
                  <span>No delivery needed</span>
                </div>
              </SelectItem>
              {Object.entries(DELIVERY_OPTIONS).map(([value, { label, price }]) => (
                <SelectItem key={value} value={value}>
                  <div className="flex justify-between w-full">
                    <span>{label}</span>
                    <span className="text-muted-foreground ml-4">
                      ${price}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Additional Services */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-4">Additional Services</h3>
          <div className="space-y-3">
            {Object.entries(ADDITIONAL_SERVICES).map(([value, service]) => (
              <div key={value} className="flex items-center space-x-2">
                <Checkbox
                  id={`additional-${value}`}
                  onCheckedChange={(checked) => {
                    const currentServices = watch("additionalServices") || []
                    if (checked) {
                      setValue("additionalServices", [...currentServices, value])
                    } else {
                      setValue(
                        "additionalServices",
                        currentServices.filter((s: string) => s !== value)
                      )
                    }
                  }}
                  checked={(watch("additionalServices") || []).includes(value)}
                />
                <Label
                  htmlFor={`additional-${value}`}
                  className="flex justify-between w-full"
                >
                  <div className="flex-1">
                    {service.label}
                    {'quantity' in service && (
                      <div className="mt-2">
                        <Input
                          type="number"
                          min={0}
                          defaultValue={0}
                          className="w-24"
                          {...register(`additionalServicesQuantity.${value}`, {
                            valueAsNumber: true,
                            min: 0,
                            value: 0,
                          })}
                        />
                      </div>
                    )}
                  </div>
                  <div className="w-20 text-left text-muted-foreground">
                    {'quantity' in service ? (
                      `$${service.price} each`
                    ) : (
                      `$${service.price}`
                    )}
                  </div>
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
