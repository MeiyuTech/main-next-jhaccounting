"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { RotateCcw } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from "@/hooks/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/app/components/ui/alert-dialog"
import { Button } from "@/app/components/ui/button"
import { Form } from "@/app/components/ui/form"
import { FormStep, FormData } from "./types"
import { formSchema } from "./schema"
import { StepIndicator } from "./StepIndicator"
import { useFormStore } from "./store"
import { ClientInfo } from "./steps/ClientInfo"
import { EvalueeInfo } from "./steps/EvalueeInfo"
import { ServiceSelection } from "./steps/ServiceSelection"
import { Review } from "./steps/Review"

// Import other step components...

export default function FCEForm() {
  const { toast } = useToast()
  const {
    formData,
    currentStep,
    draftId,
    isLoading,
    isSaving,
    setFormData,
    setCurrentStep,
    saveDraft,
    submitForm,
    resetForm
  } = useFormStore()

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: formData as FormData,
  })

  // Load saved form data when component mounts
  useEffect(() => {
    const savedData = localStorage.getItem('fce-form-data')
    const savedStep = localStorage.getItem('fce-form-step')

    if (savedData) {
      const parsedData = JSON.parse(savedData) as Partial<FormData>
      setFormData(parsedData)
      form.reset(parsedData as FormData)
    }

    if (savedStep) {
      setCurrentStep(Number(savedStep))
    }
  }, [])

  // Save form data when it changes
  useEffect(() => {
    const subscription = form.watch((value) => {
      setFormData(value as Partial<FormData>)
      localStorage.setItem('fce-form-data', JSON.stringify(value))
      localStorage.setItem('fce-form-step', currentStep.toString())
      saveDraft()
    })
    return () => subscription.unsubscribe()
  }, [form.watch, setFormData, saveDraft, currentStep])

  // Render component based on current step
  const renderStep = () => {
    switch (currentStep) {
      case FormStep.CLIENT_INFO:
        return <ClientInfo />
      case FormStep.EVALUEE_INFO:
        return <EvalueeInfo />
      case FormStep.SERVICE_SELECTION:
        return <ServiceSelection />
      case FormStep.REVIEW:
        return <Review />
      default:
        return null
    }
  }

  const handleNext = async () => {
    // Get fields to validate based on current step
    const fieldsToValidate = getFieldsToValidate(currentStep)

    // Validate fields
    const isValid = await form.trigger(fieldsToValidate)

    if (isValid) {
      console.log('Current form data:', form.getValues())
      setCurrentStep(currentStep + 1)
      await saveDraft()
    }
  }

  // Helper function: Return fields to validate based on step
  const getFieldsToValidate = (step: FormStep): (keyof FormData)[] => {
    switch (step) {
      case FormStep.CLIENT_INFO:
        return ["firmName", "streetAddress", "city", "state", "zipCode", "phone", "email", "purpose"]
      case FormStep.EVALUEE_INFO:
        return ["title", "firstName", "lastName", "dateOfBirth", "educations"]
      // ... fields for other steps
      default:
        return []
    }
  }

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1)
  }

  const onSubmit = async (data: FormData) => {
    try {
      await submitForm()
      toast({
        title: "申请已提交",
        description: "我们将尽快处理您的申请",
      })
    } catch (error) {
      toast({
        title: "提交失败",
        description: "请稍后重试",
        variant: "destructive",
      })
    }
  }

  // Add this new function to handle step navigation
  const handleStepClick = async (targetStep: FormStep) => {
    // Don't do anything if clicking current step
    if (targetStep === currentStep) return

    // If going backwards, allow direct navigation without validation
    if (targetStep < currentStep) {
      setCurrentStep(targetStep)
      return
    }

    // If going forwards, validate current step first
    const currentFields = getFieldsToValidate(currentStep)
    const isCurrentStepValid = await form.trigger(currentFields)

    if (!isCurrentStepValid) {
      toast({
        title: "请完成当前步骤",
        description: "请先填写完必填项",
        variant: "destructive",
      })
      return
    }

    // If current step is valid, allow navigation
    setCurrentStep(targetStep)
  }

  // Add reset handler
  const handleReset = () => {
    resetForm()
    // Reset React Hook Form with empty values
    form.reset({
      firmName: "",
      streetAddress: "",
      streetAddress2: "",
      city: "",
      state: "",
      zipCode: "",
      phone: "",
      fax: "",
      email: "",
      purpose: undefined,
      purposeOther: "",
      title: undefined,
      firstName: "",
      lastName: "",
      middleName: "",
      dateOfBirth: {
        month: "",
        date: "",
        year: "",
      },
      educations: [{
        countryOfStudy: "",
        degreeObtained: "",
        schoolName: "",
        studyDuration: {
          startDate: { month: "", year: "" },
          endDate: { month: "", year: "" }
        }
      }],
      country: "",
      serviceType: {
        foreignCredentialEvaluation: {
          firstDegree: { speed: undefined },
          secondDegrees: 0
        },
        coursebyCourse: {
          firstDegree: { speed: undefined },
          secondDegrees: 0
        },
        professionalExperience: { speed: undefined },
        positionEvaluation: { speed: undefined },
        translation: { required: false }
      },
      deliveryMethod: undefined,
      additionalServices: [],
      additionalServicesQuantity: {
        extra_copy: 0,
        pdf_with_hard_copy: 0,
        pdf_only: 0,
      }
    })
    toast({
      title: "表单已重置",
      description: "您可以重新开始填写申请表",
    })
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <StepIndicator
          currentStep={currentStep}
          onStepClick={handleStepClick}
        />

        {renderStep()}

        <div className="flex justify-between mt-8">
          <Button
            type="button"
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === FormStep.CLIENT_INFO}
          >
            上一步
          </Button>

          <div className="flex gap-2">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  重新申请
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>确定要重新申请吗？</AlertDialogTitle>
                  <AlertDialogDescription>
                    此操作将清空所有已填写的信息，您需要重新开始填写申请表。此操作无法撤销。
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>取消</AlertDialogCancel>
                  <AlertDialogAction onClick={handleReset}>
                    确定重置
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            {currentStep === FormStep.REVIEW ? (
              <Button type="submit" disabled={isSaving}>
                {isSaving ? "提交中..." : "提交申请"}
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleNext}
                disabled={isSaving}
              >
                {isSaving ? "保存中..." : "下一步"}
              </Button>
            )}
          </div>
        </div>

        {draftId && (
          <p className="text-sm text-gray-500 text-center">
            草稿已保存 (ID: {draftId})
          </p>
        )}
      </form>
    </Form>
  )
}
