"use client"

import { useFormContext } from "react-hook-form"
import { FormData } from "../types"
import {
  PURPOSE_OPTIONS,
  TITLE_OPTIONS,
  FCE_FIRST_DEGREE,
  COURSE_BY_COURSE_FIRST_DEGREE,
  PROFESSIONAL_EXPERIENCE,
  POSITION_EVALUATION,
  DELIVERY_OPTIONS,
  ADDITIONAL_SERVICES,
  getCountryLabel
} from "../constants"
import { Card, CardHeader, CardTitle, CardContent } from "@/app/components/ui/card"

export function Review() {
  const { watch } = useFormContext<FormData>()
  const formData = watch()

  // Calculate total price
  const calculateTotalPrice = () => {
    let total = 0

    if (formData.serviceType) {
      // FCE First Degree
      const fceFirstDegree = FCE_FIRST_DEGREE.find(
        s => s.value === formData.serviceType?.firstDegree?.speed
      )
      if (fceFirstDegree) {
        total += fceFirstDegree.price
        // Second Degree
        if (formData.serviceType.secondDegree?.quantity) {
          total += formData.serviceType.secondDegree.quantity *
            (formData.serviceType.firstDegree?.speed === "7day" ? 30 : 40)
        }
      }

      // Course by Course
      const courseFirstDegree = COURSE_BY_COURSE_FIRST_DEGREE.find(
        s => s.value === formData.serviceType?.coursebyCourse?.firstDegree?.speed
      )
      if (courseFirstDegree) {
        total += courseFirstDegree.price
        // Second Degree
        if (formData.serviceType.coursebyCourse?.secondDegree?.quantity) {
          total += formData.serviceType.coursebyCourse.secondDegree.quantity *
            (formData.serviceType.coursebyCourse.firstDegree?.speed === "8day" ? 40 : 60)
        }
      }

      // Professional Experience
      const profExp = PROFESSIONAL_EXPERIENCE.find(
        s => s.value === formData.serviceType?.professionalExperience?.speed
      )
      if (profExp) {
        total += profExp.price
      }

      // Position Evaluation
      const posEval = POSITION_EVALUATION.find(
        s => s.value === formData.serviceType?.positionEvaluation?.speed
      )
      if (posEval) {
        total += posEval.price
      }
    }

    // Delivery
    const delivery = DELIVERY_OPTIONS.find(
      o => o.value === formData.deliveryMethod
    )
    if (delivery) {
      total += delivery.price
    }

    // Additional Services
    formData.additionalServices?.forEach(serviceId => {
      const service = ADDITIONAL_SERVICES.find(s => s.id === serviceId)
      if (service) {
        total += service.price
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
      <div className="space-y-4">
        <h3 className="font-medium">2. 评估对象信息</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="font-medium">姓名</div>
            <div>
              {TITLE_OPTIONS.find(o => o.value === formData.title)?.label || ''}{' '}
              {formData.firstName || ''}{' '}
              {formData.middleName ? `${formData.middleName} ` : ''}{' '}
              {formData.lastName || '未填写'}
            </div>
          </div>
          <div>
            <div className="font-medium">出生日期</div>
            <div>
              {formData.dateOfBirth ? (
                `${formData.dateOfBirth.month}/${formData.dateOfBirth.date}/${formData.dateOfBirth.year}`
              ) : (
                '未填写'
              )}
            </div>
          </div>
          <div>
            <div className="font-medium">学习信息</div>
            {formData.educations.map((education, index) => (
              <div key={index} className="mt-2">
                <div className="font-medium text-sm text-gray-600">学位 {index + 1}</div>
                <div className="pl-4">
                  <div>国家: {education.countryOfStudy || '未填写'}</div>
                  <div>学位: {education.degreeObtained || '未填写'}</div>
                  <div>学校: {education.schoolName || '未填写'}</div>
                  <div>
                    学习时间: {
                      education.studyDuration ? (
                        `${education.studyDuration.startDate.month}/${education.studyDuration.startDate.year} -
                         ${education.studyDuration.endDate.month}/${education.studyDuration.endDate.year}`
                      ) : (
                        '未填写'
                      )
                    }
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Service Selection */}
      <div className="space-y-4">
        <h3 className="font-medium">3. 服务选择</h3>
        <div className="space-y-6 text-sm">
          {/* FCE First Degree */}
          {formData.serviceType?.firstDegree && (
            <div>
              <div className="font-medium">Educational Foreign Credential Evaluation</div>
              <div className="pl-4 space-y-2">
                <div>
                  First Degree: {
                    FCE_FIRST_DEGREE.find(
                      s => s.value === formData.serviceType?.firstDegree?.speed
                    )?.label
                  } - ${
                    FCE_FIRST_DEGREE.find(
                      s => s.value === formData.serviceType?.firstDegree?.speed
                    )?.price
                  }
                </div>
                {formData.serviceType?.secondDegree?.quantity > 0 && (
                  <div>
                    Second Degree: {formData.serviceType.secondDegree.quantity} × ${
                      formData.serviceType.firstDegree?.speed === "7day" ? "30" : "40"
                    } = ${
                      formData.serviceType.secondDegree.quantity *
                      (formData.serviceType.firstDegree?.speed === "7day" ? 30 : 40)
                    }
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Course by Course */}
          {formData.serviceType?.coursebyCourse?.firstDegree && (
            <div>
              <div className="font-medium">Course-by-course Evaluation</div>
              <div className="pl-4 space-y-2">
                <div>
                  First Degree: {
                    COURSE_BY_COURSE_FIRST_DEGREE.find(
                      s => s.value === formData.serviceType?.coursebyCourse?.firstDegree?.speed
                    )?.label
                  } - ${
                    COURSE_BY_COURSE_FIRST_DEGREE.find(
                      s => s.value === formData.serviceType?.coursebyCourse?.firstDegree?.speed
                    )?.price
                  }
                </div>
                {formData.serviceType?.coursebyCourse?.secondDegree?.quantity > 0 && (
                  <div>
                    Second Degree: {formData.serviceType.coursebyCourse.secondDegree.quantity} × ${
                      formData.serviceType.coursebyCourse.firstDegree?.speed === "8day" ? "40" : "60"
                    } = ${
                      formData.serviceType.coursebyCourse.secondDegree.quantity *
                      (formData.serviceType.coursebyCourse.firstDegree?.speed === "8day" ? 40 : 60)
                    }
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Professional Experience */}
          {formData.serviceType?.professionalExperience?.speed && (
            <div>
              <div className="font-medium">Professional Experience Evaluation</div>
              <div className="pl-4">
                {PROFESSIONAL_EXPERIENCE.find(
                  s => s.value === formData.serviceType?.professionalExperience?.speed
                )?.label} - ${
                  PROFESSIONAL_EXPERIENCE.find(
                    s => s.value === formData.serviceType?.professionalExperience?.speed
                  )?.price
                }
              </div>
            </div>
          )}

          {/* Position Evaluation */}
          {formData.serviceType?.positionEvaluation?.speed && (
            <div>
              <div className="font-medium">Position Evaluation</div>
              <div className="pl-4">
                {POSITION_EVALUATION.find(
                  s => s.value === formData.serviceType?.positionEvaluation?.speed
                )?.label} - ${
                  POSITION_EVALUATION.find(
                    s => s.value === formData.serviceType?.positionEvaluation?.speed
                  )?.price
                }
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
                {DELIVERY_OPTIONS.find(
                  o => o.value === formData.deliveryMethod
                )?.label} - ${
                  DELIVERY_OPTIONS.find(
                    o => o.value === formData.deliveryMethod
                  )?.price.toFixed(2)
                }
              </div>
            </div>
          )}

          {/* Additional Services */}
          {formData.additionalServices?.length > 0 && (
            <div>
              <div className="font-medium">Additional Services</div>
              <div className="pl-4 space-y-1">
                {formData.additionalServices.map((serviceId) => {
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
