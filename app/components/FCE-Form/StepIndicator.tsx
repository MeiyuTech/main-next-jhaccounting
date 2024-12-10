import { cn } from "@/lib/utils"
import { FormStep } from "./types"

interface StepIndicatorProps {
  currentStep: FormStep;
  onStepClick: (step: FormStep) => void;
}

export function StepIndicator({ currentStep, onStepClick }: StepIndicatorProps) {
  const steps = [
    { title: "Client Info", step: FormStep.CLIENT_INFO },
    { title: "Evaluee Info", step: FormStep.EVALUEE_INFO },
    { title: "Services", step: FormStep.SERVICE_SELECTION },
    { title: "Review", step: FormStep.REVIEW },
  ]

  return (
    <div className="mb-8">
      {/* Buttons container */}
      <div className="relative w-[80%] mx-auto">
        {/* Background line */}
        <div className="absolute top-5 w-full h-[2px] bg-gray-200" />

        {/* Circles/buttons container */}
        <div className="relative flex justify-between">
          {steps.map((step, index) => (
            <div
              key={step.step}
              className="cursor-pointer"
              onClick={() => onStepClick(step.step)}
            >
              <div
                className={cn(
                  "w-10 h-10 rounded-full border-2 flex items-center justify-center bg-white transition-all duration-200",
                  "hover:shadow-md hover:scale-105",
                  currentStep === step.step && "border-primary bg-primary text-white",
                  currentStep > step.step && "border-primary bg-primary text-white",
                  currentStep < step.step && "border-gray-300 text-gray-500 hover:border-primary/50"
                )}
              >
                {currentStep > step.step ? (
                  <CheckIcon className="h-6 w-6" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Titles container */}
      <div className="flex justify-between w-full mt-2">
        {steps.map((step) => (
          <span
            key={step.step}
            className={cn(
              "text-sm font-medium transition-colors duration-200 text-center flex-1",
              currentStep === step.step && "text-primary",
              currentStep > step.step && "text-primary",
              currentStep < step.step && "text-gray-500"
            )}
          >
            {step.title}
          </span>
        ))}
      </div>
    </div>
  )
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  )
}
