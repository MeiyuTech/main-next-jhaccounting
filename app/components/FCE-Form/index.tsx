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
        return ["pronouns", "firstName", "lastName", "dateOfBirth", "educations"]
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
        title: "Application Submitted",
        description: "We will process your application as soon as possible",
      })
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again later",
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
      title: "Form Reset",
      description: "You can start filling out the application again",
      variant: "destructive"
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
                onClick={handleNext}
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
