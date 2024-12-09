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
// 导入其他步骤组件...

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

  // 当表单数据变化时保存草稿
  useEffect(() => {
    const subscription = form.watch((value) => {
      setFormData(value as Partial<FormData>)
      // 可以添加防抖来减少保存频率
      saveDraft()
    })
    return () => subscription.unsubscribe()
  }, [form.watch, setFormData, saveDraft])

  // 根据当前步骤渲染相应的组件
  const renderStep = () => {
    switch (currentStep) {
      case FormStep.CLIENT_INFO:
        return <ClientInfo />
      // 其他步骤...
      default:
        return null
    }
  }

  const handleNext = async () => {
    // 根据当前步骤获取需要验证的字段
    const fieldsToValidate = getFieldsToValidate(currentStep)

    // 验证字段
    const isValid = await form.trigger(fieldsToValidate)

    if (isValid) {
      console.log('Current form data:', form.getValues())
      setCurrentStep(currentStep + 1)
      await saveDraft()
    }
  }

  // 辅助函数：根据步骤返回需要验证的字段
  const getFieldsToValidate = (step: FormStep): (keyof FormData)[] => {
    switch (step) {
      case FormStep.CLIENT_INFO:
        return ["firmName", "streetAddress", "city", "state", "zipCode", "phone", "email", "purpose"]
      case FormStep.EVALUEE_INFO:
        return ["title", "firstName", "lastName", "gender", "dateOfBirth", "countryOfStudy"]
      // ... 其他步骤的字段
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

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <StepIndicator currentStep={currentStep} />

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
