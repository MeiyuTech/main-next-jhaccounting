"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { RotateCcw } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
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
  const router = useRouter()
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
    defaultValues: {
      ...formData as FormData,
      deliveryMethod: formData?.deliveryMethod || "no_delivery_needed",
      additionalServices: formData?.additionalServices || [],
      additionalServicesQuantity: formData?.additionalServicesQuantity || {
        extra_copy: 0,
        pdf_with_hard_copy: 0,
        pdf_only: 0,
      },
      educations: formData?.educations || [{
        countryOfStudy: "",
        degreeObtained: "",
        schoolName: "",
        studyDuration: {
          startDate: { month: "", year: "" },
          endDate: { month: "", year: "" }
        }
      }],
    }
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
    // 防止表单提交
    event?.preventDefault()

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
        return ["name", "streetAddress", "city", "region", "zipCode", "phone", "email", "purpose"]
      case FormStep.EVALUEE_INFO:
        return ["pronouns", "firstName", "lastName", "dateOfBirth", "educations"]
      case FormStep.SERVICE_SELECTION:
        return ["serviceType"]
      case FormStep.REVIEW:
        // 在 Review 步骤时验证所有必填字段（不包括可选字段）
        return [
          // Client Info
          "name", "streetAddress", "city", "region", "zipCode", "phone", "email", "purpose",
          // Evaluee Info
          "pronouns", "firstName", "lastName", "dateOfBirth", "educations",
          // Service Selection
          "serviceType"
        ]
      default:
        return []
    }
  }

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1)
  }

  const onSubmit = async (data: FormData) => {
    console.log("Starting form submission...", { currentStep, data })

    if (currentStep !== FormStep.REVIEW) {
      console.log("Not in review step, cannot submit")
      return
    }

    try {
      const isValid = await form.trigger()
      if (!isValid) {
        return
      }

      console.log("Form is valid, submitting data:", data)
      await submitForm()

      // Clear local storage after successful submission
      localStorage.removeItem('fce-form-data')
      localStorage.removeItem('fce-form-step')

      // reset form
      handleComplete()
      setCurrentStep(FormStep.CLIENT_INFO)
      // 修改这里：提交成功后跳转到 checkout 页面
      router.push('/checkout')

    } catch (error) {
      console.error("Submission error:", error)
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again later.",
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
        title: "Please Complete Current Step",
        description: "Please fill in all required fields",
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
      name: "",
      country: "",
      streetAddress: "",
      streetAddress2: "",
      city: "",
      region: "",
      zipCode: "",
      phone: "",
      fax: "",
      email: "",
      purpose: undefined,
      purposeOther: "",
      pronouns: undefined,
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
      title: "Form Reset",
      description: "You can start filling out the application again",
      variant: "destructive",
    })
  }

  // Add complete handler
  const handleComplete = () => {
    console.log("Form complete")
    resetForm()
    // Reset React Hook Form with empty values
    form.reset({
      name: "",
      country: "",
      streetAddress: "",
      streetAddress2: "",
      city: "",
      region: "",
      zipCode: "",
      phone: "",
      fax: "",
      email: "",
      purpose: undefined,
      purposeOther: "",
      pronouns: undefined,
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
      title: "Submitted Successfully",
      description: "Your message has been sent successfully.",
      className: "text-teal-400",
    })
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* // Debugging information
        <div className="text-xs text-gray-400">
          Current Step: {currentStep} (Review = {FormStep.REVIEW})
          <br />
          Form Valid: {String(!Object.keys(form.formState.errors).length)}
          <br />
          Validation Errors: {Object.keys(form.formState.errors).join(', ')}
        </div> */}

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
            Previous
          </Button>

          <div className="flex gap-2">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  className="bg-gray-100 text-red-600 hover:bg-red-200 hover:text-red-700"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset Application
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure you want to reset the application?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action will clear all filled information, and you will need to start filling out the application again. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleReset} className="bg-red-500 text-white hover:bg-red-600">
                    Confirm Reset
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            {currentStep === FormStep.REVIEW ? (
              <Button type="submit" disabled={isSaving}>
                {isSaving ? "Submitting..." : "Submit Application"}
              </Button>
            ) : (
              <Button
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  handleNext()
                }}
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Next"}
              </Button>
            )}
          </div>
        </div>

        {draftId && (
          <p className="text-sm text-gray-500 text-center">
            Draft Saved (ID: {draftId})
          </p>
        )}
      </form>
    </Form>
  )
}
