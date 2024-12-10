"use client"

import { useFormContext } from "react-hook-form"
import { Card, CardHeader, CardTitle, CardContent } from "@/app/components/ui/card"
import { FormData } from "../types"
import {
  PURPOSE_OPTIONS,
  TITLE_OPTIONS,
  EVALUATION_SERVICES,
  DELIVERY_OPTIONS,
  ADDITIONAL_SERVICES,
  getCountryLabel
} from "../constants"

export function Review() {
  const { watch } = useFormContext<FormData>()
  const formData = watch()

  // Calculate total price
  const calculateTotalPrice = () => {
    let total = 0

    if (formData.serviceType) {
      // Foreign Credential Evaluation
      const fceSpeed = formData.serviceType.foreignCredentialEvaluation.firstDegree.speed
      const fceService = fceSpeed && EVALUATION_SERVICES.FOREIGN_CREDENTIAL.FIRST_DEGREE[fceSpeed]
      if (fceService) {
        total += fceService.price

        // Second Degrees
        if (formData.serviceType.foreignCredentialEvaluation.secondDegrees > 0) {
          const secondDegreePrice = fceSpeed === "7day"
            ? EVALUATION_SERVICES.FOREIGN_CREDENTIAL.SECOND_DEGREE["7day"].price
            : EVALUATION_SERVICES.FOREIGN_CREDENTIAL.SECOND_DEGREE.DEFAULT.price

          total += secondDegreePrice * formData.serviceType.foreignCredentialEvaluation.secondDegrees
        }
      }

      // Course by Course
      const cbeSpeed = formData.serviceType.coursebyCourse.firstDegree.speed
      const cbeService = cbeSpeed && EVALUATION_SERVICES.COURSE_BY_COURSE.FIRST_DEGREE[cbeSpeed]
      if (cbeService) {
        total += cbeService.price

        // Second Degrees
        if (formData.serviceType.coursebyCourse.secondDegrees > 0) {
          const secondDegreePrice = cbeSpeed === "8day"
            ? EVALUATION_SERVICES.COURSE_BY_COURSE.SECOND_DEGREE["8day"].price
            : EVALUATION_SERVICES.COURSE_BY_COURSE.SECOND_DEGREE.DEFAULT.price

          total += secondDegreePrice * formData.serviceType.coursebyCourse.secondDegrees
        }
      }

      // Professional Experience
      const profExpSpeed = formData.serviceType.professionalExperience.speed
      const profExpService = profExpSpeed && EVALUATION_SERVICES.PROFESSIONAL_EXPERIENCE[profExpSpeed]
      if (profExpService) {
        total += profExpService.price
      }

      // Position Evaluation
      const posEvalSpeed = formData.serviceType.positionEvaluation.speed
      const posEvalService = posEvalSpeed && EVALUATION_SERVICES.POSITION[posEvalSpeed]
      if (posEvalService) {
        total += posEvalService.price
      }
    }

    // Delivery
    const deliveryService = formData.deliveryMethod && DELIVERY_OPTIONS[formData.deliveryMethod]
    if (deliveryService) {
      total += deliveryService.price
    }

    // Additional Services
    formData.additionalServices?.forEach(serviceId => {
      const service = ADDITIONAL_SERVICES[serviceId]
      if (service) {
        if ('quantity' in service) {
          const quantity = formData.additionalServicesQuantity?.[serviceId] || 0
          total += service.price * quantity
        } else {
          total += service.price
        }
      }
    })

    return total.toFixed(2)
  }

  return (
    <div className="space-y-6">
      {/* Client Information Section */}
      <Card>
        <CardHeader>
          <CardTitle>Client Information</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-2 gap-4">
            <div>
              <dt className="font-medium">Company/Individual Name</dt>
              <dd className="text-muted-foreground">{formData.firmName}</dd>
            </div>

            <div>
              <dt className="font-medium">Country</dt>
              <dd className="text-muted-foreground">{getCountryLabel(formData.country)}</dd>
            </div>

            <div>
              <dt className="font-medium">Street Address</dt>
              <dd className="text-muted-foreground">
                {formData.streetAddress}
                {formData.streetAddress2 && <br />}
                {formData.streetAddress2}
              </dd>
            </div>

            <div>
              <dt className="font-medium">Address</dt>
              <dd className="text-muted-foreground">
                {formData.city ? `${formData.city}, ` : ''}{formData.state || ''} {formData.zipCode || ''}
              </dd>
            </div>

            <div>
              <dt className="font-medium">Phone</dt>
              <dd className="text-muted-foreground">{formData.phone || '未填写'}</dd>
            </div>

            <div>
              <dt className="font-medium">Fax</dt>
              <dd className="text-muted-foreground">{formData.fax || '未填写'}</dd>
            </div>

            <div>
              <dt className="font-medium">Email</dt>
              <dd className="text-muted-foreground">{formData.email || '未填写'}</dd>
            </div>

            <div>
              <dt className="font-medium">Purpose</dt>
              <dd className="text-muted-foreground">
                {PURPOSE_OPTIONS.find(o => o.value === formData.purpose)?.label || '未填写'}
                {formData.purpose === "other" && formData.purposeOther && (
                  <span> - {formData.purposeOther}</span>
                )}
              </dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      {/* Evaluee Information */}
      <Card>
        <CardHeader>
          <CardTitle>Evaluee Information</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-2 gap-4">
            <div>
              <dt className="font-medium">Name</dt>
              <dd className="text-muted-foreground">
                {TITLE_OPTIONS.find(o => o.value === formData.title)?.label || ''}{' '}
                {formData.firstName || ''}{' '}
                {formData.middleName ? `${formData.middleName} ` : ''}{' '}
                {formData.lastName || '未填写'}
              </dd>
            </div>

            <div>
              <dt className="font-medium">Date of Birth</dt>
              <dd className="text-muted-foreground">
                {formData.dateOfBirth ? (
                  `${formData.dateOfBirth.month}/${formData.dateOfBirth.date}/${formData.dateOfBirth.year}`
                ) : (
                  '未填写'
                )}
              </dd>
            </div>

            <div className="col-span-2">
              <dt className="font-medium mb-2">Education Information</dt>
              <dd className="space-y-4">
                {formData.educations.map((education, index) => (
                  <div key={index} className="pl-4 border-l-2 border-muted">
                    <h4 className="font-medium text-sm mb-2">Degree {index + 1}</h4>
                    <dl className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <dt className="text-muted-foreground">Country</dt>
                        <dd>{education.countryOfStudy || '未填写'}</dd>
                      </div>
                      <div>
                        <dt className="text-muted-foreground">Degree</dt>
                        <dd>{education.degreeObtained || '未填写'}</dd>
                      </div>
                      <div>
                        <dt className="text-muted-foreground">School</dt>
                        <dd>{education.schoolName || '未填写'}</dd>
                      </div>
                      <div>
                        <dt className="text-muted-foreground">Study Period</dt>
                        <dd>
                          {education.studyDuration ? (
                            `${education.studyDuration.startDate.month}/${education.studyDuration.startDate.year} -
                             ${education.studyDuration.endDate.month}/${education.studyDuration.endDate.year}`
                          ) : (
                            '未填写'
                          )}
                        </dd>
                      </div>
                    </dl>
                  </div>
                ))}
              </dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      {/* Service Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Selected Services</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Foreign Credential Evaluation */}
          {formData.serviceType?.foreignCredentialEvaluation?.firstDegree?.speed && (
            <div>
              <h4 className="font-medium mb-2">Educational Foreign Credential Evaluation</h4>
              <div className="pl-4 space-y-2">
                {(() => {
                  const speed = formData.serviceType.foreignCredentialEvaluation.firstDegree.speed
                  const service = speed && EVALUATION_SERVICES.FOREIGN_CREDENTIAL.FIRST_DEGREE[speed]
                  return service && (
                    <>
                      <div>
                        First Degree: {service.label} - ${service.price}
                      </div>
                      {formData.serviceType.foreignCredentialEvaluation.secondDegrees > 0 && (
                        <div>
                          Second Degree: {formData.serviceType.foreignCredentialEvaluation.secondDegrees} × ${
                            EVALUATION_SERVICES.FOREIGN_CREDENTIAL.SECOND_DEGREE["7day"].price
                          } = ${
                            EVALUATION_SERVICES.FOREIGN_CREDENTIAL.SECOND_DEGREE["7day"].price *
                            formData.serviceType.foreignCredentialEvaluation.secondDegrees
                          }
                        </div>
                      )}
                    </>
                  )
                })()}
              </div>
            </div>
          )}

          {/* Course by Course */}
          {formData.serviceType?.coursebyCourse?.firstDegree?.speed && (
            <div>
              <div className="font-medium">Course-by-course Evaluation</div>
              <div className="pl-4 space-y-2">
                {(() => {
                  const speed = formData.serviceType.coursebyCourse.firstDegree.speed
                  const service = speed && EVALUATION_SERVICES.COURSE_BY_COURSE.FIRST_DEGREE[speed]
                  return service && (
                    <>
                      <div>
                        First Degree: {service.label} - ${service.price}
                      </div>
                      {formData.serviceType.coursebyCourse.secondDegrees > 0 && (
                        <div>
                          Second Degree: {formData.serviceType.coursebyCourse.secondDegrees} × ${
                            EVALUATION_SERVICES.COURSE_BY_COURSE.SECOND_DEGREE["8day"].price
                          } = ${
                            EVALUATION_SERVICES.COURSE_BY_COURSE.SECOND_DEGREE["8day"].price *
                            formData.serviceType.coursebyCourse.secondDegrees
                          }
                        </div>
                      )}
                    </>
                  )
                })()}
              </div>
            </div>
          )}

          {/* Professional Experience */}
          {formData.serviceType?.professionalExperience?.speed && (
            <div>
              <div className="font-medium">Professional Experience Evaluation</div>
              <div className="pl-4">
                {(() => {
                  const speed = formData.serviceType.professionalExperience.speed
                  const service = speed && EVALUATION_SERVICES.PROFESSIONAL_EXPERIENCE[speed]
                  return service ? `${service.label} - $${service.price}` : null
                })()}
              </div>
            </div>
          )}

          {/* Position Evaluation */}
          {formData.serviceType?.positionEvaluation?.speed && (
            <div>
              <div className="font-medium">Position Evaluation</div>
              <div className="pl-4">
                {(() => {
                  const speed = formData.serviceType.positionEvaluation.speed
                  const service = speed && EVALUATION_SERVICES.POSITION[speed]
                  return service ? `${service.label} - $${service.price}` : null
                })()}
              </div>
            </div>
          )}

          {/* Translation Service */}
          {formData.serviceType?.translation?.required && (
            <div>
              <div className="font-medium">Translation Service</div>
              <div className="pl-4">
                Price will be quoted upon request
              </div>
            </div>
          )}

          {/* Delivery Method */}
          {formData.deliveryMethod && (
            <div>
              <div className="font-medium">Delivery Method</div>
              <div className="pl-4">
                {(() => {
                  const method = formData.deliveryMethod
                  const service = method && DELIVERY_OPTIONS[method]
                  return service ? `${service.label} - $${service.price.toFixed(2)}` : null
                })()}
              </div>
            </div>
          )}

          {/* Additional Services */}
          {formData.additionalServices?.length > 0 && (
            <div>
              <div className="font-medium">Additional Services</div>
              <div className="pl-4 space-y-1">
                {formData.additionalServices.map((serviceId) => {
                  const service = ADDITIONAL_SERVICES[serviceId]
                  if (service) {
                    if (serviceId === 'extra_copy' && 'quantity' in service) {  // 只处理 extra_copy 的数量
                      const quantity = formData.additionalServicesQuantity.extra_copy
                      return (
                        <div key={serviceId}>
                          {service.label} × {quantity} = ${(service.price * quantity).toFixed(2)}
                        </div>
                      )
                    } else {
                      return (
                        <div key={serviceId}>
                          {service.label} - ${service.price.toFixed(2)}
                        </div>
                      )
                    }
                  }
                  return null
                })}
              </div>
            </div>
          )}

          {/* Total Price */}
          <div className="pt-4 border-t">
            <div className="font-medium">Estimated Total: ${calculateTotalPrice()}</div>
            <div className="text-xs text-muted-foreground mt-1">
              * Actual price may vary. We will provide an official quote based on your specific situation.
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="text-sm text-muted-foreground">
          <p>Please review all information carefully. We will process your application as soon as possible after submission.</p>
        </CardContent>
      </Card>
    </div>
  )
}
