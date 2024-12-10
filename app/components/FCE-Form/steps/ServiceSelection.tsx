"use client"

import { useFormContext } from "react-hook-form"
import { Card, CardContent } from "@/app/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group"
import { Label } from "@/app/components/ui/label"
import { Input } from "@/app/components/ui/input"
import {
  DELIVERY_OPTIONS,
  ADDITIONAL_SERVICES,
  EVALUATION_SERVICES
} from "../constants"

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

          {/* Foreign Credential Evaluation Report */}
          <div className="mb-6">
            <h4 className="font-medium mb-3">Foreign Credential Evaluation Report (Document-by-Document)</h4>
            <RadioGroup
              className="grid grid-cols-2 gap-4"
              {...register("serviceType.foreignCredentialEvaluation.firstDegree.speed")}
            >
              {Object.entries(EVALUATION_SERVICES.FOREIGN_CREDENTIAL.FIRST_DEGREE).map(([value, service]) => (
                <div key={value} className="flex items-center space-x-2">
                  <RadioGroupItem value={value} id={`first-degree-${value}`} />
                  <Label
                    htmlFor={`first-degree-${value}`}
                    className="flex justify-between w-full"
                  >
                    <div className="flex-1">{renderLabel(service.label, value)}</div>
                    <div className="w-20 text-left text-muted-foreground">
                      ${service.price}
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>

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
          </div>

          {/* Course-by-Course Evaluation */}
          <div className="mb-6">
            <h4 className="font-medium mb-3">Course-by-Course Evaluation (Including GPA)</h4>
            <RadioGroup
              className="grid grid-cols-2 gap-4"
              {...register("serviceType.coursebyCourse.firstDegree.speed")}
            >
              {Object.entries(EVALUATION_SERVICES.COURSE_BY_COURSE.FIRST_DEGREE).map(([value, service]) => (
                <div key={value} className="flex items-center space-x-2">
                  <RadioGroupItem value={value} id={`course-${value}`} />
                  <Label
                    htmlFor={`course-${value}`}
                    className="flex justify-between w-full"
                  >
                    <div className="flex-1">{renderLabel(service.label, value)}</div>
                    <div className="w-20 text-left text-muted-foreground">
                      ${service.price}
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>

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
          </div>

          {/* Professional Experience Evaluation */}
          <div className="mb-6">
            <h4 className="font-medium mb-3">Professional Experience Evaluation</h4>
            <RadioGroup
              className="grid grid-cols-2 gap-4"
              {...register("serviceType.professionalExperience.speed")}
            >
              {Object.entries(EVALUATION_SERVICES.PROFESSIONAL_EXPERIENCE).map(([value, service]) => (
                <div key={value} className="flex items-center space-x-2">
                  <RadioGroupItem value={value} id={`prof-exp-${value}`} />
                  <Label
                    htmlFor={`prof-exp-${value}`}
                    className="flex justify-between w-full"
                  >
                    <div className="flex-1">{renderLabel(service.label, value)}</div>
                    <div className="w-20 text-left text-muted-foreground">
                      ${service.price}
                    </div>
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
              {Object.entries(EVALUATION_SERVICES.POSITION).map(([value, service]) => (
                <div key={value} className="flex items-center space-x-2">
                  <RadioGroupItem value={value} id={`pos-eval-${value}`} />
                  <Label
                    htmlFor={`pos-eval-${value}`}
                    className="flex justify-between w-full"
                  >
                    <div className="flex-1">{renderLabel(service.label, value)}</div>
                    <div className="w-20 text-left text-muted-foreground">
                      ${service.price}
                    </div>
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

      {/* Type of Delivery - Optional */}
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
                  <div className="flex-1">{label}</div>
                  <div className="w-20 text-left text-muted-foreground">
                    ${price}
                  </div>
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
            {Object.entries(ADDITIONAL_SERVICES).map(([value, service]) => (
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
