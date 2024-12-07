import { cn } from "@/lib/utils"
import { FormStep } from "./types"

export function StepIndicator({ currentStep }: { currentStep: FormStep }) {
    const steps = [
        { title: "客户信息", step: FormStep.CLIENT_INFO },
        { title: "评估对象信息", step: FormStep.EVALUEE_INFO },
        { title: "服务选择", step: FormStep.SERVICE_SELECTION },
        { title: "确认信息", step: FormStep.REVIEW },
    ]

    return (
        <div className="mb-8">
            <div className="relative">
                {/* 背景线 */}
                <div className="absolute top-5 left-0 w-full h-[2px] bg-gray-200" />

                {/* 步骤指示器 */}
                <div className="relative flex justify-between">
                    {steps.map((step, index) => (
                        <div key={step.step} className="flex flex-col items-center">
                            {/* 圆圈和连接线 */}
                            <div
                                className={cn(
                                    "w-10 h-10 rounded-full border-2 flex items-center justify-center bg-white",
                                    currentStep === step.step && "border-primary bg-primary text-white",
                                    currentStep > step.step && "border-primary bg-primary text-white",
                                    currentStep < step.step && "border-gray-300 text-gray-500"
                                )}
                            >
                                {currentStep > step.step ? (
                                    <CheckIcon className="h-6 w-6" />
                                ) : (
                                    <span>{index + 1}</span>
                                )}
                            </div>

                            {/* 标题 */}
                            <span
                                className={cn(
                                    "mt-2 text-sm font-medium",
                                    currentStep === step.step && "text-primary",
                                    currentStep > step.step && "text-primary",
                                    currentStep < step.step && "text-gray-500"
                                )}
                            >
                                {step.title}
                            </span>
                        </div>
                    ))}
                </div>
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