# FCE Form Component

A multi-step form component for Foreign Credential Evaluation (FCE) applications with state management, validation, and draft saving functionality.

## Features

- Multi-step form wizard interface
- Form state management with Zustand
- Form validation with Zod
- Draft saving functionality
- Price calculation for services
- Bilingual support (English/Chinese)

## Component Structure

FCE-Form/
├── index.tsx # Main form component
├── constants.ts # Form constants and options
├── schema.ts # Zod validation schema
├── store.ts # Zustand state management
├── types.ts # TypeScript definitions
└── steps/ # Form step components
  ├── ClientInfo.tsx # Client information step
  ├── EvalueeInfo.tsx # Evaluee information step
  ├── ServiceSelection.tsx # Service selection step
  └── Review.tsx # Review and submit step

## Form Steps

1. **Client Information** (`ClientInfo.tsx`)

   - Company/Individual name
   - Contact information
   - Address details
   - Purpose of evaluation
2. **Evaluee Information** (`EvalueeInfo.tsx`)

   - Personal information
   - Educational background
   - Study period details
3. **Service Selection** (`ServiceSelection.tsx`)

   - Educational Foreign Credential Evaluation
   - Course-by-course Evaluation
   - Professional Experience Evaluation
   - Position Evaluation
   - Translation Service
   - Delivery options
   - Additional services
4. **Review** (`Review.tsx`)

   - Summary of all information
   - Price calculation
   - Final submission

## State Management

Using Zustand for form state management with persistence:

```typescript
interface FormState {
  formData: Partial<FormData>
  currentStep: FormStep
  draftId: string | null
  status: 'draft' | 'completed' | null
  isLoading: boolean
  isSaving: boolean
  // Actions
  setFormData: (data: Partial<FormData>) => void
  setCurrentStep: (step: FormStep) => void
  saveDraft: () => Promise<void>
  submitForm: () => Promise<void>
  loadDraft: (draftId: string) => Promise<void>
}
```

## Form Steps Enum

```typescript
export enum FormStep {
  CLIENT_INFO = 0, // Client Information
  EVALUEE_INFO = 1, // Evaluee Information
  SERVICE_SELECTION = 2, // Service Selection
  REVIEW = 3, // Review Information
}
```

## Usage

```tsx
import FCEForm from "@/app/components/FCE-Form"
export default function FormPage() {
return (
  <div className="container mx-auto py-10">
    <div className="max-w-3xl mx-auto">
      <FCEForm />
    </div>
  </div>
  )
}
```

## TODO

- [ ] Implement form submission API
- [ ] Add loading states for async operations
- [ ] Enhance error handling
- [ ] Add unit tests
- [ ] Implement proper form validation feedback
- [ ] Add form data persistence with Supabase
- [ ] Add form draft auto-saving
- [ ] Implement proper price calculation validation

## Contributing

When contributing to this component:

1. Ensure all comments are in English
2. Follow the existing code style
3. Update tests when modifying functionality
4. Update documentation when making changes
