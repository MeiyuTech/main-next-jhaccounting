"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/app/components/ui/button"
import { Form } from "@/app/components/ui/form"
import { useToast } from "@/hooks/use-toast"
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
    submitForm
  } = useFormStore()

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: formData as FormData,
  })

  // Save draft when form data changes
  useEffect(() => {
    const subscription = form.watch((value) => {
      setFormData(value as Partial<FormData>)
      // Can add debounce to reduce save frequency
      saveDraft()
    })
    return () => subscription.unsubscribe()
  }, [form.watch, setFormData, saveDraft])

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
        return ["title", "firstName", "lastName", "dateOfBirth", "countryOfStudy"]
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

        {draftId && (
          <p className="text-sm text-gray-500 text-center">
            草稿已保存 (ID: {draftId})
          </p>
        )}
      </form>
    </Form>
  )
}
